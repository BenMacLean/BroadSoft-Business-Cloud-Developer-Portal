(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('internal.editApp', {
      url: '/editApp?appName',
      templateUrl: 'states/internal/editApp/editApp.html',
      resolve: {},
      controller: 'editAppCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('editAppCtrl', function ($location, $http, $scope, $rootScope, $state, constants, $sessionStorage, $stateParams, cookies) {
    var params = {
      hubLoginToken:cookies.get('hubLoginToken')
    };
    $scope.user = cookies.get('email');
    $scope.registeredApp = {};
    $http.post(constants.data.hubUrl + '/user/app/' + $stateParams.appName,params).then(function (userApp) {
      $scope.registeredApp = userApp.data;
      $scope.registeredApp.appName = $scope.registeredApp.name;
    });
    $scope.updateApplication = function () {
      $scope.registeredApp.hubLoginToken = cookies.get('hubLoginToken');
      $http.put(constants.data.hubUrl + '/user/app/'+ $scope.registeredApp.appName, $scope.registeredApp).then(function (updatedApp) {
        console.log("Your application was updated,", updatedApp);
        $state.go('internal.appsList');
      });
    };
  });
})();
