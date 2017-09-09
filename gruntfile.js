module.exports = function(grunt) {

  grunt.initConfig({

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/style.css':'scss/style.scss'
        }
      }
    },

    watch: {
      scripts: {
        files: ['style.scss'],
        tasks: ['scss'],
        options: {
            spawn: false
        },
      } 
    },
	
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'style.css',
            '*.html',
            '*.js'
          ]
        },
        options: {
          watchTask: true, 
          server: './'
        }
      }
    },
    postcss: {
        options: {
            map: true, // inline sourcemaps

            processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
  });

  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.registerTask('default', ['sass', 'browserSync', 'postcss', 'watch']);

};