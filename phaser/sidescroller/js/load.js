var rpApp = rpApp || {};

rpApp.load = function() {};

rpApp.load.prototype = {
	preload: function(){
		// Loading text
		rpApp.text.loading = this.game.add.text(0, 0, 'loading...', rpApp.fontStyle);
		rpApp.text.loading.setTextBounds(0, 100, this.game.world.width, 100);

		// Game stage
		rpApp.game.stage.backgroundColor = '#333';

		// Graphic assets
		rpApp.game.load.spritesheet('hero', 'assets/sprites/player.png', rpApp.tile, rpApp.tile);
		// this.game.load.spritesheet('villain', 'assets/sprites/enemy.png', 48, 48);
		rpApp.game.load.tilemap('level', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
		rpApp.game.load.image('tiles', 'assets/maps/dungeon-orig-48x48.png');

		// Mobile graphic assets
		// if (typeof Modernizr != 'undefined' && Modernizr.touchevents) {
			rpApp.game.load.spritesheet('buttons', 'assets/sprites/buttons.png', rpApp.tile, rpApp.tile);
		// }

		// Audio assets
 	},
 	create: function(){
 	 	rpApp.game.state.start('title');
 	}
 };
