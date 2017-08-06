import {Counter} from "./util/counter";

/*
 * Session
 *
 * Session-level game state that is preserved across state switches.
 */
export class Session {
    public score: Counter = new Counter("Anonymous");
    public level: number = 1;
}
