# Why did we do it

Installed IoT Gateway Edge OPCUA to connect to node.js OPCUA server

# What did we do

1. Downloaded the Gateway Edge component

2. Enriched with certificate for IoT Services User

3. Copied file to target hardware (raspberry pi)

# How did we do it


1. Downloading the Internet of Things Gateway Edge from SAP Software Center
Searched for IoT Edge 4.0 and downloaded the zip file.
2. In the Download Manager, search for IoT Edge in Downloads. The result list shows a file like IOTCHCP13_0-70002561.ZIP
2. Unpack the file and then extracted the file gateway-4.13.0.zip (Version 4.13.0 might be different).

3. Launched ./build.sh OPCUA in folder gateway-4.13.0

4. Changed config_gateway_opcua.xml from /config folder

5. Changed the entries for <cnf:ffdVitalityOn> and <cnf:rfdVitalityOn> to false

6. Enter the <HOST_NAME> of IoT Services (refapps2.eu10.cp.iot.sap) for the connectionString and for the two address elements in the coreBundles by replacing 127.0.0.1 to refapps2.eu10.cp.iot.sap

5. Changed Server where to find OPCUA server in /gateway-4.13.0/config/opcuaCfg/config.json

7. Changed ZZZ in ip address to the address where the server is located (the Siematic IoT2000)

		```
		{
			"servers":
			[{
				"protocol":"opc.tcp",
				"ip":"ZZZ",
				"port":4334,
				"measuresReport":"periodic",
				"periodicInterval":20000,
				"excludedNSs" : [0,2,7,8],
				"importAttributes" : ["Description","Historizing"]
			}]
		}
		```

6. Downloaded certificate from IoT Services root user

6. Logon to IoTServices and go to user profile. Choose Certificate <Download> from the user menue.

8. The folder was renamed to certificates and placed under /gateway-4.13.0/config.

7. Changed password in /gateway-4.13.0/config/certificates/pswd.properties. The XXX, YYY and ... were changed to real values

		```
		#Mon Jan 22 14:18:10 UTC 2018
		keyStoreServer=root
		tenantId=0
		user=XXX
		password=YYY
		keyStorePassword=...
		```

8. Copy folder /gateway-4.13.0 to raspberry pi to the folder /pi
