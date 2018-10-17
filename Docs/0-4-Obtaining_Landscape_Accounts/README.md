## Obtaining a Full Landscape ready for use by End Users

We aquired all of the needed systems from within SAP folowing an internal process flow.

For an external user, it will be different. 

You need the following to get started:

1. A cloud foundry global and sub-account
2. An instance of SAP Cloud Platform IoT (Service) for cloud foundry
3. An identity tenant from SAP Cloud identity (you might want o re-use your exisiting one used in your company and for other projects)
4. A subscription to SAP IoT Application Enablement in your cloud foundry sub-account
1. You need trust setup between your identity tenant and the cf sub account
6. To use the web ide you also need a neo global account and a sub-account
5. You need to do Trust setup three ways between the cf and neo sub-account and the identity tenant
7. You need to create destinations to make the link between neo and cf work (more details on this here: https://help.sap.com/viewer/86ce311577794701bae493bddd753aa3/latest/en-US/8d4601a525d94ab7baa603e26b8be580.html)

For the first 4 steps getting a license from your SAP account team (can also be a test license) or if you are a partner subscribing to the iot add-on package of cloud platform will trigger that SAP does the setup of these systems for you.