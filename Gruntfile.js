var path = require('path');

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    connect: {
        server: {
            options: {
                port: 3030,
                base: "www"
            }
        }
    },
    watch: {
        sass: {
            files: ['www/sass/*.scss', 'www/components/**/*.scss', 'www/pages/**/*.scss'],
            tasks: ['compass']
        },
        newFiles: {
            files: ['www/pages/**/*', 'www/components/**/*'],
            tasks: ['injector'],
            options: {
                event: ['added', 'deleted']
            }
        },
        bower: {
            files: ['www/bower_components/*'],
            tasks: ['wiredep'],
            options: {
                event: ['added', 'deleted']
            }
        }
    },
    compass: {
            dist: {
                options: {
                    config: "config.rb",
                    force: true
                }
            }
    },
    injector: {
        options: {
            addRootSlash: false,
            ignorePath: "www/",
            transform: function (filepath, index, length) {

                var e = path.extname(filepath).slice(1);
                var pathToInject = filepath;
                
                if (e === 'css') {
                  return '<link rel="stylesheet" href="' + pathToInject + '">';
                } else if (e === 'js') {
                  return '<script src="' + pathToInject + '"></script>';
                } else if (e === 'html') {
                  return '<link rel="import" href="' + pathToInject + '">';
                } else if (e === 'scss' && (index +1) < length) {
                  return '@import "' + pathToInject + '";';
                } else if (e === 'scss' && (index + 1) >= length) {
                  return '@import "' + pathToInject + '";\n/*';
                }
            }
        },
        local_dependencies: {
            files : {
                'www/index.html': ['www/pages/**/*.js', 'www/components/**/*.js'],
                'www/sass/index.scss' : ['www/pages/**/*.scss', 'www/components/**/*.scss']
            }
        }
    },
    wiredep: {
      task: {
        src: ['www/*.html',
              'www/sass/index.scss'],
        options: {
            fileTypes: {
                php: {
                block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                    detect: {
                      js: /<script.*src=['"](.+)['"]>/gi,
                      css: /<link.*href=['"](.+)['"]/gi
                    },
                    replace: {
                      js: '<script src="{{filePath}}"></script>',
                      css: '<link rel="stylesheet" href="{{filePath}}" />'
                    }
                }
            }
        }
      }
    }
  });

  grunt.registerTask('default', ['wiredep', 'injector', 'compass', 'connect', 'watch']);
  grunt.registerTask('serve', ['connect', 'watch']);
};
