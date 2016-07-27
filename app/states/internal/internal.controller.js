(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function($stateProvider) {
    $stateProvider.state('internal', {
      url: '/internal',
      templateUrl: 'states/internal/internal.template.html',
      resolve: {
        constants: function ($http) {
          return $http.get('/constants').then(function (constants) {
            return constants;
          });
        },
        credString: function (util) {
          return util.populateCredsString();
        }
      },
      controller: 'internalCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('internalCtrl', function($location, $http, $scope, ngDialog, $state) {
    $http.get('/util/checkAuth').then(function (response) {
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
