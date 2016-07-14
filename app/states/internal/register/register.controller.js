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

  angular.module('hubDeveloperPortal').controller('registerCtrl', function ($location, $http, $scope, $rootScope, $state, constants,$sessionStorage) {
    console.log("constants", constants.data.hubUrl);
    $scope.registeredApp = {};
    $scope.registerApplication = function () {
      console.log("register was called");
      $http.post(constants.data.hubUrl + '/createRegisteredApp?id=' + $sessionStorage.email + '&pwd=' + $sessionStorage.password + '&xsp=' + $sessionStorage.urls[0], $scope.registeredApp).then(function (createdApp) {
        console.log("Your application was created,", createdApp);
        $state.go('internal.sandbox');
      });
    };
  });
})();
