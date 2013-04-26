module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    jshint: {
      jshintrc: '.jshintrc',
      gruntfile: {
        src: ['Gruntfile.js']
      },
      js: {
        src: ['public/javascripts/app/**/*.js', 'public/javascripts/*.js']
      },
      test: {
        src: ['tests/**/*.js']
      }
    },

    csslint: {
      strict: {
        src: ['public/build/css/screen.css']
      }
    },

    watch: {
      scripts: {
        files: ['<%= jshint.js.src %>', '<%= jshint.test.src %>'],
        tasks: ['jshint']
      },
      tests: {
        files: ['<%= jshint.js.src %>', '<%= jshint.test.src %>'],
        tasks: ['ghost']
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "public/javascripts",
          mainConfigFile: "public/javascripts/main.js",

          // Output directory
          dir: 'public/build/javascripts',

          modules: [
            {
              name: "main"
            },
            {
              name: "app/archive",
              exclude: ["main"]
            },
            {
              name: "app/find-us",
              exclude: ["main"]
            },
            {
              name: "app/index",
              exclude: ["main"]
            },
            {
              name: "app/labs",
              exclude: ["main"]
            },
            {
              name: "app/pebbles-good-code",
              exclude: ["main"]
            },
            {
              name: "app/people",
              exclude: ["main"]
            },

            // Note: require.config for tumblr needs to
            // be defined in `main.js` as well for optimization
            // to work.
            {
              name: "tumblr"
            }
          ]
        }
      }
    },

    ghost: {
      dist: {
        src: ['tests/pages/*'],
        options: {
          direct: true,
          logLevel: 'info',
          failFast: true,
          printCommand: true,
          printFilePaths: true,
          pre: ['tests/helpers/pre.js']
        }
      }
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'views/stylesheets',
          cssDir: 'public/build/css',
          environment: 'production',
          outputStyle: 'nested'
          // TODO: Need to sort this out for minification again
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-ghost');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.registerTask('default', ['watch:scripts']);

  // Generate production javascript
  grunt.registerTask('build', ['jshint', 'requirejs', 'compass:dist']);

  // Run tests
  grunt.registerTask('test', ['watch:tests']);
};