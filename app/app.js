(function () {
  'use strict';

  angular.module('hubDeveloperPortal', [
    'ngRoute', 'ui.router', 'ngCookies', 'colorpicker.module'
  ]);

  angular.module('hubDeveloperPortal').config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  });
})();
