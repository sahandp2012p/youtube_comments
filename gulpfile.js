const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const terser = require('gulp-terser')
const browsersync = require('browser-sync').create()

// Sass
function sassTask() {
	return src('dev/sass/style.sass', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([cssnano]))
		.pipe(dest('dist', { sourcemaps: '.' }))
}

// JavaScript Task
function jsTask() {
	return src('dev/js/script.js', { sourcemaps: true })
		.pipe(terser())
		.pipe(dest('dist', { sourcemaps: '.' }))
}


// Browsersync Tasks
function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['dev/sass/**/*.sass', 'dev/js/**/*.js'], series(sassTask, jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
  sassTask,
  jsTask,
  browsersyncServe,
  watchTask
);