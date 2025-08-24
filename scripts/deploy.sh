#!/bin/bash

# Script deployment untuk VPS
# Pastikan script ini memiliki permission execute: chmod +x scripts/deploy.sh

set -e

# Konfigurasi
APP_NAME="halaman"
DOCKER_REGISTRY=""
IMAGE_TAG="latest"
DEPLOY_PATH="/opt/halaman"

# Colors untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function untuk logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Function untuk backup
backup() {
    log "Creating backup..."
    if [ -d "$DEPLOY_PATH" ]; then
        BACKUP_DIR="/opt/backups/halaman-$(date +%Y%m%d-%H%M%S)"
        mkdir -p /opt/backups
        cp -r "$DEPLOY_PATH" "$BACKUP_DIR"
        log "Backup created at: $BACKUP_DIR"
    fi
}

# Function untuk pull latest code
pull_code() {
    log "Pulling latest code..."
    if [ -d "$DEPLOY_PATH" ]; then
        cd "$DEPLOY_PATH"
        git fetch origin
        git reset --hard origin/main
    else
        git clone https://github.com/yourusername/halaman.git "$DEPLOY_PATH"
        cd "$DEPLOY_PATH"
    fi
}

# Function untuk build dan deploy
deploy() {
    log "Building and deploying application..."
    
    cd "$DEPLOY_PATH"
    
    # Pull latest images
    log "Pulling latest Docker images..."
    docker-compose pull || true
    
    # Build new image
    log "Building new Docker image..."
    docker-compose build --no-cache
    
    # Stop existing containers
    log "Stopping existing containers..."
    docker-compose down
    
    # Remove old images
    log "Cleaning up old images..."
    docker image prune -f
    
    # Start new containers
    log "Starting new containers..."
    docker-compose up -d
    
    # Wait for health check
    log "Waiting for application to be ready..."
    sleep 30
    
    # Check health
    if curl -f http://localhost/health > /dev/null 2>&1; then
        log "Application is healthy!"
    else
        warn "Health check failed, but continuing..."
    fi
}

# Function untuk rollback
rollback() {
    log "Rolling back to previous version..."
    
    # Find latest backup
    LATEST_BACKUP=$(ls -t /opt/backups/halaman-* | head -1)
    
    if [ -z "$LATEST_BACKUP" ]; then
        error "No backup found for rollback"
    fi
    
    # Stop current containers
    cd "$DEPLOY_PATH"
    docker-compose down
    
    # Restore from backup
    rm -rf "$DEPLOY_PATH"
    cp -r "$LATEST_BACKUP" "$DEPLOY_PATH"
    
    # Start containers
    cd "$DEPLOY_PATH"
    docker-compose up -d
    
    log "Rollback completed successfully"
}

# Function untuk status check
status() {
    log "Checking application status..."
    
    if [ -d "$DEPLOY_PATH" ]; then
        cd "$DEPLOY_PATH"
        docker-compose ps
        
        echo ""
        log "Container logs (last 50 lines):"
        docker-compose logs --tail=50
    else
        error "Application not deployed"
    fi
}

# Function untuk logs
logs() {
    if [ -d "$DEPLOY_PATH" ]; then
        cd "$DEPLOY_PATH"
        docker-compose logs -f
    else
        error "Application not deployed"
    fi
}

# Function untuk maintenance mode
maintenance() {
    local mode=$1
    
    if [ "$mode" = "on" ]; then
        log "Enabling maintenance mode..."
        if [ -d "$DEPLOY_PATH" ]; then
            cd "$DEPLOY_PATH"
            # Create maintenance page
            echo "<html><body><h1>Maintenance Mode</h1><p>We're currently performing maintenance. Please check back soon.</p></body></html>" > maintenance.html
            # Update nginx config to serve maintenance page
            docker-compose exec nginx nginx -s reload
        fi
    elif [ "$mode" = "off" ]; then
        log "Disabling maintenance mode..."
        if [ -d "$DEPLOY_PATH" ]; then
            cd "$DEPLOY_PATH"
            # Remove maintenance page
            rm -f maintenance.html
            # Reload nginx
            docker-compose exec nginx nginx -s reload
        fi
    else
        error "Usage: $0 maintenance [on|off]"
    fi
}

# Main script logic
case "${1:-deploy}" in
    "deploy")
        backup
        pull_code
        deploy
        log "Deployment completed successfully!"
        ;;
    "rollback")
        rollback
        ;;
    "status")
        status
        ;;
    "logs")
        logs
        ;;
    "maintenance")
        maintenance "$2"
        ;;
    "backup")
        backup
        ;;
    "pull")
        pull_code
        ;;
    *)
        echo "Usage: $0 {deploy|rollback|status|logs|maintenance|backup|pull}"
        echo ""
        echo "Commands:"
        echo "  deploy      - Deploy the application (default)"
        echo "  rollback    - Rollback to previous version"
        echo "  status      - Check application status"
        echo "  logs        - Show application logs"
        echo "  maintenance - Enable/disable maintenance mode (on/off)"
        echo "  backup      - Create backup only"
        echo "  pull        - Pull latest code only"
        exit 1
        ;;
esac
