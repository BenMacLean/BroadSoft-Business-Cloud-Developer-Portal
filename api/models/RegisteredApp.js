module.exports = {
  attributes: {
    name:{
      type: 'string',
      required: true,
      primaryKey: true
    },
    title:{
      type: 'string',
      required: true
    },
    iconFont:{
      type: 'string',
      required: true
    },
    color:{
      type: 'string',
      required: true
    },
    approved:{
      type: 'boolean',
      defaultsTo: false
    },
    nonMicroApp:{
      type: 'boolean',
      defaultsTo: false
    },
    nonContextual:{
      type: 'boolean',
      defaultsTo: false
    },
    nonNotifications:{
      type: 'boolean',
      defaultsTo: false
    },
    nonNotificationsCount:{
      type: 'boolean',
      defaultsTo: false
    },
    contextProvider:{
      type: 'string',
      defaultsTo: undefined
    },
    iframeUrl:{
      type: 'string',
      required: true
    },
    appAdminEmail:{
      type: 'string',
      required: true
    },
    tags:{
      type: 'array'
    },
    linkedApps:{
      type: 'array'
    },
    version: {
      type: 'integer',
      defaultsTo: 1
    },
    type: {
      type: 'string'
    },
    isPublic: {
      type: 'boolean',
      defaultsTo: false
    },
    apiVersion: {
      type: 'integer'
    },
    heartbeatIntervalMs: {
      type: 'integer',
      defaultsTo: 0
    },
    isExternalApplication: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};