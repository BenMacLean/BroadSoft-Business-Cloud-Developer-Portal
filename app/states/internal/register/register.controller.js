(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('internal.register', {
      url: '/register',
      templateUrl: 'states/internal/register/register.template.html',
      resolve: {
        constants: function ($http) {
          return $http.get('/constants').then(function (constants) {
            return constants;
          });
        }
      },
      controller: 'registerCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('registerCtrl', function ($location, $http, $scope, $rootScope, $state, constants) {
    console.log("constants", constants.data.hubUrl);
    $scope.registeredApp = {};
    $scope.registerApplication = function () {
      console.log($scope.registeredApp.$valid);
      $http.post(constants.data.hubUrl + '/createRegisteredApp?id=' + $rootScope.email + '&pwd=' + $rootScope.password + '&xsp=' + $rootScope.urls[0], $scope.registeredApp, function (createdApp) {
        console.log("Your application was created,", createdApp);
        $state.go('internal.sandbox');
      });


    }
  });
})();
