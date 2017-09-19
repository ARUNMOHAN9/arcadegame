// Initialize score and append to index.html
var score = 0;
document.getElementById('playerScore').innerHTML = score;

var tog = false; //For controlling invert mode

var avatar = 1; //For controlling avatar

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png'; //sets player image
    this.x = x; //sets x-position
    this.y = y; //sets y-position
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += (180 * dt);
    } else {
        this.x -= (Math.random() * (10000 - 5000) + 5000); //randomize the enemies position
        this.x *= dt;
    }
    //collision detection (Axis-Aligned Bounding Box)
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y <
        player.y + 60 && 40 + this.y > player.y) {
        score = 0;
        document.getElementById('playerScore').innerHTML = score;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class with an update(), render(), reset() and a handleInput() methods.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200; //sets player x-position
    this.y = 380; //sets player x-position
};

Player.prototype.update = function(dt) {
    if (this.y < 30) {
        score++;
        document.getElementById('playerScore').innerHTML = score;
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};
Player.prototype.handleInput = function(direction) {
    if (tog === false) {
        if (direction == 'left' && this.x > 0) {
            this.x -= 50;
        } else if (direction == 'right' && this.x < 400) {
            this.x += 50;
        } else if (direction == 'up' && this.y >= 30) {
            this.y -= 50;
        } else if (direction == 'down' && this.y < 400) {
            this.y += 50;
        }
    } else if (tog === true) {
        if (direction == 'left' && this.x < 400) {
            this.x += 50;
        } else if (direction == 'right' && this.x > 0) {
            this.x -= 50;
        } else if (direction == 'up' && this.y < 400) {
            this.y += 50;
        } else if (direction == 'down' && this.y >= 30) {
            this.y -= 50;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-90, 60);
var enemy2 = new Enemy(-100, 140);
var enemy3 = new Enemy(-290, 230);
var enemy4 = new Enemy(-390, 140);
var enemy5 = new Enemy(-490, 60);
var enemy6 = new Enemy(-890, 320);
var enemy7 = new Enemy(-590, 320);
var enemy8 = new Enemy(-890, 150);
var enemy9 = new Enemy(-1890, 60);
var enemy10 = new Enemy(-6890, 120);
var enemy11 = new Enemy(-3090, 290);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6,
    enemy7, enemy8, enemy9, enemy10, enemy11
];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var toggle = function() {
    if (tog === true) {
        tog = false;
    } else {
        tog = true;
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        65: 'a',
        73: 'i'
    };

    sprite(allowedKeys[e.keyCode]);
});

//Toggles player avatar and invert mode
function sprite(char) {
    if (char === 'a') {
        switch (avatar) {
            case 0:
                player.sprite = 'images/char-boy.png';
                avatar++;
                break;
            case 1:
                player.sprite = 'images/char-cat-girl.png';
                avatar++;
                break;
            case 2:
                player.sprite = 'images/char-horn-girl.png';
                avatar++;
                break;
            case 3:
                player.sprite = 'images/char-pink-girl.png';
                avatar++;
                break;
            case 4:
                player.sprite = 'images/char-princess-girl.png';
                avatar = 0;
                break;
        }
        player.render();
    } else if (char === 'i') {
        toggle();
    }
}