function BallGame(el, height, width){
    this.field = { height, width };
    this.game = {
        direction: 'right',
        speed: 10,
        refreshDelay: 300,
        state: 'paused'
    }

    this.init = function() {
        el.classList.add('ball-game-field');
        this.setHeight(height);
        this.setWidth(width);
        this.addBall();
        this.start();
        this.bindEventListeners();
    }

    this.bindEventListeners = function(){
        document.body.addEventListener('keyup', (e) => this.onKeyboardEvent(e));
    }

    this.onKeyboardEvent = function(event){
        switch(event.code){
            case 'Space': this.toggleState(); break;
            case 'ArrowUp': this.setDirection('up'); break;
            case 'ArrowDown': this.setDirection('down'); break;
            case 'ArrowLeft': this.setDirection('left'); break;
            case 'ArrowRight': this.setDirection('right'); break;
        }
    }

    this.setHeight = function(height){
        this.field.height = height;
        el.style.height = height + 'px';
    }
    this.setWidth = function(width){
        this.field.width = width;
        el.style.width = width + 'px';
    }

    this.setDirection = function(direction){
        this.game.direction = direction;
    }

    this.addBall = function(){
        this.ballEl = document.createElement('div');
        this.ballEl.className = 'ball-game-ball';
        el.appendChild(this.ballEl);
    }

    this.start = function(){
        if (this.game.state === 'paused'){
            this.game.state = 'playing';
            this.tick();
        }
    }
    this.pause = function(){
        this.game.state = 'paused';
    }

    this.toggleState = function(){
        if (this.game.state === 'paused') {
            this.start();
        } else {
            this.pause();
        }

    }

    this.tick = function(){
        if (this.game.state === 'playing'){
            const coordsOffset = this.getCoordsOffset();

            this.moveBall(coordsOffset);

            setTimeout(() => this.tick(), this.game.refreshDelay);
        }
    }

    this.getCoordsOffset = function(){
        switch (this.game.direction){
            case 'right': return {top: 0, left: 1 * this.game.speed};
            case 'left': return {top: 0, left: -1 * this.game.speed};
            case 'up': return {top: -1 * this.game.speed, left: 0};
            case 'down': return {top: 1 * this.game.speed, left: 0};
            default: return {top: 0, left: 0};
        }
    }

    this.moveBall = function(offset){
        let newTop = this.ballEl.offsetTop + offset.top;
        let newLeft = this.ballEl.offsetLeft + offset.left;

        if (newTop >= this.field.height) newTop = 0;
        if (newTop < 0 ) newTop = this.field.height + newTop;
        if (newLeft >= this.field.width) newLeft = 0;
        if (newLeft < 0 ) newLeft = this.field.width + newLeft;

        this.ballEl.style.top = newTop + 'px';
        this.ballEl.style.left = newLeft + 'px';
    }
}

const game = new BallGame(
                        document.getElementById('container'),
                        400,
                        400
                    );

game.init();