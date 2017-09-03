import {Input4, Keyboard} from "../util/input";
import {Gamepad4} from "./gamepad4";

/*
 * Hero
 */
export class Player extends Phaser.Sprite {
    constructor(game: Phaser.Game, x :number, y:number) {
        super(game, x, y, "hero");

        game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.game.camera.follow(this);

        this.body.collideWorldBounds = true;

        this.animations.add('idle', [0]);
        this.animations.add('walk', [0,1]);
        this.animations.add('die', [4]);
        this.animations.play('idle', 2, true);

        // Smaller bounding box.
        this.body.setSize(6, 18, 10, 4); // bounding box
        this.scale.setTo(4,4);
        this.anchor.setTo(.5,.5);

//        this.body.bounce = 0.2;

        // this.firesound = game.add.audio('short_laser');

        // this.health, heal, damage, ..

        // Input.
        if (!game.device.desktop) {
            this.input4 = new Gamepad4(game);
        } else {
            this.input4 = new Keyboard(game);
        }
    }

    update() {
        const speed = 300;

        this.body.velocity.x = 0;
        let isWalkingNow = false;

        if (this.input4.left()) {
            this.body.velocity.x = -speed;
            this.scale.x = -4;
            isWalkingNow = this.body.onFloor();
        }
        if (this.input4.right()) {
            this.body.velocity.x = speed;
            this.scale.x = 4;
            isWalkingNow = this.body.onFloor();
        }
        if (this.input4.a()) {

        }
        if (this.input4.b() && this.body.onFloor() && this.game.time.now > this.jumpTimer) {
            this.body.velocity.y = -300;
            this.jumpTimer = this.game.time.now + 900;
            isWalkingNow = false;
        }

        if (!this.walking && isWalkingNow) {
            this.animations.play('walk', 8, true);
            this.walking = true;
        } else if (this.walking && !isWalkingNow) {
            this.animations.play('idle', 2, true);
            this.walking = false;
        }
    }

    private input4: Input4 = null;
    private walking: boolean = false;
    private jumpTimer: number = 0;
}