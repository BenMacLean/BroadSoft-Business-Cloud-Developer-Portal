(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('useCases', {
      url: '/useCases',
      templateUrl: 'states/useCases/useCases.html',
      resolve: {
        constants: function ($http) {
          return $http.get('/constants').then(function (constants) {
            return constants;
          });
        }
      },
      controller: 'useCasesCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('useCasesCtrl', function ($scope, $rootScope, $http, $state,$sessionStorage, cookies,constants, $cookies) {



  });
})();
