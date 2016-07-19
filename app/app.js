(function () {
  'use strict';

  angular.module('hubDeveloperPortal', [
    'ngRoute', 'ui.router', 'ngCookies', 'colorpicker.module', 'naif.base64'
  ]);

  angular.module('hubDeveloperPortal').config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  });
})();
