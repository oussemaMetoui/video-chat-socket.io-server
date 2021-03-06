const credentials = require('./credentials');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let server;
let port;

if (credentials.key && credentials.cert) {
  const https = require('https');
  server = https.createServer(credentials, app);
  port = 443;
} else {
  const http = require('http');
  server = http.createServer(app);
  port = 3000;
}
app.use(bodyParser.json());

const io = require('socket.io')(server);
const RoomService = require('./RoomService')(io);
io.sockets.on('connection', RoomService.listen);
io.sockets.on('error', e => console.log(e));
app.use(express.static(__dirname + '/public'));
app.get('*', function(req, res) {
    res.sendFile(`${__dirname}/public/index.html`);
});
server.listen(process.env.PORT || 3000, () => console.log(`Server is running on port ${port}`));
