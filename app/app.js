(function () {
  'use strict';

  angular.module('hubDeveloperPortal', [
    'ngRoute', 'ui.router', 'validation', 'validation.rule', 'ngStorage','ngCookies', 'colorpicker.module','naif.base64','mdo-angular-cryptography'
  ]).config(['$validationProvider','$cryptoProvider', function($validationProvider,$cryptoProvider) {
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
    $cryptoProvider.setCryptographyKey('MnQm6Duclm');
  }]).run(function($rootScope, $location, $anchorScroll) {
  //when the route is changed scroll to the proper element.
    $rootScope.$on('$stateChangeSuccess', function(newRoute, oldRoute) {
      console.log("success",$location.hash());
      // if($location.hash()){
      //   $anchorScroll();
      // }
    });
  });

  angular.module('hubDeveloperPortal').config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  });
})();
