var rpApp = rpApp || {};

rpApp.boot = function() {};

rpApp.boot.prototype = {
	preload: function() {
		// Initialize game constants
		rpApp.text = {};
		rpApp.characters = {};
		rpApp.maps = {};
		rpApp.layers = {};
		rpApp.controls = {
			buttons: {},
			cursors: {}
		};
		rpApp.tile = 48;
		rpApp.fontStyle = {
			font: '22px Courier',
			fill: '#ffffff',
			boundsAlignH: 'center',
			boundsAlignV: 'middle'
		};

		// Debugging
		rpApp.skipTitle = false;
	},
	create: function () {
		// Set game scale
		rpApp.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		rpApp.game.scale.pageAlignHorizonally = true;
		rpApp.game.scale.pageAlignVertically = true;

		// Load game
		rpApp.game.state.start('load');
	}
};
