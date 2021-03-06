var gulp       = require("gulp");
var concat     = require("gulp-concat-util");
var wrap       = require("gulp-wrap");
var prettify   = require("gulp-jsbeautifier");
var uglify     = require("gulp-uglify");
var rename     = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");

gulp.task("js", () => {
	gulp.src("src/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(concat("ngRestful.js", {sep: "\n\n"}))
		.pipe(wrap("(function(){\n<%= contents %>\n})();"))
		.pipe(prettify({
			indent_char: "\t",
			indent_size: 1
		}))
		.pipe(gulp.dest("./dist/"))
		.pipe(uglify())
		.pipe(rename({ extname: ".min.js"}))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("./dist/"));
});

gulp.task("watch", () => {
	gulp.watch("src/**/*.js", ["js"]);
});