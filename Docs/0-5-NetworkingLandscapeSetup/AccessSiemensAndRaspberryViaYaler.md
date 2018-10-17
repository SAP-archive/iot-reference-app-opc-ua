## How to access the PI and the Siemens Device via Yaler

You have to be in SAP-Internet or SAP-Guest for this to work. It does not work in the corporate network. Multiple people should be able to connect in parrallel. You can connect to the PI and to the Siemens device both at the same time as we use different ports here.

Follow the instructions step 1-4 at https://yaler.net/ssh to install the Java tunnel app on your machine or follow the putty instuctions and adjust accordingly the next steps.

1. to connect to the PI start the following java app on your machine:

    java YalerTunnel client 127.0.0.1:10023 via-eu-west-1.yaler.io:80 sap4iot-7z1d-gm66 >> yalpi.log &

2. then ssh to the PI using this (password is Ser22ver):

    ssh pi@localhost -p 10023 -o ServerAliveInterval=5

3. to connect to the Siemens device start the following java app on your machine:

    java YalerTunnel client 127.0.0.1:10022 try.yaler.io:80 gsiot-pfet-7cs4 >> yalsi1.log &

4. then ssh to the Siemens device using this (password is Dev22ice)

    ssh root@localhost -p 10022 -o ServerAliveInterval=5


5.  to connect to the 2nd Siemens device start the following java app on your machine:

    java YalerTunnel client 127.0.0.1:10024 try.yaler.io:80 gsiot-e0cm-e6z6 >> yalsi2.log &

6. then ssh to the the 2nd Siemens device using this (password is Dev22ice)

    ssh root@localhost -p 10024 -o ServerAliveInterval=5


7. you can also connect with filezilla via host sftp://localhost, user pi, password Dev22ice and port 10023 for the PI and user root and port 10022 for the Siemens Device.

8. opc console commander start-up command

    sudo opcua-commander -e opc.tcp://localhost:4334

    pi has mac B8-27-EB-CF-5E-ED

    


 PS: how to turn the tunnel on siemens manually   ./yalertunnel server 127.0.0.1:80 try.yaler.io:80 gsiot-pfet-7cs4