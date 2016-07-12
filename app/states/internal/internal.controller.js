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

  angular.module('hubDeveloperPortal').controller('internalCtrl', function($location, $http, $scope, $state) {
    $http.get('/util/checkAuth').then(function (response) {
      console.log("response",response);
    },function(err){
      $state.go('login');
    });
    return 12;
  });
})();
