(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('docs', {
      url: '/docs',
      templateUrl: 'states/docs/docs.html',
      resolve: {},
      controller: 'docsCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('docsCtrl', function ($scope, $rootScope, $http, $state,$sessionStorage, cookies,$location,$anchorScroll) {
    console.log("I am in the docs ctrl");
    $scope.login = function () {
      $sessionStorage.urls = [
        'https://xsp2.broadsoftlabs.com',
        'https://xsp1.broadsoftlabs.com',
        'https://xsp.broadsoftlabs.com'
      ];

      var makeRequest = function (url) {
        return $http.get('/user/login?id=' + $scope.email + '&pwd=' + $scope.password + '&xsp=' + url).then(function (response) {
          cookies.set('xsp', url);
          cookies.set('email', $scope.email);
          cookies.set('password', $scope.password);
          return $state.go('internal.appsList');
        }, function (error) {
          throw error;
        });
      };
      makeRequest($sessionStorage.urls[0]).catch(function (err) {
        makeRequest($sessionStorage.urls[1]).catch(function (err) {
          makeRequest($sessionStorage.urls[2]).catch(function (err) {
            throw err;
          });
        });
      });
      var jumpToLocation = function(key){
        console.log("key",key);
        $location.hash(key);
        $anchorScroll();
      };
      jumpToLocation('settings');
    };
  });
})();
