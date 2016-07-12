(function () {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('hubDeveloperPortal', [
    'ngRoute', 'ui.router','base64'
  ]);

  angular.module('hubDeveloperPortal').config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  });
})();
