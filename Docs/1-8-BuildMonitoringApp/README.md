##  Developing Monitoring Web Application

We used the following to guide us in this step:

Setup Cloud Foundry Environment:
https://github.com/SAP/cloud-cf-product-list-sample/tree/master/exercises/04_push

Building the App using Web IDE Full-Stack:
https://www.sap.com/developer/tutorials/iotae-comp-buildappmc0.html

We explored sharing our sources via our external Github in the Web IDE. For this to work, we had to put in the email address and user id in Github and the clone our git repository into the WEB IDE. We encountered issues with authentication. This does not work probably due to our custom Identity Provider. So we skipped this step.

After that we tried the Github repository inside of Neo. This worked better and multiple developers could share and work on versions of the UI App in parallel or to deploy the latest version on server.

In the end we failed with this as it was unclear to some developers, what password was requested.

## Deploying the Web Application

We followed this guide for the most part: https://help.sap.com/viewer/86ce311577794701bae493bddd753aa3/latest/en-US/72a9e86759184156b2c18997de00c752.html

In this guide we found out that we need to create a manifest.yml file to define the size of the app - otherwise it would require 2 GB of RAM which is really a waste of resources for an static HTML5 app. The other option is to change the quota after it was pushed the first time in the SAP Cloud Foundry Cockpit. 128 MB for both memory and disk was not sufficient, 256 MB was required.

We downloaded the app as a zip file into our share and shared it this way.

The next step was to create a new role collection and user group for the end user of the App. To be able to do this, the creator of the sub-account had to make the developer user of the person who does this an "Administrator" in regards of security for the sub-account.

After this, we created a role-collection called "kettle_monitor" for users that are to use this Web App.

We added the roles from KettelMonitor4!t1921:  KettelMonitor4_UI_Viewer to limit the rights for users of the app to only view stuff.

In the SAP IoT Application Enablement capabilities app we first created a new capability "thing_read" which allows to read things unrestricted.

Then in the User Groups app, we created a new user group called "kettle_monitor" which we tied to the above role collection and to the capability "thing_read".

The next step was to create the user on-boarding script to allow to have a defined process, with which new users are on-boarded into the Application.

## Implementation

The source code is here: [Monitoring App](../../UI5/kettlemonitor4).
