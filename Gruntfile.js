module.exports = function (grunt) {
	'use strict';

	// Force use of Unix newlines
	grunt.util.linefeed = '\n';


	grunt.initConfig({
		"pkg" : grunt.file.readJSON('package.json'),
		"banner" : 	"/*!\n" +
					" * cell ui v-<%= pkg.version %>" + 
					" * fork me on <%= pkg.homepage %>" +
					"*/\n",
		"sass" : {
			"dist" : {
				"option" : {
					"style" : "expanded"
				},
				"files" : {
					"gallery/form/checkbox/css/checkbox.scss" : "gallery/form/checkbox/css/checkbox.css"
				}
			}
		},
		"transport" : {
			"options" : {
				"path" :["./../"]
			},
			"src" : {
				"options" : {
					'idleading' : "<%= pkg.name %>",
					"debug" : false
				},
				"files" : {
					"form" : {
						"cwd" : "",
						"src" : ["gallery/**/*.js","*/**/*.coffee"],
						"dest" : ".sea-debug/<%= pkg.name %>"
					}
				}
			}
		},
		"copy" : {
			"options" : {},
			"main" : {
				"files" : [
					{
						"expand": true,
						"cwd": "",
						"src" : "./lib/",
						"dest" : "./dest/"
					}
				]
			}
		},
		"jshint" : {
			"options": {
				"jshintrc": 'js/.jshintrc'
			},
			"grunt": {
				"options": {
					"jshintrc": 'grunt/.jshintrc'
				},
				"src": ['Gruntfile.js']
			},
			"src": {
				"src": '**/*.js'
			},
			"test": {
				"src": 'tests/unit/*.js'
			},
			"assets": {
				"src": ['docs/assets/js/application.js', 'docs/assets/js/customizer.js']
			}
		},
		"uglify" : {
			"options" : {
				"report": "min"
			},
			"form" : {
				"banner" : 	"/*!\n" + 
							" * cell ui" + 
							" * form 组件" +
							"*/",
				"src" : ".sea-debug/gallery/form/*/js/*.js",
				"dest" : "dest/gallery/form/*/js/*.js"
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-cmd-transport');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-csscomb');

	// 测试压缩与合并
	grunt.registerTask('build',["sass","transport"]);
};