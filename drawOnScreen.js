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
