let canvas;
let video;
let poseNet;

//cat filter
let img;
//bubbles filter
let bubbles = []; // array of Bubble objects
//xmas filter
let snow = [];
let gravity;
let zOff = 0;
let spritesheet;
let textures = [];

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

function setup() {
    setupCanvas();
    setupVideo();
    setupPoseNet();

    setupBubbles();
    setupSnowFlakes();
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

function preload() {
    //preload snow flakes
    spritesheet = loadImage('assets/flakes32.png');
    //preload cat image
    img = loadImage("assets/cat-ear.png");
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
    image(img, noseX - 120, noseY - 200, img.width / 5, img.height / 5);
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

// Bubble class
function Bubble() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(5, 40);
    this.speed = 1;

    this.move = function () {
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);
    };

    this.display = function () {
        stroke('#ffffff');
        strokeWeight(1);
        fill('#1ee8fc');
        ellipse(this.x, this.y, this.diameter, this.diameter);
        fill('#ffffff');
        ellipse(this.x+this.diameter/4, this.y-this.diameter/4, this.diameter/5, this.diameter/5);
        noStroke();
    };
}

class Snowflake {
    constructor(sx, sy, img) {
        let x = sx || random(width);
        let y = sy || random(-100, -10);
        this.img = img;
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.angle = random(TWO_PI);
        this.dir = (random(1) > 0.5) ? 1 : -1;
        this.xOff = 0;
        this.r = this.getRandomSize();
    }

    applyForce(force) {
        // Parallax Effect hack
        let f = force.copy();
        f.mult(this.r);
        this.acc.add(f);
    }

    randomize() {
        let x = random(width);
        let y = random(-100, -10);
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.r = this.getRandomSize();
    }

    update() {
        this.xOff = sin(this.angle * 2) * 2 * this.r;
        this.vel.add(this.acc);
        this.vel.limit(this.r * 0.2);

        if (this.vel.mag() < 1) {
            this.vel.normalize();
        }

        this.pos.add(this.vel);
        this.acc.mult(0);

        if (this.pos.y > height + this.r) {
            this.randomize();
        }

        // Wrapping Left and Right
        if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        }

        this.angle += this.dir * this.vel.mag() / 200;
    }

    render() {
        push();
        translate(this.pos.x + this.xOff, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.img, 0, 0, this.r, this.r);
        pop();
    }

    getRandomSize() {
        let r = pow(random(0, 1), 3);
        return constrain(r * 32, 2, 32);
    }
}
