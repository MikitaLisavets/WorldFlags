var gulp = require('gulp'),
    lessGlob = require("less-plugin-glob"),
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concatCss = require('gulp-concat-css'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: '.',
        port: '7081',
        livereload: true
    });
});

gulp.task('less', function() {
  gulp.src('less/*.less')
      .pipe(less({
        plugins: [
            lessGlob
        ]
      }))
      .pipe(gulp.dest('css'));
});

gulp.task('minify', function() {
  return gulp.src('css/style.css')
      .pipe(sourcemaps.init())
      .pipe(cssnano())
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('css'));
});


gulp.task('default', ['connect', 'watch']);

gulp.task('watch', function () {
    gulp.watch(['less/**/*.less'], ['less']);
});
