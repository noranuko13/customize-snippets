import gulp from "gulp";

export function png2thumb() {
  return _png2thumb("src/**/*.png");
}

export function png2thumbW(filename: string) {
  return _png2thumb(filename);
}

export function _png2thumb(filename: string) {
  return gulp.src(filename, { base: "./src" }).pipe(gulp.dest("dist"));
}
