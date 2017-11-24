/// <reference path="../node_modules/phaser/typescript/phaser.comments.d.ts" />

'use strict';

import {Boot} from "./states/boot";
import {Preload} from "./states/preload";
import {Game} from "./states/game";
import {End} from "./states/end";
import {Session} from "./session";

/**
 * Invaders game
 */
class Invaders extends Phaser.Game {
    constructor(id: string) {
        super(window.innerWidth - 16, window.innerHeight - 16, Phaser.AUTO, id);

        let session = new Session();
        session.score.name = "Alex/Paula";

        this.state.add('boot', new Boot());
        this.state.add('preload', new Preload());
        this.state.add('game', new Game(session));
        this.state.add('end', new End(session));

        this.state.start('boot');

        console.log("Magmanium! 2017 (c) Rohdekill");
    }
}

window.onload = () => {
    var game = new Invaders('game');
};
