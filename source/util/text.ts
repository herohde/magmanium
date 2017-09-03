
// Text is a set of convenience utilities for texts.
export namespace Text {
    // flash shows a big text in the middle to the screen that disappears quickly.
    export function flash(game: Phaser.Game, str: string) {
        const style = { font: "64px Arial", fill: "#ffffff", align: "center" };

        let text = game.add.text(game.width/2,game.height/2, str, style);
        text.anchor.setTo(0.5, 0.5);
        text.fixedToCamera = true;

        let t = game.add.tween(text).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
        t.onComplete.add((c : Phaser.Sprite, obj: any) => {
            c.kill();
        }, this);
    }
}
