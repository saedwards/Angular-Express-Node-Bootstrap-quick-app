
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
	cleanCSS = new LessPluginCleanCSS({advanced: true}),
	karma = require('karma').server;

var paths = {
	views: ['app/views/**/*.html'],
	scripts: ['app/scripts/**/*.js'],
	styles: ['app/styles/less/**/*.less'],
	indexFile: ['app/index.html']
};


gulp.task('clean', function(cb) {

	del(['build'], cb);

});


gulp.task('buildJS', ['clean'], function() {

	return gulp.src(paths.scripts)
		.pipe(concat('site.min.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./public/dist'));

});


gulp.task('copyViews', ['clean'], function() {

	return gulp.src(paths.views)
		.pipe(gulp.dest('./public/views'));

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


gulp.task('dev', function() {

	gulp.watch(paths.views, ['copyViews']);
	gulp.watch(paths.scripts, ['buildJS']);
	gulp.watch(paths.styles, ['buildCSS']);
	gulp.watch(paths.indexFile, ['compileIndex']);

});


/*gulp.task('test', function (done) {

	gulp.watch(karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done));

});*/


gulp.task('default', ['copyViews', 'buildJS', 'buildCSS', 'compileIndex']);