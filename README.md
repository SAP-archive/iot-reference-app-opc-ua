# IoT Reference Application for OPC-UA

## Description

This iot reference application is meant to make it simpler for you to build your own iot application. It walks you through all of the steps and provides you with all configuration and source code required for you to be able to reproduce the application 1:1.

It features the use of IoT Services 4.0, its Edge Gateway for OPC-UA, Use of Unix-based Gateways, IoT Application Enablement, IoT Hardware from Siemens, a Web-based UI and a batch application checking for threshold violations deployed to cloud foundry.

We used cooking kettles at SAP as the example devices to be monitored and to help SAP facilities with the maintenance of these kettles. You can see 5 of them in below picture.

The project is also documented in its phases at https://blogs.sap.com/?p=742754

![all hardware pieces](Docs/2-1-DeployDeviceForProductionUse/IMG_1385%202.JPG)

## Prerequisites
* [NodeJS](https://nodejs.org/en/download/) (we used v10.4.1)
* [SAP Cloud Platform Account](https://cloudplatform.sap.com/index.html) with a neo sub-account and a cloud foundry sub-account
* [SAP Cloud Identity tenant](https://cloudplatform.sap.com/capabilities/product-info.SAP-Cloud-Platform-Identity-Authentication.06dbcc67-ab2a-4d2e-aff1-28dfaaf95063.html)  **This is a commercial paid product**
* [A subscription to IoT Application Enablement](https://cloudplatform.sap.com/capabilities/product-info.SAP-IoT-Application-Enablement.d75c7af6-d803-46b2-bffc-5e39f6686043.html) and an instance of [iot (service) for cloud foundry](https://help.sap.com/viewer/2f1daa938df84fd090fa2a4da6e4bc05/Cloud/en-US).  **These are commericial paid products** 

You might also want to use Hardware similar to the one used in this reference application to allow you to run all of the source code and scripts one to one.

**Paid licenses**:  As a partner you can get the above licenses as part of the iot add-on pack from partner edge program and as a customer you have to work with your sap account team to get a test license or a full license or you can go to https://www.sapstore.com/solutions/40108/SAP-Leonardo-IoT-Foundation%2C-express-edition and buy most of the required components with your credit card.


## Download

[Download the files from GitHub as a zip file](https://github.com/SAP/iot-reference-app-opc-ua/archive/master.zip), or [clone the repository](https://help.github.com/articles/cloning-a-repository/) on your desktop.

## Installation

As the source code needs to be installed in different places (in your cloud platform account, on the gateway, on the device) there is no install script. Please follow the typical approach for managing source code, installing and building it for the different platforms. We do not provide any binaries.

## Configuration

The configuration required will depend on your network setup and hardware. We provided some example configuration for e.g. the OPC UA server in the source files that might be helpful to get you started. We also illustrated the Thing Model and you can configure it in IoT Application Enablement via the Thing Modeler apps.

## Support

Please check the iot application enablement or internet of things for cloud foundry topic at http://answers.sap.com for answers or to ask a new question relative to this reference application and relative to the products used. You might be referred to other support forums and channels from there.

## Contributing

If you have feedback or suggestions for improvements please also use the above channel. You can also do a pull request if you made changes to the reference app that you want to share with others and we will review it.

If you want to publish your application as another "reference app" please feel free to do so in your own space and let everyone know via above channel.

## License
Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](/LICENSE.txt)
