import {Score} from "../prefabs/score";
import {Image} from "../util/image"
import {Session} from "../session";

/*
 * Game state
 *
 * Active invaders game.
 */
export class Game extends Phaser.State {
    constructor(private session: Session) {
        super();
    }

    init() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        Image.fill(this.game, 'background');

        let score = new Score(this.game, 5, 5, this.session.score);

        console.log("level: " + this.session.level);
        // this.game.add.audio('prepare_for_invasion').play('', 0, 0.5);

        const style = { font: "64px Arial", fill: "#ffffff", align: "center" };
        let text = this.game.add.text(this.game.width/2, this.game.height/3, "Level " + this.session.level, style);
        let t = this.game.add.tween(text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        t.onComplete.add((c : Phaser.Sprite, obj: any) => {
            c.kill();
        }, this);

        // ...
    }

    update() {
        // ...
    }
}
