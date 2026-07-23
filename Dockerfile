# Stage 1: Build frontend assets with Vite
FROM node:22-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Install PHP dependencies with Composer
FROM php:8.3-cli-alpine AS vendor
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist
COPY . .
RUN composer dump-autoload --optimize --no-dev

# Stage 3: Production runner with FrankenPHP
FROM dunglas/frankenphp:latest-php8.3-alpine AS runner

# Install essential PHP extensions for Laravel
RUN install-php-extensions \
    pdo \
    pdo_sqlite \
    pdo_mysql \
    bcmath \
    opcache \
    zip \
    intl

WORKDIR /app

# Copy built application and vendor dependencies
COPY --from=vendor /app /app
COPY --from=frontend /app/public/build /app/public/build

# Setup entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint"]
CMD ["frankenphp", "php-server", "--listen", ":8000", "--root", "/app/public"]
