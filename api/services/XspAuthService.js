var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

module.exports = {
  authenticate: function (req, res) {
    var params = req.allParams();

    function authSuccess(profile) {
      req.session.xspProfile = profile;
      req.session.userId = params.id;
      req.session.xsp = params.xsp;
      req.session.authenticated = true;
      return res.send(profile);
    }

    function authFailed(error) {
      sails.log.error(params.id + ' : could not authenticate ' + params.xsp + ' : ' + error);
      var status = 403;
      try {
        var errorObj = JSON.parse(error);
        if (errorObj.status) {
          status = errorObj.status;
        }
      } catch (e) {}
      return res.send(status);
    }

    if (req.session.authenticated && (!params.id || params.id === req.session.userId)) {
      sails.log('xspAuth', 'I got the user who was previously authed');
    } else {
      req.session.authenticated = false;
      sails.log('I am now going to authenticate');
      XsiService.userProfile(req).then(authSuccess).catch(authFailed);
    }
  }
};
