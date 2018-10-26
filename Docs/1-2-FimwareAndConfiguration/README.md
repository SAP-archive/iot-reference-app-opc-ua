## Device Firmware and Device Configuration

We tried to avoid to build firmware ourselves as much as possible. What we had to do however was to write code that reads from the current sensors. As the current sensor provide a reading that goes up and down with the alternating phase current we had to sample it 200 times and look for the max and the min.

We learned this from the examples of the shield manufacturer and we got reasonable readings after some attempts.

We also had to build code to generate the opc ua objects and feed in the data. As this is a standard api it should work with any server.

Right now we have put our code and the opc ua server all into one process/application. We can keep this up for simplicity but once we add more devices we have to decide if we want to have a more central opc ua server and split our code out of it.

We experimented with python and packages available on device (see files in this folder).

The source of the firmware may be found here : [Firmware](../../Nodejs/node-firmware)
