'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());
var request = require('request');

restService.use(express.static(path.join(__dirname, 'public')));

restService.post('/lights', function(req, res) {
    var speech = "I don't recognize that command!";
    
   	var command = req.body.result.parameters.switch; 
   
  	var Pusher = require('pusher');
    var pusher = new Pusher({
      appId: '361237',
        key: '0151ce4ad689c3e80759',
        secret: 'c2f7c8cb60fcb1387638',
        cluster: 'us2',
        encrypted: true
    });

	if (command === 'on')
	{
	    pusher.trigger('channel-mirrormirror', 'lifx-event', {
        	"message": "lightson"       
    	},function(err,req,res){     
    		console.log('Error:' + err + 'Response: ' + res);
    	});

	    speech = "Lights are turned on now.";
	}
	else if (command === 'off')
	{
		pusher.trigger('channel-mirrormirror', 'lifx-event', {
        	"message": "lightsoff"       
    	},function(err,req,res){     
    		console.log('Error:' + err + 'Response: ' + res);
    	});

		speech = "Lights are turned off now.";
	}
	
	
	return res.json({
        speech: speech,
        displayText: speech,
        source: 'LIFXHari'
    });
});


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
