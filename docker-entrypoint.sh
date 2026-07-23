#!/bin/sh
set -e

# Ensure required storage and cache directories exist with appropriate permissions
mkdir -p /app/storage/framework/cache/data \
         /app/storage/framework/sessions \
         /app/storage/framework/views \
         /app/storage/logs \
         /app/bootstrap/cache

chmod -R 777 /app/storage /app/bootstrap/cache

# Run Laravel optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Execute database migrations
php artisan migrate --force || true

# Execute the container's main process
exec "$@"
