module.exports = function(grunt) {

    // Imports
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('svgo-grunt');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-img');

	// Project configuration.
	grunt.initConfig({

        clean: {
            build: 'build/',
            svg: 'build/svg'
        },

		jekyll: {
			server : {
				src:            'src',
				dest:           'build',
				server:         true,
				server_port:    8000,
				auto:           false,
                baseurl:        '/blog'
			},
			build: {
				src:            'src',
				dest:           'build',
                baseurl:        '/blog',
                pygments:       true
			}
		},

        concat: {
            build: {
                src: [
                    'src/_js/components/jquery/jquery.js',
                    'src/_js/app.js'
                ],
                dest: 'build/js/app.js'
            }
        },

        min: {
            build: {
                src: ['build/js/app.js'],
                dest: 'build/js/app.js'
            }
        },

        img: {
            src: {
                src: ['src/img/*', 'src/content/img/*']
            }
        },

        shell: {
            fontcustom: {
                command: 'bin/fontcustom.sh',
                stdout: true
            },
            newpost: {
                command: 'bin/newpost.sh',
                stdout: true
            },
            publish: {
                command: 'bin/publish.sh',
                stdout: true
            }
        },

		compass: {
            dev: {
                src: 'src/_styles',
                dest: 'build/css',
                outputstyle: 'expanded',
                linecomments: true,
                debugsass: true,
                relativeassets: true
            },
            prod: {
                src: 'src/_styles',
                dest: 'build/css',
                outputstyle: 'compressed',
                linecomments: false,
                forcecompile: true,
                debugsass: false,
                relativeassets: true
            }
		},

		watch: {
			global: {
				files: ['src/**/*'],
				tasks: ['dev']
			}
		}
	});

	// Default task. Run standard jekyll server.
	grunt.registerTask('default', 'prod');
    grunt.registerTask('prod', 'clean:build img:src jekyll:build concat:build min:build shell:fontcustom clean:svg compass:prod');
    grunt.registerTask('dev', 'clean:build jekyll:build concat:build shell:fontcustom clean:svg compass:dev');
	grunt.registerTask('server', 'jekyll:server');
};