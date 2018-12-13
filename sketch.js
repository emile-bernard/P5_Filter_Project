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

document.getElementById("none-choice").addEventListener("click", function () {
    switchFilter('none');
});

document.getElementById("round-glasses-choice").addEventListener("click", function () {
    switchFilter('round-glasses');
});

document.getElementById("square-glasses-choice").addEventListener("click", function () {
    switchFilter('square-glasses');
});

document.getElementById("clown-choice").addEventListener("click", function () {
    switchFilter('clown');
});

document.getElementById("cat-choice").addEventListener("click", function () {
    switchFilter('cat');
});

document.getElementById("flower-choice").addEventListener("click", function () {
    switchFilter('flower');
});

document.getElementById("snow-choice").addEventListener("click", function () {
    switchFilter('snow');
});

document.getElementById("bubbles-choice").addEventListener("click", function () {
    switchFilter('bubbles');
});

document.getElementById("trippy-choice").addEventListener("click", function () {
    switchFilter('trippy');
});

document.getElementById("candy-cane-choice").addEventListener("click", function () {
    switchFilter('candy-cane');
});

document.getElementById("wave-choice").addEventListener("click", function () {
    switchFilter('wave');
});

document.getElementById("drawing-mode-choice").addEventListener("click", function () {
    switchFilter('drawing-mode');
});

document.getElementById("export-choice").addEventListener("click", function () {
    exportCanvas();
});

function setup() {
    setupCanvas();
    setupVideo();
    setupPoseNet();

    setupBubbles();
    setupSnowFlakes();
    setupDrawingMode();
}

function setupCanvas() {
    canvas = createCanvas(640, 480);
}

function setupVideo() {
    video = createCapture(video);
    video.hide();
}

function setupPoseNet() {
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
}

function setupBubbles() {
    // Create objects
    for (let i = 0; i < 30; i++) {
        bubbles.push(new Bubble());
    }
}

function setupSnowFlakes() {
    gravity = createVector(0, 0.3);
    for (let x = 0; x < spritesheet.width; x += 32) {
        for (let y = 0; y < spritesheet.height; y += 32) {
            let img = spritesheet.get(x, y, 32, 32);
            image(img, x, y);
            textures.push(img);
        }
    }

    for (let i = 0; i < 400; i++) {
        let x = random(width);
        let y = random(height);
        let design = random(textures);
        snow.push(new Snowflake(x, y, design));
    }
}

function setupDrawingMode() {
    current = createVector(0, 0);
    previous = createVector(0, 0);
}

function preload() {
    //preload cat image
    catEarsImg = loadImage("assets/cat_ears.png");
    //preload snow flakes image
    spritesheet = loadImage('assets/flakes32.png');
    //preload candy cane image
    candyCaneImg = loadImage("assets/candy_cane.png");
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

    noStroke();
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
    if (selectedFilter == 'drawing-mode') {
        drawDrawingMode();
    }
}

function drawNone() {

}

function drawRoundGlasses() {
    //eyes
    fill(170, 27, 189, 0);
    stroke('#fc3dd9');
    strokeWeight(10);
    ellipse(leftEyeX, leftEyeY, 50, 50);
    ellipse(rightEyeX, rightEyeY, 50, 50);
    noStroke();

    //left branch
    fill('#8a2276');
    rect(leftEyeX + 20, leftEyeY, (leftEarX - leftEyeX), 10);

    //right branch
    fill('#8a2276');
    rect(rightEyeX - 20, rightEyeY, (rightEarX - rightEyeX), 10);

    //cross section
    fill('#8a2276');
    rect(leftEyeX + ((rightEyeX - leftEyeX) / 3), leftEyeY, (rightEyeX - leftEyeX) / 3, 10);
}

