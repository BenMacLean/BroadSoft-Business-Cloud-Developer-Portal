var crypto = require('crypto');
var constants = require('../../config/constants')
module.exports = {
  encrypt: function(text) {
    if (!text) {
      return text;
    }
    var cipher = crypto.createCipher(sails.config.constants.cryptoAlgorithm, sails.config.constants.cryptoPassword);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  decrypt: function(text) {
    if (!text) {
      return text;
    }
    var decipher = crypto.createDecipher(sails.config.constants.cryptoAlgorithm, sails.config.constants.cryptoPassword);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
};
