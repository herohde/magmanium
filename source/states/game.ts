import {Score} from "../prefabs/score";
import {Text} from "../util/text"
import {Session} from "../session";
import {Player} from "../prefabs/player";
import {Points} from "../prefabs/points";
import {GroundMelee} from "../prefabs/groundmelee";

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

        let map = this.game.add.tilemap('level' + ((this.session.level+1) % 2 + 1));
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
        this.collectSound = this.game.add.audio('clank');

        this.enemies = this.add.group();
        this.barriers = this.add.group();

        let objs = map.objects['objects'];
        for (let obj of objs) {
            let p : Properties = obj.properties;
            switch (p.type) {
                case "player":
                    this.player = new Player(this.game, obj.x * 2, (obj.y - 16) * 2);
                    break;
                case "groundmelee":
                    let enemy = new GroundMelee(this.game, obj.x * 2, (obj.y - 16) * 2);
                    this.enemies.add(enemy);
                    break;
                case "barrier":
                    // Invisible barriers to restrict enemy movement.
                    let barrier = this.game.add.sprite(obj.x * 2, (obj.y - 16) * 2, "blank");
                    this.game.physics.arcade.enable(barrier);
                    barrier.body.allowGravity = false;
                    barrier.body.immovable = true;
                    // barrier.scale.setTo(2,2);
                    this.barriers.add(barrier);
                    break;
                case "portal":
                    this.portal = this.game.add.sprite((obj.x - 32)  * 2, (obj.y - 64) * 2, "portal");
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
        this.game.physics.arcade.collide(this.enemies, this.blocks);
        this.game.physics.arcade.collide(this.enemies, this.barriers);
        // this.game.physics.arcade.collide(this.enemies, this.enemies);

        this.physics.arcade.overlap(this.player, this.points, (b : Phaser.Sprite, c : Points) => {
            this.collectSound.play('', 0, 0.2);
            this.session.score.inc(c.value);
            c.kill();
        }, null, this);

        this.physics.arcade.overlap(this.player, this.portal, (b : Phaser.Sprite, c : Phaser.Sprite) => {
            this.session.level++;
            this.game.state.start('game');
        }, null, this);

        this.physics.arcade.overlap(this.player, this.enemies, (b : Phaser.Sprite, c : Phaser.Sprite) => {
            this.game.state.start('end');
        }, null, this);

        /*
        this.enemies.forEachAlive((p : Phaser.Sprite) => {
            this.game.debug.body(p);
        }, this);
        this.barriers.forEachAlive((p : Phaser.Sprite) => {
            this.game.debug.body(p);
        }, this);
        this.game.debug.body(this.player);

        this.points.forEachAlive((p : Points) => {
            this.game.debug.body(p);
        }, this);
        */
    }

    private player: Player;
    private portal: Phaser.Sprite;
    private blocks: Phaser.TilemapLayer;

    // Different kinds of game world entities.
    private points: Phaser.Group;
    private collectSound: Phaser.Sound;

    private enemies: Phaser.Group;
    private barriers: Phaser.Group;
}

interface Properties {
    type: string
    sprite: string
    value: number
}
