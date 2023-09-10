import gulp from "gulp";
import gulp_sass from "gulp-sass";
import sass from "sass";
const gulpSass = gulp_sass(sass);

export function scss2css() {
  return _scss2css("src/**/*.scss");
}

export function scss2cssW(filename: string) {
  return _scss2css(filename);
}

export function _scss2css(filename: string) {
  return gulp
    .src(filename, { base: "./src" })
    .pipe(
      gulpSass({ outputStyle: "compressed" }).on("error", gulpSass.logError),
    )
    .pipe(gulp.dest("dist"));
}
