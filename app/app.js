(function () {
  'use strict';

  angular.module('hubDeveloperPortal', [
    'ngRoute', 'ui.router', 'validation', 'validation.rule', 'ngStorage','ngCookies', 'colorpicker.module'
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
