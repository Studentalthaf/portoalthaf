# Deployment Guide - VPS dengan Docker

Dokumentasi ini menjelaskan cara deploy aplikasi Next.js ke VPS menggunakan Docker dan GitHub Actions.

## 🏗️ Prerequisites

### VPS Requirements
- Ubuntu 20.04+ atau CentOS 8+
- Docker & Docker Compose terinstall
- Git terinstall
- SSH access dengan key authentication
- Domain name (opsional, untuk SSL)

### Software yang Diperlukan
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
sudo apt update
sudo apt install git -y
```

## 🔧 Setup VPS

### 1. Buat User untuk Deployment
```bash
# Buat user baru
sudo adduser deploy
sudo usermod -aG docker deploy
sudo usermod -aG sudo deploy

# Switch ke user deploy
su - deploy
```

### 2. Setup SSH Key
```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "deploy@vps"

# Copy public key ke authorized_keys
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Copy private key untuk GitHub Actions
cat ~/.ssh/id_rsa
```

### 3. Setup Directory Structure
```bash
# Buat direktori deployment
sudo mkdir -p /opt/halaman
sudo mkdir -p /opt/halaman-staging
sudo mkdir -p /opt/backups

# Set ownership
sudo chown -R deploy:deploy /opt/halaman
sudo chown -R deploy:deploy /opt/halaman-staging
sudo chown -R deploy:deploy /opt/backups
```

## 🔐 GitHub Secrets Setup

Tambahkan secrets berikut di repository GitHub Anda:

### Production VPS
- `VPS_HOST`: IP address VPS production
- `VPS_USERNAME`: username (biasanya 'deploy')
- `VPS_SSH_KEY`: private SSH key dari VPS
- `VPS_PORT`: SSH port (biasanya 22)
- `VPS_DOMAIN`: domain production (untuk health check)

### Staging VPS (opsional)
- `VPS_STAGING_HOST`: IP address VPS staging
- `VPS_STAGING_USERNAME`: username staging
- `VPS_STAGING_SSH_KEY`: private SSH key staging
- `VPS_STAGING_PORT`: SSH port staging

### Security Scanning (opsional)
- `SNYK_TOKEN`: token untuk Snyk security scanning
- `SLACK_WEBHOOK`: webhook URL untuk notifikasi Slack

## 🚀 Deployment Process

### 1. Automatic Deployment
Setelah push ke branch `main`, GitHub Actions akan:
1. Build aplikasi
2. Build Docker image
3. Deploy ke VPS production
4. Run health checks
5. Notify team

### 2. Manual Deployment
```bash
# SSH ke VPS
ssh deploy@your-vps-ip

# Navigate ke direktori deployment
cd /opt/halaman

# Pull latest code
git fetch origin
git reset --hard origin/main

# Build dan start containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

### 3. Staging Deployment
```bash
# SSH ke VPS staging
ssh deploy@your-staging-vps-ip

# Navigate ke direktori staging
cd /opt/halaman-staging

# Pull latest code dari develop branch
git fetch origin
git reset --hard origin/develop

# Build dan start containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📁 File Structure di VPS

```
/opt/halaman/
├── .git/                    # Git repository
├── app/                     # Source code
├── nginx/                   # Nginx configuration
│   ├── nginx.conf
│   └── ssl/                # SSL certificates
├── logs/                    # Application logs
├── docker-compose.yml       # Docker compose config
├── Dockerfile              # Docker image config
└── version.txt             # Current version
```

## 🔒 SSL Setup

### 1. Generate Self-Signed Certificate (Development)
```bash
# Buat direktori SSL
mkdir -p /opt/halaman/nginx/ssl

# Generate self-signed certificate
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /opt/halaman/nginx/ssl/key.pem \
  -out /opt/halaman/nginx/ssl/cert.pem \
  -subj "/C=ID/ST=Jakarta/L=Jakarta/O=Company/CN=localhost"
