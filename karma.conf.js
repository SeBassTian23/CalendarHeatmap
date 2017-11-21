module.exports = function (config) {

	config.set({
		files: [
			"node_modules/jquery/dist/jquery.js",
			"node_modules/moment/min/moment.min.js",
			"dist/jquery.CalendarHeatmap.js",
			"test/setup.js",
			"test/spec/*"
		],
		frameworks: ["qunit"],
		autoWatch: true
	});
};
