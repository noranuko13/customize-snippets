import gulp from "gulp";
import { md2html, md2htmlW } from "./tasks/md2html";
import { png2thumb, png2thumbW } from "./tasks/png2thumb";
import { scss2css, scss2cssW } from "./tasks/scss2css";
import { ts2js, ts2jsW } from "./tasks/ts2js";

gulp.task("build", gulp.parallel(ts2js, scss2css, png2thumb, md2html));

gulp.task("watch", function () {
  gulp.watch("src/**/*.ts").on("change", ts2jsW);
  gulp.watch("src/**/*.scss").on("change", scss2cssW);
  gulp.watch("src/**/*.png").on("change", png2thumbW);
  gulp.watch("src/**/*.md").on("change", md2htmlW);
});
