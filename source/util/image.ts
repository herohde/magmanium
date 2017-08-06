
// Image is a set of convenience utilities for images.
export namespace Image {
    // fill creates a sprite and fills the entire screen with it.
    export function fill(game: Phaser.Game, name: string) : Phaser.Sprite {
        let bg = game.add.sprite(0, 0, name);
        bg.width = game.width;
        bg.height = game.height;
        return bg
    }
}