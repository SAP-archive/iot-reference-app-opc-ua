# iot reference app for opc ua - Description

This iot reference application is meant to make it simpler for you to build your own iot application. It walks you through all of the steps and provides you with all project documentation, configuration and source code required for you to be able to reproduce the application 1:1. We used the below phases to define the milestones for such an implementation project. The numbering of the phases is also reflected in the documentation folder names.

## Project Phase 0 - Preparation

In this initial phase we made sure we have all the systems and resources that we need to understand and complete the project.

## Project Phase 1 - Rapid Prototyping

Next we went ahead and implemented quick prorotype showing that all piecess fit together in the lab. This was a pre-requisite before deploying the Hardware into the wild - if it does not work in the lab there is no point. We also used this phase to establish Backlog for what is required to scale in production.

## Project Phase 2 - Deployment in the Wild

After making sure we have all of the piece under control and we can keep them running we put one device in production. Why this? The key in this phase is to get real live measurements to prove or disprove, that our idea for the application would make sense or not. So now we collect the data, on which we can build the application on. This also served as a proof of connectivity and stability and performance under real conditions.

## Project Phase 3 - Application Development & Hardening

Now we were able to build the applications to be shared with end users. Development of the application also included onboarding of devices and users into these applications and having an operations approach. In a lot of cases we had issues with networking, communication and operating systems. We invested additional effort to remedy these (e.g. to make all devices reboot once a day). This also included the necessayr security audit.

## Project Phase 9 - Operations and Open Items

There were some things we did not address. We summarized them in open items and will do them in due course.

# Download, Installation & Configuration

We documented all of the steps of building the applications in chronological order in the [Docs](Docs) folder althrough of course some of the tasks could be done in parrallel. In the same folder you can also find images and information on the used Hardware which you can buy off the shelf if you want to reproduce this scenario. We provided all of the source code for all self-written software components in the [Nodejs](Nodejs) and the [UI5](UI5) folders and we also provided configuration files for other components or packages were required. You can download all of them from github as a zip file or by cloning or forking the project. Then follow the instructions on the project documentation.

# Limitations & Known Issues & To Dos

This Reference app is of limited scope and the focus of providing it is not the functional scope of the app but getting you familiar with the SAP tooling and the typical steps in an implementation project. the project was done in the Spring of 2018 and as we continously improve our pplatform some of the steps might be simpler or slightly different today. The last folder in the documentation covers next steps or to dos.

## Key Issues, Key Decisions, Problems and Design Decisions

1. We think its unusual that for deploying an app in CF, that makes use of iot ae, it is required to create a ticket.
2. Tutorials for iot service or iot ae are hard to understand, pre-requisites are sometimes not clear, troubleshooting help would be great.
3. We saw ioverall a lot of complexity to put all of these components together - especially the tooloing around opc-ua did cost us quite some time to get right.
4. Providing a name for the iot service edge gateway that is different from the cloud gateway wouldbe good.
5. We decided to use the edge gateway only to make onboarding of devies simpler due to the loosened security requirements in a local network but we decided against using it for opc ua protocal translation.
# Prerequisites and Requirements
As a prerequisite you need to have access to an SAP Cloud Platform landscape with neo sub-account, cloud foundry sub-account, sap cloud identity tenant, a subscription to IoT Application Enablement and an Instance of iot (service) for cloud foundry. You might also want to use Hardware similar to the one used in this reference application. As a partner you can get the above licenses as part of the iot addon pack from partner edge program and as a customer you have to work with your sap account team to get a test license or a full license.

# Support

Please check thw iot application enablement topic at sap.com for answers and raise your questions there. You should get support within a day or 2. If you think you found a bug please raise a ticket at support.sap.com for the components starting with iot-ae and bc-neo-iot-svc.

# Contributing

If you have feedback or suggestions for improvements please also use the above channel. You can also do a pull request if you made changes to the reference app that you want to share with others and we will review it.

If you want to publish your application as another "reference app" please feel free to do so in your own space and let us know via above channel. If we have multiple of them we will create a reference list of such scenarios both from partners and SAP.

# License
Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the LICENSE.txt file
