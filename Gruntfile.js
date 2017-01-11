module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.initConfig({
    watch: {
        files: ['www/*.html', 'www/bower_components/*', 'www/sass/*'],
        tasks: ['wiredep', 'compass']
    },
    compass: {
            dist: {
                options: {
                    config: "config.rb",
                    force: true
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

  grunt.registerTask('default', ['wiredep']);
  grunt.registerTask('changes', ['watch']);
};
