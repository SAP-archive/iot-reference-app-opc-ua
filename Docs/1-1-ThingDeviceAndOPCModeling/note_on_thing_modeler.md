
## Thing Modeler

Thing Modeler is the UI of the thing modeler allows to create thing type and property type sets.

Part-of relations, is-relations or other "non-taxonomic" relations are only possible via API calls with Postman.

Yet there is no formal semantics for these relations. The user can add any kind "meaning" for the relations between two nodes in the tree / hierarchy.
The thing model does not have a meta model (or did I miss this?) in which the model elements are defined. This allows for a high flexibility, yet will lead to incompatible models or to miss-leading translations.

We did not understand the difference between measured and calculated values as for the application it does not matter - so we ended up creating one property current that was calculated and 3 for each phase to consider this part of our documentation.

We would have loved to put calculated values and measurements into same property set but that was not possible. So we only used measures then.

We created a sample thing for testing and ingested data to it via postman - the postman tutorial is at https://developers.sap.com/tutorials/iotae-api-postman.html.

We were confused by the notion of a sensor representing the values from multiple physical sensors.

We found that when you create a thing without properties you get a 500 error in the thing modeler.

We initially forgot to make some string type measurement properties dimensions - make sure you make them dimensions if you later want to use the o-data analytical api.
