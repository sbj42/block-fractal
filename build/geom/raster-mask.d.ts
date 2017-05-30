import * as geom from '.';
export declare class RasterMask implements geom.RectangleLike, geom.SizeLike {
    northWest: geom.Offset;
    size: geom.Size;
    private _lines;
    constructor(bounds: geom.RectangleLike, lines: number[][]);
    toString(): string;
    readonly northY: number;
    readonly southY: number;
    readonly westX: number;
    readonly eastX: number;
    readonly width: number;
    readonly height: number;
    bandsAt(y: number, callback: (westX: number, eastX: number) => void): void;
}
