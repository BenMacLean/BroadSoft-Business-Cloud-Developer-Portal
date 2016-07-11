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

  angular.module('hubDeveloperPortal').controller('registerCtrl', function($location, $http, $scope) {
    $scope.registeredApp = {};
    $scope.registerApplication = function(){
      console.log($scope.registeredApp);
    }
  });
})();
