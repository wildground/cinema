var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'cinema'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://ryan:123bbb@ryanseceat.xin:27017/cinema',
  },

  test: {
    root: rootPath,
    app: {
      name: 'cinema'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://ryan:123bbb@ryanseceat.xin:27017/cinema',
  },

  production: {
    root: rootPath,
    app: {
      name: 'cinema'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://ryan:123bbb@ryanseceat.xin:27017/cinema',
  }
};

module.exports = config[env];
