let video;
let poseNet;

let noseX = 0;
let noseY = 0;

let leftEyeX = 0;
let leftEyeY = 0;
let rightEyeX = 0;
let rightEyeY = 0;

let leftEarX = 0;
let leftEarY = 0;
let rightEarX = 0;
let rightEarY = 0;

function setup() {
	createCanvas(800, 650);
	video = createCapture(video);
	video.hide();
	poseNet = ml5.poseNet(video, modelReady);
	poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
	//console.log(poses);
	if (poses.length > 0) {
		let newNoseX = poses[0].pose.keypoints[0].position.x;
		let newNoseY = poses[0].pose.keypoints[0].position.y;

		let newLeftEyeX = poses[0].pose.keypoints[1].position.x;
		let newLeftEyeY = poses[0].pose.keypoints[1].position.y;
		let newRightEyeX = poses[0].pose.keypoints[2].position.x;
		let newRightEyeY = poses[0].pose.keypoints[2].position.y;

		let newLeftEarX = poses[0].pose.keypoints[3].position.x;
		let newLeftEarY = poses[0].pose.keypoints[3].position.y;
		let newRightEarX = poses[0].pose.keypoints[4].position.x;
		let newRightEarY = poses[0].pose.keypoints[4].position.y;

		noseX = lerp(noseX, newNoseX, 0.5);
		noseY = lerp(noseY, newNoseY, 0.5);

		leftEyeX = lerp(leftEyeX, newLeftEyeX, 0.5);
		leftEyeY = lerp(leftEyeY, newLeftEyeY, 0.5);
		rightEyeX = lerp(rightEyeX, newRightEyeX, 0.5);
		rightEyeY = lerp(rightEyeY, newRightEyeY, 0.5);

		leftEarX = lerp(leftEarX, newLeftEarX, 0.5);
		leftEarY = lerp(leftEarY, newLeftEarY, 0.5);
		rightEarX = lerp(rightEarX, newRightEarX, 0.5);
		rightEarY = lerp(rightEarY, newRightEarY, 0.5);
	}
}

function modelReady() {
	console.log('Model is ready');
}

function draw() {
	image(video, 0, 0);

	//nose
	// fill(255, 0, 0);
	// ellipse(noseX, noseY, 50);

	//eyes
	fill(0,110, 0, 10);
	ellipse(leftEyeX, leftEyeY, 50);
	ellipse(rightEyeX, rightEyeY, 50);

  //left branch
  fill(51);
	rect(leftEyeX+20, leftEyeY, (leftEarX-leftEyeX), 10);

  //right branch
  fill(51);
	rect(rightEyeX-20, rightEyeY, (rightEarX-rightEyeX), 10);

  //cross section
  fill(51);
	rect(leftEyeX+((rightEyeX-leftEyeX)/3), leftEyeY, (rightEyeX-leftEyeX)/3, 10);

	//ears
	// triangle(x1, y1, x2, y2, x3, y3);
	// fill(200, 200, 0);
	// triangle(leftEarX, leftEarY, leftEarX+30, leftEarY+30, leftEarX+30, leftEarY);
	// triangle(rightEarX, rightEarY, rightEarX+30, rightEarY-30, rightEarX-30, rightEarY);

}
