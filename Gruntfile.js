module.exports = function(grunt) {
  grunt.initConfig({
    watch :{
      scripts :{
        files : ['example/**/*.*'],
        options : {
          livereload : 9090,
        }
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', []);  
};