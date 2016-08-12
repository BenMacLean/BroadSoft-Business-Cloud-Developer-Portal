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
    $scope.isLoading = true;


    $scope.makeServerRequest = function (path, params) {
      var credsString = '?hubLoginToken=' + cookies.get('hubLoginToken');
      var getRequest = constants.data.hubUrl + path +credsString;
      if (params) {
        getRequest = getRequest + '&' + params;
      }
      var req = {
       method: 'GET',
       url: getRequest,
       withCredentials: true
     };

      return $http(req).then(function (response) {
        return response;
      });
    };

    $scope.makeServerRequest('/getUserApps').then(function (userApps) {
      $scope.isLoading = false;
      $scope.userApps = userApps.data;
    });

    $scope.deleteApp = function (appName) {
      var params='appName='+appName;
      $scope.makeServerRequest('/deleteRegisteredApp', params).then(function (userApps) {
        $scope.removeAppFromList(appName);
      });

    };

    $scope.removeAppFromList = function (appName) {
      $scope.userApps.map(function (userApp,index) {
        if(userApp.name === appName){
          $scope.userApps.splice(index);
        }
      });
    };

  });
})();
