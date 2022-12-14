const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');


const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

// Setting up a websocket to listen to any changes to the comments:
const wss = new WebSocket.Server({ port: 3002 });

// Whenever a client connects, set up the broadcast whenever one client send a message (message is sent on comment submission).
wss.on('connection', ws => {
  ws.on('message', message => {
    wss.broadcast()
  });
});

// Send all the clients a message that a comment has been updated so that they pull in the lastest comment. 
wss.broadcast = () => {
  wss.clients.forEach((client) => {
    if (client.readyState == WebSocket.OPEN) {
      client.send('Comments were updated')
    }
  })
}

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    response.send(result);
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});