function drawSquareGlasses() {
    //eyes
    fill(170, 27, 189, 0);
    stroke('#fc3dd9');
    strokeWeight(10);
    rect(leftEyeX - 20, leftEyeY - 20, 50, 50);
    rect(rightEyeX - 20, rightEyeY - 20, 50, 50);
    noStroke();

    //left branch
    fill('#8a2276');
    rect(leftEyeX + 20, leftEyeY, (leftEarX - leftEyeX), 10);

    //right branch
    fill('#8a2276');
    rect(rightEyeX - 20, rightEyeY, (rightEarX - rightEyeX), 10);

    //cross section
    fill('#8a2276');
    rect(leftEyeX + ((rightEyeX - leftEyeX) / 3), leftEyeY, (rightEyeX - leftEyeX) / 3, 10);
}

function drawClown() {
    fill('#e90c06');
    ellipse(noseX, noseY, 50);
}

function drawCat() {
    image(catEarsImg, noseX - 120, noseY - 200, catEarsImg.width / 5, catEarsImg.height / 5);
}

function drawFlower() {
    fill('#fcaffa');
    translate(noseX + 30, noseY - 100);
    stroke('#fc3dd9');
    strokeWeight(2);
    for (let i = 0; i < 10; i++) {
        ellipse(0, 20, 20, 80);
        rotate(PI / 5);
    }
    noStroke();
}

function drawSnow() {
    zOff += 0.1;

    for (flake of snow) {
        let xOff = flake.pos.x / width;
        let yOff = flake.pos.y / height;
        let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
        let wind = p5.Vector.fromAngle(wAngle);
        wind.mult(0.1);

        flake.applyForce(gravity);
        flake.applyForce(wind);
        flake.update();
        flake.render();
    }
}

function drawBubbles() {
    //animate
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].display();
    }
}

function drawTrippy() {
    filter('INVERT');
}

function drawCandyCane() {
    image(candyCaneImg, mouseX - candyCaneImg.width / 7, mouseY - candyCaneImg.height / 8, candyCaneImg.width / 6, candyCaneImg.height / 6);
}

function drawWave() {
    // make a x and y grid of ellipses
    for (let x = 0; x <= width; x = x + 30) {
        for (let y = 0; y <= height; y = y + 30) {
            // starting point of each circle depends on mouse position
            let xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
            let yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
            // and also varies based on the particle's location
            let angle = xAngle * (x / width) + yAngle * (y / height);

            // each particle moves in a circle
            let myX = x + 20 * cos(2 * PI * t + angle);
            let myY = y + 20 * sin(2 * PI * t + angle);

            fill('#1ee8fc');
            ellipse(myX, myY, 20); // draw particle
        }
    }

    t = t + 0.01; // update time
}

function drawDrawingMode() {
    // If it's time for a new point
    if (millis() > next && painting) {

        // Grab mouse position
        current.x = mouseX;
        current.y = mouseY;

        // New particle's force is based on mouse movement
        let force = p5.Vector.sub(current, previous);
        force.mult(0.05);

        // Add new particle
        paths[paths.length - 1].add(current, force);

        // Schedule next circle
        next = millis() + random(100);

        // Store mouse values
        previous.x = current.x;
        previous.y = current.y;
    }

    // Draw all paths
    for (let i = 0; i < paths.length; i++) {
        paths[i].update();
        paths[i].display();
    }
}

// Start it up
function mousePressed() {
    next = 0;
    painting = true;
    previous.x = mouseX;
    previous.y = mouseY;
    paths.push(new Path());
}

// Stop
function mouseReleased() {
    painting = false;
}

// A Path is a list of particles
function Path() {
    this.particles = [];
    this.hue = random(100);
}

Path.prototype.add = function (position, force) {
    // Add a new particle with a position, force, and hue
    this.particles.push(new Particle(position, force, this.hue));
};

// Display plath
Path.prototype.update = function () {
    for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
    }
};

// Display plath
Path.prototype.display = function () {
    // Loop through backwards
    for (let i = this.particles.length - 1; i >= 0; i--) {
        // If we shold remove it
        if (this.particles[i].lifespan <= 0) {
            this.particles.splice(i, 1);
            // Otherwise, display it
        } else {
            this.particles[i].display(this.particles[i + 1]);
        }
    }
};

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

function exportCanvas() {
    saveCanvas(canvas, 'my_filter_picture.jpg');
}
