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
//console.log(config);

let analogPin1 = new mraa.Aio(1);
let analogPin2 = new mraa.Aio(2);
let analogPin3 = new mraa.Aio(3);

analogPin1.setBit(10);
analogPin2.setBit(10);
analogPin3.setBit(10);

var simulation = false;
if(process.argv[2] == 'simulation') {
	console.log('Simulation turned on');
	simulation = true;
}

function readAllSensors(){  

	var sensorsData = [];
	var now = new Date();
	var minute = now.getMinutes();

	for(var i = 0; i < config.deviceSensors.length; i++){

		// display old sensor state
		var sensor = config.deviceSensors[i];

		// read sensor data
		let data = readPower(sensor.analogPort);
		console.log(getDateString() + sensor.sensorNodeId + " " + sensor.sensorNodeName + " - Sensor Last Value : ", data);

		// update sensor info
		sensor.lastValueTimestamp = now;
		if(simulation) {
			if(minute >= 50 && i == 2)
				sensor.lastValue = 0;
			else
				sensor.lastValue = Math.floor(minute / 10) * 10;
		}
		else
			sensor.lastValue = data.RMSCurrent;
		config.deviceSensors[i] = sensor;

		// send the data bulk for all sensor nodes in 1 request
		sensorsData.push(sensor);
	}

	if(! simulation || minute >= 10)
		sentDataToOPCUAServer(sensorsData);

	console.log("");
}

var readSensorsInterval = setInterval(readAllSensors, config.defaultSensorReadFrequency);

// read config of read freq for all sensors - each minute
var configInterval = setInterval(function(){

	// config of the OPC UA Client
	var clientConfig = new opcua.OPCUAClient();
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
function readPower(pinNo){

	var current = 0;
	var maxCurrent = 0;
	var minCurrent = 100000;
	
	for (var i = 0; i <= 1000; i++)
	{
		current = 0;
		
		if(pinNo === 1){
			current = analogPin1.read();
		}
		else
		if(pinNo === 2){
			current = analogPin2.read();
		}
		else
		if(pinNo === 3){
			current = analogPin3.read();
		}

		//console.log(getDateString() + "Analog reading value : ", current);

		if(current >= maxCurrent)
			maxCurrent = current;
		else if(current <= minCurrent)
			minCurrent = current;

		sleep.usleep(200);
	}

	if (maxCurrent <= 517)
	{
		maxCurrent = 516;
	}
	
	//Calculates RMS current based on maximum value
	var RMSCurrent = ((maxCurrent - 516) * 0.707) / 11.8337 * 3.54; // 3.54 is an empirical calibration factor

	//Calculates RMS Power Assuming Voltage 220VAC, change to 110VAC accordingly
	var RMSPower = voltage * RMSCurrent;

	var output = {
		RMSCurrent : RMSCurrent,
		RMSPower : RMSPower
	};

	return output;
}

// helper function to send data to opc ua
function sentDataToOPCUAServer(sensorsData){
	
	console.log(getDateString() + "Sending data to server : ");
	//console.log(getDateString() + JSON.stringify(sensorsData));

	// write values
	// config of the OPC UA Client
	var clientWriteValues = new opcua.OPCUAClient();
	var endpointUrl = config.opcUAServerEndpoint;
	var theSessionWriteValues;

	clientWriteValues.connect(endpointUrl, function (err) {
		if(err) {
			console.log(getDateString() + "clientWriteValues OPC UA Client - Cannot connect to endpoint :" , endpointUrl);
			console.log(getDateString() + JSON.stringify(err));
		} else {
			console.log(getDateString() + "clientWriteValues OPC UA Client Connected...");
			
			clientWriteValues.createSession(function(err, session) {
				
				//console.log(getDateString() + "Session" + JSON.stringify(session));
	
				if(!err) {
					console.log(getDateString() + "clientWriteValues OPC UA Client - Session started...");
	
					theSessionWriteValues = session;

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

						// close session and dsiconnect client
						theSessionWriteValues.close(true, function(){

							console.log(getDateString() + "clientWriteValues OPC UA Client - Session closed ok");
							
							clientWriteValues.disconnect(function(){
								
								console.log(getDateString() + "clientWriteValues OPC UA Client - Disconnected ok");
							});
						});
					});
				}
				else{
					console.log(getDateString() + "clientWriteValues OPC UA Client - Session error...");
					console.log(getDateString() + JSON.stringify(err));
				}
			});
		}
	});
}

function getDateString(){
	return new Date().toISOString() + " - ";
}
