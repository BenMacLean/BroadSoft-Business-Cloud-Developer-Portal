module.exports = {
  createRegisteredApp: function(req, res){
    console.log(req.params.all());
    var registeredApp = req.params.all();
    registeredApp.isExternalApplication = true;
    RegisteredApp.create(registeredApp).then(function(created){
      console.log(created);
      res.send(200);
    });

  }
};

