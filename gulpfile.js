
/**
 * Folowing modules need to be install with global flag -g
 *
 * - gulp
 * - less-plugin-clean-css
 */
var gulp = require('gulp'),
	del = require('del'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	less = require('gulp-less'),
	LessPluginCleanCSS = require('less-plugin-clean-css'),
	cleanCSS = new LessPluginCleanCSS({advanced: true});

var paths = {
	scripts: ['app/scripts/**/*.js'],
	styles: ['app/styles/less/**/*.less']
};


gulp.task('clean', function(cb) {

	del(['build'], cb);

});


gulp.task('buildJS', ['clean'], function() {

	return gulp.src(paths.scripts)
		.pipe(concat('site.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/dist'));

});


gulp.task('buildCSS', ['clean'], function() {

	return gulp.src(paths.styles)
		.pipe(less({
			plugins: [cleanCSS]
		}))
		.pipe(gulp.dest('./public/dist'));

});


gulp.task('compileIndex', ['clean'], function() {

	return gulp.src('app/index.html')
		.pipe(gulp.dest('./public'));

});


gulp.task('watch', function() {

	gulp.watch(paths.scripts, ['buildJS']);
	gulp.watch(paths.styles, ['buildCSS']);

});


gulp.task('default', ['buildJS', 'buildCSS', 'compileIndex']);