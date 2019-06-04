var playState = {
    player: null,
    mob: null,
    layer: null,
    create: function() {
        var self = this;

        var map = game.add.tilemap('level');
        map.addTilesetImage('dungeon-min-48x48', 'tiles');
        map.setCollision([389]);

        self.layer = map.createLayer('bg');

        self.player = new Player(100,100);
        game.add.existing(self.player);
        game.physics.enable(self.player, Phaser.Physics.ARCADE);

        self.mob = game.add.group();
        self.mob.add(Enemy(400,100));
        // self.mob.add(Enemy(400,100));
        // self.mob.add(Enemy(500,100));
        // self.mob.add(Enemy(300,200));
        // self.mob.add(Enemy(400,200));
        // self.mob.add(Enemy(500,200));

        self.mob.forEach(function(enemy, index) {
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.immovable = true;
        });

        game.input.activePointer.capture = true;
    },
    update: function() {
        var self = this;

        self.player.animations.play('wait');

        self.mob.forEach(function(enemy, index) {
            enemy.animations.play('wait');
            enemy.update();
        });

        if (game.input.activePointer.isDown) {
            self.player.setDest(game.input.x, game.input.y);
        }

        self.player.update();

        game.physics.arcade.collide(self.player, self.mob, function(p, e) {
            p.stop();
            e.state = 'alarm';
        });

        game.physics.arcade.collide(self.player, self.layer, function() {
            self.player.stop();
        });

        self.movePlayer(game.input.x, game.input.y);
    },
    movePlayer: function() {
        var self = this;

        if (Math.floor(self.player.x / 10) == Math.floor(self.player.xDest / 10)) {
            self.player.body.velocity.x = 0;
        } else if (Math.floor(self.player.x / 10) < Math.floor(self.player.xDest / 10)) {
            self.player.body.velocity.x = 80;
            self.player.scale.x = -1;
        } else if (Math.floor(self.player.x / 10) > Math.floor(self.player.xDest / 10)) {
            self.player.body.velocity.x = -80;
            self.player.scale.x = 1;
        }

        if (Math.floor(self.player.y / 10) == Math.floor(self.player.yDest / 10)) {
            self.player.body.velocity.y = 0;
        } else if (Math.floor(self.player.y / 10) < Math.floor(self.player.yDest / 10)) {
            self.player.body.velocity.y = 80;
        } else if (Math.floor(self.player.y / 10) > Math.floor(self.player.yDest / 10)) {
            self.player.body.velocity.y = -80;
        }
    },
    stopPlayer: function() {
        var self = this;

        self.xDest = self.x;
        self.yDest = self.y;
    }
};

function Player(x, y) {
    var player = game.add.sprite(x, y, 'hero');

    player.frame = 0;
    player.xDest = x;
    player.yDest = y;
    player.scale.x = -1;

    player.anchor.setTo(0.5, 0.5);
    player.animations.add('wait', [0,1], 2);
    player.animations.add('walk', [9,10,11,12,13,14,15,16,17], 4);

    player.setDest = function(x, y){
        player.xDest = x;
        player.yDest = y;
    };

    player.update = function() {
        var self = this;

        move(self);
    };

    player.stop = function() {
        var self = this;

        self.xDest = self.x;
        self.yDest = self.y;
    };

    return player;
};

function Enemy(x, y) {
    var enemy = game.add.sprite(x, y, 'villain');

    enemy.state = 'patrol';
    enemy.direction = 1;
    enemy.frame = 0;
    enemy.xDest = x;
    enemy.yDest = y;
    enemy.scale.x = 1;

    enemy.anchor.setTo(0.5, 0.5);
    enemy.animations.add('wait', [0,1], 2);
    enemy.animations.add('walk', [9,10,11,12,13,14,15,16,17], 2);

    enemy.goToXY = function(x, y) {
        enemy.xDest = x;
        enemy.yDest = y;
    };

    enemy.update = function() {
        var self = this;

        if (self.state == 'patrol') {
            self.speed = 40;
            self.patrol();
        } else if (self.state == 'alarm') {
            self.speed = 0;
            self.stop();
        }

        move(self);
    };

    enemy.stop = function() {
        var self = this;

        self.xDest = self.x;
        self.yDest = self.y;
    };

    enemy.patrol = function() {
        var self = this;

        if (Math.floor(self.x / 10) == Math.floor(self.xDest / 10)) {
            self.direction = self.direction * -1;
            self.goToXY(self.x + self.direction * 96);
        }
    };

    return enemy;
}

