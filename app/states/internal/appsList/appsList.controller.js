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


    $scope.makeServerRequest = function (path,type) {
      var requestParams = {
        hubLoginToken : cookies.get('hubLoginToken')
      };
      var requestUrl = constants.data.hubUrl + path;
      if(type === "delete"){
        requestUrl += "?hubLoginToken=" + cookies.get('hubLoginToken');
      }
      return $http[type](requestUrl,requestParams).then(function (response) {
        return response;
      });
    };

    $scope.makeServerRequest('/user/apps','post').then(function (userApps) {
      $scope.isLoading = false;
      $scope.userApps = userApps.data;
    });

    $scope.deleteApp = function (appName) {
      $scope.makeServerRequest('/app/'+appName,'delete').then(function (userApps) {
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
