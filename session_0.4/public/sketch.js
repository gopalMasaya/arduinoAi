var message = new Array (2)
var socket

var poseNet
var pose;
var video;


function setup() {
	createCanvas(640, 480);

video = createCapture(VIDEO).hide()
poseNet = ml5.poseNet(video,modelReady)
poseNet.on("pose",getPoses)

socket = io.connect('http://localhost:4000')
socket.on('msg',gotData)

function gotData(data){
	console.log(data)
}
}

function modelReady(){
	console.log("model is ready!!!")
}

function getPoses(poses){
//	console.log(poses)
if(poses.length > 0){
	pose = poses[0].pose;
}
}


function draw() {
background(0)
stroke(255)
line(width*0.5,0,width*0.5,height)
line(0,height*0.5,width,height*0.5)

	if(pose){

		if(pose.rightEye.x < width*0.5){message[0]= 0}
		if(pose.rightEye.x > width*0.5){message[0]= 1}
		if(pose.rightEye.y < height*0.5){message[1]= 0}
		if(pose.rightEye.y > height*0.5){message[1]= 1}


   socket.emit("msg",message)
	 console.log(message)
   fill(255,0,0)
	 ellipse(pose.rightEye.x,pose.rightEye.y,16,16)

	}

}
