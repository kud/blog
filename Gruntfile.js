module.exports = function(grunt) {

  // Imports
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-shell');

  // Project configuration.
  var happyPlan = grunt.file.readJSON('happy-plan.json');

  grunt.initConfig({

    happyPlan: happyPlan,

    jshint: happyPlan.grunt.jshint,

    // Remove folders and files
    clean: {
      dist: {
        src: ['<%= happyPlan.dist.path %>']
      },
      jekyll: {
        src: ['<%= happyPlan.dist.path %>/jekyll']
      }
    },

    // Static file generator
    jekyll: {
      server : {
        src:            '<%= happyPlan.src.path %>',
        dest:           '<%= happyPlan.dist.path %>',
        server:         true,
        server_port:    8000,
        auto:           false,
        baseurl:        '<%= happyPlan.baseUrl %>'
      },
      dist: {
        src:            'dist/jekyll/',
        dest:           'dist/',
        baseurl:        '<%= happyPlan.baseUrl %>',
        pygments:       true
      }
    },

    // Copy folders and files
    copy: {
      jekyllPages: {
        files: [
          {
            expand: true,
            cwd: 'src/pages/',
            src: ['**'],
            dest: 'dist/jekyll/'
          }
        ]
      },
      jekyllPosts: {
        files: [
          {
              expand: true,
              cwd: 'src/posts/',
              src: ['**'],
              dest: 'dist/jekyll/_posts/'
          }
        ]
      },
      jekyllLayouts: {
        files: [
          {
            expand: true,
            cwd: 'src/layouts/',
            src: ['**'],
            dest: 'dist/jekyll/_layouts/'
          }
        ]
      },
      jekyllPartials: {
        files: [
          {
            expand: true,
            cwd: 'src/partials/',
            src: ['**'],
            dest: 'dist/jekyll/_includes/'
          }
        ]
      },
      jekyllConfig: {
        files: [
          {
            src: 'src/config/config.yml',
            dest: 'dist/jekyll/_config.yml'
          }
        ]
      },
      static: {
        files: [
          {
            expand: true,
            cwd: '<%= happyPlan.src.assets.static %>',
            src: ['**'],
            dest: '<%= happyPlan.dist.assets.static %>/'
          }
        ]
      },
      images: {
        files: [
          {
            expand: true,
            cwd: '<%= happyPlan.src.assets.images %>/',
            src: ['**'],
            dest: '<%= happyPlan.dist.assets.images %>/'
          }
        ]
      },
      medias: {
        files: [
          {
            expand: true,
            cwd: '<%= happyPlan.src.medias %>/',
            src: ['**'],
            dest: '<%= happyPlan.dist.medias %>/'
          }
        ]
      }
    },

    // Concat scripts
    concat: {
      dist: {
        files: {
          '<%= happyPlan.dist.assets.scripts %>/script.js': ['<%= happyPlan.src.assets.scripts %>/*.js']
        }
      }
    },

    // Minify javascript
    uglify: {
      dist: {
        files: {
          '<%= happyPlan.dist.assets.scripts %>/script.js': ['<%= happyPlan.dist.assets.scripts %>/script.js']
        }
      }
    },

    /*
    Doesn't work
    webfont: {
      icons: {
        src: '<%= happyPlan.src.assets.fontcustom %>/*.svg',
        dest: '<%= happyPlan.dist.assets.fonts %>/icons',
        destCss: '<%= happyPlan.src.assets.styles %>',
        options: {
            styles: 'icon',
            stylesheet: 'scss',
            hashes: false
        }
      }
    },*/

    // Some shell cmds
    shell: {
      svgToFonts: {
        command: './bin/fontcustom.sh',
        options: {
          stdout: true
        }
      }
    },

    // Time to have some styles!
    compass: {
      dev: {
        options: {
          sassDir: '<%= happyPlan.src.assets.styles %>',
          cssDir: '<%= happyPlan.dist.assets.styles %>',
          imagesDir: '<%= happyPlan.src.assets.images %>',
          javascriptsDir: '<%= happyPlan.src.assets.scripts %>',
          fontsDir: '<%= happyPlan.src.assets.fonts %>',

          // here we give to compass dist path (without dist root)
          raw: [
              'httppath = "' + happyPlan.baseUrl + '"',
              'http_images_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.images.replace(happyPlan.dist.path, '') + '"',
              'http_javascripts_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.scripts.replace(happyPlan.dist.path, '') + '"',
              'http_fonts_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.static.replace(happyPlan.dist.path, '') + '/fonts"'
          ].join("\n"),

          outputStyle: 'expanded',
          noLineComments: false,
          debugInfo: true
        }
      },
      dist: {
        options: {
          sassDir: '<%= happyPlan.src.assets.styles %>',
          cssDir: '<%= happyPlan.dist.assets.styles %>',
          imagesDir: '<%= happyPlan.src.assets.images %>',
          javascriptsDir: '<%= happyPlan.src.assets.scripts %>',
          fontsDir: '<%= happyPlan.src.assets.fonts %>',

          // here we give to compass dist path (without dist root)
          raw: [
              'httppath = "' + happyPlan.baseUrl + '"',
              'http_images_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.images.replace(happyPlan.dist.path, '') + '"',
              'http_javascripts_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.scripts.replace(happyPlan.dist.path, '') + '"',
              'http_fonts_path = "' + happyPlan.baseUrl + happyPlan.dist.assets.static.replace(happyPlan.dist.path, '') + '/fonts"'
          ].join("\n"),

          outputStyle: 'compressed',
          noLineComments: true,
          force: true
        }
      }
    },

    // Optimise images
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: "<%= happyPlan.dist.assets.images %>",
            src: ["**/*"],
            dest: "<%= happyPlan.dist.assets.images %>"
          },
          {
            expand: true,
            cwd: "<%= happyPlan.dist.medias %>",
            src: ["**/*"],
            dest: "<%= happyPlan.dist.medias %>"
          }
        ]
      }
    },

    regarde: {
      jshint: {
          files: [
              '**/*.js',
              '**/*.json'
          ],
          tasks: ['jshint']
      },
      html: {
          files: ['<%= happyPlan.src.path %>/**/*.{html,md,txt}'],
          tasks: ['dev']
      },
      js: {
          files: ['<%= happyPlan.src.assets.scripts %>/**/*'],
          tasks: ['concat:dist']
      },
      scss: {
          files: ['<%= happyPlan.src.assets.styles %>/**/*'],
          tasks: ['compass:dev']
      },
      static: {
          files: ['<%= happyPlan.src.assets.static %>/**/*'],
          tasks: ['copy:static']
      },
      images: {
          files: ['<%= happyPlan.src.assets.images %>/**/*'],
          tasks: ['copy:images']
      },
      icons: {
          files: ['<%= happyPlan.src.assets.fontcustom %>/icons/*.svg'],
          tasks: ['']
      },
      livereload: {
          files: ['<%= happyPlan.dist.assets.path %>/**'],
          tasks: ['livereload']
      }
    }
  });

  grunt.registerTask('default', ['dev', 'livereload-start', 'regarde']);
  grunt.registerTask('build', ['clean:dist', 'jekyll:copy', 'jekyll:dist', 'clean:jekyll', 'shell:svgToFonts', 'copy:images', 'copy:static', 'copy:medias', 'concat:dist']);
  grunt.registerTask('dev', ['jshint', 'build', 'compass:dev']);
  grunt.registerTask('dist', ['jshint', 'build', 'compass:dist', 'uglify:dist', 'imagemin:dist']);

  grunt.registerTask('jekyll:copy', ['copy:jekyllPages', 'copy:jekyllPosts', 'copy:jekyllPartials', 'copy:jekyllConfig', 'copy:jekyllLayouts']);

  grunt.registerTask('server', 'jekyll:server');

  // waiting for https://github.com/gruntjs/grunt-contrib-imagemin/issues/11 to use just 'build' here
  grunt.registerTask('test', ['jshint', 'build', 'compass:dist', 'uglify:dist', 'copy:images']);
};