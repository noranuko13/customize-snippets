import browserify from "browserify";
import gulp from "gulp";
import tap from "gulp-tap";
import uglify from "gulp-uglify";
import buffer from "vinyl-buffer";

export function ts2js() {
  return gulp
    .src("src/**/main.ts", { read: false })
    .pipe(
      tap((file) => {
        file.contents = browserify(file.path, { debug: true })
          .plugin("tsify")
          .bundle();
        file.extname = ".js";
      }),
    )
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
}
