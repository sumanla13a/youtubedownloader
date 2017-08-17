"use strict";
var root    = process.cwd();
var path    = require('path');
var exec = require('child_process').exec;

var Controller = {
	download: function (req, res) {
	    var pix = req.payload.pix;
	    var youlink = req.payload.youlink;
	    var command = ['youtube-dl', youlink];

	    var quality;
	    if('audio' === pix) {
	     command = command.concat(['-o', path.join(root + '"/tmp/tmpAudio/%(title)s.%(ext)s"'), '--extract-audio', '--audio-format',  'mp3']);
	    }
	    else {
	      command = command.concat(['-o', path.join(root + '"/tmp/tmpVideo/%(title)s.%(ext)s"')]);
	      switch(pix) {
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
	          quality=134;
	      }
	      command = command.concat(['-f', quality]);
	    }
	      
	    function puts(error, er) {
	      console.log(er);
	      console.log(typeof(er)); 
	      if(error) {
	        console.log(error);
	        return res(new Error('Sorry couldn\'t process your video'));
	      }
	      return res('Check your Videos directory after a while. It should be downloaded there');
	    }
	    exec(command.join(" "), puts);
	},

	getQuality: function(req, res) {
		var youlink = req.payload.youlink;
		var command = 'youtube-dl -F ' + youlink;
		exec(command, function(err, res, pon) {
			console.log(err);
			console.log('err done');
			console.log(res);
			console.log('std res');
			console.log(pon);
			console.log('stdError');

		});
	}
};

module.exports = Controller;
