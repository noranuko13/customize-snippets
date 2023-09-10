import gulp from "gulp";

export function png2thumb() {
  return gulp.src("src/**/*.png").pipe(gulp.dest("dist"));
}
