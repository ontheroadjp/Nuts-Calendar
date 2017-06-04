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
php artisan migrate
php artisan db:seed

# compile
npm run dev

# visit
http://localhost:8080
```


## Scripts

```bash
"scripts": {
	# Compile for development
    "dev": "npm run development",
    "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules",
    "watch": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules",
    "watch-poll": "npm run watch -- --watch-poll",
    "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot",

	# Compile for production
    "prod": "npm run production",
    "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules",

	# Linting
    "lint:js": "node_modules/eslint/bin/eslint.js 'resources/assets/js/**/*.*'",
    "lint:css": "node_modules/stylelint/bin/stylelint.js 'resources/assets/js/**/*.vue' --syntax scss"
},

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