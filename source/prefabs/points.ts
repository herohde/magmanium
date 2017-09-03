/*
 * Points is a simple sprite with a value. We assume the bounding box is the
 * size of the sprite.
 */
export class Points extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number, sprite: string, public value: number) {
        super(game, x, y, sprite);
        game.add.existing(this);
        this.game.physics.arcade.enable(this);

        this.body.allowGravity = false;
    }
}
