## Network Setup

The device will be connected to the Internet only and not to the SAP corporate network. Connecting to the corporate network is not necessary and as there might be many IoT Devices, its also safer to have them not in the intranet.

The devices are still protected from the internet by residing inside a network segment, that is not reachable from outside. Only the device can initiate a connection to the Internet but not vice versa.

We have the following devices:
1. multiple siemens devices that measures the sensor values
2. one raspberry pi server running the opc ua server and the iot service edge gateway

We initially tried to run all 3 components on the siemens iot 2040 device for keeping it simple. Unfortunately the siemens device did not have enough processing power for the iot edge component. So that's when we moved to a separate device for it.

## Landscape Links

As many different servers and system were used we created one central list of all links in the landscape at [landscape links file](landscape_links.md)

## Remote Access Setup
Now to be able to administer these components (upgrade, find sources of errors) we need to connect to them somehow (they are not in the intranet, right?). First option is to use the second LAN port on the iot 2040. The first LAN port is configured to use dhcp to get its (local) ip address and to connect to the internet. One good way to hook up to the device still is to use the second port with a fixed ip address. This way this lan port is not used by the device to connect to the Internet but it can still be reached from a PC connected via the second LAN port that also has a fixed ip address. Then its easy to do ssh or use other protocols with the root user to the device. But this access requires facilities to give us access to the rack and us to stand next to the rack to do our work.

The other option is to establish a remote access solution via the Internet. Possibilities would be headless teamviewer, hamachi, dynvpn. We had issues installing all of these on the stock yocto linux coming with the iot 2040 so we started using a service from yaler.net that provides an ssh tunnel. We go this to work including the setup required to start this service automatically when the device reboots.

We still need to do a final check on the threat vectors from a security point of view that this opens but for the prototyping phase this is very helpful - also if you have team-members working from a remote location where the device and the team-members cannot be on the same network segment.

The details of the configuration are shown below.

1. Installed Yaler Tunnel for Siemens IOT2020 (same as IOT2040) in the /home/root/yalertunnel folder

    https://yaler.net/siemens-iot2020

2. We have added Yaler Tunner script to start at boot time

    Example url from Siemens forum regarding this topic :

    https://support.industry.siemens.com/tf/ww/en/posts/how-to-run-an-eclipse-project-at-startup/155613/?page=0&pageSize=10

## How we did the script

Change to the directory /etc/init.d

cd /etc/init.d

Create a new shell-script:

sudo nano <yaler-start.sh>

Type in:

```
#!/bin/bash
echo "Yaler Start $0: $*"
set -x
echo 'Starting Yaler...'
sudo /home/root/yalertunnel/yalertunnel proxy 127.0.0.1:22 try.yaler.io:80 gsiot-pfet-7cs4 > /var/log/yaler.log &
echo 'Yaler started in background'
exit 0
```

Press Ctrl+X to save the file
Press Y to confirm
Press Enter

Now you have to change the rights of this script:

```
sudo chmod +x yaler-start.sh
```

Test the script to see if it is working !!!
(Don't forget to use full paths for script when using bash commands)

At last this script has to be added to the autostart:

```
update-rc.d yaler-start.sh defaults 99
```

After a reboot the Yaler program runs automatically at startup.

Then we created a guide that explains to a developer how to use yaler on his machine: [Yaler Developer Guide](AccessSiemensAndRaspberryViaYaler.md)
