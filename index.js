// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiApp;

let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json({
	type: 'application/json'
}));

// we comunicate with arduino with post requests
var request = require('request');

app.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'LIFXHari'
    });
});

app.post('/turnon', function(req, res) {
	const assistant = new Assistant({
		request: req,
		response: res
	});

	console.log('Request headers: ' + JSON.stringify(req.headers));
	console.log('Request body: ' + JSON.stringify(req.body));

	// Fulfill action business logic
	function responseHandler(assistantapp) {
		// Complete your fulfillment logic and send a response
		assistantapp.ask('Hello, Rajesh! Turning your lights on');

		request.get(
			"https://ps.pndsn.com/publish/pub-c-7e402782-cf0c-44b9-a1ea-1fc85de8950b/sub-c-daf1bbd2-3d74-11e7-b6fd-02ee2ddab7fe/0/Channel-yctqeal7n/myCallback/%7B%22text%22%3A%22lightson%22%7D?store=0&uuid=db9c5e39-7c95-40f5-8d71-125765b6f561",
			function(error, res2, body) {
				if (!error && res2.statusCode == 200) {
					console.log(body)
				} else {
					console.log('Error:' + error + 'Body: ' + body);
				}
			}
		);

		assistantapp.tell('Hari! I turned the lights on for you. Cheers!');
		

	}
	
	//const actionMap = new Map();
   //actionMap.set('LIFXHari', responseHandler);

   assistant.handleRequest(responseHandler);
 
  
});


if (module === require.main) {
	// Start the server
	let server = app.listen(process.env.PORT || 8080, function() {
		let port = server.address().port;
		console.log('App listening on port %s', port);
	});
}

module.exports = app;
