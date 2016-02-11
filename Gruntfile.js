module.exports = function(grunt) {
  require('jit-grunt')(grunt);
  grunt.initConfig({

  	// Define variables
    pkg:     grunt.file.readJSON("package.json"),
    
    uncss: {
	  dist: {
	    src: ['boilerplate.html'],
	    dest: 'dist/css/tidy.css',
	    options: {
	      report: 'min' // optional: include to report savings
	    }
	  }
	},
	
	processhtml: {
	  dist: {
	    files: {
	      'dist/email.html': ['boilerplate.html']
	    }
	  }
	},
	
	premailer: {
	  main: {
	    options: {
	      verbose: true
	    },
	    files: {
	      'dist/email-inline.html': ['dist/email.html']
	    }
	  }
	}, 
	
	// Compile Less
	// Compile the less files
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          process: function(content, path) {
          	return grunt.template.process(content);
          }
        },
        files: {
          "css/custom_newsletter.css": "less/style.less", // destination file and source file
        }
      }
    },
  
	// WATCHER / SERVER

	// Watch
	watch: {
		less: {
			files: ['less/**/*.less'], // which files to watch
			tasks: ['less'],
			options: {
				// livereload: true
			},
		},
		
		css: {
			files: ['**/*.css', '*.css', '!node_modules/**/*', '!bower_components/**/*'],
			tasks: [],
			options: {
				livereload: true
			}
		},
	}
  
  });


  grunt.registerTask('email', ['less', 'uncss', 'processhtml', 'premailer']);

};

