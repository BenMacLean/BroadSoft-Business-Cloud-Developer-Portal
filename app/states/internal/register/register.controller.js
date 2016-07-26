(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('internal.register', {
      url: '/register',
      templateUrl: 'states/internal/register/register.template.html',
      resolve: {},
      controller: 'registerCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('registerCtrl', function ($location, $http, $scope, $rootScope, $state, constants, $sessionStorage, cookies, $validation) {
    $scope.form = {
      submit: function (form) {
        $validation.validate(form)
        .success($scope.success)
        .error($scope.error);
      }
    };
    $scope.success = function (message) {
      $scope.registerApplication();
    };

    $scope.error = function (message) {
      alert('Error ' + message);
    };
    $scope.registerApplication = function () {
      //Set the values the user did not set
      var base64Image = $scope.registeredApp.iconFont.base64;
      $scope.registeredApp.svgIcon = base64Image;
      $scope.registeredApp.iconFont = base64Image;
      $scope.registeredApp.version = 2;
      $scope.registeredApp.apiVersion = 1;
      $scope.registeredApp.name = $scope.registeredApp.name.replace(' ', '-');
      $scope.registeredApp.title = $scope.registeredApp.name;
      $scope.registeredApp.isPublic = ($scope.registeredApp.isPublic === "true");
      var credsString = '?id=' + cookies.get('email') + '&xsp=' + cookies.get('xsp') + '&pwd=' + cookies.get('password');
      $http.post(constants.data.hubUrl + '/createRegisteredApp' + credsString, $scope.registeredApp).then(function (createdApp) {
        console.log("Your application was created,", createdApp);
        $state.go('internal.sandbox');
      }, function (err) {
        $scope.registeredApp.isPublic = $scope.registeredApp.isPublic.toString();
        console.log("error in creation", err);
        if (err.data && err.data.invalidAttributes && err.data.invalidAttributes.name) {
          $scope.error = err.data.invalidAttributes.name[0].message;
        }
      });
    };
  });
})();
