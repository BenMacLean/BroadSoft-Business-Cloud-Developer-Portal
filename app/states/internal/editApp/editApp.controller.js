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

  angular.module('hubDeveloperPortal').controller('editAppCtrl', function ($location, $http, $scope, $rootScope, $state, constants, $sessionStorage, $stateParams, cookies) {
    var credsString = 'id=' + cookies.get('email') + '&xsp=' + cookies.get('xsp') + '&pwd=' + cookies.get('password');
    $scope.user = cookies.get('email');
    $scope.registeredApp = {};
    $http.get(constants.data.hubUrl + '/getSingleApp?appName=' + $stateParams.appName + "&" + credsString).then(function (userApp) {
      $scope.registeredApp = userApp.data;
      $scope.registeredApp.appName = $scope.registeredApp.name;
      $scope.registeredApp.isPublic = $scope.registeredApp.isPublic.toString() ;
      console.log(userApp);
    });
    $scope.updateApplication = function () {
      $scope.registeredApp.isPublic = ($scope.registeredApp.isPublic === "true");
      console.log("$scope.registeredApp",$scope.registeredApp);
      $http.post(constants.data.hubUrl + '/updateApp?' + credsString, $scope.registeredApp).then(function (updatedApp) {
        console.log("Your application was updated,", updatedApp);
        $state.go('internal.appsList');
      });
    };
  });
})();
