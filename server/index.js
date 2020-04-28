const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const WHITEBOARD_REDIRECT_URL = process.env.WHITEBOARD_REDIRECT_URL || "/whiteboard/";
const APP_ROOT_PATH = express.static(__dirname + '/public');
const uuidRegExp = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

let globalCache = {};

app.use('/static/', APP_ROOT_PATH);

app.get('/whiteboard/:key', getWhiteboardApp);
app.get('/whiteboard/create', onCreateWhiteboard);
app.get('/api/whiteboard/:key/cache', cors(), getWhiteboardCache);
app.get('*', onCreateWhiteboard);

function onConnection(socket){

  console.log("onConnection", socket.nsp.name);

  socket.on('drawing', function(data){
    socket.broadcast.emit('drawing', data);

    recordDrawingEvent(socket.nsp.name, data);
  });

  socket.on('disconnect', (reason) => {
    socket.broadcast.emit('participantUpdate', {count:Object.keys(socket.nsp.connected).length});
  });

  socket.nsp.emit('participantUpdate', {count:Object.keys(socket.nsp.connected).length});
}

function getWhiteboardApp(req,res){
  /*confirm that the key is a guid, else create a new key*/
  if(uuidRegExp.test(req.params.key)){
    let nsp = '/' + req.params.key;
    console.log("getWhiteboardApp", nsp);

    res.sendFile(__dirname+'/public/index.html');
  }else{
    onCreateWhiteboard(req, res);
  }
}

function getWhiteboardCache(req,res){
  let nsp = '/' + req.params.key;
  console.log("getWhiteboardCache", nsp);

  let whiteboardCache = globalCache[nsp];
  if(!whiteboardCache){
    whiteboardCache = {};
  }

  res.json(whiteboardCache);
}

function recordDrawingEvent(nsp,data){
  let nspCache = globalCache[nsp];
  if(nspCache){
    nspCache[nspCache.length] = data;
  }else{
    nspCache = [data];
  }
  globalCache[nsp] = nspCache;
}

function onCreateWhiteboard(req, res){
  const whiteboardUUID = uuid.v4();
  const redirectURL = WHITEBOARD_REDIRECT_URL + whiteboardUUID;

  console.log("onCreateWhiteboard",whiteboardUUID,redirectURL);

  //Temporary Redirect - so that the result won't be cached
  res.redirect(307, redirectURL);
}

io.of(uuidRegExp).on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
