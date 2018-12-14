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

function drawHeMan() {
    tint(255, 182, 193, 100);

    if(isHeManFilterEnable) {
        filter(POSTERIZE, 20);
    }
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
