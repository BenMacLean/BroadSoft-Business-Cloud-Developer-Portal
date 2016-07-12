(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'states/login/login.template.html',
      resolve: {},
      controller: 'loginCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('loginCtrl', function ($scope,$rootScope, $http, $state, Auth) {
    $scope.testAngular = function () {
      $scope.myVar = 'Hello World Angular!';
    };
    $scope.login = function () {
      console.log('email', $scope.email);
      console.log('password', $scope.password);
      var urls = [
        'https://xsp2.broadsoftlabs.com',
        'https://xsp1.broadsoftlabs.com',
        'https://xsp.broadsoftlabs.com'
      ];
      Auth.setCredentials($scope.email, $scope.password, urls[0]);
      $http.get('/user/login?id=' + $scope.email + '&pwd='+$scope.password+'&xsp='+urls[0]).then(function (response) {
        $state.go('internal.register');
      }, function (error) {
        throw error;
      });
    };
  });
})();
