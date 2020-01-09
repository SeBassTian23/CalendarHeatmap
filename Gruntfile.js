module.exports = function( grunt ) {

	grunt.initConfig( {

		// Import package manifest
		pkg: grunt.file.readJSON( "package.json" ),

		// Banner definitions
		meta: {
			banner: "/*\n" +
			" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
			" *  <%= pkg.description %>\n" +
			" *  <%= pkg.homepage %>\n" +
			" *\n" +
			" *  Made by <%= pkg.author.name %>\n" +
			" *  Under <%= pkg.license %> License\n" +
			" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				options: {
					banner: "<%= meta.banner %>"
				},
				files: {
					"dist/jquery.CalendarHeatmap.js": "src/jquery.CalendarHeatmap.js",
					"dist/jquery.CalendarHeatmap.css": "dist/jquery.CalendarHeatmap.css",
					"dist/jquery.CalendarHeatmap.min.css": "dist/jquery.CalendarHeatmap.min.css"
				}
			}
		},

		// Lint definitions
		jshint: {
			files: [ "src/jquery.CalendarHeatmap.js", "test/**/*" ],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		eslint: {
			all: [ "src/**/*.js" ],
			options: {
				config: ".eslintrc.json"
			}
		},

		// Minify definitions
		uglify: {
			dist: {
				src: [ "dist/jquery.CalendarHeatmap.js" ],
				dest: "dist/jquery.CalendarHeatmap.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		less: {
			production: {
				files: {
					"dist/jquery.CalendarHeatmap.css": "src/jquery.CalendarHeatmap.less"
				}
			}
		},

		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					"dist/jquery.CalendarHeatmap.min.css": "dist/jquery.CalendarHeatmap.css"
				}
			}
		},

		// karma test runner
		karma: {
			unit: {
				configFile: "karma.conf.js",
				background: false,
				singleRun: false,
				autoWatch: true,
				browsers: [ "Chrome", "Safari" ]
			},

			//continuous integration mode: run tests once in PhantomJS browser.
			travis: {
				configFile: "karma.conf.js",
				singleRun: true,
				browsers: [ "Chrome" ]
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
			files: [ "src/*", "test/**/*" ],
			tasks: [ "default" ]
		}

	} );

	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-eslint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-less" );
	grunt.loadNpmTasks( "grunt-contrib-cssmin" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-karma" );

	grunt.registerTask( "travis", [ "jshint", "karma:travis" ] );
	grunt.registerTask( "lint", [ "jshint", "jscs", "eslint" ] );
	grunt.registerTask( "build", [ "less", "cssmin", "concat", "uglify" ] );
	grunt.registerTask( "default", [ "jshint", "build", "karma:unit:run" ] );
};
