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

        this.load.image('background', 'assets/images/background.png');

        // this.load.spritesheet("ufo", "assets/images/ufo.png", 32, 32, 1);
        // this.load.audio('clank', [ "assets/sounds/clank.mp3", "assets/sounds/clank.ogg" ]);
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
