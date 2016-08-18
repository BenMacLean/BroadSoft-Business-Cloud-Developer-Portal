module.exports = {
  createRegisteredApp: function(req, res){
    var registeredApp = req.params.all();
    registeredApp.isExternalApplication = true;
    // start filling in some (presumably) backend set values
    registeredApp.apiVersion = 1;
    registeredApp.version = 2;
    registeredApp.approved = false;
    registeredApp.isExternal = true;
    // start parsing submitted values
    registeredApp.isPublic = (registeredApp.isPublic === "true") ? true : false;
    switch (registeredApp.applicationType) {
      // TODO: these are all wild guesses, fix this!
      case "all":
        registeredApp.nonMicroApp = false;
        registeredApp.nonContextual = false;
        registeredApp.nonNotifications = false;
        registeredApp.providesContext = true;
        break;
      case "context":
        registeredApp.nonMicroApp = true;
        registeredApp.nonContextual = false;
        registeredApp.nonNotifications = true;
        registeredApp.providesContext = true;
        break;
      case "microapp":
        registeredApp.nonMicroApp = false;
        registeredApp.nonContextual = true;
        registeredApp.nonNotifications = false;
        registeredApp.providesContext = false;
        break;
    }
    console.log(registeredApp);
    RegisteredApp.create(registeredApp).then(function(created){
      console.log(created);
      res.send(200);
    }).catch(function(error){
      console.log(error);
    });

  },
  redirect: function(req, res) {
    var query = require('url').parse(req.url).query || '';
    res.redirect('/#' + req.path + '?' + query);
  },
  checkAuth:function (req,res) {
    if(req.session.authenticated){
      return res.send(true);
    }
    return res.send(400,'Not authenticated');
  },
  constants:function (req,res) {
    return res.send(sails.config.constants);
  },
  decrypt:function (req,res) {
    var params = req.allParams();
    return res.send(CryptoService.decrypt(params.value));
  },
  encrypt:function (req,res) {
    var params = req.allParams();
    return res.send(CryptoService.encrypt(params.value));
  }
};
