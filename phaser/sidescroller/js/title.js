var rpApp = rpApp || {};

rpApp.title = function() {};

rpApp.title.prototype = {
	create: function (){
		if (rpApp.skipTitle) {
			rpApp.game.state.start('play');
		} else {
			rpApp.text.intro = rpApp.game.add.text(0, 0, 'Click anywhere to start', rpApp.fontStyle);
			rpApp.text.intro.setTextBounds(0, 100, this.game.world.width, 100);

			rpApp.game.input.activePointer.capture = true;
		}
	},
	update: function(){
		if (rpApp.game.input.activePointer.isDown) {
			rpApp.game.state.start('play');
		}
	}
}
