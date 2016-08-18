(function () {
  'use strict';

  angular.module('hubDeveloperPortal').service('cookies', function ($cookies,$http,$q) {
    var service = {};
    var oneYearFromNow = new Date();
    oneYearFromNow.setTime(new Date().getTime() + 1000 * 60 * 60 * 24 * 365);

    service.set = function (key, value) {
      var opts = {};
      opts.expires = oneYearFromNow;
      service.key = value;
      return service.encrypt(value).then(function (response) {
        return $cookies.put('hubSandbox_' + key, response, opts);
      });
    };

    service.get = function (key) {
      if(service['hubSandbox_'+key]){
        return service['hubSandbox_'+key];
      }
      return $cookies.get('hubSandbox_'+key);
    };
    service.getAll = function () {
      var allCookies = $cookies.getAll();
      Object.keys(allCookies).map(function (value) {
        service.decrypt($cookies.get(value)).then(function (response) {
          if(response){
            service[value] = response;
          }
        });
      });
    };
    service.decrypt = function (value) {
      return $http.get("/decrypt?value="+value).then(function (response) {
        return response.data;
      });
    };
    service.encrypt = function (value) {
      return $http.get("/encrypt?value="+value).then(function (response) {
        return response.data;
      });
    };
    service.getAll();
    return service;
  });
})();
