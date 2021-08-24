class Player {
    constructor(ctx, index, image, frames, width, height){ //canvasSize????
        this.ctx = ctx;
        this.i = index;
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.initialIndex = this.i;
        this.initialPosition = {x: this.x, y: this.y};
        this.width = width;
        this.height = height;
        this.keys = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight'
        };
        this.lives = 3;
        this.hasKey = false;
        this.hasTouchedDoor = false;
        // Direction: 0-face, 1-up, 2-right, 3-left
        this.direction = 0;
        this.frames = frames;
        this.counter = 0;
        this.init(frames, image);
        this.image.frameIndex = {x: 0, y: 0};

    }

    /* En init meter new image, cosas de frames y set listener
    (esto último para quitarlo de init game) */
    init(frames, image) {
        this.image = new Image()
        this.image.pathImage = `img/${image}`
        this.image.src = this.image.pathImage
        this.image.frames = frames
        this.image.frameIndex = {x: 0, y: 0}
        this.setListener()
        }

    //Si creamos más tipos de enemigos, revisar el método .some()
    checkGhostsCollisions() {
        game.ghostsArray.forEach(ghost => {
            if (ghost.x < this.x + this.width &&
                ghost.x + ghost.width > this.x &&
                ghost.y < this.y + this.height &&
                ghost.height + ghost.y > this.y) {
                    this.lives--;
                    this.x = this.initialPosition.x;
                    this.y = this.initialPosition.y;
                    if (this.lives === 0) {
                        // Gestión de GAME OVER !!!!!!
                        // Se acaba antes de que le toque?
                        alert("GAME OVER")
                        this.lives = 3;
                    }
                    console.log(this.lives)
            }
        });
    }

    draw() {
        this.x = (this.i % 50) * 20;
        this.y = Math.floor(this.i / 50) * 20; 
        this.ctx.drawImage(
            this.image,
            //punto de recorte en X inicio
            this.image.frameIndex.x,
            //punto de y inicio
            this.image.frameIndex.y,
            Math.floor(this.image.width / 4),
            Math.floor(this.image.height / 4),
            this.x,
            this.y,
            this.width,
            this.height,
            
        )
        // this.ctx.fillStyle= "red"
        // this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    setListener() {
        document.onkeydown = e => {
            
            switch (e.key) {
                case this.keys.up:
                    this.moveUp();
                    break;
                case this.keys.down:
                    this.moveDown();
                    break;
                case this.keys.left:
                    this.moveLeft();
                    break;
                case this.keys.right:
                    this.moveRight();
                    break;
            }
        }
    }

    willBeCollision(desiredPositionIndex) {
        return !(game.map[desiredPositionIndex] === 1 
                || game.map[desiredPositionIndex] === 6
                || game.map[desiredPositionIndex] === 7);

    }

    updatePosition(desiredPositionIndex) {
        game.map[this.i] = 1;
        this.i = desiredPositionIndex;
        game.map[desiredPositionIndex] = 2;
    }

    walk() {
        this.image.frameIndex.x = (this.image.width / 4) * this.counter;
        this.counter++;
        this.counter %= this.frames;
        this.image.frameIndex.y = (this.image.height / 4) * this.direction;
    }

    moveUp() {
        const desiredPositionIndex = this.i - 50;
        this.direction = 1;
        this.walk();
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

    moveDown() {
        const desiredPositionIndex = this.i + 50;
        this.direction = 0;
        this.walk();
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

    moveLeft() {
        const desiredPositionIndex = this.i - 1;
        this.direction = 3;
        this.walk();
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }

    moveRight() {
        const desiredPositionIndex = this.i + 1;
        this.direction = 2;
        this.walk();
        if (!this.willBeCollision(desiredPositionIndex)) {
            this.updatePosition(desiredPositionIndex)
        }
    }



}
