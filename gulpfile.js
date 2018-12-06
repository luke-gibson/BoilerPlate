'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const image = require('gulp-image');
const htmlmin = require('gulp-htmlmin');
 
//JS
gulp.task('compress', function() {
  gulp.src(['./src/js/*.js', './src/js/*.mjs'])
    .pipe(minify())
    .pipe(gulp.dest('./dist/js/'))
});
 
//SASS
gulp.task('workflow', function () {
	gulp.src('./src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))

	.pipe(gulp.dest('./dist/css/'))
});

//IMAGES
gulp.task('image', () => {
    gulp.src('./src/images/**')
      .pipe(image({
        pngquant: true,
        optipng: false,
        zopflipng: true,
        jpegRecompress: false,
        mozjpeg: true,
        guetzli: false,
        gifsicle: true,
        svgo: true,
        concurrent: 10,
        quiet: true // defaults to false
      }))
      .pipe(gulp.dest('./dist/images/'));
  });

//HTML
gulp.task('minify', () => {
  return gulp.src('./views/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/html/'));
});
 
//TASKS
gulp.task('dev', function () {
    gulp.watch('./src/sass/**/*.scss', ['workflow']);
    gulp.watch('./src/js/*.js', ['compress']);
});

gulp.task('production', ['image', 'workflow', 'compress', 'minify']);