// grunt configuration
module.exports = function ( grunt ) {
  // use strick mode for JS
  'use strict';

  var shell = require('shelljs');

  var echoCmd = function(cmd) {
    return "echo '" + cmd + "'";
  };

  // grunt config options
  grunt.initConfig({
    // read package.json
    pkg: grunt.file.readJSON( 'package.json' ),

    constants: {
      tempProdFolder: "temp/production"
    },

    // assemble (static site generator) options
    assemble: {
      options: {
        partials: [ 'src/templates/partials/*.hbs' ],
        layout: [ 'src/templates/layouts/default.hbs' ],
        data: [ 'src/data/*.json' ],
        postprocess: require( 'pretty' ),
        flatten: true
      },

      pages: {
        src: [ 'src/templates/pages/*.hbs' ],
        dest: 'dist/'
      },

      ourApproach: {
        src: [ 'src/templates/pages/our-approach/*.hbs' ],
        dest: 'dist/our-approach/'
      },

      astrazeneca: {
        src: [ 'src/templates/pages/astrazeneca/*.hbs' ],
        dest: 'dist/astrazeneca/'
      }
    },

    // clean up old html
    clean: {
      all: [ 'dist/' ]
    },

    // compile Sass
    sass: {
      dist: {
        options: {
          style: 'compressed',
          lineNumbers: true,
          sourcemap: true
        },
        files: {
          'dist/css/styles.css': 'src/sass/styles.scss'
        }
      }
    },

    // hint all JS files
    jshint:{
      data: {
        src: [ 'src/data/**/*.json', 'src/data/**/*.json' ]
      },
      js: {
        src: [ 'Gruntfile.js', 'src/js/*.js', '!src/js/*.min.js' ]
      }
    },

    uglify:{
      my_target: {
        files: {
          'src/js/main.min.js': [ 'src/js/main.js' ],
          'src/js/tumblr.min.js': [ 'src/js/tumblr.js' ]
        }
      }
    },

    // copy files to dist/
    copy: {
      // copy javascript
      scripts: {
        files: [
          {
            expand: true,
            cwd: 'src/js/',
            src: [ '**/*.min.js' ],
            dest: 'dist/js/'
          }
        ]
      },
      // copy images
      images: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: [ '**' ],
          dest: 'dist/img/'
        }]
      },

      robot: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [ 'robots.txt' ],
          dest: 'dist/'
        }]
      },

      favicon: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [ 'favicon.ico' ],
          dest: 'dist/'
        }]
      },

      cname: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [ 'CNAME' ],
          dest: 'dist/'
        }]
      }
    },

    // spin up local dev server
    connect: {
      server: {
        options: {
          port: 7770,
          base: 'dist/',
          hostname: '0.0.0.0'
        }
      }
    },

    // open browser on start
    open: {
      dev: {
        path: 'http://localhost:7770'
      }
    },

    // watch for changes & complete tasks
    watch: {
      options: {
        livereload: true
      },
      // watch for changes to templates and data. Remove all html then rebuild
      html: {
        files: [ 'src/templates/**/*.hbs', 'src/data/*.json' ],
        tasks: [ 'assemble' ]
      },
      // watch for Sass changes. Complie to CSS
      css: {
        files: 'src/sass/*.scss',
        tasks: [ 'sass' ]
      },
      // Watch for javascript changes. Run JShint & copy to dist
      js: {
        files: [ 'Gruntfile.js', 'src/js/*.js', '!src/js/*.min.js' ],
        tasks: [ 'jshint', 'uglify', 'copy:scripts']
      },
      // watch for changes to images. Copy to dist
      images: {
        files: [ 'src/img/**/*' ],
        tasks: [ 'copy:images' ]
      },
    },

    shell: {
      init: {
        options: {
          stdout: true,
          stderr: true
        },
        command: function() {
          var stagingInit = "git remote add staging git@heroku.com:pebblecode-staging.git";
          var tempProdFolder = grunt.config.get('constants').tempProdFolder;
          var productionInit = "mkdir temp;" +
            "git clone git@github.com:pebblecode/pebblecode.github.io.git " + tempProdFolder;
          var commands = [
            echoCmd(stagingInit),
            stagingInit,
            echoCmd(productionInit),
            productionInit
          ];

          return commands.join('; ');
        }
      },
      deployStaging: {
        options: {
          stdout: true,
          stderr: true
        },
        command: function() {
          var branch = grunt.option('branch');
          var force = grunt.option('force');
          var stagingDeployCmd = "git push staging";

          if (branch) {
            stagingDeployCmd = stagingDeployCmd + " " + branch + ":master";
          } else {
            stagingDeployCmd = stagingDeployCmd + " master";
          }

          if (force) {
            stagingDeployCmd = stagingDeployCmd + " -f";
          }

          var commands = [
            echoCmd(stagingDeployCmd),
            stagingDeployCmd
          ];

          return commands.join('; ');
        }
      }
    },

    prompt: {
      commitMessage: {
        options: {
          questions: [
            {
              config: 'commitMessage',
              type: 'input',
              message: 'Please enter a commit message for the new production files:',
              default: ''
            }
          ]
        }
      },
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: [ '*.html', 'js/**/*', 'css/**/*', 'img/**/*' ]
    }

  });

  grunt.loadNpmTasks( 'assemble' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-open' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-gh-pages' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-shell' );
  grunt.loadNpmTasks( 'grunt-prompt' );

  grunt.registerTask( 'default', [ 'make', 'connect', 'watch' ] );

  grunt.registerTask( 'make', [ 'clean', 'assemble', 'sass', 'copy:scripts', 'copy:images', 'copy:robot', 'copy:favicon', 'copy:cname' ] );

  grunt.registerTask( 'deploy:init', ['shell:init'] );
  grunt.registerTask( 'deploy:staging', ['shell:deployStaging'] );
  grunt.registerTask( 'deploy:production', function() {
    var tempProdFolder = grunt.config.get('constants').tempProdFolder;
    var gitStatusCmd = 'git status -s';
    var status = shell.exec(gitStatusCmd, { silent:true });
    var msg;

    // Check that deployment init has been run
    if (!grunt.file.exists(tempProdFolder)) {
      throw new Error("Deployment not initialised yet. Run `grunt deploy:init` first.");
    }

    // Check that there aren't any uncommited changes
    if (status.output !== "") {
      msg = 'You have uncommited changes:\n\n' + status.output + "\n" +
        "Commit or stash changes before proceeding.\n\n";
      throw new Error(msg);
    }

    // Remove old files
    shell.rm('-r', tempProdFolder + '/*');

    // Copy files across
    shell.cp('-R', 'dist/*', tempProdFolder);

    // Check for changes, and run commit task if
    // there are
    shell.cd(tempProdFolder);
    var prodStatus = shell.exec(gitStatusCmd, { silent: true });
    if (prodStatus.output === "") {
      console.log("Nothing changed.");
    } else {
      grunt.log.writeln("The following files changed: \n" + prodStatus.output);
      grunt.task.run([
        'prompt:commitMessage',
        'deploy:production:pushChanges'
      ]);
    }
  });

  // Push changes from temp folder to production
  grunt.registerTask('deploy:production:pushChanges', function() {
    var tempProdFolder = grunt.config.get('constants').tempProdFolder;

    // From grunt prompt
    var commitMessage = grunt.config('commitMessage');
    shell.cd(tempProdFolder);
    shell.exec('git commit -m "' + commitMessage + '"');
    shell.exec('git push');
  });
};