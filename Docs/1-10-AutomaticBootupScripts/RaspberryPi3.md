## Applications needed to be started at boot time on the Raspberry PI gateway

1. OPCUA Server (node-opcua-server)
2. Middleware OPCUA to MQTT (node-opcua-to-mqtt-middleware)
3. IoT Edge Gateway (java app in /root/gateway-4.1.3-mqtt)

## Pre-required

### Node.JS latest version

    `apt-get remove nodejs`

    After that follow the commands in this tutorial on installing the latest version :

    http://thisdavej.com/beginners-guide-to-installing-node-js-on-a-raspberry-pi/#install-node

### Update NPM to latest version

    `npm install -g npm@latest`

## Adding a script at boot time for Raspberry PI (Ubuntu, Debian or Raspbian)

    This must be repeated for
        * node-opc-ua-server
        * node-opc-us-to-mqtt-middleware

    The folowing steps are needed for the Raspberry Pi device to have run a Node.js script at bootup

    The folowing steps should be followed for creating a new start-up script when the OS starts with Node.Js and forever :

### Install forever as global

    `npm install -g forever`

### Install forever-service as global

    `npm install -g forever-service`

### Change directory where the Node app is. The node app entry point MUST BE app.js

    `cd /home/pi/node-opc-ua-server`

### Create the service with forever-service that will automatically run the app.js file from the current folder

    `forever-service install <service-name>`

### You may control the service with normal commands : start, stop, restart

    ```
    service <service-name> start
    service <service-name> stop
    service <service-name> restart
    ```

### Run at start-up this service

* 1. Open the file /etc/rc.local

        `sudo nano /etc/rc.local`

* 2. Before the 'exit 0' line add the folowing command

        `sudo service <service-name> start`

* 3. Save and test rebooting the device

## For java app IoT Edge Gateway to start

### Create in /etc/init.d folder a new sh script

    `sudo nano /etc/init.d/sap-iot-edge-gateway-mqtt-start.sh`

### Type in

    ```
    #!/bin/bash
    echo "SAP IoT Edge MQTT GatewayStart $0: $*"
    set -x
    echo 'Starting Middleware...'
    cd /home/pi/gateway-4.13.0-mqtt
    sudo bash gateway.sh > /var/log/sap-iot-edge-gateway-mqtt.log &
    echo 'SAP IoT Edge MQTT Gateway started in background'
    exit 0
    ```

### Make it executable

    `chmod +x /etc/init.d/sap-iot-edge-gateway-mqtt-start.sh`

### Test it (be sure you have used full path)

### Add it in /etc/rc.local before 'exit 0' line

    `sudo nano /etc/rc.local`

## Credits

    Document created using the tutorial : https://causeyourestuck.io/2016/04/30/run-node-js-script-startup/