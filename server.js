'use strict';
var Hapi = require('hapi');

var server  = new Hapi.Server();
var root    = process.cwd();
var path    = require('path');
var controller = require(path.join(root, 'Controller.js'));
server.connection({port: 3000});

server.route({
  method: 'GET',
  path: '/',
  handler: function(req, res) {
    res('hello world');
  }
});

server.route({
  method: 'POST',
  path: '/postLink',
  handler: controller.download
});

server.start(function() {
  console.log('Your server has started at ', server.info.uri);
});