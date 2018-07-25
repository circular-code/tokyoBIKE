'use strict';


// globals numbers to calculate with
var g = {
    spriteX: 101,
    spriteY: 83,
    spriteOffsetY: 58,
    finished: false
};

// Parent class to Enemy and Player
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
    this.lane = stats.lane;
};

// Inherit from the parent class
Enemy.prototype = Object.create(Movable.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt) {

    // standard enemy movement
    this.x += this.speed * dt;

    // if out of bounds, restart as new bug incarnation (kind of)
    if (this.x > 900) {
        var stats = getEnemyStats();

        this.x = stats.x;
        this.y = stats.y;
        this.speed = stats.speed;
        this.lane = stats.lane;
    }
};

var Player = function(sprite, stats) {
    Movable.call(this, stats.x, stats.y, sprite);
    this.speedX = stats.speedX;
    this.speedY = stats.speedY;

    this.handleInput = function(keycode) {
        if (typeof keycode === 'undefined')
            return;

        switch (keycode) {

        //go left
        case 37:
        case 65:
            if ((this.x) >= this.speedX)
                this.update('x', -1);
            break;
        //go right
        case 39:
        case 68:
            if ((this.x + this.speedX) <= this.speedX * 8)
                this.update('x', 1);
            break;
        //go up
        case 87:
        case 38:
            if ((this.y) >= this.speedY - g.spriteOffsetY)
                this.update('y', -1);
            break;
        //go down
        case 40:
        case 83:
            if ((this.y + this.speedY) <= this.speedY * 7)
                this.update('y', 1);
            break;
        }
    };

    // update position on the canvas
    this.update = function(direction,sign) {

        // update position
        if (direction && sign) {
            this[direction] = this[direction] + this['speed' + direction.toUpperCase()] * sign;

            // check if game completed
            if (this.y < 0 && g.finished !== true) {
                if (confirm('Congratulations, you beat the game! Want to restart?')) {
                    g.finished = true;
                    location.reload();
                }
                else
                    g.finished = true;
            }
        }

        var playerLane = Math.ceil(player.y / g.spriteY);

        // remove out of bounds bugs
        var bugs = allEnemies.filter(function(enemy){
            return enemy.x > 0 && enemy.x < 910;
        });

        // detect possible collisions (bug is in the same lane with player)
        var possibleCollision = bugs.filter(function(enemy){
            return enemy.lane === playerLane;
        });

        // detect actual collision
        possibleCollision.forEach(function(enemy) {
            if (enemy.x + g.spriteX > player.x + 25 && enemy.x < player.x + 70)
                player.reset();
        });
    };

    this.reset = function() {
        this.x = g.spriteX * 4;
        this.y = g.spriteY * 6 + g.spriteOffsetY;
    };
};

// Inherit from the parent class
Player.prototype = Object.create(Movable.prototype);
Player.prototype.constructor = Player;

var player = new Player('images/char-boy.png', {
    speedX: g.spriteX,
    speedY: g.spriteY
    }
);

player.reset();

// create 20 emeny bugs
var allEnemies = [],
    j = 20;
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

    var lane = randomNumBetween(7, 1);

    if (lane === 4)
        lane--;

    return {
        lane: lane,
        x: randomNumBetween(-700, -100),
        y: lane * g.spriteY - g.spriteY + 60,
        speed: randomNumBetween(170, 60) * 2
    };
}