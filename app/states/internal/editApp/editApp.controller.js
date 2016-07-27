(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('internal.editApp', {
      url: '/editApp?appName',
      templateUrl: 'states/internal/editApp/editApp.template.html',
      resolve: {},
      controller: 'editAppCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('editAppCtrl', function ($location, $http, $scope, $rootScope, $state, constants, $sessionStorage, $stateParams, cookies, credString) {
    $scope.user = cookies.get('email');
    $scope.registeredApp = {};
    $http.get(constants.data.hubUrl + '/getSingleApp?appName=' + $stateParams.appName + "&" + credString).then(function (userApp) {
      $scope.registeredApp = userApp.data;
    });
    $scope.updateApplication = function () {
      $http.post(constants.data.hubUrl + '/updateApp?' + credString, $scope.registeredApp).then(function (updatedApp) {
        console.log("Your application was updated,", updatedApp);
        $state.go('internal.appsList');
      });
    };
  });
})();
