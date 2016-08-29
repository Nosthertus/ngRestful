var gulp       = require("gulp");
var concat     = require("gulp-concat-util");
var wrap       = require("gulp-wrap");
var prettify   = require("gulp-jsbeautifier");

gulp.task("js", () => {
	gulp.src("src/*.js")
		.pipe(concat("ngRestful.js", {sep: "\n\n"}))
		.pipe(wrap("(function(){\n<%= contents %>\n})();"))
		.pipe(prettify({
			indent_char: "\t",
			indent_size: 1
		}))
		.pipe(gulp.dest("./dist/"));
});

gulp.task("watch", () => {
	gulp.watch("src/*.js", ["js"]);
});