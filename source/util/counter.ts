/*
 * Counter
 *
 * Simple counter for game score tracking. The signal allows display
 * elements to be updated easily.
 */
export class Counter {
    constructor(public name: string) {
        this.signal = new Phaser.Signal();
    }

    // inc increments the counter.
    public inc(num : number) {
        this.update(this._value + num);
    }

    // reset resets the counter to zero.
    public reset() {
        this.update(0);
    }

    // get the value
    public get value() : number {
        return this._value;
    }

    // signal allows value-change updates. Invoked with updated
    // value argument.
    public signal: Phaser.Signal;

    private update(value: number) {
        this._value = value;
        // console.log("value: " + value);
        this.signal.dispatch(value);
    }

    private _value: number = 0;
}
