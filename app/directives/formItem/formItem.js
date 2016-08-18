(function () {
  'use strict';

  angular.module('hubDeveloperPortal').directive('formItem', function() {
    return {
      scope: {
        label: '=label',
        value: '=value',
        model: '=model'
      },
      templateUrl: '/directives/formItem/formItem.html'
    };
  });
})();
