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

restService.post('/turnlightson', function(req, res) {
    var speech = "Lights are turned on now.";
    
	request.get(
			"https://ps.pndsn.com/publish/pub-c-7e402782-cf0c-44b9-a1ea-1fc85de8950b/sub-c-daf1bbd2-3d74-11e7-b6fd-02ee2ddab7fe/0/Channel-ekigfo5xv/myCallback/%7B%22text%22%3A%22lightson%22%7D?store=0&uuid=db9c5e39-7c95-40f5-8d71-125765b6f561",
			function(error, res2, body) {
				if (!error && res2.statusCode == 200) {
					console.log(body)
				} else {
					console.log('Error:' + error + 'Body: ' + body);
				}
			}
		);
	
	return res.json({
        speech: speech,
        displayText: speech,
        source: 'LIFXHari'
    });
});

restService.post('/turnlightsoff', function(req, res) {
    var speech = "Lights are turned off now.";
    
	request.get(
			"https://ps.pndsn.com/publish/pub-c-7e402782-cf0c-44b9-a1ea-1fc85de8950b/sub-c-daf1bbd2-3d74-11e7-b6fd-02ee2ddab7fe/0/Channel-ekigfo5xv/myCallback/%7B%22text%22%3A%22lightsoff%22%7D?store=0&uuid=db9c5e39-7c95-40f5-8d71-125765b6f561",
			function(error, res2, body) {
				if (!error && res2.statusCode == 200) {
					console.log(body)
				} else {
					console.log('Error:' + error + 'Body: ' + body);
				}
			}
		);
	
	return res.json({
        speech: speech,
        displayText: speech,
        source: 'LIFXHari'
    });
});


restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
