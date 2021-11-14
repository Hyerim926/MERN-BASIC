const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', //기존 3000번에서 5000번으로 제공함
      changeOrigin: true,
    })
  );
};