const gulp = require('gulp')
const ts = require('gulp-typescript')
const uglify = require('gulp-uglify')
const tsProject = ts.createProject('tsconfig.json')
const sass = require('gulp-sass')(require('sass'))

function compileTs () {
  return gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
}

function compileScss () {
  return gulp.src('src/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist'))
}

function copyImage () {
  return gulp.src('src/**/*.png')
    .pipe(gulp.dest('dist'))
}

gulp.task('default', gulp.parallel(compileTs, compileScss, copyImage))

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', {}, gulp.series(compileTs))
  gulp.watch('src/**/*.scss', {}, gulp.series(compileScss))
  gulp.watch('src/**/*.png', {}, gulp.series(copyImage))
})
