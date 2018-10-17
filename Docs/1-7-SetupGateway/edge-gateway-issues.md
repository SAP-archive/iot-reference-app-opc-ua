IOT Edge Gateway java app issues :

OPC-UA

1. The config handles Excluded namespaces instead of included nodes. In case there is large number of namespaces, it would be more efficient to include nodes instead of excluding.
Tipp: Exclude namespace 0, 2 and 7 for the server node since it has many sub-nodes.

3. OPC-UA Object Folders were imported as Sensors. That did not make sense to us and it seems as if these relations are lost in the device model. Folders should be represented in some other way to allow applications to access it. 
We were overwhelmed with all the sensors that were created for nodes that are not sensors. We learned that hierarchy and other properties of nodes are stored in properties but at the moment cannot be accessed via API. We decided not to use the IoT Edge gateway for opc ua, as this mapping from all nodes to sensors does not allow us to have one thing with multiple properties in the thing model at this time. We could have treated one phase sensor as one thing but then it would be very hard to use ui controls or applications on top of it.

4. The edge gateway takes 15 min. for starting on a Siemens IOT2040 device. This is way too long.

5. The json config file for the OPC-UA gateway is not described in the pdf file. Which properties have to be configured? Is there any timeout config property for attaching to the JMS-something and for connecting to the OPC-UA Server

6. If the gateway fails to load the OP-UA server configuration, the gateway hangs-up and does not try another time as fail-over?

7. It takes to long for the gateway to attach on the JMS Broker (JMSConnectionManagerImpl line 168) ?

MQTT

1. The example provided is missing the sensorTypeAlternateId which is mandatory for ingesting data in more complex scenarios where you create your own sensor types (and not just Temperature).

In the end we understood: The OPC UA Node Classes are all turned into “Sensors” in IoT Edge Gateway. this design did not match our expectations and made integration with IoT Application Enablement difficult. The hierarchical (and apperently other) information from the OPC UA model is according to developers not lost, yet the APIs needed to get to this information are not yet available.

