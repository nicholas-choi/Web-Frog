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

wss.broadcast = function(message){
    for (let ws of this.clients){
    	ws.send(message);
    }
}

wss.on('connection', function(ws) {

	// On initial connection.
    console.log("A new client connected!");
    ws.send(JSON.stringify({'board': board}));

    ws.on('message', function(event) {
    	var jsonData = JSON.parse(event);
    	clickSquare(jsonData.move);
    	var JSONsend = {'board': board};
    	wss.broadcast(JSON.stringify({'board': board}));
    });
}); 


function clickSquare(i){
	if(move(i,i+board[i]))return;
	move(i,i+2*board[i]);

	//isWon();
}

/* Return true if moved, false otherwise. */
function move(i,j){
	if (isEmpty(j) == true) {
		var temp = board[i];
		board[i] = board[j];
		board[j] = temp;
		return true;
	}
	else {
		return false;
	}
}

/* Return true if board tile is 0 (empty), false otherwise. */
function isEmpty(i){
	if (board[i] == 0) {
		return true;
	}
	else {
		return false;
	}
}