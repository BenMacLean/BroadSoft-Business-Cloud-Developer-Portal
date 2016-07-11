module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
    'annotate',
		'uglify',
		'cssmin',
		'sails-linker:prodJs',
		'sails-linker:prodStyles',
		'sails-linker:prodJsJade',
		'sails-linker:prodStylesJade'
	]);
};
