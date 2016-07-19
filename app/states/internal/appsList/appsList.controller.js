(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function ($stateProvider) {
    $stateProvider.state('internal.appsList', {
      url: '/appsList',
      templateUrl: 'states/internal/appsList/appsList.template.html',
      resolve: {},
      controller: 'appsListCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('appsListCtrl', function ($location, $http, $scope, cookies, $sce, $sessionStorage, constants) {
    console.log('appsList controller');
    $scope.userApps = [];

    $scope.user = cookies.get('email');
    $scope.makeServerRequest = function (path, params) {
      var credsString = '?id=' + cookies.get('email') + '&xsp=' + cookies.get('xsp') + '&pwd=' + cookies.get('password');
      var getRequest = constants.data.hubUrl + path + credsString;
      if (params) {
        getRequest = getRequest + '&' + params;
      }
      return $http.get(getRequest).then(function (response) {
        return response;
      });
    };
    $scope.makeServerRequest('/getUserApps').then(function (userApps) {
      $scope.userApps = userApps.data;
    });


    $scope.requestNotifications = function () {

    }
    $scope.deleteApp = function (appName) {
      var params='appName='+appName;
      $scope.makeServerRequest('/deleteRegisteredApp', params).then(function (userApps) {
        // console.log(userApps);
        $scope.removeAppFromList(appName);
      });

    },
    $scope.removeAppFromList = function (appName) {
      $scope.userApps.map(function (userApp,index) {
        if(userApp.name === appName){
          $scope.userApps.splice(index);
        }
      });
    };

  });
})();