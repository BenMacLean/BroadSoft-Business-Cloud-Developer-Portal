(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function($stateProvider) {
    $stateProvider.state('internal.sandbox', {
      url: '/sandbox',
      templateUrl: 'states/internal/sandbox/sandbox.template.html',
      resolve: {},
      controller: 'sandboxCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('sandboxCtrl', function($location, $http, $scope, cookies, $sce) {
    console.log('sandbox controller');

    var credsString = 'id=' + cookies.get('email') + '&xsp=' + cookies.get('xsp') + '&pwd=' + cookies.get('password');

    $scope.microApps = $sce.trustAsResourceUrl('https://hub-sandbox.broadsoftlabs.com:8443/app/internal/settings?' + credsString);
    $scope.notifications = $sce.trustAsResourceUrl('https://hub-sandbox.broadsoftlabs.com:8443/app/notifications?' + credsString);
    $scope.contextual = $sce.trustAsResourceUrl('https://hub-sandbox.broadsoftlabs.com:8443/app/contextual?' + credsString);
    $scope.google = 'http://google.com';

    $scope.requestNotifications = function(){

    }
  });
})();
