var rpApp = rpApp || {};

rpApp.play = function() {};

rpApp.play.prototype = {
    create: function() {
        // Physics
        rpApp.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Map
        rpApp.maps.level = rpApp.game.add.tilemap('level');
        rpApp.maps.level.addTilesetImage('dungeon-orig-48x48', 'tiles');

        // Layers
        rpApp.layers.background = rpApp.maps.level.createLayer('background');
        rpApp.layers.platforms = rpApp.maps.level.createLayer('platforms');
        rpApp.layers.lava = rpApp.maps.level.createLayer('lava');

        // Collisions
        rpApp.maps.level.setCollisionBetween(1, 100000, true, 'platforms');

        // Resize layers
        rpApp.layers.background.resizeWorld();

        // Player
        rpApp.characters.hero = new rpApp.Hero(100,100);
        rpApp.game.add.existing(rpApp.characters.hero);
        rpApp.game.physics.enable(rpApp.characters.hero, Phaser.Physics.ARCADE);
        rpApp.characters.hero.body.collideWorldBounds = true;
        rpApp.characters.hero.body.gravity.y = 1000;
        rpApp.game.camera.follow(rpApp.characters.hero);

        if (typeof Modernizr != 'undefined' && Modernizr.touchevents) {
            // Use touch buttons
            rpApp.controls.buttons.left = new rpApp.Button('left', 'left', rpApp.game.world.left, rpApp.game.world.bottom - rpApp.tile, [0, 0, 0, 0]);
            rpApp.controls.buttons.right = new rpApp.Button('right', 'right', rpApp.game.world.left + rpApp.tile, rpApp.game.world.bottom - rpApp.tile, [1, 1, 1, 1]);
            rpApp.controls.buttons.a = new rpApp.Button('a', 'jump', rpApp.game.world.right - rpApp.tile, rpApp.game.world.bottom - rpApp.tile, [4, 4, 4, 4]);
        } else {
            // Use keyboard
            rpApp.controls.cursors = rpApp.game.input.keyboard.createCursorKeys();
        }
    },
    update: function() {
        // Player
        rpApp.characters.hero.body.velocity.x = 0;
        rpApp.hitPlatform = rpApp.game.physics.arcade.collide(rpApp.characters.hero, rpApp.layers.platforms);

        if (rpApp.characters.hero.isAlive) {
            if (typeof Modernizr != 'undefined' && !Modernizr.touchevents) {
                if (rpApp.controls.cursors.left.isDown) {
                    rpApp.characters.hero.move.left = true;
                } else if (rpApp.controls.cursors.right.isDown) {
                    rpApp.characters.hero.move.right = true;
                } else {
                    rpApp.characters.hero.animations.stop();
                    rpApp.characters.hero.move.left = false;
                    rpApp.characters.hero.move.right = false;
                }

                if (rpApp.controls.cursors.up.isDown) {
                    rpApp.characters.hero.move.jump = true;
                } else {
                    rpApp.characters.hero.move.jump = false;
                }
            }

            if (rpApp.characters.hero.move.jump && rpApp.characters.hero.body.blocked.down && rpApp.hitPlatform) {
                rpApp.characters.hero.body.velocity.y = -500;
            }

            if (rpApp.characters.hero.move.left) {
                rpApp.characters.hero.body.velocity.x = -250;
            }

            if (rpApp.characters.hero.move.right) {
                rpApp.characters.hero.body.velocity.x = 250;
            }
        }

        // Collisions
        rpApp.game.physics.arcade.collide(rpApp.characters.hero, rpApp.layers.platforms, function(p, l) {
            // TBD
        });

        if ((rpApp.game.world.height - rpApp.characters.hero.y) <= 48) {
            rpApp.characters.hero.isAlive = false;
            rpApp.game.time.events.add(1500, this.gameOver, this);
        }
    },
    gameOver: function() {
        rpApp.game.state.start('play');
    }
};

rpApp.Hero = function(x, y) {
    var hero = rpApp.game.add.sprite(x, y, 'hero');

    hero.frame = 0;
    hero.scale.x = -1;
    hero.isAlive = true;
    hero.move = {
        left: false,
        right: false,
        jump: false
    };
    hero.moveLeft = false;
    hero.moveRight = false;
    hero.jump = false;

    return hero;
};

rpApp.Button = function(name, action, x, y, frames) {
    var button = rpApp.game.add.button(x, y, 'buttons', rpApp.buttonOnClick, this, frames[0], frames[1], frames[2], frames[3]);

    button.name = name;
    button.action = action;
    button.fixedToCamera = true;
    button.onInputDown.add(rpApp.buttonDown, this);
    button.onInputUp.add(rpApp.buttonUp, this);

    return button;
};

rpApp.buttonOnClick = function(button) {
    // TODO: add walking animation
};

rpApp.buttonDown = function(button) {
    rpApp.characters.hero.move[button.action] = true;
};

rpApp.buttonUp = function(button) {
    rpApp.characters.hero.move[button.action] = false;
};
