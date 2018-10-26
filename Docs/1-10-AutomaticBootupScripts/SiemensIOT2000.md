## For the reference app there are 2 start-up scripts that have to be started at boot time on the Siemens IoT 2020/2040 device

1. Yaler for remote ssh access
2. The Firmware (nodejs-firmware)

## Adding a script at boot time for the firmware (Yocto Linux)

The following steps are needed for the Siemens device to run script at boot-up

### Change to the directory /etc/init.d

    `cd /etc/init.d`


### Create a new shell-script:

    `nano kettle-firmware.sh`

### Type in:

    ```
    #!/bin/bash
    echo "Kettle Firmware Start $0: $*"
    set -x
    echo 'Starting Kettle Firmware...'
    cd /home/root/nodejs-firmware
    /usr/bin/node /home/root/nodejs-firmware/app.js > /var/log/kettle-firmware.log &
    echo 'Kettle Firmware started in background'
    exit 0c
    ```

Press Ctrl+X to save the file
Press Y to confirm
Press Enter

### Now you have to change the rights of this script:

    `chmod +x kettle-firmware.sh`

### Test the script to see if it is working !!!

(Don't forget to use full paths for script when using bash commands)

### At last this script has to be added to the autostart:

`update-rc.d kettle-firmware.sh defaults 99`

### After a reboot the program runs automatically at startup.

## Credits

Example url from Siemens forum regarding this topic :

https://support.industry.siemens.com/tf/ww/en/posts/how-to-run-an-eclipse-project-at-startup/155613/?page=0&pageSize=10
