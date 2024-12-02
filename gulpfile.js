const { src, dest, series } = require('gulp');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
function imagenes() {
    return src('images/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}
function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('images/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )
}
function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('images/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest('build/img'))
}

exports.default = series( imagenes, versionWebp, versionAvif  );