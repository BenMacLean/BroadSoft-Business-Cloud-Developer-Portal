(function () {
  'use strict';

  angular.module('hubDeveloperPortal', [
    'ngRoute', 'ui.router', 'ngCookies'
  ]);

  angular.module('hubDeveloperPortal').config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  });
})();
