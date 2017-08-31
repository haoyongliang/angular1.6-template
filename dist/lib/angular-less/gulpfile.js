var gulp = require('gulp');
var rename = require('gulp-rename');
var uglifyjs = require('gulp-uglifyjs');

gulp.task('default', function minify() {

	return gulp.src('angular-less.js')
		.pipe(uglifyjs())
		.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest('./'));

});