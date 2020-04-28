import * as geom from '.';
export declare class RasterMask implements geom.RectangleLike, geom.SizeLike {
    northWest: geom.Offset;
    size: geom.Size;
    private _lines;
    constructor(bounds: geom.RectangleLike, lines: number[][]);
    toString(): string;
    get northY(): number;
    get southY(): number;
    get westX(): number;
    get eastX(): number;
    get width(): number;
    get height(): number;
    get(x: number, y: number): boolean;
    bandsAt(y: number, callback: (westX: number, eastX: number) => void): void;
}
