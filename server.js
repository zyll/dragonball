var express = require('express')
  , serveIndex = require('serve-index')
  , path = require('path')
  , dir = path.join(__dirname, 'www');
express()
  .use('/', serveIndex(dir))
  .use(express.static(dir))
  .listen(3000);
