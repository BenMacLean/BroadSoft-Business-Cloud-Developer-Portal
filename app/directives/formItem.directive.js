(function () {
  'use strict';

  angular.module('hubDeveloperPortal').directive('formItem', function() {
    return {
      scope: {
        label: '=label',
        value: '=value'
      },
      templateUrl: '/directives/formItem.template.html'
    };
  });
})();
