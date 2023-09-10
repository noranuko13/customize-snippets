import browserify from "browserify";
import fs from "fs";
import { glob } from "glob";
import gulp from "gulp";
import data from "gulp-data";
import footer from "gulp-footer";
import header from "gulp-header";
import beautify from "gulp-jsbeautifier";
import md from "gulp-remarkable";
import rename from "gulp-rename";
import gulp_sass from "gulp-sass";
import swig from "gulp-swig";
import tap from "gulp-tap";
import uglify from "gulp-uglify";
import path from "path";
import sass from "sass";
import buffer from "vinyl-buffer";
const gulpSass = gulp_sass(sass);

function compileTs() {
  return gulp
    .src("src/**/main.ts", { read: false })
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
