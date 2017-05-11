# Nuts Calendar

## Install

```bash
git clone https://github.com/ontheroadjp/Nuts-Calendar.git
cd Nuts-Calendar/laravel
composer update
npm install
```

## Start Docker

```bash
cd Nuts-Calendar
docker-compose up -d
```

## DB migration

in laravel container

```bash
php artisan migrate
php artisan db:seed
```

visit ``http://localhost:8080``
