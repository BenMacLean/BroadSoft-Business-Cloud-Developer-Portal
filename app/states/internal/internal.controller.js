(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function($stateProvider) {
    $stateProvider.state('internal', {
      url: '/internal',
      templateUrl: 'states/internal/internal.template.html',
      resolve: {},
      controller: 'internalCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('internalCtrl', function($location, $http, $scope) {


    return 12;
  });
})();
