const gulp = require('gulp')
const ts = require('gulp-typescript')
const uglify = require('gulp-uglify')
const tsProject = ts.createProject('tsconfig.json')
const sass = require('gulp-sass')(require('sass'))
const md = require('gulp-remarkable')
const beautify = require('gulp-jsbeautifier')
const rename = require('gulp-rename')
const swig = require('gulp-swig')
const header = require('gulp-header')
const footer = require('gulp-footer')
const data = require('gulp-data')
const path = require('path')

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

function md2Html () {
  return gulp.src('src/**/*.md')
    .pipe(md())
    .pipe(rename(function (path) {
      path.basename = 'index'
      path.extname = '.twig'
    }))
    .pipe(header('{%- extends "../../../templates/page.twig" -%}\n{%- block content -%}\n'))
    .pipe(footer('{%- endblock -%}\n'))
    .pipe(data(function (file) {
      return {
        sitename: 'Customize Snippets',
        basepath: 'https://noranuko13.github.io/customize-snippets/',
        ...require(path.dirname(file.path) + '/ogp.json')
      }
    }))
    .pipe(swig({ defaults: { cache: false } }))
    .pipe(beautify({
      indent_size: 2,
      end_with_newline: true,
      html: {
        extra_liners: []
      }
    }))
    .pipe(gulp.dest('dist'))
}

gulp.task('default', gulp.parallel(compileTs, compileScss, copyImage, md2Html))

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', {}, gulp.series(compileTs))
  gulp.watch('src/**/*.scss', {}, gulp.series(compileScss))
  gulp.watch('src/**/*.png', {}, gulp.series(copyImage))
  gulp.watch('src/**/*.md', {}, gulp.series(md2Html))
})
