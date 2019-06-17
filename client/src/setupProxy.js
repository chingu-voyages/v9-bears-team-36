const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/relief', { target: 'http://localhost:4000' }));
};
