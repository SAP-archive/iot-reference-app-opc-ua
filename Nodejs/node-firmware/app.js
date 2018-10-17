"use strict";

//const voltage = 220;
const voltage = 380;

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

const mraa = require('mraa');
console.log(getDateString() + 'MRAA Version : ' + mraa.getVersion());

var opcua = require("node-opcua");
const sleep = require('sleep');

var fs = require("fs");
var configContents = fs.readFileSync("config.json");
var config = JSON.parse(configContents);
console.log(getDateString() + "Firmware Configuration loaded ok ");
if(config.simulation) console.log("simulation:" + config.simulation);

let analogPin1 = new mraa.Aio(1);
let analogPin2 = new mraa.Aio(2);
let analogPin3 = new mraa.Aio(3);

analogPin1.setBit(10);
analogPin2.setBit(10);
analogPin3.setBit(10);

var readSensorsInterval;
var sensorsData = [];

function readAllSensors(){  

	sensorsData = [];

	var now = new Date();
	let datas = readPower(now);

	for(var i = 0; i < config.deviceSensors.length; i++){

		// display old sensor state
		var sensor = config.deviceSensors[i];

		// read sensor data
		console.log(getDateString() + sensor.sensorNodeId + " " + sensor.sensorNodeName + " - Sensor Last Value : ", datas[i]);

		// update sensor info
		sensor.lastValueTimestamp = now;
		sensor.lastValue = datas[i].RMSCurrent;
		config.deviceSensors[i] = sensor;

		// send the data bulk for all sensor nodes in 1 request
		sensorsData.push(sensor);
	}

	// check how to send data different in simulation vs production
	if(!config.simulation){
		sentDataToOPCUAServer(sensorsData);
	}
	else
	{
		let minute = now.getMinutes();
		if(minute >= 10){
			sentDataToOPCUAServer(sensorsData);
		}
		else{
			// do nothing in the first 10 mins of the hour in simulation mode
		}
	}
}

// read config of read freq for all sensors - each minute
var configInterval = setInterval(function(){

	// config of the OPC UA Client
	var options = {
		endpoint_must_exist: false,
		keepSessionAlive: true,
		connectionStrategy: {
			maxRetry: 10,
			initialDelay: 2000,
			maxDelay: 10*1000
		}
	};

	var clientConfig = new opcua.OPCUAClient(options);

	clientConfig.on("backoff", function (number, delay) {
		console.log("backoff  attempt...");
	});

	var endpointUrl = config.opcUAServerEndpoint;
	var theSessionConfig;

	clientConfig.connect(endpointUrl, function (err) {
		if(err) {
			console.log(getDateString() + "clientConfig OPC UA Client - Cannot connect to endpoint :" , endpointUrl);
			console.log(getDateString() + JSON.stringify(err));
		} else {
			console.log(getDateString() + "clientConfig OPC UA Client Connected...");
			
			clientConfig.createSession(function(err, session) {
				
				//console.log(getDateString() + "Session" + JSON.stringify(session);
	
				if(!err) {
					console.log(getDateString() + "clientConfig OPC UA Client - Session started...");
	
					theSessionConfig = session;

					theSessionConfig.readVariableValue(config.deviceConfigNodeId, function(err, dataValue) {
						
						//console.log(getDateString() + JSON.stringify(dataValue));
	
						if (!err) {
							//console.log(getDateString() + "clientConfig OPC UA Client - Value = " , dataValue.toString());
							
							if(dataValue.value){
								config.defaultSensorReadFrequency = parseInt(dataValue.value.value);
								console.log(getDateString() + "Updated Device Config with new read frequency : ", config.defaultSensorReadFrequency);
								//console.log(getDateString() + JSON.stringify(config));

								// update with the new interval read frequency
								clearInterval(readSensorsInterval);
								readSensorsInterval = setInterval(readAllSensors, config.defaultSensorReadFrequency);
							}
						}

						// close session and dsiconnect client
						theSessionConfig.close(true, function(){

							console.log(getDateString() + "clientConfig OPC UA Client - Session closed ok");
							
							clientConfig.disconnect(function(){
								
								console.log(getDateString() + "clientConfig OPC UA Client - Disconnected ok");
							});
						});
					});
				}
				else{
					console.log(getDateString() + "clientConfig OPC UA Client - Session error...");
					console.log(getDateString() + JSON.stringify(err));
				}
			});
		}
	});

}, config.defaultConfigReadFrequency);

