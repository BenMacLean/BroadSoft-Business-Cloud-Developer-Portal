module.exports = {
  models: {
    connection: 'localDiskDb',
    migrate: 'alter'
  },

  port: 1360
  // ssl : {
  //   key:  require('fs').readFileSync(process.env['HOME'] + '/secure/server.key'),
  //   cert: require('fs').readFileSync(process.env['HOME'] + '/secure/server.crt'),
  // }
};
