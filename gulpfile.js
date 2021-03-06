import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglyfly';
import rawSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';

const sass = gulpSass(rawSass);

/** 
 * -- TOP LEVEL FUNCTION --
 * gulp.task - Define tasks
 * gulp.src - Point to files to use
 * gulp.dest - Point to folder to output
 * gulp.watch - Watch files and folders for changes
*/

// Log Message
gulp.task('message', function (done) {
  console.log('Gulp is running...');
  done();
});

// Default task of the gulp
// gulp.task('default', function (done) {
//   console.log('Gulp(default) is running...');
//   done();
// });

// Copy Html to dist folder
gulp.task('copyHtml', function (done) {
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
  done();
});

// Optimize image
gulp.task('imageMin', function (done) {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
  done();
});

// Minify JS
gulp.task('minify', function (done) {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
  done();
});

// Compile Scss
gulp.task('compileScss', function (done) {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
  done();
});

// Script to concat and minify JS files
gulp.task('script', function (done) {
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
  done();
});

// Run all task with gulp command
gulp.task('default', gulp.series('message', 'copyHtml', 'imageMin', 'compileScss', 'script'));

gulp.task('watch', function (done) {
  gulp.watch('src/*.html', gulp.series('copyHtml'));
  gulp.watch('src/images/*', gulp.series('imageMin'));
  gulp.watch('src/sass/*.scss', gulp.series('compileScss'));
  gulp.watch('src/js/*.js', gulp.series('script'));
});