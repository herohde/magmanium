
export let Center = {x: 0, y: 0};

// Point represents a 2D-coordinate in a map.
export interface Point {
    x: number;
    y: number;
}

// Rect represents a 2D-rectangle in a map.
export interface Rect {
    pos: Point;
    size: Point;
}
