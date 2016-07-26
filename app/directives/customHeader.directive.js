(function () {
  'use strict';

  angular.module('hubDeveloperPortal').directive('customHeader', function(ngDialog) {
    return {
      templateUrl: '/directives/customHeader.template.html',
      scope: {
        internal: '=internal'
      },
      link: function($scope, element, attrs){
        $scope.contactUsModal = function(){
          ngDialog.open({ template: '/assets/templates/contactUs.help.html', className: 'ngdialog-theme-default' });
        }
      }
    };
  });
})();
