# Setup of an Edge Gateway

## Initial Attempt without Middleware

Initially we tried to directly hook up opc ua to the iot edge gateway. This failed in our situation due to the reasons described in [issues with opc ua and edge gateway](edge-gateway-issues.md)

## Final appoach with Middleware

Then we used a generic raspberry pi as a gateway server and decided to run the opc ua server, the middleware and the sap egde gateway on it. We were able to put the gateway onto the desk of one of our project team members and have the SAP-Guest network segment connected to this room and to this pi.

## Edge Component

We chose to use the edge component from SAP for simplifying the security setup. Instead of one certificate per device we only had to configure the gateway once and the device on-boarding would be simplified The details of how the edge gateway was installed and configured can be found here [edge gateway configuration](Install_IoT_Gateway_Edge_OPCUA.md)

## Configuring the Gateway to run 24x7 reliably and to be serviced

The Yaler setup is as described at yaler.net.

To reduce the load on this gateway we turned off the graphical window manager using rasp-config and to increase security we did not auto-login.

As the node js based opc ua server had a memory leak we added an entry into crontab to reboot the gateway at midnight once a day:

    0 0	* * * root reboot

We found this problem by looking at /var/log/syslog.1 and older

Additionally we configured for the pi to reboot on a daily basis at midnight to prevent any other problem with memory leaks of any kind. We followed these instructions to do this on the pi: https://raspberrypi.stackexchange.com/questions/2150/how-do-i-reboot-at-a-specific-time:

    1. sudo -i
    2. crontab -e
    3. <insert a line 0 0 * * * reboot> and then save and exit
    4. to check next day look at /var/syslog the next day to check if reboot did happen
