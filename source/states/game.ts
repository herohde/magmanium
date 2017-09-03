import {Score} from "../prefabs/score";
import {Text} from "../util/text"
import {Session} from "../session";
import {Player} from "../prefabs/player";
import {Points} from "../prefabs/points";

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
        // We do not load the maplevel object sprites. We create the real
        // ones manually. The blocks are the real deal, for now.
        map.addTilesetImage('blocks', 'blocks');

        let background = map.createLayer('background');
        background.setScale(2,2);
        background.resizeWorld();

        this.blocks = map.createLayer('blocks');
        this.blocks.setScale(2,2);
        map.setCollisionByExclusion([], true, 'blocks');

        this.points = this.add.group();

        let objs = map.objects['objects'];
        for (let obj of objs) {
            let p : Properties = obj.properties;
            switch (p.type) {
                case "player":
                    this.player = new Player(this.game, obj.x * 2, (obj.y - 16) * 2);
                    break;
                case "portal":
                    this.portal = this.game.add.sprite((obj.x - 64) * 2, (obj.y - 64) * 2, "portal");
                    this.game.physics.arcade.enable(this.portal);
                    this.portal.body.allowGravity = false;
                    this.portal.scale.setTo(4,4);
                    break;
                case "points":
                    let elm = new Points(this.game, obj.x * 2, (obj.y - 16) * 2, p.sprite, p.value);
                    elm.scale.setTo(2,2);
                    this.points.add(elm);
                    break;
                default:
                    console.log("type: " + p.type + " from:");
                    console.log(obj);
                    break;
            }
        }

        let score = new Score(this.game, 5, 5, this.session.score);

        console.log("level: " + this.session.level);
        // this.game.add.audio('prepare_for_invasion').play('', 0, 0.5);

        Text.flash(this.game, "level: " + this.session.level);

        // ...
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.blocks);

        this.physics.arcade.overlap(this.player, this.points, (b : Phaser.Sprite, c : Points) => {
            this.session.score.inc(c.value);
            c.kill();
        }, null, this);

        this.physics.arcade.overlap(this.player, this.portal, (b : Phaser.Sprite, c : Phaser.Sprite) => {
            this.session.level++;
            this.game.state.start('game');
        }, null, this);

        // ...

        /*
        this.points.forEachAlive((p : Points) => {
            this.game.debug.body(p);
        }, this);
        this.game.debug.body(this.player);
        */
    }

    private player: Player;
    private portal: Phaser.Sprite;
    private blocks: Phaser.TilemapLayer;

    // Different kinds of game world entities.
    private points: Phaser.Group;
}

interface Properties {
    type: string
    sprite: string
    value: number
}

