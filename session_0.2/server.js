var SerialPort = require('serialport')
var readline = require('@serialport/parser-readline')
var serial = SerialPort.serialPort
var com = new SerialPort("com15",{baudRate:9600})

var toArduino
var toApp

com.on("open",open)

function open(){
  console.log("com is connected!!!")

}

var parser = com.pipe(new readline({delimiter:'\r\n'}))

parser.on("data",getData)

function getData(data){
//  console.log(data)
  toApp = data
}

var express = require('express')
var socket = require('socket.io')
var app = express()
var port = process.env.port || 4000
var server = app.listen(port)

app.use(express.static('public'))
io = socket(server)
io.sockets.on('connection',connected)

function connected(socket){
console.log("new connection"+ socket.id)

socket.on('msg',gotMessage)

function gotMessage(data){
  console.log(data)
  io.sockets.emit('msg',data)
com.write(data)
}
}
