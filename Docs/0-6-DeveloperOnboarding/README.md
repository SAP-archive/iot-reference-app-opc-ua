For all developers we onboarded each to all below roles and accounts:

## Global Account Members in Cloud Foundry

### Why ?

The D-, I- or S-User IDs added as Members in the the Global Account are Administrators. For all the team members we made then Administrators to allow them to create new sub-accounts.

### What we did

In the Global Account Cockpit, Members Section we clicked the Add Members. A maximum number of 100 User Ids may be added

## Subaccount Members in Cloud Foundry

### Why ?

By default only one user was automaticaly created with Organization Manager role. We need access as developers to create role collections for newly built apps.

### What we did

All the users added in the Subaccount may be 'Organization Manager' or 'Organization Auditor' and the person , who received the account, also had to make every developer an administrator from a security point of view.

## Cloud Foundry Org/Space Members

### Why ?

In Cloud Foundry users need access on Spaces with at least the developer role : 

* Space Developer

* Space Manager

* Space Auditor

This allows them to deploy apps into the space.

### What we did

We added all the users with 'Space Developer' role.

## WEB IDE assigning DiDeveloper role

### Why ?

To access the WEB IDE Full Stack (that also works with cloud foundry) users need to be configured in the SCP Neo Cockpit / Web IDE Configuration and they have to be assigned the DiDeveloper role. Then developers can leverage the Web IDE for their work.

### What we did

We opened the SCP Neo Cockpit -> Services -> SAP Web IDE Full-Stack -> Configure and assigned all the users to the  DiDeveloper role.

## SCP IoT Service Users and Tenants

### Users

We did not need tenants and so everyone used the root user and the root tenant. Once we work on a multi-tenant version of the app we would have to revisit this.

## SAP IoT AE Persons Onboarding

### Why ?

For users to have access to IoT AE services and the Thing Modeler, they have to be added as Persons. then developers can create thing model and map things to devices for example.

### What we did

We've opened the IoT AE Thing Modeler -> Tenant Administration -> Persons and added all the developers ad Persons with the folowing roles as needed for each user depending on his role on IoT AE Subscription :

    * Administrator

    * refapps-thingsuperuser

    * refapps-useradmin

## Github Users

### Why ?

For collaboration, source code adn docs versions' history we needed a source control system.
We choosed git because is easy to use and there are a lot of cloud providers to host git repositories.

### What we did

We created a GitHub Organization because we did not had one.
We created a new repository for our source code and docs.
We have added users to the Organization repository in GitHub as Owners and Members
