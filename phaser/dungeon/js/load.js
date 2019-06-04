//load.js
var loadState={
	preload: function(){
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizonally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		/**** Load graphics assets ****/
		game.load.spritesheet('hero', 'assets/sprites/player.png', 48, 48);
		game.load.spritesheet('villain', 'assets/sprites/enemy.png', 48, 48);
		game.load.tilemap('level', 'assets/maps/dungeon.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/maps/dungeon-min-48x48.png');

		/**** Load audio assets ****/

 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
