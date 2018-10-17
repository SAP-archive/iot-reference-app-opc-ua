## Firmware Install

Login to the device in question using ssh (either via yaler or direct to the ip address in SAP Guest network). Both your machine and the device have to be in the Internet for this to work.

- Check Node.Js version: `node -v`  (in our case v6.9.2 as Intel MRAA needs this version)
- Check npm version: `npm - v`
- If it is older (eg. 3.10.9) do an `npm install -g npm@latest` to install the latest version. (sudo su if needed by your OS)
- Create a new folder called nodejs-firmware, change directory to this folder
- Using Filezilla move the latest firmware folder contents from [Firmware](../../Nodejs/node-firmware) to the firmware folder
- Do an 'npm install' in this folder to install all required packages
- Try to run the firmware once using `node app.js` or `npm start`
