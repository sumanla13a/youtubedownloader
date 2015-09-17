'use strict';
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 3000});

server.route({
  method: 'GET',
  path: '/',
  handler: function(req, res) {
    res('hello world');
  }
})

server.route({
  method: 'POST',
  path: '/postLink',
  handler: function (req, res) {
    var pix = req.payload.pix;
    var youlink = req.payload.youlink;
    var vidtype = req.payload.vidtype;
    var command = 'youtube-dl -o \"~/%(title)s.%(ext)s\" ';
    if('video' === vidtype) {
      command = command + youlink + ' '
    }
    var quality;
    if(pix) {
      switch(pix) {
        case 'audio':
          quality= 140;
          break;
        case 240:
          quality= 133;
          break;
        case 360:
          quality= 134;
          break;
        case 480:
          quality= 135;
          break;
        case 720:
          quality= 136;
          break;
        case 1080:
          quality= 137;
          break;
        case 'best':
          quality= 22;
          break;
        default:
          quality=22;
      }

      command = command + '-f ' + quality;
    }

    console.log(command)
    var sys = require('sys')
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec(command, puts);
    // res('hahha')
  }
})

server.start(function() {
  console.log('Your server has started at ', server.info.uri)
})