(function () {
  'use strict';

  angular.module('hubDeveloperPortal').service('cookies', function ($cookies,$http,$q) {
    var service = {};
    var oneYearFromNow = new Date();
    oneYearFromNow.setTime(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);

    service.set = function (key, value) {
      var opts = {};
      opts.expires = oneYearFromNow;
      return $cookies.put('hubSandbox_' + key, value, opts);
    };

    service.get = function (key) {
      var deffered = $q.defer();
      if(key === 'email' || key === 'password'){
        var value = service.decrypt($cookies.get('hubSandbox_' + key)).then(function (decrypted) {
          return decrypted;
        });
        deffered.resolve(value);
      }else{
        deffered.resolve($cookies.get('hubSandbox_' + key));
      }
      return deffered.promise;
    };
    service.decrypt = function (value) {
      return $http.get("/decrypt?value="+value).then(function (response) {
        return response.data;
      });
    };

    return service;
  });
})();
