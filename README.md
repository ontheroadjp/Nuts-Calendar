# Nuts Calendar

## Setup

### Installing

```bash
# clone repository
git clone https://github.com/ontheroadjp/Nuts-Calendar.git

# setup Javascript environment
cd Nuts-Calendar/laravel/resources/assets/js
npm install

# install packages
cd Nuts-Calendar/laravel
composer update
npm install

# compile Javascript files
npm run watch

# .env (see below for more details)
edit .env file

# generate APP Key
php artisan key:generate

# start server
cd Nuts-Calendar
docker-compose up -d

# DB migration
# enter laravel container
docker exec -i -t CONTAINER-ID /bin/bash

# exec migration
php artisan migrate --seed
```

### Settings

edit .env file

```
APP_ENV=local
APP_DEBUG=true
APP_KEY=base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
APP_URL=http://localhost

GOOGLE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

DB_CONNECTION=mysql
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=familycal
DB_USERNAME=root
DB_PASSWORD=root

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=
MAIL_PORT=
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

### compiling

```bash
npm run dev
```

### visiting

```
http://localhost:8080
```

## Javascript Development

```bash
cd Nuts-Calendar/laravel
npm run watch
```

### Test

```bash
cd Nuts-Calendar/laravel/resources/assets/js
npm install

# Unit test
npm run karma

# e2e test
npm run nightwatch

# linting
npm run lint
```

## CSS

### Test

```bash
cd Nuts-Calendar/laravel
npm run lint:css
```
