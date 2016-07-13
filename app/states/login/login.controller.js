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

  angular.module('hubDeveloperPortal').controller('loginCtrl', function ($scope, $rootScope, $http, $state) {
    $scope.testAngular = function () {
      $scope.myVar = 'Hello World Angular!';
    };
    $scope.login = function () {
      $rootScope.urls = [
        'https://xsp2.broadsoftlabs.com',
        'https://xsp1.broadsoftlabs.com',
        'https://xsp.broadsoftlabs.com'
      ];
      $rootScope.email = $scope.email;
      $rootScope.password = $scope.password;
      var makeRequest = function (url) {
        return $http.get('/user/login?id=' + $scope.email + '&pwd=' + $scope.password + '&xsp=' + url).then(function (response) {
          return $state.go('internal.register');
        }, function (error) {
          throw error;
        });
      };
      makeRequest($rootScope.urls[0]).catch(function (err) {
        makeRequest($rootScope.urls[1]).catch(function (err) {
          makeRequest($rootScope.urls[2]).catch(function (err) {
            throw err;
          });
        });
      });

    };
  });
})();
