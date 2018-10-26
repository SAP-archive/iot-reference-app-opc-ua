## Why we need Yaler tunnel

    We need a secure SSH tunnel over the Internet to access the device remotely.
    This script also makes sure to update the time on the device and to reboot the device once a day (one never knows which process might have a memory leak when on these operating systems).



## What we did to access the device remotely

1. Installed Yaler Tunnel for Siemens IOT2020 (same as IOT2040) in the /home/root/yalertunnel folder

https://yaler.net/siemens-iot2020

2. We have added Yaler Tunner script to start at boot time

    Example url from Siemens forum regarding this topic :

    https://support.industry.siemens.com/tf/ww/en/posts/how-to-run-an-eclipse-project-at-startup/155613/?page=0&pageSize=10

## How we did the Yaler tunnerl start-up script

### Change to the directory /etc/init.d

    `cd /etc/init.d`

### Create a new shell-script

`nano yaler-start.sh`

### Type in the following and make sure you replace the yaler domain with a new one for this device

    ```
    #!/bin/bash
    echo "Yaler Start $0: $*"
    set -x
    echo 'updating time based on internet time'
    rdate time.nist.gov
    echo 'Starting Yaler...'
    /home/root/yalertunnel/yalertunnel proxy 127.0.0.1:22 try.yaler.io:80 gsiot-pfet-7cs4 > /var/log/yaler.log &
    echo 'Yaler started in background'
    echo 'Sheduling auto reboot at midnight'
    shutdown -r 00:00 &
    echo 'Auto Reboot scheduled'
    exit 0
    ```

    Press Ctrl+X to save the file
    Press Y to confirm
    Press Enter

### Now you have to change the rights of this script

`chmod +x yaler-start.sh`

### Test the script to see if it is working

(Don't forget to use full paths for script when using bash commands)

### At last this script has to be added to the autostart

`update-rc.d yaler-start.sh defaults`

## After a reboot the program runs automatically at startup

## How we connect to the device

https://yaler.net/ssh

Be sure that you have unrestricted internet access before trying to connect. On most enterprise networks you may have some restrictions.
