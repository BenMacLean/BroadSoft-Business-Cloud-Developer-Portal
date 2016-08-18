(function () {
  'use strict';

  angular.module('hubDeveloperPortal').directive('comingSoon', function() {
    return {
      scope: {
        label: '=label',
        value: '=value',
        model: '=model'
      },
      templateUrl: '/directives/comingSoon/comingSoon.html'
    };
  });
})();
