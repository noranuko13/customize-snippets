import gulp from "gulp";
import gulp_sass from "gulp-sass";
import sass from "sass";
import { scss2cssLog as log } from "../logs";
import { Task } from "./task";
const gulpSass = gulp_sass(sass);

export class Scss2cssTask extends Task {
  readonly WATCH_TARGET: string = "src/**/*.scss";

  convert(globs: string = this.WATCH_TARGET) {
    log(`globs: ${globs}`);
    return gulp
      .src(globs, { base: "./src" })
      .pipe(gulpSass({ outputStyle: "compressed" }).on("error", gulpSass.logError))
      .pipe(gulp.dest("dist"));
  }
}
