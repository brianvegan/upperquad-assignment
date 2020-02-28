class BounceParty {
    constructor(root, numOnStage) {
        this.root = document.querySelector(root)
        this.canvas = this.root.querySelector('.ballContainer')
        this.ctx = this.canvas.getContext('2d')
        this.width = this.canvas.width = window.innerWidth
        this.height = this.canvas.height = window.innerHeight
        this.balls = [] // <Ball>[]
        this.subscribers = []
        this.totalBalls = numOnStage ? numOnStage : 1 // initialize with param or 1 default
        this.shouldRender = true
        this.classWatcher = new ClassWatcher(this.root, 'is-visible', () => { this.setRenderOn() }, () => { this.setRenderOff() })
        this.canvas.onclick = (e) => { this.addOne(e) }
    }
    addOne(event) {
        const size = Ball.random(5,25)
        const ball = new Ball(this.ctx, 
                              this,
                              this.width, 
                              this.height, 
                              null, 
                              size, 
                              [
                                  event.clientX,
                                  event.clientY, // not perfect, need right offset
                              ])
        this.balls.push(ball)
    }
    setRenderOn() {
        this.shouldRender = true;
        this.render()
    }
    setRenderOff() {
        this.shouldRender = false
    }
    addListener(listener) {
        this.subscribers.push(listener)
    }
    emit(event) {
        this.subscribers.forEach((listener)=>{
            if(listener.type == event.type) {
                listener.callback.heard(event);
            }
        });
    }
    render() {
        if(this.shouldRender) {
            // create slightly opaque bg and fill to size of viewport
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
            this.ctx.fillRect(0, 0, this.width, this.height)
            
            // initializer, puts actors on the stage if needed
            while (this.balls.length < this.totalBalls) {
                const ball = new Ball(this.ctx, this, this.width, this.height)
                this.balls.push(ball)
            }
            
            // each frame, update view
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].draw()
                this.balls[i].update()
            }
    
            window.requestAnimationFrame(() => this.render())
        }
    }
}

class Ball {
    constructor(ctx, parent, canvasWidth, canvasHeight, maxVelocity, ballSize, plotXY) {
        if(!ctx) {
            throw Error('cannot initialize without rendering context')
        }
        maxVelocity = maxVelocity ? maxVelocity : 8; // else reasonable default
        this.ctx    = ctx
        this.parent = parent;
        this.height = canvasHeight
        this.width  = canvasWidth

        // random starting position
        if(plotXY) {
            this.x = plotXY[0]
            this.y = plotXY[1]
        } else {
            this.x = Ball.random(0, this.width)
            this.y = Ball.random(0, this.height)
        }

        // random velocity, tuned for the stage
        this.velX = Ball.random(-1 * maxVelocity, maxVelocity)
        this.velY = Ball.random(-1 * maxVelocity, maxVelocity)
        // any random color from three primary of color
        this.color = 'rgb(' + Ball.random(0, 255) + ',' + Ball.random(0, 255) + ',' + Ball.random(0, 255) +')'
        // random size
        this.size =  (ballSize) ? ballSize : Ball.random(5, 25)
    }
    emit(event) {
        this.parent.emit({type:'bottom',from:this});
    }
    static random(min,max) {
        // classic rando :D
        var num = Math.floor(Math.random()*(max-min)) + min;
        return num;
    }
    draw() {
        // draw ball 
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // give it a spherical arc
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
        
        // hit bottom horizontal boundary
        if ((this.y + this.size) >= this.height) {
            this.velY = -(this.velY);
            this.emit({type: 'bottom', from: this})
        }
        
        // hit top horizontal boundary
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        
        // apply next movement coordinates at current velocity
        this.x += this.velX;
        this.y += this.velY;
    }
}

