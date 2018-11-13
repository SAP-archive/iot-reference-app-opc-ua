# iot reference app for opc ua - Description

This iot reference application is meant to make it simpler for you to build your own iot application. It walks you through all of the steps and provides you with all configuration and source code required for you to be able to reproduce the application 1:1.

It features the use of IoT Services 4.0, its Edge Gateway for OPC-UA, Use of Unix-based Gateways, IoT Application Enablement, IoT Hardware from Siemens, a Web-based UI and a batch application checking for threshold violations deployed to cloud foundry.

We used cooking kettles at SAP as the example devices to be monitored and to help SAP facilities with the maintenance of these kettles. You can see 5 of them in below picture.

The project is also documented in its phases at https://blogs.sap.com/?p=742754

![all hardware pieces](Docs/2-1-DeployDeviceForProductionUse/IMG_1385%202.JPG)

# Download, Installation & Configuration

We provided all of the source code for all self-written software components in the [Nodejs](Nodejs) and the [UI5](UI5) folders and we also provided configuration files for other components or packages were required. You can download all of them from Github as a zip file or by cloning or forking the project.

# Limitations & Known Issues & To Dos

This Reference app is of limited scope and the focus of providing it is not the functional scope of the app but getting you familiar with the SAP tooling and the typical steps in an implementation project. The project was done in the Spring of 2018 and as we continuously improve our platform some of the steps might be simpler or slightly different today.

# Prerequisites and Requirements
As a prerequisite you need to have access to an SAP Cloud Platform landscape with a neo sub-account, cloud foundry sub-account, sap cloud identity tenant, a subscription to IoT Application Enablement and an instance of iot (service) for cloud foundry. You might also want to use Hardware similar to the one used in this reference application. As a partner you can get the above licenses as part of the iot add-on pack from partner edge program and as a customer you have to work with your sap account team to get a test license or a full license or you can go to https://www.sapstore.com/solutions/40108/SAP-Leonardo-IoT-Foundation%2C-express-edition and buy most of the required components with your credit card.

# Support

Please check the iot application enablement or internet of things for cloud foundry topic at http://answers.sap.com for answers and raise your questions there. You should get support within a day or 2. If you think you found a bug please raise a ticket at http://support.sap.com for the components starting with iot-ae and bc-neo-iot-svc.

# Contributing

If you have feedback or suggestions for improvements please also use the above channel. You can also do a pull request if you made changes to the reference app that you want to share with others and we will review it. If you create an issue in this github we will also react but maybe not as fast as in the answers.sap.com channel.

If you want to publish your application as another "reference app" please feel free to do so in your own space and let everyone know via above channel.

# License
Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the LICENSE.txt file
