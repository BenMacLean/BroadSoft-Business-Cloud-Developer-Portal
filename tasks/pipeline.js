/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */

// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `app/styles/importer.less` instead.)
var cssFilesToInject = [
  'bower_components/ng-dialog/css/ngDialog.css',
  'bower_components/ng-dialog/css/ngDialog-theme-default.css',
  'styles/**/*.css'
];

// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [
  "bower_components/angular/angular.js",
  "bower_components/angular-ui-router/release/angular-ui-router.min.js",
  "bower_components/angular-cookies/angular-cookies.min.js",
  "bower_components/angular-route/angular-route.js",
  "bower_components/ngstorage/ngStorage.js",
  "bower_components/angular-validation/dist/angular-validation.js",
  "bower_components/angular-validation/dist/angular-validation-rule.js",
  "bower_components/underscore/underscore-min.js",
  "bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js",
  "bower_components/angular-base64-upload/dist/angular-base64-upload.js",
  "bower_components/ng-dialog/js/ngDialog.js",

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'app.js',
  'directives/**/*.js',
  'services/**/*.js',
  'states/**/*.js'
];

// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'states/**/*.html'
];

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'app/' + path;
});
