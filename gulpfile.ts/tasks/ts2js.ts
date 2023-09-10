import browserify from "browserify";
import gulp from "gulp";
import tap from "gulp-tap";
import uglify from "gulp-uglify";
import buffer from "vinyl-buffer";

export function ts2js() {
  return _ts2js("src/**/main.ts");
}

export function ts2jsW(filename: string) {
  return _ts2js(filename);
}

function _ts2js(filename: string) {
  return gulp
    .src(filename, { base: "./src", read: false })
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
