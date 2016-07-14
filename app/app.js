(function () {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('hubDeveloperPortal', [
    'ngRoute', 'ui.router', 'validation', 'validation.rule', 'ngStorage'
  ]).config(['$validationProvider', function($validationProvider) {
    var defaultMsg;
    defaultMsg = {
      url: {
        error: 'Invalid url',
        success: ''
      },
      required: {
        error: 'This is a required field',
        success: ''
      }
    };
    $validationProvider.setDefaultMsg(defaultMsg);
  }]);

  angular.module('hubDeveloperPortal').config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  });
})();
