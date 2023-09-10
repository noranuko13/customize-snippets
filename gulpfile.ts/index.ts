import gulp from "gulp";
import { md2html, png2thumb, scss2css, ts2js } from "./tasks";

gulp.task("build", gulp.parallel(ts2js, scss2css, png2thumb, md2html));

gulp.task("watch", function () {
  gulp.watch("src/**/*.ts", {}, gulp.series(ts2js));
  gulp.watch("src/**/*.scss", {}, gulp.series(scss2css));
  gulp.watch("src/**/*.png", {}, gulp.series(png2thumb));
  gulp.watch(["src/**/*.md", "templates/**/*.twig"], {}, gulp.series(md2html));
});
