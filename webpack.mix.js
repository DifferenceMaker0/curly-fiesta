const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').sass('resources/css/app.scss', 'public/css/app.css');
mix.js('resources/js/dialog/dialog.js', 'public/js/dialog').js('resources/js/dialog/dialogEvents.js', 'public/js/dialog').js('resources/js/dialog/dialogTypes.js', 'public/js/dialog').js('resources/js/dialog/main.js', 'public/js/dialog').js('resources/js/dialog/utils.js', 'public/js/dialog');
mix.css('resources/css/dialog/dialog.css', 'public/css/dialog/').css('resources/css/dialog/styles.css', 'public/css/dialog/');