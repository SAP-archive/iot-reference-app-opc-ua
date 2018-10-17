## Midleware between OPC-UA Server and the Edge Component

The middleware would read data from the OPC-UA Server and if there is a new timestamp it would send it on to the SAP IoT Edge Gateway. We used a polling mechanism for now but down the road a push mechanism/subscribtion would be better.

## Implementation

The source code may be found in this folder [Middleware](../Nodejs/node-opc-ua-to-mqtt-middleware).