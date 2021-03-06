var Bomberman = Bomberman || {};

Bomberman.BattleState = function () {
    "use strict";
    Bomberman.TiledState.call(this);
};

Bomberman.BattleState.prototype = Object.create(Bomberman.TiledState.prototype);
Bomberman.BattleState.prototype.constructor = Bomberman.BattleState;

Bomberman.BattleState.prototype.init_hud = function () {
    "use strict";
    var player1_lives_position, player1_lives_properties, player1_lives, player2_lives_position, player2_lives_properties, player2_lives;

    // create the lives prefab for player1
    player1_lives_position = new Phaser.Point(0.1 * this.game.world.width, 0.07 * this.game.world.height);
    player1_lives_properties = { group: "hud", texture: "heart_image", number_of_lives: 3, player: "player1" };
    player1_lives = new Bomberman.Lives(this, "lives", player1_lives_position, player1_lives_properties);

    // create the lives prefab for player2
    player2_lives_position = new Phaser.Point(0.9 * this.game.world.width, 0.07 * this.game.world.height);
    player2_lives_properties = { group: "hud", texture: "heart_image", number_of_lives: 3, player: "player2" };
    player2_lives = new Bomberman.Lives(this, "lives", player2_lives_position, player2_lives_properties);
};

Bomberman.BattleState.prototype.show_game_over = function () {
    "use strict";
    if (this.prefabs.player1.alive) {
        this.winner = this.prefabs.player1.name;
    } else {
        this.winner = this.prefabs.player2.name;
    }
    Bomberman.TiledState.prototype.show_game_over.call(this);
};

Bomberman.BattleState.prototype.create_game_over_panel = function (position, texture, text_style) {
    "use strict";
    var game_over_panel_properties, game_over_panel;
    game_over_panel_properties = { texture: texture, group: "hud", text_style: text_style, animation_time: 500, winner: this.winner };
    game_over_panel = new Bomberman.BattleGameOverPanel(this, "game_over_panel", position, game_over_panel_properties);
    return game_over_panel;
};

Bomberman.BattleState.prototype.game_over = function () {
    "use strict";
    this.game.state.restart(true, false, this.level_data);
};
