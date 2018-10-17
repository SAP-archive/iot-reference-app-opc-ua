## node-event-generator

This is an Node.js app that runs on SAP Cloud Platform CF and it exposes an endpoint where you can launch the check for analysying data and to created custom events

The app uses Node.js package 'iot-application-services-sdk-nodejs'.

It also runs with setInterval delay with a default value of 120000 ms (2 mins is the smallest aggregation time period pre-computed by SAP Application Enablement Hot Store)

There is also and Postman collection of sample requests that are reated to Events and Analytics Thing API Service