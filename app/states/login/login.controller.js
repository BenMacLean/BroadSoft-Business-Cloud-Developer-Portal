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

  angular.module('hubDeveloperPortal').controller('loginCtrl', function ($scope, $rootScope, $http, $state,$sessionStorage, cookies) {

    // //TODO REMOVE FOR PROD
    // $scope.email = 'jon.staging@broadsoftlabs.com';
    // $scope.password = 'password';

    $scope.login = function () {
      $sessionStorage.urls = [
        'https://xsp2.broadsoftlabs.com',
        'https://xsp1.broadsoftlabs.com',
        'https://xsp.broadsoftlabs.com'
      ];

      var attemptUserLogin = function (url) {
        return $http.get('/user/login?id=' + $scope.email + '&pwd=' + $scope.password + '&xsp=' + url).then(function (response) {
          cookies.set('xsp', url);
          cookies.set('email', $scope.email);
          cookies.set('password', $scope.password);
          $rootScope.internal = true;
          return $state.go('internal.appsList');
        }, function (error) {
          $scope.loginError = "The username/password is invalid";
          throw error;
        });
      };

      attemptUserLogin($sessionStorage.urls[0]).catch(function (err) {
        attemptUserLogin($sessionStorage.urls[1]).catch(function (err) {
          attemptUserLogin($sessionStorage.urls[2]).catch(function (err) {
            throw err;
          });
        });
      });

    };
  });
})();
