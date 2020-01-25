const backgroundColor = '#402724';
const particleColor = '#E2B08311';

let particles = [];

/**
 * Built in p5 setup()
 */
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    const count = Math.floor(window.innerWidth / 8);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

/**
 * Built in p5 draw() that gets called over and over
 */
function draw() {
    background(backgroundColor);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        particle.check(particles.slice(index));
    });
}

class Particle {

    constructor() {
        /**
         * The position of the particle
         */
        this.position = createVector(random(width), random(height));

        /**
         * The size of the particle
         */
        this.size = 10;

        /**
         * The velocity of the particle
         */
        this.velocity = createVector(random(-2, 2), random(-2, 2));
    }

    /**
     * Detect the edges of the screen
     */
    check(particles) {
        particles.forEach((particle) => {
            const distance = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);
            if (distance < 100) {
                stroke(particleColor);
                line(this.position.x, this.position.y, particle.position.x, particle.position.y)
            }
        });
    }
    
    /**
     * Draw the particle
     */
    draw() {
        noStroke();
        fill(particleColor);
        circle(this.position.x, this.position.y, this.size);
    }

    /**
     * Detect the edges of the screen
     */
    edges() {
        if (this.position.x < 0 || this.position.x > width) {
            this.velocity.x *= -1;
        }

        if (this.position.y < 0 || this.position.y > height) {
            this.velocity.y *= -1;
        }
    }

    /**
     * Update the particle
     */
    update() {
        this.position.add(this.velocity);
        this.edges();
    }
}

