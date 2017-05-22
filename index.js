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


const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());
var request = require('request');
restService.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    
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
        source: 'webhook-echo-sample'
    });
});



restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
