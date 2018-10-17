
const mqtt = require('mqtt');
const opcua = require("node-opcua");

var fs = require("fs");
var configContents = fs.readFileSync("config.json");
var config = JSON.parse(configContents);
console.log(getDateString() + "Configuration loaded OK...");
//console.log(config);

// automatic check for memory leaks
const memwatch = require('memwatch-next');
const heapdump = require('heapdump');

memwatch.on('leak', (info) => {
	
	console.error('Memory leak detected:\n', info);
	
	heapdump.writeSnapshot((err, filename) => {
	  if(err) {
		  console.error(err);
	  }
	  else{ 
		  console.error('Wrote snapshot: ' + filename);
		}
	});
});

// auto increase records no that were reads
var recordNo = 0;

var lastReadingsInOPCUA = [];

var readWriteTimeInterval = config.readWriteTimeInterval;

var mqttClient = mqtt.connect(config.endpointMQTT);

mqttClient.on('connect', function() {
	
	console.log(getDateString() + "mqttClient connected");

	if(config.devicesWithCommands){
		for(var i = 0; i < config.devicesWithCommands.length; i++){
			mqttClient.subscribe('commands/' + config.devicesWithCommands[i].deviceAlternateId);
		}
	}
});
   
mqttClient.on('message', function(topic, message) {

	console.log(getDateString() + "mqttClient message received command :");
	console.log(topic, message.toString());

	try
	{
		var deviceAlternateId = topic.replace('commands/', "");

		var mess = JSON.parse(message.toString());
		var newInterval = mess.command.readInterval;

		console.log("New interval : ", deviceAlternateId, " is ", newInterval);

		// update the running config with new interval
		readWriteTimeInterval = config.readWriteTimeInterval = parseInt(newInterval);

		// save the new config on file
		fs.writeFile("config.json", JSON.stringify(config), function(){

			console.log("Configuration readInterval was updated !");

			clearInterval(readWriteInterval);
			readWriteInterval = setInterval(readValuesForAllDevices, readWriteTimeInterval);
		});
	}
	catch(err){
		console.log("Process command error : ", err);
	}
});

mqttClient.on("error", function(err) {
	console.log(getDateString() + "mqttClient ERROR : ");
	console.log(err);
});

mqttClient.on('offline', function() {
    console.log(getDateString() + "mqttClient offline");
});

mqttClient.on('reconnect', function() {
    console.log(getDateString() + "mqttClient reconnect");
});

mqttClient.on('close', function(){
	console.log(getDateString() + "mqttClient close");
});

// opc ua client
var options = {
	endpoint_must_exist: false,
	keepSessionAlive: false,
	connectionStrategy: {
		maxRetry: 10,
		initialDelay: 2000,
		maxDelay: 10*1000
	}
};

var opcClient = new opcua.OPCUAClient(options);

opcClient.on("backoff", function (number, delay) {
	console.log("backoff  attempt...");
});

var theOpcSession;

readFromOPCUAandSendToMqttGateway();

function readFromOPCUAandSendToMqttGateway() {

	opcClient.connect(config.endpointUrlOPCUA, function (err) {
	    if(err) {
    	    console.log(getDateString() + "opcClient - Cannot connect to endpoint :" , config.endpointUrlOPCUA);
        	console.log(err);
    	} else {
        	console.log(getDateString() + "opcClient - Connected...");
        
        	opcClient.createSession(function(err, session) {
            
				//console.log(getDateString() + "opcClient - Session");
				//console.log(session);

            	if(!err) {
                	console.log(getDateString() + "opcClient - Session started...");

					theOpcSession = session;
					
					// start the periodic read of the OPC UA Server and MQTT push of the data after
					var readWriteInterval = setInterval(readValuesForAllDevices, readWriteTimeInterval);
				} else{
					console.log(getDateString() + "Session error...");
					console.log(err);
            	}
        	});
    	}
	});
}

function readValuesForAllDevices(){
	
	var devices = [];

	for(var i = 0; i < config.devicesAndSensorIds.length; i++){

		var device = config.devicesAndSensorIds[i];

		if(devices.indexOf(device.deviceId) < 0){
			devices.push(device.deviceId);
		}
	}

	//console.log(devices);

	for(var d = 0; d < devices.length; d++){

		if(!lastReadingsInOPCUA[devices[d]]){
			lastReadingsInOPCUA[devices[d]] = [];
		}

		readLastNodesValues(devices[d]);
	}

	//console.log(lastReadingsInOPCUA);
}

function readLastNodesValues(DeviceId){
	
	console.log("Read and send data for device : ", DeviceId);

	var nodesToRead = [];
	var readFromDevice = {};

	for(var i = 0; i < config.devicesAndSensorIds.length; i++){

		var device = config.devicesAndSensorIds[i];

		if(device.deviceId === DeviceId){

			readFromDevice = device;

			for(var s = 0; s < config.devicesAndSensorIds[i].sensors.length; s++){
				nodesToRead.push({
					nodeId: config.devicesAndSensorIds[i].sensors[s].sensorOpcUaNodeId
				});
			}
		}
	}
	//console.log(getDateString() + "nodesToRead = ");
	//console.log(nodesToRead);

	theOpcSession.read(nodesToRead, function(err, results, diagnosticInfos) {
		
		//console.log(results);

		if (!err) {
			//console.log(getDateString() + "opcClient OPC UA Client - Values = " , results);

			var measures = [];

			for( j = 0; j < results.length; j++){
				var deviceId = readFromDevice.deviceId;
				var capabilityId = readFromDevice.sensors[j].capabilityId;
				var sensorAlternateId = readFromDevice.sensors[j].sensorAlternateId;
				var sensorTypeAlternateId = readFromDevice.sensors[j].sensorTypeAlternateId;
				
				var measure = parseFloat(results[j].value.value);

				measures.push(measure);
			}

			var sTime = results[0].sourceTimestamp.getTime();
			//console.log(sTime);

			if(lastReadingsInOPCUA[DeviceId].indexOf(sTime) >= 0){
				// do not send anything in this case
				console.log(getDateString() + " These timestamp values were already sent for device '" + DeviceId + "' timestamp '" + sTime + "'");
				return;
			}

			// send data and add timestamp to history array
			var pushData = {
				"timestamp" : sTime,
				"capabilityAlternateId": capabilityId, 
				"sensorTypeAlternateId": sensorTypeAlternateId,
				"sensorAlternateId": sensorAlternateId,
				"measures": [ measures ]
			}

			mqttClient.publish('measures/' + DeviceId, JSON.stringify(pushData), [], function(err){
				if(!err){
					recordNo += 1;
					lastReadingsInOPCUA[DeviceId].push(sTime);
					console.log(getDateString() + recordNo + " - MQQT client pushed data OK for device '" + DeviceId + "' and timestamp '" + sTime + "'");
					console.log(pushData);
				}
				else{
					console.log(getDateString() + recordNo + " - MQQT client error :");
					console.log(pushData);
					console.log(err);
				}
			});
		}
		else{
			console.log(getDateString() + "opcClient OPC UA Client - Error : ");
			console.log(err);
			console.log(diagnosticInfos);
		}
	});
}

function getDateString(){
	return new Date().toISOString() + " - ";
}

// gracefull stop the middleware
process.on('SIGTERM', function () {

	// close session and disconnect client
	theOpcSession.close(true, function(){

		console.log(getDateString() + "opcClient OPC UA Client - Session closed ok");
		
		opcClient.disconnect(function(){
			
			console.log(getDateString() + "opcClient OPC UA Client - Disconnected ok");

			process.exit(0);
		});
	});
});