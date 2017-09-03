import {Input4} from "../util/input";

/**
 * Gamepad4
 *
 * Simple 4-input game pad: left, right, A, B. Fixed to screen.
 */
export class Gamepad4 implements Input4 {
    constructor(game: Phaser.Game) {
        let y = game.height - 70;

        // TODO(herohde) 5/13/2017: bottons do not reliably detect a finger
        // that slides between buttons or if lifted (even with Over/Out). We
        // should instead look at "active" pointers directly.

        let lb = game.add.button(6, y, 'gamepad3');
        lb.fixedToCamera = true;
        lb.alpha = 0.3;
        lb.events.onInputDown.add(() => { this.leftDown = true; });
        lb.events.onInputUp.add(() => { this.leftDown = false; });

        let rb = game.add.button(76, y, 'gamepad3');
        rb.fixedToCamera = true;
        rb.alpha = 0.3;
        rb.events.onInputDown.add(() => { this.rightDown = true; });
        rb.events.onInputUp.add(() => { this.rightDown = false; });

        let fa = game.add.button(game.width - 70, y, 'gamepad3');
        fa.fixedToCamera = true;
        fa.alpha = 0.3;
        fa.events.onInputDown.add(() => { this.aDown = true; });
        fa.events.onInputUp.add(() => { this.aDown = false; });

        let fb = game.add.button(game.width - 140, y, 'gamepad3');
        fb.fixedToCamera = true;
        fb.alpha = 0.3;
        fb.events.onInputDown.add(() => { this.bDown = true; });
        fb.events.onInputUp.add(() => { this.bDown = false; });
    }

    public left(): boolean {
        return this.leftDown;
    }
    public right(): boolean {
        return this.rightDown;
    }
    public a(): boolean {
        return this.aDown;
    }
    public b(): boolean {
        return this.bDown;
    }

    private leftDown: boolean;
    private rightDown: boolean;
    private aDown: boolean;
    private bDown: boolean;
}
