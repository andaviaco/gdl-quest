'use strict';

var babelify     = require('babelify');
var browserify   = require('browserify');
var buffer       = require('vinyl-buffer');
var envify       = require('envify/custom');
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var livereload   = require('gulp-livereload');
var notify       = require('gulp-notify');
var rename       = require('gulp-rename');
var sass         = require('gulp-sass');
var source       = require('vinyl-source-stream');
var uglify       = require('gulp-uglify');

gulp.task('sass', function() {
    return gulp.src('sass/main.scss')
        .pipe( sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }) )
        .pipe( rename('main.css') )
        .pipe(autoprefixer({}))
        .pipe( gulp.dest('public/css') )
        .pipe( notify({
            title: 'Sass',
            message: 'Sass compiled',
            icon: __dirname + '/node_modules/gulp-notify/assets/gulp.png'
        }) );
});

gulp.task('modules', function() {
    return browserify({
            entries: './public/js/app/main.js',
            debug: true,
            transform: [babelify.configure({
                stage: 2,
                optional: ['es7.objectRestSpread']
            }), envify({
                NODE_ENV: 'production'
            })]
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./public/js/build/'))
        .pipe( notify({
            title: 'Javascrict',
            message: 'main.js is ready',
            icon: __dirname + '/node_modules/gulp-notify/assets/gulp.png'
        }) );
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch(['public/**/*.public'])
        .on('change', function(file) {
            livereload.changed(file.path);
        });
    gulp.watch(['public/js/app/**/*.js', 'public/js/app/**/*.jsx'], ['modules']);
    gulp.watch(['public/js/build/main.js'])
        .on('change', function(file) {
            livereload.changed(file.path);
        });
    gulp.watch('public/css/**/*.css')
        .on('change', function(file) {
            livereload.changed(file.path);
        });

});

gulp.task('default', ['sass', 'modules', 'watch']);
