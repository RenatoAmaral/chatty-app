const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

const broadcast = (msg) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

wss.on('connection', function connection(ws) {

  console.log(`'Client connected', Active users: ${wss.clients.size}`);
  let activeUsers = {
        activeUsers: wss.clients.size,
        type: 'connectedClients'
      }

  broadcast(JSON.stringify(activeUsers))

  ws.on('message', function incoming(data) {

    let message = JSON.parse(data)

    switch(message.type) {
      case 'postMessage':
        message.type = 'incomingMessage'
        break
      case 'postNotification':
        message.type = 'incomingNotification'
        break
      default:
        console.error('Received message with unknown type')
    }

    // Broadcast to everyone else.
    broadcast(JSON.stringify(message))
  });

  ws.on('close', () => {

    console.log(`'Client disconnected', Active users: ${wss.clients.size}`);
    let activeUsers = {
          activeUsers: wss.clients.size,
          type: 'connectedClients'
        }
    broadcast(JSON.stringify(activeUsers))

    // At this point in time wss.clients no longer contains the ws object
    // of the client who disconnected
  });
});






