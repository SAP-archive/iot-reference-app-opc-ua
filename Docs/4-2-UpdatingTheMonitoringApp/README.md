## update monitoring app with new version

We saw, that the iot template is much better suited then the simple freestyle app we built so we decided to create a new app and deploy it under the name of the old app.

We first generated and tested a new app with the iot template.

Then we followed the instructions at https://help.sap.com/viewer/86ce311577794701bae493bddd753aa3/latest/en-US/72a9e86759184156b2c18997de00c752.html

We cross-checked with the mta.yaml file we had created earlier.

We did not need to create the uxsuaa app name with the xs-security json as we wanted to re-use what was created earlier.

And made sure we use the same xsuaa app name as in the past. This way we were able to avoid creating a ticket with iot-ae-ops.

We had to unbind the old app from the uaa service:

	cf unbind-service KM KettleMonitor4-uaa

then the new app could be deployed. We updated the user on-boarding scripts accordingly.
