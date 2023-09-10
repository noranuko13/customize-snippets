import gulp from "gulp";
import gulp_sass from "gulp-sass";
import sass from "sass";
const gulpSass = gulp_sass(sass);

export function scss2css() {
  return gulp
    .src("src/**/*.scss")
    .pipe(
      gulpSass({ outputStyle: "compressed" }).on("error", gulpSass.logError),
    )
    .pipe(gulp.dest("dist"));
}
