const log4js = require('log4js');

// config
log4js.configure({
  appenders: {
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' }
  }
});

module.exports = log4js.getLogger('default');