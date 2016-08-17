(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'states/home/home.template.html',
      resolve: {
        constants: function ($http) {
          return $http.get('/constants').then(function (constants) {
            return constants;
          });
        }
      },
      controller: 'homeCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('homeCtrl', function ($scope, $rootScope, $http, $state,$sessionStorage, cookies,constants, $cookies) {

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
        // return $http.post('/user/login?id=' + $scope.email + '&pwd=' + $scope.password + '&xsp=' + url).then(function (response) {
        var params = {
          id:$scope.email,
          pwd:$scope.password,
          xsp:url
        };
        return $http.post(constants.data.hubUrl+'/v1/user/login',params).then(function (response) {
          cookies.set('hubLoginToken', response.data.hubLoginToken);
          cookies.set('xsp', url);
          cookies.set('email', $scope.email);
          cookies.set('password', $scope.password);
          return $state.go('internal.appsList');
        }, function (error) {
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
