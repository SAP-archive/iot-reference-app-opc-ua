# OPC-UA

1. The config handles excluded namespaces instead of included nodes. In case there is large number of namespaces, it would be more efficient to include nodes instead of excluding.
Tip: Exclude namespace 0, 2 and 7 for the server node since it has many sub-nodes.

3. OPC-UA Object Folders were imported as Sensors. That did not make sense to us and it seems as if these relations are lost in the device model. Folders should be represented in some other way to allow applications to access it.
We were overwhelmed with all the sensors that were created for nodes that are not sensors. We learned that hierarchy and other properties of nodes are stored in properties but at the moment cannot be accessed via API. We decided not to use the IoT Edge gateway for opc ua, as this mapping from all nodes to sensors does not allow us to have one thing with multiple properties in the thing model at this time. We could have treated one phase sensor as one thing but then it would be very hard to use ui controls or applications on top of it.

4. The edge gateway takes 15 minutes for starting on a Siemens IOT2040 device. This was way too long for our use case and we moved to a Raspberry PI to run Edge Gateway instead.

5. The json config file for the OPC-UA gateway is not described in the pdf file or the online help. Which properties have to be configured was unclear to us. We wondered if there are any timeout config property for attaching to the JMS or for connecting to the OPC-UA Server. (Edit: In the reference documentation for the adapter configuration there is a sample config file: https://help.sap.com/viewer/643f531cbf50462c8cc45139ba2dd051/Cloud/en-US/c6fbcccd60e343d6a1f9475541e3c28d.html).

6. If the gateway fails to load the OP-UA server configuration, the gateway hangs-up and does not try another time as fail-over?

7. It took long for the gateway to attach to the JMS Broker (JMSConnectionManagerImpl line 168). (Edit: this might have been caused by the random number generation required for the security initialization. On some JVMs and Platforms this takes longer then on others.)

# MQTT

1. The example provided was missing the sensorTypeAlternateId which is important for ingesting data in more complex scenarios where you create your own sensor types (and do not use the built-in ones like Temperature). (Edit: in the meantime this has been updated and a good illustration is available at https://help.sap.com/viewer/c2717aff5c194576a9dd19d4cabef0ad/Cloud/en-US/9834838f97a0423dbd23829962140073.html)

In the end we understood: The OPC UA Node Classes are all turned into “Sensors” in IoT Edge Gateway. this design did not match our expectations and made integration with IoT Application Enablement difficult. The hierarchical (and apparently other) information from the OPC UA model is according to developers not lost, yet the APIs needed to get to this information are not yet available.
