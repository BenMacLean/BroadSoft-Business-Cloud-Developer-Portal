(function () {
  'use strict';

  angular.module('hubDeveloperPortal').config(function($stateProvider) {
    $stateProvider.state('internal.sandbox', {
      url: '/sandbox',
      templateUrl: 'states/internal/sandbox/sandbox.template.html',
      resolve: {},
      controller: 'sandboxCtrl'
    });
  });

  angular.module('hubDeveloperPortal').controller('sandboxCtrl', function($location, $http, $scope, cookies, $sce, constants, ngDialog) {
    console.log('sandbox controller'); 
    var credsString = 'id=' + cookies.get('email') + '&xsp=' + cookies.get('xsp') + '&pwd=' + cookies.get('password');

    $scope.email = 'jodonnell@broadsoft.com';
    $scope.phoneNumber = '15554443333';
    $scope.pushNotificationRequested = false;

    $scope.username = 'jodonnell@broadsoft.com';
    $scope.app = 'gMail';
    $scope.appdata = '{"emailAddress": "'+$scope.username+'"}';

    var baseUrl = constants.data.hubUrl;

    $scope.microApps = $sce.trustAsResourceUrl(baseUrl + '/app/internal/settings?' + credsString);
    $scope.notifications = $sce.trustAsResourceUrl(baseUrl + '/app/notifications?' + credsString);
    $scope.contextual = $sce.trustAsResourceUrl(baseUrl + '/app/contextual?' + credsString);
    $scope.google = 'http://google.com';

    var otherUserData = {
      "type":"tab",
      "subtype":"tabOpened",
      "contextId": $scope.email,
      "contextBwId":"",
      "bwId":"jon.dev",
      "user_profile":{
        "jid":"jon.dev@broadsoftlabs.com/ucone-communicator_1.2.9.21(mac-x86-64)-385f5676acf394232c55873eb14d24b1",
        "name":"dev, jon",
        "addr":{
          "street":"",
          "city":"",
          "state":"",
          "country":"",
          "postal":""
        },
        "email":"",
        "phone":"+12027489882",
        "avatar":""
      },
      "buddy_profile":{
        "jid": $scope.email,
        "name":$scope.email,
        "addr":{
          "street":"",
          "city":"",
          "state":"",
          "country":"",
          "postal":""
        },
        "email":"",
        "phone": $scope.phoneNumber,
        "avatar":""
      }
    };

    $scope.requestNotifications = function(){

    };
    $scope.pushNotification = function(){

      // This case is tailored for a gMail push notifications
      // It won't work with any other application
      var dataToEncode = $scope.appdata;

      // gMail push notifications comes in base64 encoding
      dataToEncode = window.btoa(dataToEncode);
      var data = {
         message:{
           data: dataToEncode
         }
      };

      if($scope.app && $scope.username && dataToEncode){
        var url = baseUrl.toString() + "/v1/"+$scope.app+"/"+$scope.username+"/push";
        $http({
          method: 'POST',
          url: url,
          data: data
        });
      }
    };
    $scope.getContextualUser = function(){
      // var email = $scope.email;
      // var phoneNumber = $scope.phoneNumber;
      var iframeWin = document.getElementById("contextual-iframe").contentWindow;
      iframeWin.postMessage('message', baseUrl.toString());

      iframeWin.postMessage(otherUserData, baseUrl.toString());
    };

    $scope.$on('$viewContentLoaded', function() {
      console.error('get contextual');
      $scope.getContextualUser();
    });

    
  });
})();

