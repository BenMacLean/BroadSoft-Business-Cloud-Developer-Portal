var xsi = require('bdsft-sdk-xsi').xsi;

var connect = function(req) {
  var params = req.allParams();
  var token = params.token || params.xspLoginToken;
  var client = xsi.connect(params.id, params.pwd, token);
  sails.log.verbose('connect : ' + JSON.stringify(params));
  // use req.query.xsp if pwd is present : https://github.com/BroadsoftLabs/hubCore/issues/625
  if ((params.pwd || token) && params.xsp) {
    client.xspUrl = params.xsp;
  } else {
    var xsiSession = req.session.xsi || {};
    client.xspUrl = xsiSession.xspTarget || xsiSession.xsp || req.query.xsp;
    client.jsessionid = xsiSession.jsessionid;
  }
  return client;
};

module.exports = {
  userProfile: function(req) {
    var client = connect(req);
    var params = req.allParams();
    if (params.pwd || params.token || params.xspLoginToken) {
      // Do not use jsessionid if we have password or token
      client.jsessionid = null;
    }
    return client.userProfile().then(function(profile) {
      if (client.jsessionid) {
        req.session.xsi = {
          jsessionid: client.jsessionid,
          xsp: req.query.xsp || client.xspUrl,
          xspTarget: client.xspUrl
        };
      }
      profile.password = CryptoService.encrypt(params.pwd);
      profile.username = CryptoService.encrypt(params.id);
      return profile;
    }).catch(function(e) {
      delete req.session.xsi;
      throw e;
    });
  }
};
