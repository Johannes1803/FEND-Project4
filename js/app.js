// Enemies our player must avoid
var Enemy = function(x,y, enemy_speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // load the enemy image from source
    this.sprite = 'images/enemy-bug.png';
    // set the x coordinate
    this.x = x;
    // set the y coordinate
    // regarding y-coordinate, the enemy can be only in one of three rows,
    // the value passed in for y is 0,1 or 2
    this.y = y * parcel_heigth + 41.5;
    // assign the speed property
    this.speed = enemy_speed;

    this.width = 80;
    console.log(this.name + ': ' + this.x + ',  ' + this.y);
    console.log('width:' + this.width);


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// if enemy has not yet reached the right end, move to the right
	if (this.x < field_width) {
		// update position, 2 params enemy_speed and dt = time delta ,
		this.x =this.x + dt * this.speed;	
	// if we get too close to the right boarder reset x to zero
	} else {
		this.x = 0;
	};


    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
	this.sprite = 'images/char-boy.png';
	this.x = x;
	this.y = y;
    this.width = 57;
    console.log(this.name + ': ' + this.x + ',  ' + this.y);
};
//If user pushes one of the arrow keys, move player object
Player.prototype.handleInput = function(key) {

	// move player depending on key input
    // in if condition make sure that player stays on canvas
    // and doesnt disappear outside canvas; if ( &&... )
    if (key == 'up') {
        this.y = this.y - parcel_heigth;
        console.log(this.y);
        // check wether user won, if so reset player position
        if (this.y <= 0) {
            this.x = player_start_x;
            this.y = player_start_y;
            console.log('Victory!!!')
        }
    } else if (key == 'down' && this.y < (player_start_y)) {
        this.y = this.y + parcel_heigth;
    } else if (key == 'left' && this.x >= parcel_width) {
        console.log(this.y);
        this.x = this.x - parcel_width;
    } else if (key == 'right' && this.x < (field_width - parcel_width)) {
        this.x = this.x + parcel_width;
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
            this.x = player_start_x;
            this.y = player_start_y;
        }
        
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// variables with info about the canvas and player start position
var field_width = 505;
var field_heigth = 498;
var player_start_x = field_width / 2.5;
var player_start_y = field_heigth * 9/12;

// width and height of a parcel
var parcel_heigth = 83;
var parcel_width = 101;

var player = new Player(player_start_x, player_start_y);
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

