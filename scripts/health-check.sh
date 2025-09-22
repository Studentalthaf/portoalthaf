#!/bin/bash

# Check if the application is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "Application is not running"
    exit 1
fi

# Check SSL certificate
if ! curl -s https://althaf.site > /dev/null; then
    echo "SSL certificate might have issues"
    exit 1
fi

# Check if nginx is running
if ! systemctl is-active --quiet nginx; then
    echo "Nginx is not running"
    exit 1
fi

# Check memory usage
MEMORY_USAGE=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
if (( $(echo "$MEMORY_USAGE > 90" | bc -l) )); then
    echo "High memory usage: ${MEMORY_USAGE}%"
    exit 1
fi

# Check disk space
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 90 ]; then
    echo "Low disk space: ${DISK_USAGE}%"
    exit 1
fi

# Check Node.js process
if ! pgrep -f "node" > /dev/null; then
    echo "Node.js process not found"
    exit 1
fi

echo "All checks passed successfully"
exit 0