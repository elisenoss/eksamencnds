import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({port:8080});
wss.on('connection', client => { //if someone connect, en klient
  client.on('message', (message,isBinary) => { //vite når klienten sener melding
    [...wss.clients]
      .filter(c => c !== client)
      .forEach(c => c.send(isBinary ? message.toString() : message));
  });
});
//om meldingen er binary send til alle andre klienter
//interesant kode - gjør om et set til et array