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
    $scope.registeredApp = {};
    $scope.registerApplication = function(){
      console.log($scope.registeredApp);
      $scope.registeredApp.svgIcon = $scope.registeredApp.iconFont.base64;
      delete $scope.registeredApp.iconFont;
      console.log($scope.registeredApp);
      var credsString = '?id=' + cookies.get('email') + '&xsp=' + cookies.get('xsp') + '&pwd=' + cookies.get('password');
      $http.post(constants.data.hubUrl + '/createRegisteredApp' + credsString, $scope.registeredApp).then(function (createdApp) {
        console.log("Your application was created,", createdApp);
        $state.go('internal.sandbox');
      });
    };
  });
})();
