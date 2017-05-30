import * as geom from '.';
export declare class Path {
    start: geom.Offset;
    segments: geom.Direction[];
    constructor();
    constructor(start: geom.OffsetLike, segments: geom.Direction[]);
    toString(): string;
    getIsClosed(): boolean;
    getOffsets(callback: (off: geom.OffsetLike) => void): void;
    getBounds(): geom.Rectangle;
    rasterize(bounds?: geom.RectangleLike): geom.RasterMask;
}
