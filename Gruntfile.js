module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	require('time-grunt')(grunt);

	/*
	 * grunt watch -env=dev
	 * grunt watch -env=site
	 *
	 */

	var target = '';
	var option = '';

	var env = {
		dev: 'dev',
		site: 'site',
		splash: 'site/splash',
		patternLibrary: 'pattern-library'
	}

    if(grunt.option('env')) {
    	
    	// If grunt option is env, then set option to env
    	option = grunt.option('env');
    	target = env[option];

    	console.log(option);
    	console.log(target);

    }

	grunt.initConfig({
		// Project settings
        config: {
            // Configurable paths
            target: target
        },

		watch: {
			js: {
				files: ['<%= config.target %>/**/{,*/}*.js'],
				tasks: ['newer:jshint:dist'],
				options: {
					reload: true,
					nospawn: true
				}
			},

			css: {
				files: ['<%= config.target %>/**/{,*/}*.scss'],
				tasks: ['sass','newer:autoprefixer:dist'],
				options: {
					reload: true,
					nospawn: true
				}
			}
		},

		sass: {
			options: {
				style: 'expanded',
				sourcemap: 'none',
				precision: 7,
				lineNumbers: true,
				loadPath: '<%= config.target %>/',
				trace: true,
				update: true
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.target %>/',
					src: ['**/{,*/}*.scss'],
					dest: '<%= config.target %>/',
					ext: '.css'
				}]
			}
		},

		jshint: {
			options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            dist: {
				files: [{
					expand: true,
					cwd: '<%= config.target %>/',
					src: ['**/{,*/}*.js']
				}]
			}
		},

		autoprefixer: {
            dist: {
            	files: [{
	            	expand: true,
					cwd: '<%= config.target %>/',
					src: '**/{,*/}*.css',
					dest: '<%= config.target %>/'
				}]
            }
        },

        cssmin: {
        	options: {
        		report: 'gzip'
        	},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.target %>/',
					src: ['**/{,*/}.css'],
					dest: '<%= config.target %>/'
				}]
			}
		},

        uglify: {
			options: {
				compress: {
					drop_console: true
				},
				report: 'gzip'
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.target %>/',
					src: '**/{,*/}*.js',
					dest: '<%= config.target %>/',
					ext: '.min.js'
				}]
			}
        }

	});

	grunt.registerTask('default');
	grunt.registerTask('build', ['autoprefixer', 'cssmin', 'uglify']);

};