var elixir = require('laravel-elixir');

require('laravel-elixir-vueify');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');
    mix.browserify('main.js');
//    mix.scripts([
//        '../../../node_modules/jquery/dist/jquery.js',
//        '../../../node_modules/vue/dist/vue.js',
//        '../../../node_modules/bootstrap/dist/js/bootstrap.js',
//        '../../../public/js/main.js',
//    ]);
    mix.scripts([
        '../../../node_modules/vue/dist/vue.js',
        '../../../public/js/main.js',
    ]);
    mix.copy('node_modules/font-awesome/fonts/*.*', 'public/fonts/');
    mix.copy('resources/assets/images/*.*', 'public/images/');
    mix.copy('resources/assets/html/*.*', 'public/');
//    mix.copy('node_modules/jquery/dist/jquery.js', 'public/js/');
//    mix.copy('node_modules/vue/dist/vue.js', 'public/js/');
//    mix.copy('node_modules/bootstrap/dist/js/bootstrap.js', 'public/js/');
    mix.version([
        'js/all.js', 'css/app.css'
    ]);
});
