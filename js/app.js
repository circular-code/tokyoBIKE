'use strict';


/* TODO: genaue Werte bestimmen, berechnung anpassen (beim intatntiieren von player und enemies) */
var g = {
    spriteX: 80,
    spriteY: 100,
    spriteOffsetY: 60,
    spriteOffsetX: 0
};

var Movable = function(x, y, sprite, speed) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Draw instance on the screen
Movable.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Enemy = function(x, y, sprite, speed) {
    Movable.call(this, x, y, sprite, speed);
};

// Inherit from the parent class
Enemy.prototype = Object.create(Movable.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    this.x += 42.5 * dt;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, sprite, speed) {
    Movable.call(this, x, y, sprite, speed);
    this.handleInput = function(key) {
        if (typeof key === 'undefined')
            return;

        switch (key) {
            case 'left':
                this.x -= this.speed;
                break;
            case 'right':
                this.x += this.speed;
                break;
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
        }
    };
};

// Inherit from the parent class
Player.prototype = Object.create(Movable.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

};

// Player.prototype.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(g.spriteX * 2, g.spriteY * 4 + g.spriteOffsetY, 'images/char-boy.png', g.spriteY);

var allEnemies = [];

var j = 5;

while (j) {
    allEnemies.push(new Enemy(randomNumBetween(-300, -100), (randomNumBetween(3, 0) * g.spriteY) + 60, 'images/enemy-bug.png', randomNumBetween(3, 0) * 2));
    j--;
}

// This listens for key presses and sends the keys to the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        87: 'up',
        38: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
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