(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function($stateProvider) {
    $stateProvider.state('internal', {
      url: '/internal',
      templateUrl: 'states/internal/internal.html',
      resolve: {
        constants: function ($http) {
          return $http.get('/constants').then(function (constants) {
            return constants;
          });
        }
      },
      controller: 'internalCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('internalCtrl', function($location, $http, $scope, ngDialog, $state,constants,cookies) {

    var requestParams = {
      hubLoginToken : cookies.get('hubLoginToken')
    };
    console.log("requestParams",requestParams);
    $http.post(constants.data.hubUrl+'/user/login',requestParams).then(function (response) {
      console.log("response",response);
    },function(){
      //TODO uncomment this for live
      $state.go('login');
    });

    $scope.openHelpModal = function (templateName) {
      ngDialog.open({ template: templateName, className: 'ngdialog-theme-default' });
    };
  });
})();
