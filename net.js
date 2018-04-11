var netport = 10311;

var express = require('express');
var app = express();

var board=[1,1,1,0,-1,-1,-1];

// Web sockets to broadcast results
var WebSocketServer = require('ws').Server
   wss = new WebSocketServer({port: netport});

wss.on('close', function() {
    console.log('disconnected');
});

/*
wss.broadcast = function(){
        for(let ws of this.clients){
                ws.send(JSON.stringify(votes));
        }
} */

wss.on('connection', function(ws) {
    console.log("A new client connected!");
}); 