// helper function to read sensor data
function readPower(now){

	var minute = now.getMinutes();

	var maxCurrent1 = 0;
	var maxCurrent2 = 0;
	var maxCurrent3 = 0;
	
	for (var i = 0; i <= 100; i++)
	{
		var current1 = analogPin1.read();
		var current2 = analogPin2.read();
		var current3 = analogPin3.read();
		//console.log(getDateString() + "Analog reading value : ", current);

		if(current1 >= maxCurrent1) maxCurrent1 = current1;
		if(current2 >= maxCurrent2) maxCurrent2 = current2;
		if(current3 >= maxCurrent3) maxCurrent3 = current3;

		sleep.usleep(200);
	}

	if (maxCurrent1 <= 517)	maxCurrent1 = 516;
	if (maxCurrent2 <= 517)	maxCurrent2 = 516;
	if (maxCurrent3 <= 517)	maxCurrent3 = 516;

	//Calculates RMS current based on maximum value
	var RMSCurrent1 = ((maxCurrent1 - 516) * 0.707) / 11.8337 * 3.54; // 3.54 is an empirical calibration factor
	var RMSCurrent2 = ((maxCurrent2 - 516) * 0.707) / 11.8337 * 3.54; // 3.54 is an empirical calibration factor
	var RMSCurrent3 = ((maxCurrent3 - 516) * 0.707) / 11.8337 * 3.54; // 3.54 is an empirical calibration factor

	//Calculates RMS Power Assuming Voltage 220VAC, change to 110VAC accordingly
	var RMSPower1 = voltage * RMSCurrent1;
	var RMSPower2 = voltage * RMSCurrent2;
	var RMSPower3 = voltage * RMSCurrent3;

	if(config.simulation) {
		RMSCurrent1 = Math.floor(minute / 10) * 10;
		RMSCurrent2 = Math.floor(minute / 10) * 10;
		RMSCurrent3 = Math.floor(minute / 10) * 10;
		if(minute >= 50)
			RMSCurrent3 = 1;
	}

	var output = [
		{
			RMSCurrent : RMSCurrent1,
			RMSPower : RMSPower1,
			simulation : config.simulation
		},{
			RMSCurrent : RMSCurrent2,
			RMSPower : RMSPower2,
			simulation : config.simulation
		},{
			RMSCurrent : RMSCurrent3,
			RMSPower : RMSPower3,
			simulation : config.simulation
		}
	];

	return output;
}

// config of the OPC UA Client
var options = {
	endpoint_must_exist: false,
	keepSessionAlive: true,
	connectionStrategy: {
		maxRetry: 10,
		initialDelay: 2000,
		maxDelay: 10*1000
	}
};

var clientWriteValues = new opcua.OPCUAClient(options);
var theSessionWriteValues;

clientWriteValues.on("backoff", function (number, delay) {
	console.log("backoff  attempt...");
});

var endpointUrl = config.opcUAServerEndpoint;

clientWriteValues.connect(endpointUrl, function (err) {
	if(err) {
		console.log(getDateString() + "clientWriteValues OPC UA Client - Cannot connect to endpoint :" , endpointUrl);
		console.log(getDateString() + JSON.stringify(err));
	} else {
		console.log(getDateString() + "clientWriteValues OPC UA Client Connected...");
		
		clientWriteValues.createSession(function(err, session) {
			
			//console.log(getDateString() + "Session" + JSON.stringify(session));

			if(!err) 
			{
				console.log(getDateString() + "clientWriteValues OPC UA Client - Session started...");

				theSessionWriteValues = session;

				readSensorsInterval = setInterval(readAllSensors, config.defaultSensorReadFrequency);
			}
			else{
				console.log(getDateString() + "clientWriteValues OPC UA Client - Session error...");
				console.log(getDateString() + JSON.stringify(err));
				console.log("");
			}
		});
	}
});

function sentDataToOPCUAServer(){
	
	console.log(getDateString() + "Sending data to server : ");
	console.log("Sensor data timestamp : " + sensorsData[0].lastValueTimestamp.getTime());

	var nodesToWrite = [];

	for(var j = 0; j < sensorsData.length; j++){
		nodesToWrite.push({
			nodeId : sensorsData[j].sensorNodeId,
			attributeId : opcua.AttributeIds.Value,
			indexRange : null,
			value: {
				serverTimestamp :  sensorsData[j].lastValueTimestamp,
				serverPicoseconds : 0,
				sourceTimestamp : sensorsData[j].lastValueTimestamp,
				sourcePicoseconds : 0,
				value : {
					dataType : opcua.DataType.Double,
					value : sensorsData[j].lastValue
				}
			}
		});
	}
	//console.log(nodesToWrite);

	theSessionWriteValues.write(nodesToWrite, function(err, statusCodes, diagnosticInfos) {
		
		if(!err){
			console.log(getDateString() + "clientWriteValues OPC UA Client - Values where sent to OPC UA Server = OK");
		}
		else{
			console.log(getDateString() + "clientWriteValues OPC UA Client - Error for write node values");
			console.log(getDateString() + JSON.stringify(err));
			console.log(getDateString() + JSON.stringify(statusCodes));
			console.log(getDateString() + JSON.stringify(diagnosticInfos));
		}

	});
}

function getDateString(){
	return new Date().toISOString() + " - ";
}

// gracefull stop the middleware
process.on('SIGTERM', function () {

	// close session and dsiconnect client
	theSessionWriteValues.close(true, function(){

		console.log(getDateString() + "clientWriteValues OPC UA Client - Session closed ok");
		
		theSessionWriteValues = null;

		clientWriteValues.disconnect(function(){
			
			console.log(getDateString() + "clientWriteValues OPC UA Client - Disconnected ok");
			console.log("");

			clientWriteValues = null;
		});
	});
});
