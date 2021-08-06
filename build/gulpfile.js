"use strict";
// 单独打包css
const { src, dest, series, task } = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");

// 打包默认的
function compile() {
  return src("../src/styles/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["ie > 9", "last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cssmin())
    .pipe(dest("../lib/styles"));
}

// 打包组件样式
function compileComponents() {
  return src("../src/styles/components/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["ie > 9", "last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cssmin())
    .pipe(dest("../lib/styles/components"));
}

// 复制字体包
function copyfont() {
  return src("../src/styles/fonts/**")
    .pipe(cssmin())
    .pipe(dest("../lib/styles/fonts"));
}

task("default", series(copyfont, compile, compileComponents));
