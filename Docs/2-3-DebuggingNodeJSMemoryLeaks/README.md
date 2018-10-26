## Problems with memory leaks

As we had not really tested continuous, embedded operation in the lab we ran into problems where after days the opc ua server did not run anymore due to a memory leak (from not dropping closed sessions, found later it was marked as a to do in the source code).

We also had issues with the networking where the ip address of the device had changed due to being reallocated to the corporate network by others. These things happen in real live! Because of this we lost some data in this phase.

## Debugging Memory Leaks

We've used a great package for automatic memory monitoring that triggers an event when the memory is increasing after 5 garbage collection cycles

`npm install --save memwatch-next`

On Raspbian heapdump package for Node.js that worked is :

`npm install --save node-heapdump`

## Credits

Very helpfull blog about this :
[here](https://www.nearform.com/blog/self-detect-memory-leak-node/)
