(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('internal.register', {
      url: '/register',
      templateUrl: 'states/internal/register/register.template.html',
      resolve: {},
      controller: 'registerCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('registerCtrl', function ($location, $http, $scope, $rootScope, $state, constants, $sessionStorage, cookies) {
    console.log("constants", constants.data.hubUrl);

    //Test Data to be removed
    $scope.registeredApp = {
      iframeUrl: 'http://localhost:5430',
      appAdminEmail: 'joncodo@gmail.com',
      name: 'TriviaApp-' + Math.floor(Math.random() * (10000)),
      title: 'TestApp',
      applicationType: 'all',
      tags: ['files'],
      subTagLabel: 'Test Tag',
      isPublic: false
    };
    //^^ Test Data to be removed

    $scope.registerApplication = function(){
      //Set the values the user did not set
      var base64Image = $scope.registeredApp.iconFont.base64;
      $scope.registeredApp.svgIcon = base64Image;
      $scope.registeredApp.iconFont = base64Image;
      $scope.registeredApp.version = 2;
      $scope.registeredApp.apiVersion = 1;

      var credsString = '?id=' + cookies.get('email') + '&xsp=' + cookies.get('xsp') + '&pwd=' + cookies.get('password');
      $http.post(constants.data.hubUrl + '/createRegisteredApp' + credsString, $scope.registeredApp).then(function (createdApp) {
        console.log("Your application was created,", createdApp);
        $state.go('internal.sandbox');
      });
    };
  });
})();
