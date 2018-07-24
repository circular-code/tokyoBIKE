'use strict';


/* TODO: genaue Werte bestimmen, berechnung anpassen (beim intatntiieren von player und enemies) */
var g = {
    spriteX: 100,
    spriteY: 85,
    spriteOffsetY: 60,
    spriteOffsetX: 0
};

var Movable = function(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

// Draw instance on the screen
Movable.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function(sprite, stats) {
    Movable.call(this, stats.x, stats.y, sprite);
    this.speed = stats.speed;
};

// Inherit from the parent class
Enemy.prototype = Object.create(Movable.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {
    
    // standard enemy movement
    this.x += this.speed * dt;

    // if out of bounds, restart as new bug incarnation (kind of)
    if (this.x > 500) {
        var stats = getEnemyStats();

        this.x = stats.x;
        this.y = stats.y;
        this.speed = stats.speed;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(sprite, stats) {
    Movable.call(this, stats.x, stats.y, sprite);
    this.speedX = stats.speedX;
    this.speedY = stats.speedY;

    this.handleInput = function(keycode) {
        if (typeof keycode === 'undefined')
            return;

        switch (keycode) {

            //left
            case 37:
            case 65:
                if ((this.x) >= this.speedX)
                    this.x -= this.speedX;
                break;
            //right
            case 39:
            case 68:
                if ((this.x + this.speedX) <= this.speedX * 4)
                    this.x += this.speedX;
                break;
            //up
            case 87:
            case 38:
                if ((this.y) >= this.speedY - g.spriteOffsetY)
                    this.y -= this.speedY;
                break;
            //down
            case 40:
            case 83:
                if ((this.y + this.speedY) <= this.speedY * 5)
                    this.y += this.speedY;
                break;

            // 87: 'up',
            // 38: 'up',
            // 39: 'right',
            // 68: 'right',
            // 40: 'down',
            // 83: 'down'

        }
    };
};

// Inherit from the parent class
Player.prototype = Object.create(Movable.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {

};

var player = new Player('images/char-boy.png', {
    x: g.spriteX * 2,
    y: g.spriteY * 4 + g.spriteOffsetY,
    speedX: g.spriteX,
    speedY: g.spriteY
    }
);

var allEnemies = [];

var j = 6;

while (j) {
    allEnemies.push(new Enemy('images/enemy-bug.png', getEnemyStats()));
    j--;
}

// This listens for key presses and sends the keys to the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    player.handleInput(e.keyCode);
});

function randomNumBetween (max, min) {
    if (typeof max === 'undefined'){
        console.log('max undefined');
        return false;
    }
    if (typeof min === 'undefined'){
        min = 0;
    }
    return Math.floor(Math.random()*(max-min)+min);
}

function getEnemyStats () {
    return {
        x: randomNumBetween(-300, -100),
        y: randomNumBetween(3, 0) * g.spriteY + 60,
        speed: randomNumBetween(70, 10) * 2
    };
}