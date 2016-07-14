module.exports = {
  models: {
    connection: 'localDiskDb',
    migrate: 'alter'
  },
  port: 443,
  ssl : {
    key:  require('fs').readFileSync(process.env['HOME'] + '/secure/server.key'),
    cert: require('fs').readFileSync(process.env['HOME'] + '/secure/server.crt'),
  }
};
