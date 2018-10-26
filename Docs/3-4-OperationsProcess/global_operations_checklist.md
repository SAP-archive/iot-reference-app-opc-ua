# global operations checklist

Running systems operated by us

- Raspberry PI in WDF01 C3.11 running OPC-UA Server, our own middleware and edge gateway
	- 10.94.57.25 ip address eth0 (DHCP)
	- b8:27:eb:9a:0b:b8 mac addess eth0
	- opc.tcp//10.94.57.25:4334 node OPC-UA Server
    - sap4iot-7z1d-gm66 is the yaler domain
	- ... is the password of user pi
(decomisioned - windows 10 server in WDF01 C3.11 running OPC-UA Server, our own middleware and edge gateway
	- ip addresses: 10.94.13.39 lan, (10.94.53.116 wifi in sap-guest network, unused)
	- mac addresses: 54-EE-75-5F-E9-11 lan, 5C-E0-C5-FE-14-92 wifi
	- opc.tcp//10.94.13.39:4334 node OPC-UA Server
	- opc.tcp://10.94.13.39:16664/OpenOpcUaCoreServer open OPC-UA Server
	- administrator user is d039026
- Siemens IoT 2040 device in WDF01 cellar, third switchboard from the right
	- 10.94.31.59 ip address eth0, 192.168.200.1 eth1 used only for maintenance locally connecting to the device
	- E0-DC-A0-16-A2-BD	eth0 (DHCP), E0-DC-A0-16-A2-BE eth1 (fixed IP)
	- ... is the default password for root user
	- 10022 is the port to be used for accessing via yaler
	- gsiot-pfet-7cs4 is the relay domain to be used with yaler
- Siemens IoT 2020 device in WDF01 C3.11 to run special version of firmware to generate test data 24x7
	- E0-DC-A0-18-C5-95 eth0 mac address
	- 10.94.60.44 eth0 ip address (not yet fixed)
	- gsiot-e0cm-e6z6 is the yaler domain for this
	- 10024 is the port to be used for accessing via yaler
	- ... is the default password for root user
