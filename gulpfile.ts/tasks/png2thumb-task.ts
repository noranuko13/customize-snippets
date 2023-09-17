import gulp from "gulp";
import { png2thumbLog as log } from "../logs";
import { Task } from "./task";

export class Png2thumbTask extends Task {
  readonly WATCH_TARGET: string = "src/**/*.png";

  convert(globs: string = this.WATCH_TARGET) {
    log(`globs: ${globs}`);
    return gulp.src(globs, { base: "./src" }).pipe(gulp.dest("dist"));
  }
}
