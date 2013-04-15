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
        src: ['public/javascripts/app/**/*.js', 'public/javascripts/*.js', 'test/**/*.js']
      }
    },

    watch: {
      scripts: {
        files: ['<%= jshint.js.src %>'],
        tasks: ['jshint']
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
              name: "app/people",
              exclude: ["main"]
            }
            // TODO: Add the rest?
          ],

          // For debugging
          optimize: "none"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['watch']);

  // Generate production javascript
  grunt.registerTask('build', ['jshint', 'requirejs']);
};