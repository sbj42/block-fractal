import * as geom from '.';

export class Mask implements geom.SizeLike {
    private readonly _size = new geom.Size();
    private readonly _bits: number[];
    // TODO consider Uint8Array for bits

    constructor(size: geom.SizeLike, initialValue = false) {
        this._size.copyFrom(size);
        this._bits = new Array<number>(Math.ceil(this._size.area / 32)).fill(initialValue ? 0xffffffff : 0);
    }

    // accessors

    toString() {
        let ret = '';
        const off = new geom.Offset();
        for (let y = 0; y < this._size.height; y ++) {
            for (let x = 0; x < this._size.width; x ++) {
                off.set(x, y);
                ret += this.get(off.set(x, y)) ? '☑' : '☐';
            }
            ret += '\n';
        }
        return ret;
    }

    get width() {
        return this._size.width;
    }

    get height() {
        return this._size.height;
    }

    index(off: geom.OffsetLike) {
        return this._size.index(off);
    }

    getAt(index: number) {
        // tslint:disable:no-bitwise
        const arrayIndex = index >>> 5;
        const bitMask = 1 << (index & 31);
        return (this._bits[arrayIndex] & bitMask) !== 0;
        // tslint:enable:no-bitwise
    }

    get(off: geom.OffsetLike) {
        return this.getAt(this.index(off));
    }

    // mutators

    setAt(index: number, value: boolean) {
        // tslint:disable:no-bitwise
        const arrayIndex = index >>> 5;
        const bitMask = 1 << (index & 31);
        if (value) {
            this._bits[arrayIndex] |= bitMask;
        } else {
            this._bits[arrayIndex] &= ~bitMask;
        }
        // tslint:enable:no-bitwise
        return this;
    }

    set(off: geom.OffsetLike, value: boolean) {
        return this.setAt(this.index(off), value);
    }
}
