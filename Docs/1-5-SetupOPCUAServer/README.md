We have tried multiple options regarding the OPC UA Server. 
Most of the products are multi-platform compatible.

## Node.js SDK : node-opcua package

We had issues with this when we renamed hosts due to the fact, that we had no DNS setup in the SAP-Guest network and the debug messages did not guide us ther right way. But we overcame this after some trials with this and other opc ua servers and clients both on linux and on windows. 

## Open OPC UA Server

This one worked ok with minimum effort on Windows but due to full source code access and tooling around node js clients as a full sdk in our firmware and middelware we in the end stuck to the node js opc ua server.

## Conclusions

For a beginner like us we had many different experiences with different clients and servers. For example the creation of nodes was different for everyone of them and different clients connected and others did not. For us the UAExpert windows client worked the best.

## Implementation

The source code, that also contains our node configuration, is in this folder [server](../Nodejs/node-opc-ua-server).
