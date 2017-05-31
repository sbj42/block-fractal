import * as geom from '.';

export class RasterMask implements geom.RectangleLike, geom.SizeLike {
    northWest: geom.Offset;
    size: geom.Size;
    private _lines: number[][];

    constructor(bounds: geom.RectangleLike, lines: number[][]) {
        this.northWest = new geom.Offset(bounds.westX, bounds.northY);
        this.size = new geom.Size(bounds.width, bounds.height);
        this._lines = lines;
    }

    toString() {
        let shape = '';
        for (let y = 0; y < this.height; y ++) {
            const line = this._lines[y];
            let x = this.westX;
            for (let i = 0; i < line.length; i += 2) {
                const start = line[i];
                const end = line[i + 1];
                while (x < start) {
                    shape += '∙';
                    x ++;
                }
                while (x < end) {
                    shape += '█';
                    x ++;
                }
            }
            while (x <= this.eastX) {
                shape += '∙';
                x ++;
            }
            shape += '\n';
        }
        return `${this.northWest}\n${shape}`;
    }

    // accessors

    get northY() {
        return this.northWest.y;
    }

    get southY() {
        return this.northWest.y + this.size.height - 1;
    }

    get westX() {
        return this.northWest.x;
    }

    get eastX() {
        return this.northWest.x + this.size.width - 1;
    }

    get width() {
        return this.size.width;
    }

    get height() {
        return this.size.height;
    }

    get(x: number, y: number) {
        if (y < this.northY || y > this.southY) {
            return false;
        }
        const line = this._lines[y - this.northY];
        for (let i = 0; i < line.length; i += 2) {
            if (x >= line[i] && x < line[i + 1]) {
                return true;
            }
        }
        return false;
    }

    bandsAt(y: number, callback: (westX: number, eastX: number) => void) {
        if (y < this.northY || y > this.southY) {
            return;
        }
        const line = this._lines[y - this.northY];
        for (let i = 0; i < line.length; i += 2) {
            callback(line[i], line[i + 1] - 1);
        }
    }
}
