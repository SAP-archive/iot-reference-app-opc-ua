'use strict';

const express = require('express');
const delaybetweenchecks = process.env.DELAYBETWEENCHECKS || 120000;
const PORT = process.env.PORT || 8088;

var NodeAE = require('iot-application-services-sdk-nodejs');
var nodeAE = new NodeAE();


function checkValues() {
	var d = new Date();
	var fourminutesago = new Date(d.valueOf()-240000).toISOString();
	var twominutesago = new Date(d.valueOf()-120000).toISOString();

	nodeAE.setBaseURI('analytics-thing-sap') 
	var checkValuesCall = nodeAE.get('/ref.apps.kettle:ConsumedPowerb/aggregates?' +
		'$select=id,CurrentPhase3b_AVG,CurrentPhase2b_AVG,CurrentPhase1b_AVG&' +
		'$filter=time ge datetime\'' + 
		fourminutesago.slice(0, -1) +
		'\' and time lt datetime\'' + 
		twominutesago.slice(0, -1) +
		'\'&' +
		'$format=json')
	checkValuesCall.then(
  		function success (oResponse) {
  			var parsedThings = JSON.parse(oResponse.body).d.results;
  			console.log(parsedThings.length);
  			for(var thing of parsedThings) {
    			//console.log(thing) // will print one thing in the console
    			// should take into account that no values were found or only a subset
    			// maybe add a checker that looks for no data coming although it should
    			if((thing.CurrentPhase1b_AVG > 32 || thing.CurrentPhase2b_AVG > 32 || thing.CurrentPhase3b_AVG > 32) &&
    				(thing.CurrentPhase1b_AVG < 22 || thing.CurrentPhase2b_AVG < 22 || thing.CurrentPhase3b_AVG < 22)) {
    				console.log("event")
    				createEventForReal(twominutesago, thing.id);
    			} else {
    				console.log("noevent")
    			}
    		}
  		},
  		function error (err) {
    		throw err
  		}
  	).catch( function(error) {
		console.log(JSON.stringify(error))
  	})
}

function createEventForReal(timestamp, thingid) {
	nodeAE.setBaseURI('appiot-mds')
	var createEventCall = nodeAE.post('/Events',
		{
    		"_businessTimeStamp": timestamp,
    		"_status": "Open",
    		"_type": "Alert",
    		"_severity": 1,
    		"_source": "node-event-generator",
    		"_code": "1",
    		"_thingId": thingid,
    		"_thingProperty": "ref.apps.kettle:thekettl/ConsumedPowerb",
    		"_description": "one phase broken"
		});
	createEventCall.then(
  		function success (oResponse) {
  			console.log(oResponse.toJSON());
  		},
  		function error (err) {
    		throw err
  		}
  	).catch( function(error) {
		console.log(JSON.stringify(error))
  	})
}

setInterval(checkValues, delaybetweenchecks);

const app = express();

app.get('/ping', function (req, res) {
    console.log('pong');
    res.status(200).json('pong');
});

app.get('/check', function (req, res) {
    console.log('check if there was an event just now');
    checkValues();
    res.status(200).json(true);
});


var server = app.listen(PORT, function () {

    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://' + host + ':' + port);

});
