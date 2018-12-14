let canvas;
let video;
let poseNet;

//cat filter
let catEarsImg;

//bubbles filter
let bubbles = []; // array of Bubble objects

//xmas filter
let snow = [];
let gravity;
let zOff = 0;
let spritesheet;
let textures = [];

//candy cane filter
let candyCaneImg;

//wave filter
let t = 0; // time variable

//he man filter
let hemanSong;
let isHeManFilterEnable = false;//Enable He man filter or not

//drawing mode filter
let paths = [];// All the paths
let painting = false;// Are we painting?
let next = 0;// How long until the next circle
let current;// Where are we now and where were we?
let previous;

//posnet
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

let selectedFilter = 'none';

function setup() {
    registerButtons();

    setupCanvas();
    setupVideo();
    setupPoseNet();

    setupBubbles();
    setupSnowFlakes();
    setupHeMan();
    setupDrawingMode();
}

function gotPoses(poses) {
    // console.log(poses);
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

function switchFilter(filter) {
    selectedFilter = filter;

    //remove drawings
    noStroke();

    //force tint to be clear
    if(isHeManFilterEnable) {
        tint(255, 255, 255, 100);
    }

    clear();
}

function draw() {
    image(video, 0, 0);

    if (selectedFilter == 'none') {
        drawNone();
    }
    if (selectedFilter == 'round-glasses') {
        drawRoundGlasses();
    }
    if (selectedFilter == 'square-glasses') {
        drawSquareGlasses();
    }
    if (selectedFilter == 'clown') {
        drawClown();
    }
    if (selectedFilter == 'cat') {
        drawCat();
    }
    if (selectedFilter == 'flower') {
        drawFlower();
    }
    if (selectedFilter == 'snow') {
        drawSnow();
    }
    if (selectedFilter == 'bubbles') {
        drawBubbles();
    }
    if (selectedFilter == 'trippy') {
        drawTrippy();
    }
    if (selectedFilter == 'candy-cane') {
        drawCandyCane();
    }
    if (selectedFilter == 'wave') {
        drawWave();
    }
    if (selectedFilter == 'he-man') {
        drawHeMan();
    }
    if (selectedFilter == 'drawing-mode') {
        drawDrawingMode();
    }
}

// Particles along the path
function Particle(position, force, hue) {
    this.position = createVector(position.x, position.y);
    this.velocity = createVector(force.x, force.y);
    this.drag = 0.95;
    this.lifespan = 255;
}

Particle.prototype.update = function () {
    // Move it
    this.position.add(this.velocity);
    // Slow it down
    this.velocity.mult(this.drag);
    // Fade it out
    this.lifespan--;
};

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function (other) {
    stroke(255, this.lifespan);
    fill(255, this.lifespan / 2);
    ellipse(this.position.x, this.position.y, 8, 8);
    // If we need to draw a line
    if (other) {
        line(this.position.x, this.position.y, other.position.x, other.position.y);
    }
    noStroke();
};

function startHeManSong() {
    hemanSong.play();
}

function stopHeManSong() {
    hemanSong.stop();
}

function exportCanvas() {
    saveCanvas(canvas, 'my_filter_picture.jpg');
}
