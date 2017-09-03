import {Score} from "../prefabs/score";
import {Image} from "../util/image"
import {Session} from "../session";
import {Player} from "../prefabs/player";

/*
 * Game state
 *
 * Active magmanium game.
 */
export class Game extends Phaser.State {
    constructor(private session: Session) {
        super();
    }

    init() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 250;
    }

    create() {
        // Load level data

        let map = this.game.add.tilemap('level1'); // + this.session.level);
        map.addTilesetImage('blocks', 'blocks');
        map.addTilesetImage('gold', 'gold');

        let background = map.createLayer('background');
        background.setScale(2,2);
        background.resizeWorld();

        this.blocks = map.createLayer('blocks');
        this.blocks.setScale(2,2);
        map.setCollisionByExclusion([], true, 'blocks');



        this.player = new Player(this.game, 200, 200);

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
        this.game.physics.arcade.collide(this.player, this.blocks);

        // ...
    }


    private player: Player;
    private blocks: Phaser.TilemapLayer;
}
