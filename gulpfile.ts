import gulp from "gulp";
import ts from "gulp-typescript";
import uglify from "gulp-uglify";
const tsProject = ts.createProject("tsconfig.json");
import sass from "sass";
import gulp_sass from "gulp-sass";
const gulpSass = gulp_sass(sass);
import md from "gulp-remarkable";
import beautify from "gulp-jsbeautifier";
import rename from "gulp-rename";
import swig from "gulp-swig";
import header from "gulp-header";
import footer from "gulp-footer";
import data from "gulp-data";
import path from "path";
import { glob } from "glob";
import fs from "fs";

function compileTs() {
  return gulp
    .src("src/**/*.ts")
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
}

function compileScss() {
  return gulp
    .src("src/**/*.scss")
    .pipe(
      gulpSass({ outputStyle: "compressed" }).on("error", gulpSass.logError),
    )
    .pipe(gulp.dest("dist"));
}

function copyImage() {
  return gulp.src("src/**/*.png").pipe(gulp.dest("dist"));
}

function md2Html() {
  const pages: { key: string; description: string }[] = [];
  glob.sync("src/**/*.json").forEach((path: string) => {
    pages.push(JSON.parse(fs.readFileSync(path, "utf8")));
  });
  return gulp
    .src("src/**/*.md")
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
          __dirname,
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
          ...require(path.dirname(file.path) + "/ogp.json"),
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

gulp.task("default", gulp.parallel(compileTs, compileScss, copyImage, md2Html));

gulp.task("watch", function () {
  gulp.watch("src/**/*.ts", {}, gulp.series(compileTs));
  gulp.watch("src/**/*.scss", {}, gulp.series(compileScss));
  gulp.watch("src/**/*.png", {}, gulp.series(copyImage));
  gulp.watch(["src/**/*.md", "templates/**/*.twig"], {}, gulp.series(md2Html));
});
