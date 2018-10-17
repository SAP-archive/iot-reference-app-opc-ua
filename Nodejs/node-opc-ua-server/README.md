## Custom OPC-UA Server App

This app is creating a custom OPC-UA Server endpoint and automaticaly creates from code some OPC-UA model hierarchy and nodes. In this version each time a new device is added, its creation has to be added in app.js code also. (copy paste and existing one and duplicate the logic). For further developments this auto creation of nodes should be ported to a configuration json file.

The custom OPC-UA Server is using 'memwatch-next' and 'heapdump' to save memory footprint if memory leaks are detected over multiple garbage collection cycles.

We had issues using an older node-opcua package version because of the increase of closedSessions property in the node opc ua server component.