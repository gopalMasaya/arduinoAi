var message = new Array (3)
var socket


function setup() {
	createCanvas(windowWidth, windowHeight);
socket = io.connect('http://localhost:4000')

socket.on('msg',gotData)
message[0]=20;
function gotData(data){
	console.log(data)
}

}

function draw() {

socket.emit('msg',message[0])
}
