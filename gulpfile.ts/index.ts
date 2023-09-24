import browserSync from "browser-sync";
import gulp from "gulp";
import { distLog as log } from "./logs";
import { Md2htmlTask } from "./tasks/md2html-task";
import { Png2thumbTask } from "./tasks/png2thumb-task";
import { Scss2cssTask } from "./tasks/scss2css-task";
import { Task } from "./tasks/task";
import { Ts2jsTask } from "./tasks/ts2js-task";

const tasks: Task[] = [new Ts2jsTask(), new Scss2cssTask(), new Png2thumbTask(), new Md2htmlTask()];

gulp.task("build", (cb) => {
  tasks.forEach((task) => task.convert());
  cb();
});

gulp.task("watch", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    port: 8080,
  });
  tasks.forEach((task) => {
    gulp.watch(task.WATCH_TARGET).on("change", (globs) => task.convert(globs));
  });
  gulp.watch("dist/**/*").on("change", (globs) => {
    log(globs);
    browserSync.reload();
  });
});
