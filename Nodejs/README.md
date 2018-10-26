# IoT Ref Node.js Example Apps

The following independent Node.Js app were custom developed

1. node-service-discovery - custom app that logs in memory one server ip for the OPC-UA Server and multiple OPC-UA Client ips (firmwares)

2. node-opc-ua-to-mqtt-middleware - custom middleware that reads OPC-UA Server nodes and send the data to the local IoT Services Edge Gateway via mqtt

3. node-opc-ua-server - custom OPC-UA server with on-start hardcoded node configurations

4. node-firmware - custom firmware that runs on Siemens IoT 2040 device. It reads data from the 3 analog sensors with Intel MRAA library and send them to the OPC-UA server

5. node-opc-ua-client-samples - Some text sample clients code. On the device (Yocto Linux) the version that uses async.series fails although it work fine on other OSs

6. node-event-generator - node app that monitors every 2 minutes the last 2 minutes of data and checks, if maybe one phase is down
