/*global require,console,setTimeout */
var opcua = require("node-opcua");
var async = require("async");

var client = new opcua.OPCUAClient({ keepSessionAlive: false });

var endpointUrl = "opc.tcp://192.168.0.52:4334/";

var the_session;

client.connect(endpointUrl, function (err) {
    if(err) {
        console.log("Cannot connect to endpoint :" , endpointUrl);
        console.log(err);
    } else {
        console.log("Connected...");
        
        client.createSession(function(err, session) {
            
            //console.log("Session", session);

            if(!err) {
                console.log("Session started...");

                the_session = session;

                the_session.readVariableValue("ns=1;i=1006", function(err, dataValue) {
                    console.log(dataValue);

                    if (!err) {
                        console.log("Value = " , dataValue.toString());
                    }
                });
            }
            else{
                console.log("Session error...");
                console.log(err);
            }
        });
    }
});