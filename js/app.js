// variables with info about the canvas and player start position
var FIELD_WIDTH = 505;
var FIELD_HEIGTH = 498;
var PLAYER_START_X = FIELD_WIDTH / 2.5;
var PLAYER_START_Y = 373.5;
var PLAYER_START_NUM = 4;
// why 4? from the middle of the highest stone row (y = 41.5)move down 4 rows to the
// start y coordinate

// width and height of a parcel
var PARCEL_HEIGTH = 83;
var PARCEL_WIDTH = 101;

// superclass for shared properties and methods of enemy and player
var Character = function(x,y, picture_url){
    this.x = x;
    // set the y coordinate
    // enemy: regarding y-coordinate, the enemy can be only in one of three rows,
    // the value passed in for y is 0,1 or 2
    // y-value for player is alway 4
    this.y = y * PARCEL_HEIGTH + 41.5;
    this.sprite = picture_url;
};
Character.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x,y, enemy_speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // load the enemy image from source
    // Call superclass Character to add x,y and image
    Character.call(this, x,y, 'images/enemy-bug.png');
    // assign the speed property
    this.speed = enemy_speed;

    this.width = 80;
    console.log(this.name + ': ' + this.x + ',  ' + this.y);
    console.log('width:' + this.width);


};
// inherit methods from Class Character
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // if enemy has not yet reached the right end, move to the right
    if (this.x < FIELD_WIDTH) {
        // update position, 2 params enemy_speed and dt = time delta ,
        this.x =this.x + dt * this.speed;   
    // if we get too close to the right boarder reset x to zero
    } else {
        this.x = 0;
    }


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    Character.call(this, x, y, 'images/char-boy.png');
    this.width = 57;
    console.log(this.name + ': ' + this.x + ',  ' + this.y);
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
//If user pushes one of the arrow keys, move player object
Player.prototype.handleInput = function(key) {

    // move player depending on key input
    // in if condition make sure that player stays on canvas
    // and doesnt disappear outside canvas; if ( &&... )
    if (key == 'up') {
        this.y = this.y - PARCEL_HEIGTH;
        console.log(this.y);
        // check wether user won, if so reset player position
        if (this.y <= 0) {
            this.x = PLAYER_START_X;
            this.y = PLAYER_START_Y;
            console.log('Victory!!!');
        }
    } else if (key == 'down' && this.y < (PLAYER_START_Y)) {
        this.y = this.y + PARCEL_HEIGTH;
    } else if (key == 'left' && this.x >= PARCEL_WIDTH) {
        console.log(this.y);
        this.x = this.x - PARCEL_WIDTH;
    } else if (key == 'right' && this.x < (FIELD_WIDTH - PARCEL_WIDTH)) {
        this.x = this.x + PARCEL_WIDTH;
    }
};

Player.prototype.update = function() {
    // loop over the array of enemies
    for (var i = 0; i < allEnemies.length; i++) {
        // check for collision for every enemy
        var current_enemy = allEnemies[i];
        // the y coordinate of both player and enemies is always 41.5 + 83 * x.
        // That is why we can look for exact Y-Coordinates match
        if (current_enemy.y == this.y &&
            // for x check collision with bounding box collisiion model
            this.x < current_enemy.x + current_enemy.width &&
            this.x + this.width > current_enemy.x) {
            // in case of collisiion reset player position to start position
            this.x = PLAYER_START_X;
            this.y = PLAYER_START_Y;
        }
        
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



var player = new Player(PLAYER_START_X, PLAYER_START_NUM);
// Instructions how to make further enemies:
// takes 3 params, 1. x-coordinate, 2. y coordinate, 3. speed
// 1. x coordinates should be between 0 and 505;
// 2. y-coordinate: enter an integer between 0 and 2, where 0 is the first stone row and 2 the third stone row
// 3. Speed: values between 50 and 300 seem reasonable 

// Important: All enemies must be added to the allEnemies array.
var enemy1 = new Enemy(0, 2, 50 );
var enemy2 = new Enemy(40, 1, 300 );
var enemy3 = new Enemy(0, 1, 100 );
var enemy4 = new Enemy(0, 0, 60 );

var allEnemies= [enemy1, enemy2, enemy3, enemy4];


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
