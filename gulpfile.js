'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    minify = require('gulp-minify'),
    cleanCss = require('gulp-clean-css'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require("browser-sync").create(),
    sourcemaps = require('gulp-sourcemaps');
    const fileinclude = require('gulp-file-include');

var path = {
    build: {
      html: 'build/pages/',
      json: 'build/pages/',
      js: 'build/js/',
      css: 'build/css/',
      img: 'build/img/',
      fonts: 'build/fonts/'
    },
    src: {
      html: 'src/**/*.html',
      json: 'src/**/*.json',
      js: 'src/js/*.js',
      style: 'src/styles/*.scss',
      img: 'src/img/**/*.*',
      fonts: 'src/fonts/**/*.*'
    },
    watch: {
      html: 'src/**/*.html',
      json: 'src/**/*.json',
      js: 'src/js/**/*.js',
      style: 'src/styles/**/*.scss',
      img: 'src/img/**/*.*',
      fonts: 'src/fonts/**/*.*'
  
    },
    clean: 'build'
};

function html() {
  return gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.build.html));
};

function json() {
  return gulp.src(path.src.json)
    .pipe(gulp.dest(path.build.json));
}

function js() {
  return gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(minify())
    .pipe(gulp.dest(path.build.js));
};

function styles() {
  return gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer({
      browsers: [
          'ie >= 10',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 34',
          'safari >= 7',
          'opera >= 23',
          'ios >= 6',
          'android >= 4.4',
          'bb >= 10'
      ],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(cleanCss())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
};

function img() {
  return gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img));
};

function fonts() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
};

function watch() {
  browserSync.init({
    watch: true,
    server: {
      baseDir: "build/",
    }
  });
  gulp.watch(path.src.html, html);
  gulp.watch(path.src.json, json);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.src.img, img);
  gulp.watch(path.src.fonts, fonts);
  gulp.watch(path.watch.style, styles);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.parallel(html, js, img, fonts, styles, watch);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.html = html;
exports.js = js;
exports.img = img;
exports.fonts = fonts;
exports.styles = styles;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;
