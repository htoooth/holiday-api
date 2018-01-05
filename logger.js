const log4js = require('log4js');

// config
log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: { type: 'file', filename: 'logs/log4jsconnect.log' }
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
    log4jslog: { appenders: ['file'], level: 'debug' }
  }
});

module.exports = log4js.getLogger('default');