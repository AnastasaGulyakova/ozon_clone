const gulp = require('gulp')// гальп как основа 
const sass=require('gulp-sass')// препроцессор для цсс
const concat=require('gulp-concat')//объединение файлов
const cssnano=require('gulp-cssnano')//уменьшение файлов
const pug = require('gulp-pug')//препроцессор для ейчтмл

const browserserSync = require('browser-sync')//сервер для лайв разработки
const browserSync = require('browser-sync')

function toPug(){
    return gulp.src("./src/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("./src"));
}
function style(){
    return gulp.src('./src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream())
}

function watch(){
    browserSync.init ({
        server:{
            baseDir: "./src",
            index: "/index.html",
        },
    });
}


gulp.watch("./src/sass/*.sass").on("change",gulp.series(style, browserSync.reload));
//gulp.watch('./src/index.html').on('change', browserSync.reload);
gulp.watch("./src/*.pug").on("change",gulp.series(toPug, browserSync.reload));



exports.watch = watch;

    
