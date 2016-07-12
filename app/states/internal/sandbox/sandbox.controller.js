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

  angular.module('hubDeveloperPortal').controller('sandboxCtrl', function($location, $http, $scope, $state) {
    console.log('sandbox controller');
  });
})();
