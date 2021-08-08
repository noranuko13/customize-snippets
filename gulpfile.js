const gulp = require('gulp')
const ts = require('gulp-typescript')
const uglify = require('gulp-uglify')
const tsProject = ts.createProject('tsconfig.json')

function compileTs () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
}

gulp.task('default', compileTs)
