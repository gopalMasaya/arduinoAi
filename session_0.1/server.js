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
  console.log(data)
}
