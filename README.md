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

## Development

```bash
cd Nuts-Calendar/laravel
npm run watch
```

## Javascript

installing test package such as karma

```bash
cd Nuts-Calendar/laravel/resources/assets/js
npm install
```

run test

```bash
cd Nuts-Calendar/laravel/resources/assets/js
npm run test
```

linting

```bash
cd Nuts-Calendar/laravel/resources/assets/js
npm run lint
```


## CSS

linting

```bash
cd Nuts-Calendar/laravel
npm run lint:css
```
