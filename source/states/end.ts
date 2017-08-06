import {Highscore} from "../server/highscore";
import {Image} from "../util/image"
import {Session} from "../session";

/*
 * End state
 *
 * Game over.
 */
export class End extends Phaser.State {
    constructor(private session: Session) {
        super();
    }

    create() {
        let bg = Image.fill(this.game, 'background');
        bg.inputEnabled = true;
        bg.events.onInputDown.add(() => {
            this.session.score.reset();
            this.session.level = 1;
            this.game.state.start('game');
        }, this);

        this.game.add.audio('game_over').play('', 0, 0.5);

        const style = { font: "64px Arial", fill: "#ffffff", align: "center" };
        let text = this.game.add.text(this.game.width/2, this.game.height/3, "Game over. You were awesome!", style);
        text.anchor.setTo(0.5, 0.5);

        (async () => {
            let x = text.x - text.width/4;
            let y = text.y + text.height/2 + 20;

            let score = this.session.score;
            await Highscore.submit({name: score.name, score: score.value});
            let list = await Highscore.top();
            if (list) {
                let i = 1;
                for (let elm of list) {
                    const style = {font: "20px Arial", fill: "#ff0000"};
                    let line = this.game.add.text(x, y, "[" + i + "]", style);
                    this.game.add.text(x + 40, y, elm.name, style);
                    this.game.add.text(x + 300, y, elm.score + " pts", style);

                    y += line.height;
                    i++;
                }
            }
        })();
    }
}
