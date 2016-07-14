(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function($stateProvider) {
    $stateProvider.state('internal.appsList', {
      url: '/appsList',
      templateUrl: 'states/internal/appsList/appsList.template.html',
      resolve: {},
      controller: 'appsListCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('appsListCtrl', function($location, $http, $scope, cookies, $sce,$sessionStorage,constants) {
    console.log('appsList controller');
    $scope.userApps = [];
    var credsString = 'id=' + cookies.get('email') + '&xsp=' + cookies.get('xsp') + '&pwd=' + cookies.get('password');
    $scope.user = cookies.get('email');
    $http.get(constants.data.hubUrl + '/getUserApps?' +credsString).then(function (userApps) {
      console.log("userApps",userApps);
      $scope.userApps = userApps.data;
    });

    $scope.requestNotifications = function(){

    }
  });
})();
