var gulp = require('gulp');
var uncss = require('gulp-uncss');
 
gulp.task('default', function () {
    return gulp.src('viewer.css')
        .pipe(uncss({
            html: ['index2.html']
        }))
        .pipe(gulp.dest('./out'));
});