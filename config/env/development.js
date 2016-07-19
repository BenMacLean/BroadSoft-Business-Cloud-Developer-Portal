module.exports = {
  models: {
    connection: 'localDiskDb',
    migrate: 'alter'
  },

  port: 1360,
  constants: {
    hubUrl: 'http://localhost:1338'
  }
};
