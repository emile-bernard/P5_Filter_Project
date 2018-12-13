class Bubble {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.diameter = random(5, 40);
        this.speed = 1;
    }

    move () {
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);
    };

    display () {
        stroke('#ffffff');
        strokeWeight(1);
        fill('#1ee8fc');
        ellipse(this.x, this.y, this.diameter, this.diameter);
        fill('#ffffff');
        ellipse(this.x + this.diameter / 4, this.y - this.diameter / 4, this.diameter / 5, this.diameter / 5);
        noStroke();
    };
}
