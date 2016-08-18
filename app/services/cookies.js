(function () {
  'use strict';

  angular.module('hubDeveloperPortal').service('cookies', function ($cookies) {
    var service = {};
    var oneYearFromNow = new Date();
    oneYearFromNow.setTime(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);

    service.set = function (key, value) {
      var opts = {};
      opts.expires = oneYearFromNow;
      return $cookies.put('hubSandbox_' + key, value, opts);
    };

    service.get = function (key) {
      return $cookies.get('hubSandbox_' + key);
    };

    return service;
  });
})();