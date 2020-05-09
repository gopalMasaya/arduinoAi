var message = new Array (2)
var socket

var poseNet
var pose;
var video;
var rightEye = 0;


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
	//image(video,0,0)
background(50)
stroke(255)
line(width/2,0,width/2,height)
line(0,height/2,width,height/2)
	if(pose){

		if(pose.rightEye.x > width*0.5){message[0]=1;}
	else	if(pose.rightEye.x < width*0.5){message[0]=0;}

		if(pose.rightEye.y > height*0.5){message[1]=1;}
  else 	if(pose.rightEye.y < height*0.5){message[1]=0;}

//message[2]= message[0]
		console.log( message)
   fill(255,0,0)
		ellipse(pose.rightEye.x,pose.rightEye.y,16,16)
		socket.emit('msg',message)

	}

}
