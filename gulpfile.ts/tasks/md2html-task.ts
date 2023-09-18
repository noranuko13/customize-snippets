import fs from "fs";
import { glob } from "glob";
import gulp from "gulp";
import data from "gulp-data";
import footer from "gulp-footer";
import header from "gulp-header";
import beautify from "gulp-jsbeautifier";
import md from "gulp-remarkable";
import rename from "gulp-rename";
import swig from "gulp-swig";
import path from "path";
import { md2htmlLog as log } from "../logs";
import { Task } from "./task";

export class Md2htmlTask extends Task {
  readonly WATCH_TARGET: string = "src/**/*.md";

  convert(globs: string = this.WATCH_TARGET) {
    log(`globs: ${globs}`);
    const pages: { key: string; description: string }[] = [];
    glob.sync("src/**/*.json").forEach((path: string) => {
      pages.push(JSON.parse(fs.readFileSync(path, "utf8")));
    });
    return gulp
      .src(globs, { base: "./src" })
      .pipe(md())
      .pipe(
        rename(function (path) {
          path.basename = "index";
          path.extname = ".twig";
        }),
      )
      .pipe(
        header(
          `{%- extends "${path.join(
            path.resolve(__dirname, "../../"),
            "/templates/page.twig",
          )}" -%}{%- block content -%}`,
        ),
      )
      .pipe(footer("{%- endblock -%}\n"))
      .pipe(
        data(function (file: { path: string }) {
          return {
            sitename: "Customize Snippets",
            basepath: "https://noranuko13.github.io/customize-snippets/",
            pages,
            ...require(path.join(path.resolve(__dirname, "../../"), path.dirname(file.path), "/ogp.json")),
          };
        }),
      )
      .pipe(swig({ defaults: { cache: false } }))
      .pipe(
        beautify({
          indent_size: 2,
          end_with_newline: true,
          html: {
            extra_liners: [],
          },
        }),
      )
      .pipe(gulp.dest("dist"));
  }
}
