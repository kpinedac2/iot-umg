
const express = require('express');
const SocketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = SocketIo.listen(server);

//JOHNNY FILE SERIALPORT//////////////////////////////////////////////////////////
var five = require("johnny-five")
var firebase=require("firebase");
var board = new five.Board ({port : "COM4"});

board.on("ready", function() {
  var led = new five.Led(13);
  var rele= new five.Relay(8);

  // This will grant access to the led instance
  // from within the REPL that's created when
  // running this program.
  this.repl.inject({
    led: led,
    rele:rele
  });

  // Initialize Firebasew`
   // todo: Replace with your project's customized code snippet
   var config = {
     apiKey: "AIzaSyC_Y0KDaIpOBiHnLsbs2ZdxdQfJjOU1gnQ",
     authDomain: "iot-itemp.firebaseapp.com",
     databaseURL: "https://iot-itemp.firebaseio.com",
     storageBucket: "iot-itemp.appspot.com",

   };
   firebase.initializeApp(config);

   var starCountRef = firebase.database().ref('reley').on('value', function(snapshot) {


  let reley = snapshot.val();
  if (reley=='on')
  {
    rele.on();
  }else {
    rele.off();
  }
   });

});






//////////////////////////////////////////////////////////////////////////////////

io.on('connection', function (socket){
//  console.log('NUEVO DISPOSITIVO CONECTADO');
});
// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
//const parser = new Readline();

const mySerial = new SerialPort('COM3', {
  baudRate: 9600
});

const parser=mySerial.pipe(new Readline({delimiter: '\r\n'}));

mySerial.on('open', function () {
  console.log('Opened Port.');
});
mySerial.on('data', function (data) {
  //console.log(parseInt(data)+ " ℃");
  io.emit('arduino:data', {
   value: data.toString()
 });
 let temp=parseInt(data, 10)+ " ℃";
   io.emit('arduino:temp', data.toString());
});

/////////////////////////////////////////////////////////////////////////////JOHNNY five



////////////////////////////////////////////////////////////////////////////////end johnny-five



mySerial.on('err', function (data) {
  console.log(err.message);
});

server.listen(8080, () => {
  console.log('Server on port 8080');
});
