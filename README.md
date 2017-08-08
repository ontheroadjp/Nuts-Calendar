# Nuts Calendar

## Spec

### Back-end
* PHP 7.0.8
* Laravel 5.2

### Front-end

**JS libs**

* vue 2.3.3
* vue-router 2.5.3
* vuex 2.3.1
* axios 0.16.1
* moment 2.18.1
* chroma 1.3.4

**CSS**

* bulma 0.4.1
* font-awesome 4.7.0

**Bundling**

* webpack 2.3.3
* laravel-mix 0.11.4

**Testing**

* karma 1.7.0
* chai 4.0.2
* mocha 3.4.2
* ESLint 3.19.0 
* StyleLint 7.10.1

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
php artisan migrate
php artisan db:seed

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

## Linting

```bash
cd Nuts-Calendar/laravel

# for Javascript
npm run lint:js

or

node_modules/eslint/bin/eslint.js 'resources/assets/js/**/*.*'

# for CSS
npm run lint:css

or

node_modules/stylelint/bin/stylelint.js 'resources/assets/js/**/*.vue' --syntax scss
```

## Test

```bash
cd Nuts-Calendar/laravel
karma start
```


## Scripts

```bash
{
  "private": true,
  "scripts": {
    "dev": "npm run development",
    "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules",
    "watch": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules",
    "watch-poll": "npm run watch -- --watch-poll",
    "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot",
    "prod": "npm run production",
    "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules",
    "lint:js": "node_modules/eslint/bin/eslint.js 'resources/assets/js/**/*.*'",
    "lint:css": "node_modules/stylelint/bin/stylelint.js 'resources/assets/js/**/*.vue' --syntax scss"
  },
  "devDependencies": {
    "babel-plugin-transform-object-rest-spread": "^6.23.0",
    "babel-preset-latest": "^6.24.1",
    "chai": "^4.0.2",
    "eslint": "^3.19.0",
    "eslint-config-vue": "^2.0.2",
    "eslint-plugin-vue": "^2.0.1",
    "karma": "^1.7.0",
    "karma-chai": "^0.1.0",
    "karma-chrome-launcher": "^2.2.0",
    "karma-jasmine": "^1.1.0",
    "karma-mocha": "^1.3.0",
    "laravel-mix": "^0.11.4",
    "mocha": "^3.4.2",
    "stylelint": "^7.10.1",
    "stylelint-config-standard": "^16.0.0",
    "stylelint-processor-html": "^1.0.0"
  },
  "dependencies": {
    "bulma": "^0.4.1",
    "font-awesome": "^4.7.0",
    "moment": "^2.18.1",
    "chroma-js": "^1.3.4",
    "axios": "^0.16.1",
    "vue": "^2.3.3",
    "vue-router": "^2.5.3",
    "vuex": "^2.3.1",
    "css-toggle-switch": "^4.0.2"
  }
}

```

## packages

```bash
"devDependencies": {
	
	# for ES6 spread operator
    "babel-plugin-transform-object-rest-spread": "^6.23.0",
    
    # for ES6 uglifyJs
    "babel-preset-latest": "^6.24.1",
    
    # ESlint
    "eslint": "^3.19.0",
    "eslint-config-vue": "^2.0.2",
    "eslint-plugin-vue": "^2.0.1",
    
    # stylelint
    "stylelint": "^7.10.1",
    "stylelint-config-standard": "^16.0.0",
    "stylelint-processor-html": "^1.0.0",
    
    # Laravel-Mix
    "laravel-mix": "^0.11.4"
},

"dependencies": {
	# gui
    "bulma": "^0.4.1",
    "font-awesome": "^4.7.0",
    
    # library
    "axios": "^0.16.1",
    "moment": "^2.18.1",
    "chroma-js": "^1.3.4",
        
    # vue.js
    "vue": "^2.3.3",
    "vue-router": "^2.5.3",
    "vuex": "^2.3.1",
    "css-toggle-switch": "^4.0.2"
}
```