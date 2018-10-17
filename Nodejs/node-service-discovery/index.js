//published services (server and clients)
var services = {
    server : {},
    clients : []
};

// create express app
var express = require('express');
var app = express();
var router = express.Router();

// incluse auth library for express
var basicAuth = require('express-basic-auth');

// use auto basic aurth with a static list of users
app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true,
    realm: 'randomrealmhere'
}));

// publish server data via GET parameter named ip
router.get('/server', function(req, res) {
    
    var serverIp = req.query.ip;

    services.server = {
        serverIp : serverIp,
        lastSeen : new Date()
    };

    res.send(true);
});

// hartbeat for server
router.get('/server/heartbeat', function (req, res) {
    
    services.server.lastSeen = new Date();

    console.log(services);

    res.send(true);
});

// publish client data via GET parameter named ip
router.get('/client', function(req, res) {
    
    var clientIp = req.query.ip;

    var result = services.clients.filter(function(client) {
        return client.clientIp == clientIp;
    });

    if(result === undefined || result.length === 0){
        services.clients.push({
            clientIp : clientIp,
            lastSeen : new Date()
        });
    }

    res.send(true);
});

// hartbeat for client
router.get('/client/heartbeat', function (req, res) {
    
    var clientIp = req.query.ip;

    var found = false;
    for(var i = 0 ; i < services.clients.length; i++){
        if(services.clients[i].clientIp === clientIp){
            services.clients[i].lastSeen = new Date();
            found = true;
        }
    }

    if(!found){
        services.clients.push({
            clientIp : clientIp,
            lastSeen : new Date()
        }); 
    }

    res.send(true);
});

// get services current status
router.get('/status',  function (req, res) {
    res.json(services);
});

// use the router with /opcua after base href
app.use('/opcua', router);

// start express app and listen
app.listen(8080, function(){
    console.log('Service discovery for OPC-UA Server and OPC-UA clients listening on port 8080');
});