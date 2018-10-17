const simulationMode = false;

// automatic check for memory leaks
const memwatch = require('memwatch-next');
const heapdump = require('heapdump');

memwatch.on('leak', (info) => {
	
	console.error('Memory leak detected:\n', info);
	
	heapdump.writeSnapshot((err, filename) => {
	  if(err !== undefined && err !== null) {
		  console.error(err);
	  }
	  else{ 
		  console.error('Wrote snapshot: ' + filename);
		}
	});
});

// start OPC-UA server
var opcua = require("node-opcua");

// Let's create an instance of OPCUAServer
var server = new opcua.OPCUAServer({
    port: 4334,
    maxConnections: 50,
    alternateHostname: "10.94.17.26",
    resourcePath: "/",
    buildInfo : {
        productName: "BoilerCurrent",
        buildNumber: "1.0.0",
        buildDate: new Date(2018,1,20)
    }
});

function post_initialize() {
    
    console.log(getDateString() + "Call post_initialize()");

    function construct_my_address_space(server) {
    
        var addressSpace = server.engine.addressSpace;
        
        var countryNode = addressSpace.addFolder("ObjectsFolder", { browseName: "Germany"});
        var cityNode = addressSpace.addFolder(countryNode, { browseName: "Walldorf" });
        var buildingNode = addressSpace.addFolder(cityNode, { browseName: "WDF01" });
        var roomNode = addressSpace.addFolder(buildingNode, { browseName: "SAP Kantine" });

        // device 1
        var device1 = addressSpace.addObject({
            organizedBy: roomNode, // roomNode or root folder : addressSpace.rootFolder.objects
            browseName: "thecontroller51"
        });
    
        var d1_read_freq = 1000;
        var d1_l1 = 0;
        var d1_l2 = 0;
        var d1_l3 = 0;
        
        addressSpace.addVariable({
            componentOf: device1,
            browseName: "ReadFrequency",
            dataType: "UInt32",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.UInt32, value: d1_read_freq });
                },
                set: function (sentValue) {
                    d1_read_freq = parseInt(sentValue.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });

        var k51L1 = addressSpace.addAnalogDataItem({
            componentOf: device1,
            browseName: "CurrentPhase1",
            dataType: "Double",
            engineeringUnits: opcua.standardUnits.ampere,
            engineeringUnitsRange: {
                low:  0,
                high: 1000.0
            },
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double, value: d1_l1 });
                },
                set: function (sentValue) {
                    d1_l1 = parseFloat(sentValue.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });
        
        addressSpace.installHistoricalDataNode(k51L1);

        var k51L2 = addressSpace.addAnalogDataItem({
            componentOf: device1,
            browseName: "CurrentPhase2",
            dataType: "Double",
            engineeringUnits: opcua.standardUnits.ampere,
            engineeringUnitsRange: {
                low:  0,
                high: 1000.0
            },
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double, value: d1_l2 });
                },
                set: function (sentValue) {
                    d1_l2 = parseFloat(sentValue.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });

        addressSpace.installHistoricalDataNode(k51L2);

        var k51L3 = addressSpace.addAnalogDataItem({
            componentOf: device1,
            browseName: "CurrentPhase3",
            dataType: "Double",
            engineeringUnits: opcua.standardUnits.ampere,
            engineeringUnitsRange: {
                low:  0,
                high: 1000.0
            },
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double, value: d1_l3 });
                },
                set: function (sentValue) {
                    d1_l3 = parseFloat(sentValue.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });

        addressSpace.installHistoricalDataNode(k51L3);

        // test device
        var testDevice = addressSpace.addObject({
            organizedBy: roomNode, // roomNode or root folder : addressSpace.rootFolder.objects
            browseName: "testController"
        });
    
        var t_read_freq = 1000;
        var t_l1 = 0;
        var t_l2 = 0;
        var t_l3 = 0;
        
        addressSpace.addVariable({
            componentOf: testDevice,
            browseName: "ReadFrequency",
            dataType: "UInt32",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.UInt32, value: t_read_freq });
                },
                set: function (sentValue) {
                    t_read_freq = parseInt(sentValue.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });

        var tL1 = addressSpace.addAnalogDataItem({
            componentOf: testDevice,
            browseName: "CurrentPhase1",
            dataType: "Double",
            engineeringUnits: opcua.standardUnits.ampere,
            engineeringUnitsRange: {
                low:  0,
                high: 1000.0
            },
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double, value: t_l1 });
                },
                set: function (sentValue) {
                    t_l1 = parseFloat(sentValue.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });
        
        addressSpace.installHistoricalDataNode(tL1);

        var tL2 = addressSpace.addAnalogDataItem({
            componentOf: testDevice,
            browseName: "CurrentPhase2",
            dataType: "Double",
            engineeringUnits: opcua.standardUnits.ampere,
            engineeringUnitsRange: {
                low:  0,
                high: 1000.0
            },
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double, value: t_l2 });
                },
                set: function (sentValue) {
                    t_l2 = parseFloat(sentValue.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });

        addressSpace.installHistoricalDataNode(tL2);

        var tL3 = addressSpace.addAnalogDataItem({
            componentOf: testDevice,
            browseName: "CurrentPhase3",
            dataType: "Double",
            engineeringUnits: opcua.standardUnits.ampere,
            engineeringUnitsRange: {
                low:  0,
                high: 1000.0
            },
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double, value: t_l3 });
                },
                set: function (sentValue) {
                    t_l3 = parseFloat(sentValue.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });

        addressSpace.installHistoricalDataNode(tL3);    
    }
    
    construct_my_address_space(server);

    server.start(function() {

        console.log(getDateString() + "Server is now listening ... ( press CTRL+C to stop) on port ", server.endpoints[0].port);
     
        var endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log(getDateString() + " The primary server endpoint url is ", endpointUrl );
    });
}

function getDateString(){
	return new Date().toISOString() + " - ";
}

console.log(getDateString() + "Initialize OPC-UA Server...");
server.initialize(post_initialize);

// simulation mode = ON
if(simulationMode === true){
    setInterval(function(){  
        d1_l1 += 1; 
        d1_l2 += 2; 
        d1_l3 += 3; 
    }, 10000);
}
