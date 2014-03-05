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
					""
				}
			}
		},
		"transport" : {
			"options" : {
				"path" : "./../"
			},
			"src" : {
				"options" : {
					'idleading' : "<%= pkg.name %>"
				},
				"files" : {
					"cwd" : "",
					"src" : ["*/**/*.js","*/**/*.coffee"],
					"dest" : "*/**/.sea-debug/<%= pkg.name %>"
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
					},

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
		}
	});



};