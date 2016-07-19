(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function($stateProvider) {
    $stateProvider.state('internal.register', {
      url: '/register',
      templateUrl: 'states/internal/register/register.template.html',
      resolve: {},
      controller: 'registerCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('registerCtrl', function($location, $http, $scope, $state) {
    $scope.registeredApp = {};
    $scope.registerApplication = function(){
      console.log($scope.registeredApp);
      $scope.registeredApp.svgIcon = $scope.registeredApp.iconFont.base64;
      delete $scope.registeredApp.iconFont;
      console.log($scope.registeredApp);
      $http.post('/createRegisteredApp', $scope.registeredApp, function(createdApp){
        console.log("Your application was created,", createdApp);
      });

      $state.go('internal.sandbox');
    }
  });
})();
