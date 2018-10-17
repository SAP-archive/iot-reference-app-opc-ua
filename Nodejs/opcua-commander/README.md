## Installl OPCUA-Commander v 0.2.0 on the Raspberry PI

From our tests version 0.2.2 has some undiscovered bugs in packages node-opcua-client and/or node-opcua-server

Version 0.2.0 works fine.

```
git clone https://github.com/node-opcua/opcua-commander.git
cd opcua-commander

overwrite package.json with the one provided in this folder

copy the package-lock.json from this folder to opcua-commander folder

npm install
node index.js  -e opc.tcp://localhost:4334/ 
```

## DNS resolution in node-opcua-client

We found out that by default the hostname is resolved as a property [endpoint_must_exist] of the client has "true" value by default.
If that value is false the cient works ok.

## Credits

[opcua-commander github.com](https://github.com/node-opcua/opcua-commander)