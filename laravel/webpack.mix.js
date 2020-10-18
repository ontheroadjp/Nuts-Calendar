let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.vue', '.json'],
    }
})

mix.js('resources/assets/js/src/main.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .extract(['vue', 'vuex', 'vue-router', 'axios', 'moment', 'chroma-js'])
    .version();

mix.copyDirectory('node_modules/font-awesome/fonts', 'public/fonts');
mix.copyDirectory('resources/assets/images', 'public/images');
mix.copy('resources/assets/static', 'public');

