var rpApp = rpApp || {};

(function() {
	// Initialize game
	rpApp.game = new Phaser.Game(768, 432, Phaser.AUTO);

	// Create game states
	rpApp.game.state.add('boot', rpApp.boot);
	rpApp.game.state.add('load', rpApp.load);
	rpApp.game.state.add('title', rpApp.title);
	rpApp.game.state.add('play', rpApp.play);

	// Boot game
	rpApp.game.state.start('boot');
})();
