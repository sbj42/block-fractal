import * as geom from '.';
export declare class MaskRect implements geom.RectangleLike {
    private readonly _rectangle;
    private readonly _mask;
    private readonly _outsideValue;
    constructor(rect: geom.RectangleLike, initialValue?: boolean, outsideValue?: boolean);
    toString(): string;
    get westX(): number;
    get northY(): number;
    get width(): number;
    get height(): number;
    index(off: geom.OffsetLike): number;
    getAt(index: number): boolean;
    get(off: geom.OffsetLike): boolean;
    setAt(index: number, value: boolean): this;
    set(off: geom.OffsetLike, value: boolean): this;
}
