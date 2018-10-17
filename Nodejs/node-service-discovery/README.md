## Scope of the Service Discovery (not yet used in the whole landscape)

In future releases the Node OPC-UA Server will have to function with dynamic ip address. In this version the service discovery app is a simple express app that exposes minimal functionality needed for a service discovery app. (register, list, heartbeat functions + status with all the info)

## Pre-required

    * SAP Cloud Platform - Cloud Foundry Subscription (https://account.eu1.hana.ondemand.com/#/home/welcome)
    * Cloud Foundry CLI Tools (https://github.com/cloudfoundry/cli)

## How to install the service discovery app on SAP Cloud Platform - Cloud Foundry

1. Clone the app sources

`git clone <URL> <dir-name>`

2. Change directory

`cd <dir-name>`

3. CF login, select org and space

```
cf api https://api.cf.eu10.hana.ondemand.com
cf login
```

4. Deploy app to CF space

`cf push`

5. List apps in selected space

`cf apps`

6. See CF application logs from command line

`cf logs <app-name> --recent`

## How to use the discovery service

The service has 5 functions accessible using the HTTP GET method

1. GET /opcua/server?ip=<serverip>

2. GET /opcua/server/heartbeat?ip=<serverip>

3. GET /opcua/client?ip=<clientip>

4. GET /opcua/client/heartbeat?ip=<clientip>

5. GET /opcua/status

## TO BE used by the middleware, node-opcua-server and node-firmware in future releases
