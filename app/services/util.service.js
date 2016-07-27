(function () {
  'use strict';

  angular.module('hubDeveloperPortal').service('util', function (cookies) {
    var service = {};
    service.populateCredsString = function(){
      return cookies.get('email').then(function (email) {
        return cookies.get('xsp').then(function (xsp) {
          return cookies.get('password').then(function (password) {
            return '?id=' + email + '&xsp=' + xsp + '&pwd=' + password;
          });
        });
      });
    };
    return service;
  });
})();
