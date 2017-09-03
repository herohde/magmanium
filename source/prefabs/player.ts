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

        // this.animations.add('idle');
        // this.animations.play('idle', 2, true);

        // Smaller bounding box.
        this.body.setSize(16, 12, 8, 10); // bounding box
        this.scale.x = 2;
        this.scale.y = 2;
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

        if (this.input4.left()) {
            this.body.velocity.x = -speed;
            this.scale.x = -2;
        }
        if (this.input4.right()) {
            this.body.velocity.x = speed;
            this.scale.x = 2;
        }
        if (this.input4.a()) {

        }
        if (this.input4.b() && this.body.onFloor() && this.game.time.now > this.jumpTimer) {
            this.body.velocity.y = -150;
            this.jumpTimer = this.game.time.now + 450;
        }
    }

    private input4: Input4 = null;
    private jumpTimer: number = 0;
}