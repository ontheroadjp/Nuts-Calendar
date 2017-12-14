# Nuts Calendar

## Setup

```bash
# clone repository
git clone https://github.com/ontheroadjp/Nuts-Calendar.git

# start server (Docker container)
cd Nuts-Calendar
docker-compose up -d

# install packages
cd Nuts-Calendar/laravel
composer update
npm install

# DB migration (in laravel container)
php artisan migrate --seed

# compile
npm run dev

# visit
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
