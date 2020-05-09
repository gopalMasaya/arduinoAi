var message = new Array (2)
var socket
let video;
let poseNet;
let pose;
let skeleton;

function setup() {
	createCanvas(windowWidth, windowHeight);
	video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);


socket = io.connect('http://localhost:4000')
socket.on('msg',gotData)
message[0]=20;
function gotData(data){
	console.log(data)
}
}

function modelLoaded() {
  console.log('poseNet ready');
}

function gotPoses(poses) {

  if (poses.length > 0) {
	//	console.log(poses);
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function draw() {
	image(video, 0, 0);

if(pose){
message[0]= pose.rightEye.x
message[1]= pose.rightEye.y

socket.emit('msg',message)


fill(255, 0, 0);
ellipse(pose.rightEye.x, pose.rightEye.y, 12);

}
}
