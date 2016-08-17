module.exports = function(grunt) {
  grunt.config.set('sass', {
    build: {
      files: [{
        expand: true,
        cwd: 'app/styles',
        src: [ '**/*.scss' ],
        dest: '.tmp/public/styles',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
