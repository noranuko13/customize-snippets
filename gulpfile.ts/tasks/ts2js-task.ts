import browserify from "browserify";
import gulp from "gulp";
import tap from "gulp-tap";
import uglify from "gulp-uglify";
import path from "path";
import buffer from "vinyl-buffer";
import { ts2jsLog as log } from "../logs";
import { Task } from "./task";

export class Ts2jsTask extends Task {
  readonly WATCH_TARGET: string = "src/**/*.ts";

  convert(globs: string = this.WATCH_TARGET) {
    log(`globs: ${globs}`);
    return gulp
      .src(this.suppose(globs), { base: "./src", read: false })
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

  private suppose(globs: string): string {
    const supposed: string = globs.includes("shared")
      ? "src/**/main.ts"
      : path.join(path.dirname(globs), "main.ts");
    log(`supposed: ${supposed}`);
    return supposed;
  }
}
