

/*
 * GroundMelee
 *
 * Simple ground-based enemy. It simply walks until it bumps into something.
 * It then turns around.
 */
import {Point} from "../util/point";

export class GroundMelee extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, "attacker1");

        game.add.existing(this);
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;

        this.animations.add('walk', [0,1]);
        this.animations.play('walk', 4, true);

        // Smaller bounding box.
        this.body.setSize(10, 18, 14, 8); // bounding box
        this.scale.setTo(4,4);
        this.anchor.setTo(.5,.5);
    }

    update() {
        if (this.last.x == this.x) {
            // Stuck. Turn around.

            this.scale.x *= -1;
            this.speed *= -1;

            this.body.velocity.x = this.speed;
            this.last = {x: -1, y: -1};
            return;
        }

        this.body.velocity.x = this.speed;
        this.last = {x: this.x, y: this.y};
    }

    private speed: number = 50;
    private last: Point = {x: -1, y: -1};
}