## Why we need automatic boot-up scripts

We have a custom Node.js middleware, the opc ua server and the Java IoT Edge Gateway that have to start automatic at boot time as services if some power outage ocurs or a reboot is needed.

### On the Raspberry PI 3

    In this order scripts will start at boot :

    * OPC-UA server
    * Custom middleware
    * IoT Edge Gateway

    More info about creating scripts : [here](RaspberryPi3.md)

### On the Siemens IoT 2040 PLC controller

    In this order scripts will start at boot :

    * Custom Firmware that reads data from sensors and sends it to OPC-UA server
    * YalerTunnel for remote access

    More info about creating scripts : [here](SiemensIOT2000.md)
