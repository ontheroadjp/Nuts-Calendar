# Nuts Calendar

## Install

```bash
git clone https://github.com/ontheroadjp/Nuts-Calendar.git
cd Nuts-Calendar/laravel
touch database/database.SQLite
php artisan migrate
php artisan db:seed
```

## Start Docker

```bash
cd Nuts-Calendar
docker-compose up -d
```

## Access

### WEB UI

``http://localhost:8080/calendar``

### API endpoint

``http://localhost:8080/api/calendar/2016/11``