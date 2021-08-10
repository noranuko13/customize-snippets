const gulp = require('gulp')
const ts = require('gulp-typescript')
const uglify = require('gulp-uglify')
const tsProject = ts.createProject('tsconfig.json')
const sass = require('gulp-sass')(require('sass'))

function compileTs () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
}

function compileScss () {
  return gulp.src('src/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('dist'))
}

gulp.task('default', gulp.parallel(compileTs, compileScss))

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', {}, gulp.series(compileTs))
  gulp.watch('src/**/*.scss', {}, gulp.series(compileScss))
})
