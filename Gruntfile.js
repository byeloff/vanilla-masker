module.exports = function(grunt) {

  var config = {

    // Clean folders ================================
    clean: {
      dev: ['public/vanilla-masker*'],
      build: ['build/vanilla-masker*']
    },

    // Concat ========================================
    concat: {
      options: {
        separator: ";"
      },
      dev: {
        src: ["src/vanilla-masker.js", "src/modules/*.js"],
        dest: "public/vanilla-masker.js"
      },
      build: {
        src: ["src/vanilla-masker.js", "src/modules/*.js"],
        dest: "build/vanilla-masker.js"
      }
    },

    // JSHint ========================================
    jshint: {
      options: {
        laxcomma: true
      },
      all: ["src/vanilla-masker.js", "src/modules/*.js"]
    },

    // Minification ==================================
    uglify: {
      minify: {
        files: {
          "build/vanilla-masker.min.js": ["build/vanilla-masker.js"]
        }
      }
    },

    // Jasmine Runner ================================
    jasmine: {
      dev: {
        src: ['public/vanilla-masker.js'],
        options: {
          specs: 'tests/*_spec.js'
        }
      },
      build: {
        src: ['build/vanilla-masker.js'],
        options: {
          specs: 'tests/*_spec.js'
        }
      }
    },

    // Compress ======================================
    compress: {
      build: {
        options: { mode: 'gzip', level: 9, pretty: true },
        files: [
          {expand: true, flatten: true, src: ['build/*.js'], dest: 'build', ext: '.min.gz.js'}
        ]
      }
    },

    // Connect Server ================================
    connect: {
      dev: {
        options: { port: 4500, base: 'public' }
      }
    },

    // Watch Files ===================================
    watch: {
      livereload: {
        options: { livereload: true },
        files: ['src/**/*','public/*', 'tests/*'],
        tasks: ['default']
      }
    }

  };

  grunt.initConfig(config);
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["clean:dev", "concat:dev", "jshint", "jasmine:dev"]);
  grunt.registerTask("test", ["default"]);
  grunt.registerTask("dev", ["default", "connect", "watch"]);
  grunt.registerTask("build", ["clean:build", "concat:build", "jshint", "jasmine:build", "uglify", "compress"]);
};
