
function registerButtons() {
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

    document.getElementById("he-man-choice").addEventListener("click", function () {
        switchFilter('he-man');

        if (hemanSong.isPlaying() ) {
            stopHeManSong();
        } else {
            startHeManSong();
        }
    });

    document.getElementById("drawing-mode-choice").addEventListener("click", function () {
        switchFilter('drawing-mode');
    });

    document.getElementById("export-choice").addEventListener("click", function () {
        exportCanvas();
    });
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

function setupHeMan() {
    hemanSong = loadSound('assets/heman_song.mp3');
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
    //preload he man song
    hemanSong = loadSound('assets/heman_song.mp3');
}