function move(self) {
    if (Math.floor(self.x / 10) == Math.floor(self.xDest / 10)) {
        self.body.velocity.x = 0;
    } else if (Math.floor(self.x) < Math.floor(self.xDest)) {
        self.body.velocity.x = 80;
        self.scale.x = -1;
    } else if (Math.floor(self.x) > Math.floor(self.xDest)) {
        self.body.velocity.x = -80;
        self.scale.x = 1;
    }

    if (Math.floor(self.y / 10) === Math.floor(self.yDest / 10)) {
        self.body.velocity.y = 0;
    } else if (Math.floor(self.y) < Math.floor(self.yDest)) {
        self.body.velocity.y = 80;
    } else if (Math.floor(self.y) > Math.floor(self.yDest)) {
        self.body.velocity.y = -80;
    }
}

// var playState = {
//   player: null,
//   mob: null,
//   layer: null,
//   create: function() {
//     var self = this;
//
//     var map = game.add.tilemap('level');
//     map.addTilesetImage('world', 'tiles');
//
//     map.setCollision([217, 218, 219, 221]);
//     self.layer = map.createLayer('Tile Layer 1');
//
//     self.player = new Player(300, 200);
//     game.add.existing(self.player);
//     game.physics.enable(self.player, Phaser.Physics.ARCADE);
//
//     self.mob = game.add.group();
//     self.mob.add(Enemy(100, 100));
//     self.mob.add(Enemy(200, 100));
//     self.mob.add(Enemy(100, 200));
//     self.mob.add(Enemy(200, 200));
//     self.mob.add(Enemy(300, 300));
//     self.mob.add(Enemy(400, 200));
//     self.mob.forEach(function(enemy, index){
//       game.physics.enable(enemy, Phaser.Physics.ARCADE);
//       enemy.body.immovable = true;
//     });
//     game.input.activePointer.capture = true;
//   },
//   update: function() {
//     var self = this;
//     self.player.animations.play('wait');
//     self.mob.forEach(function(enemy, index){
//       enemy.animations.play('wait');
//     });
//     if (game.input.activePointer.isDown) {
//       self.player.setDest(game.input.x, game.input.y);
//     }
//     self.player.update();
//     game.physics.arcade.collide(self.player, self.mob, function(){
//       self.player.stop();
//     });
//     game.physics.arcade.collide(self.player, self.layer, function(){
//       self.player.stop();
//     });
//   }
// };
//
// function Player(x, y) {
//   var player = game.add.sprite(x, y, 'characters');
//
//   player.frame = 0;
//   player.xDest = x;
//   player.yDest = y;
//   player.anchor.setTo(.5, 1);
//   player.animations.add('wait', [8, 9], 4);
//
//   player.setDest = function(x, y){
//     player.xDest = x;
//     player.yDest = y;
//   };
//
//   player.update = function() {
//     var self = this;
//     if (Math.floor(self.x / 10) == Math.floor(self.xDest / 10)) {
//       self.body.velocity.x = 0;
//     } else if (Math.floor(self.x) < Math.floor(self.xDest)) {
//       self.body.velocity.x = 80;
//       self.scale.x = -1;
//     } else if (Math.floor(self.x) > Math.floor(self.xDest)) {
//       self.body.velocity.x = -80;
//       self.scale.x = 1;
//     }
//     if (Math.floor(self.y / 10) === Math.floor(self.yDest / 10)) {
//       self.body.velocity.y = 0;
//     } else if (Math.floor(self.y) < Math.floor(self.yDest)) {
//       self.body.velocity.y = 80;
//     } else if (Math.floor(self.y) > Math.floor(self.yDest)) {
//       self.body.velocity.y = -80;
//     }
//   }
//   player.stop = function() {
//     var self = this;
//     self.xDest = self.x;
//     self.yDest = self.y;
//   }
//   return player;
// };
//
// function Enemy(x, y) {
//   var enemy = game.add.sprite(x, y, 'characters');
//
//   enemy.xDest = x;
//   enemy.yDest = y;
//   enemy.animations.add('wait', [544, 545], 4);
//
//   enemy.frame = 544;
//   enemy.anchor.setTo(.5, 1);
//   enemy.scale.x = -1;
//
//   enemy.goToXY = function(x, y) {
//
//   }
//   enemy.update = function() {
//
//   }
//   enemy.stop = function() {
//
//   }
//
//   return enemy;
// }
