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

  angular.module('hubDeveloperPortal').controller('loginCtrl', function ($scope,$rootScope, $http, $state) {
    $scope.testAngular = function () {
      $scope.myVar = 'Hello World Angular!';
    };
    $scope.login = function () {
      var urls = [
        'https://xsp2.broadsoftlabs.com',
        'https://xsp1.broadsoftlabs.com',
        'https://xsp.broadsoftlabs.com'
      ];
      var makeRequest = function(url){
        return $http.get('/user/login?id=' + $scope.email + '&pwd='+$scope.password+'&xsp='+url).then(function (response) {
          return $state.go('internal.register');
        }, function (error) {
          throw error;
        });
      };
      makeRequest(urls[0]).catch(function(err){
        makeRequest(urls[1]).catch(function(err){
          makeRequest(urls[2]).catch(function(err){
            throw err;
          });
        });
      });

    };
  });
})();