```

### 2. Let's Encrypt (Production)
```bash
# Install Certbot
sudo apt install certbot -y

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/halaman/nginx/ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/halaman/nginx/ssl/key.pem

# Set permissions
sudo chown -R deploy:deploy /opt/halaman/nginx/ssl
```

## 📊 Monitoring & Logs

### 1. Container Status
```bash
# Check container status
docker-compose ps

# Check container logs
docker-compose logs -f app
docker-compose logs -f nginx

# Check resource usage
docker stats
```

### 2. Application Logs
```bash
# Application logs
tail -f /opt/halaman/logs/app.log

# Nginx logs
tail -f /opt/halaman/logs/nginx/access.log
tail -f /opt/halaman/logs/nginx/error.log
```

### 3. Health Check
```bash
# Check application health
curl -f http://localhost/health

# Check from external
curl -f https://yourdomain.com/health
```

## 🔄 Backup & Rollback

### 1. Manual Backup
```bash
# Create backup
cd /opt/backups
BACKUP_DIR="halaman-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Backup application
cp -r /opt/halaman "$BACKUP_DIR/app"
cp -r /opt/halaman/logs "$BACKUP_DIR/logs"
cp -r /opt/halaman/nginx "$BACKUP_DIR/nginx"

echo "Backup created: $BACKUP_DIR"
```

### 2. Rollback
```bash
# Stop current containers
cd /opt/halaman
docker-compose down

# Restore from backup
LATEST_BACKUP=$(ls -t /opt/backups/halaman-* | head -1)
rm -rf /opt/halaman
cp -r "$LATEST_BACKUP/app" /opt/halaman

# Start containers
docker-compose up -d
```

## 🚨 Troubleshooting

### 1. Container Won't Start
```bash
# Check container logs
docker-compose logs app

# Check container status
docker-compose ps

# Restart containers
docker-compose restart
```

### 2. Port Already in Use
```bash
# Check what's using the port
sudo netstat -tlnp | grep :3000

# Kill process or change port in docker-compose.yml
```

### 3. Permission Issues
```bash
# Fix ownership
sudo chown -R deploy:deploy /opt/halaman

# Fix permissions
chmod 600 /opt/halaman/nginx/ssl/*
```

### 4. SSL Issues
```bash
# Check SSL certificate
openssl x509 -in /opt/halaman/nginx/ssl/cert.pem -text -noout

# Test nginx config
docker-compose exec nginx nginx -t

# Reload nginx
docker-compose exec nginx nginx -s reload
```

## 📈 Performance Optimization

### 1. Docker Optimization
```bash
# Use multi-stage builds (already implemented)
# Enable BuildKit
export DOCKER_BUILDKIT=1

# Use .dockerignore (already implemented)
# Optimize base images
```

### 2. Nginx Optimization
```bash
# Enable gzip compression (already configured)
# Enable HTTP/2 (already configured)
# Configure caching headers (already configured)
```

### 3. Application Optimization
```bash
# Enable Next.js standalone output (already configured)
# Optimize bundle size
# Enable image optimization
```

## 🔐 Security Best Practices

### 1. Firewall Setup
```bash
# Allow only necessary ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### 2. Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose pull
docker-compose build --no-cache
```

### 3. Security Scanning
```bash
# Run Trivy vulnerability scanner
trivy image halaman-app:latest

# Run npm audit
npm audit --audit-level=moderate
```

## 📞 Support

Jika mengalami masalah:

1. Check logs: `docker-compose logs -f`
2. Check status: `docker-compose ps`
3. Restart containers: `docker-compose restart`
4. Rollback ke backup sebelumnya
5. Check GitHub Actions logs untuk error details

## 🔗 Useful Commands

```bash
# Quick status check
docker-compose ps && echo "---" && docker-compose logs --tail=10

# Quick restart
docker-compose restart

# Check disk usage
df -h && docker system df

# Cleanup old images
docker image prune -f

# Check network
docker network ls
docker network inspect halaman_app-network
```
