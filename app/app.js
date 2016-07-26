(function () {
  'use strict';

  angular.module('hubDeveloperPortal', [
    'ngRoute', 'ui.router', 'validation', 'validation.rule', 'ngStorage', 'ngCookies', 'colorpicker.module', 'naif.base64', 'ngDialog'
  ]).config(['$validationProvider', function ($validationProvider) {
    var defaultMsg;
    defaultMsg = {
      url: {
        error: 'Invalid url',
        success: ''
      },
      required: {
        error: 'This is a required field',
        success: ''
      },
      email: {
        error: 'This is an invalid email',
        success: ''
      }
    };
    $validationProvider.setDefaultMsg(defaultMsg);
    $validationProvider.setErrorHTML(function (msg, element, attrs) {
        return '<p class="invalid">' + msg + '</p>';
    });
  }]).run(function ($rootScope, $location, $anchorScroll) {
    //when the route is changed scroll to the proper element.
    $rootScope.$on('$stateChangeSuccess', function (newRoute, oldRoute) {
      console.log("success", $location.hash());
      // if($location.hash()){
      //   $anchorScroll();
      // }
    });
  });

  angular.module('hubDeveloperPortal').config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  });
})();
