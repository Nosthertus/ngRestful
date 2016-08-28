var gulp       = require("gulp");
var concat     = require("gulp-concat-util");
var wrap       = require("gulp-wrap");

gulp.task("js", () => {
	gulp.src("src/*.js")
		.pipe(concat("ngRestful.js", {sep: "\n\n"}))
		.pipe(wrap("(function(){\n<%= contents %>\n})();"))
		.pipe(gulp.dest("./dist/"));
});

gulp.task("watch", () => {
	gulp.watch("src/*.js", ["js"]);
});