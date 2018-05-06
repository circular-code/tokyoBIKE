'use strict';

var Movable = function(x, y) {
    this.sprite = '';
    this.x = x;
    this.y = y;
    this.movementDistance = [];
};

Movable.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw instance on the screen
Movable.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

var Enemy = function() {
    Movable.call(this);
};

// Inherit from the parent class
Enemy.prototype = Object.create(Movable.prototype);
Enemy.prototype.constructor = Enemy;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    Movable.call(this);
};

// Inherit from the parent class
Player.prototype = Object.create(Movable.prototype);
Player.prototype.constructor = Player;

Player.prototype.handleInput = function(key) {
    if (typeof key === 'undefined')
        return;

    switch (key) {
        case 'left':
            this.x -= this.movementDistance[0];
            break;
        case 'right':
            this.x += this.movementDistance[0];
            break;
        case 'up':
            this.y += this.movementDistance[0];
            break;
        case 'down':
            this.y -= this.movementDistance[0];
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

player.sprite = 'images/char-boy.png';
player.movementDistance.push(10);
player.x = 0;
player.y = 0;

// This listens for key presses and sends the keys to the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
