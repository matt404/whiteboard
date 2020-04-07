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

app.use(APP_ROOT_PATH);

app.get('/whiteboard/create', onCreateWhiteboard);
app.get('/whiteboard/:key/cache', cors(), getWhiteboardCache);

function onConnection(socket){

  console.log("onConnection", socket.nsp.name);

  socket.on('drawing', function(data){
    socket.broadcast.emit('drawing', data);

    recordDrawingEvent(socket.nsp.name, data);
  });
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

  console.log(whiteboardUUID,redirectURL);

  res.redirect(301, redirectURL);
}

io.of(uuidRegExp).on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
