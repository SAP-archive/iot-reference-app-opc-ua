## Device On-Boarding

For a new device to be onboarded the following steps have to be taken:

- get Siemens 2020 or 2040 device 
- get the Arduino shield for measuring currents, solder it together and install it in the Siemens device
- get 3 current sensors and plug them into the first 3 slots
- install Yocto Linux Image from https://support.industry.siemens.com/cs/document/109741799/simatic-iot2000-sd-card-example-image?dti=0&lc=en-WW , on a Mac follow these instructions from a helpful guide to generate an image using MacOS: https://matsab.de/index.php/de/heimautomatisierung/simatic-iot2040 

This was the generic part, noew this device can be used now or later for any measurement and with any server. This setup could be manufactured and provided by a service provider if required.

Now for the actual on-boarding of this device as a specific device into our network, tied to a specific machine and tied to device and thing in OPC-UA and in SAP.

 - decide on an identifying name for the new device/thing used throughout the system - e.g. kettle52 with consecutive numbers

On OPC-UA server
- create new node for kettle52 resulting in multiples nodes
- note down the 4 node ids representing device and the 3 phases
- set the frequency variable node to default 1000 milliseconds

On device on Siemens IoT2020 hardware
- use `iot2000setup` command to configure the device
	- set the password to "Dev22ice" as described in the operations checklist
- take note of the mac address in the operations checklist
- whitelist mac address in SAP Guest network at https://nip.wdf.sap.corp/nip2/faces/networking/wlan/wlanManager/WlanMan.xhtml
- ask SAP IT to fix the IP address
- install Yaler support on the device using the process at [1-3-DeviceConfiguration](../1-3-DeviceConfiguration/Yocto-Linux_Autostart-Yaler.md) and use FileZilla to move the files over from a PC as the device does not have interenet access yet
- the previous step also adds automatic reboot once and it also ensures that the time is set once a day
- use `iot2000setup` to change the network to use dhcp
- turn on device and connect it to the same network the OPC-UA Server is in, in our case SAP-Guest
--> now the device should be reachable via yaler based on the instructions at [0-5-LandscapeSetup](../0-5-LandscapeSetup/AccessSiemensAndRaspberryViaYaler.md)

On the OPC-UA server
- edit app.js in the directory "node-opc-ua-server" and in the function post_initialize copy the lines from the first node "thecontroller51" to create your new device with e.g. the id kettle52
- after hours (to not impcat current data collection) or based on the nightly reboot reboot the OPC-UA Server as a whole to restart the server with these new node definitions
- run `opcua-commander` or use another OPC-UA Client to find out the internally assigned node ids for the node that is the kettle and for the nodes that are the 3 variables - take a note of these node ids

On the Siemens device
- use Yaler access to find out the ip address of the device and take note of the ip address in our operations checklist file under Operations Process
- install latest firmware version using the [install_firmware.md](install_firmware.md)
- add automatic start-up for Firmware using this script [1-3-DeviceConfiguration](../3-1-AutomaticBootupScripts/SiemensIOT2000.md)
- adjust Firmware with the 4 node ids of the device you got from the OPC-UA Server
- configure ip address of the OPC-UA Server 
--> data from device should be flowing and become visible on the OPC-UA Server, you can check this opc ua commander

On OPC-UA server
- test data ingestion to OPC-UA Server with opcua commander or with another opc ua client
- configure middleware with the device and sensor node ids and copy sensor type and other stuff from the first device  - to do so edit the config.json file in the node-opc-ua-to-mqtt-middleware folder
- after hours (to not impcat current data collection) or based on the nightly reboot reboot the OPC-UA Server as a whole to restart the middleware with the new configuration - make sure you reboot before there is a command sent as in this case the config.json is overwirtten and your changes are lost
--> now device should be created and data should show up for it regularly in device management in the cloud

In the SAP Cloud Platform IoT Service Cockpit
- check if the device showed up
- check if the data is coming in
- get name and device id and sensor id and note it

In the middleware add the device with its id again to allow receiving of commands

In SAP IoT Application Enablement launchpage
- go to Thing Modeler and select package "kettle" and create new thing representign the new device iot2020_2_52 for thing type "thekettle"
- connect the new thing to the sensor you took note of in iot service cockpit
- add the geolocation to the thing in the thing modeler
--> data should be coming in - the latest data shows within the thing modeler

In the monitoring app
- check that data is coming in over time continously