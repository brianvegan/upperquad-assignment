class BounceParty {
    constructor(root, numOnStage) {
        this.root = document.querySelector(root);
        this.canvas = this.root.querySelector('.ballContainer');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.balls = []; // <Ball>[]
        this.totalBalls = numOnStage ? numOnStage : 1; // initialize with param or 1 default
        this.shouldRender = true;
        this.classWatcher = new ClassWatcher(this.root, 'is-visible', () => { this.setRenderOn() }, () => { this.setRenderOff() });

    }
    setRenderOn() {
        console.log('on')
        this.shouldRender = true;
        this.loop();
    }
    setRenderOff() {
        console.log('off')
        this.shouldRender = false;
    }
    collisionDetect() {
        for (j = 0; j < this.balls.length; j++) {
            if ( (!(this.x === this.balls[j].x && this.y === this.balls[j].y && this.velX === this.balls[j].velX && this.velY === this.balls[j].velY)) ) {
                var dx = this.x - this.balls[j].x;
                var dy = this.y - this.balls[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + this.balls[j].size) {
                    this.balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                }
            }
        }
    }
    loop() {
        if(this.shouldRender) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            // initializer, puts 25 balls on the stage
            while (this.balls.length < this.totalBalls) {
              var ball = new Ball(this.ctx, this.width, this.height);
              this.balls.push(ball);
            }
            
            for (let i = 0; i < this.balls.length; i++) {
              this.balls[i].draw();
              this.balls[i].update();
            }
    
            window.requestAnimationFrame(() => this.loop());
        }
    }
}

class Ball {
    constructor(ctx, canvasWidth, canvasHeight) {
        if(!ctx) {
            throw Error('cannot initialize without rendering context');
        }
        this.ctx = ctx;
        this.height = canvasHeight;
        this.width = canvasWidth;
        // random starting position
        this.x = this.random(0, this.width);
        this.y = this.random(0, this.height);
        // random velocity, tuned for the stage
        this.velX = this.random(-7, 7);
        this.velY = this.random(-7, 7);
        // any random color from three primary of color
        this.color = 'rgb(' + this.random(0, 255) + ',' + this.random(0, 255) + ',' + this.random(0, 255) +')';
        // random size
        this.size = this.random(10, 20);
    }
    random(min,max) {
        // classic random 
        var num = Math.floor(Math.random()*(max-min)) + min;
        return num;
    }
    draw() {
        // draw ball
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // give it a spherical radius
        this.ctx.fill();
    }   
    update() {
        // hit right vertical boundary 
        if ((this.x + this.size) >= this.width) {
            this.velX = -(this.velX);
        }
        // hit left vertical boundary
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        
        // hit top horizontal boundary
        if ((this.y + this.size) >= this.height) {
            this.velY = -(this.velY);
        }
        
        // hit bottom horizontal boundary
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        
        // apply next movement coordinates at current velocity
        this.x += this.velX;
        this.y += this.velY;
    }
}

const bouncy = new BounceParty('#bouncingBall', 1);
bouncy.loop();