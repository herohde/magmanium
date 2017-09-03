import {Image} from "../util/image"

/*
 * Preload state
 *
 * Load all assets while displaying a status bar/splash.
 */
export class Preload extends Phaser.State {
    preload() {
        this.bg = Image.fill(this.game, 'splash');

        // let img = this.add.image(this.game.width/2, this.game.height/2, "magmanium");
        // img.anchor.setTo(0.5, 0.5);

        let style = {font: "36px Arial", fill: "#ffffff", align: "center"};
        let credit = this.game.add.text(this.game.width, this.game.height, "Magmanium 2017 (c) Magnus ", style);
        credit.anchor.setTo(1, 1);

        this.bar = this.add.sprite(this.game.width/2, this.game.height*3/4, 'preloader');
        this.bar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.bar, 0);

        // TODO(herohde) 2/25/2017: asset packs would be nice, but there is poor tooling
        // to make it worthwhile.

        this.load.image('background', 'assets/images/rohdekill.png');

        this.load.spritesheet("hero", "assets/images/hero.png", 32, 32, 2);
        this.load.spritesheet("attacker1", "assets/images/groundmeeleattacker.png", 32, 32, 2);
        this.load.spritesheet("boss1", "assets/images/boss1.png", 32, 32, 1);

        this.load.spritesheet("gamepad3", "assets/images/gamepad3.png", 64, 64, 1);

        this.load.tilemap("level1", "assets/maps/level1.json", null, Phaser.Tilemap.TILED_JSON)
        this.load.spritesheet("blocks", "assets/images/blocks.png", 16, 16);
        this.load.spritesheet("coin", "assets/images/coin.png", 12, 12);
        this.load.spritesheet("portal", "assets/images/portal.png", 32, 32);

        this.load.audio('clank', [ "assets/sounds/clank.mp3", "assets/sounds/clank.ogg" ]);
    }

    create() {
        let tween = this.add.tween(this.bar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(() => {
            let style = {font: "36px Arial", fill: "#ff0000", align: "center"};
            let click = this.game.add.text(this.game.width/2, this.game.height*3/4, "- click to start -", style);
            click.anchor.setTo(0.5, 0.5);

            this.bg.inputEnabled = true;
            this.bg.events.onInputDown.add(() => {
                this.game.state.start('game');
            }, this);
        }, this);
    }

    bar: Phaser.Sprite;
    bg: Phaser.Sprite;
}
