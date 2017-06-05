import * as geom from '.';

const LOCAL_OFF = new geom.Offset();

function sortedInsert(array: number[], value: number) {
    let low = 0;
    let high = array.length;

    while (low < high) {
        // tslint:disable-next-line:no-bitwise
        const mid = (low + high) >>> 1;
        if (array[mid] < value) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    array.splice(low, 0, value);
}

export class Path {
    start: geom.Offset;
    segments: geom.Direction[];

    constructor();
    constructor(start: geom.OffsetLike, segments: geom.Direction[]);
    constructor(start?: geom.OffsetLike, segments?: geom.Direction[]) {
        this.start = new geom.Offset();
        if (typeof start !== 'undefined') {
            this.start.copyFrom(start);
        }
        if (typeof segments === 'undefined') {
            segments = new Array<geom.Direction>();
        }
        this.segments = segments;
    }

    toString() {
        return `${this.start.toString()}:`
            + `${this.segments.map((segment) => geom.directionToString(segment)).join('')}`;
    }

    getIsClosed() {
        LOCAL_OFF.copyFrom(this.start);
        for (const segment of this.segments) {
            LOCAL_OFF.addDirection(segment);
        }
        return this.start.equals(LOCAL_OFF);
    }

    getOffsets(callback: (off: geom.OffsetLike) => void) {
        const cursor = new geom.Offset();
        cursor.copyFrom(this.start);
        callback(cursor);
        for (const segment of this.segments) {
            cursor.addDirection(segment);
            callback(cursor);
        }
    }

    getBounds(): geom.Rectangle {
        let northY = this.start.y;
        let southY = northY;
        let westX = this.start.x;
        let eastX = westX;
        LOCAL_OFF.copyFrom(this.start);
        for (const segment of this.segments) {
            LOCAL_OFF.addDirection(segment);
            switch (segment) {
            case geom.Direction.NORTH:
                northY = Math.min(northY, LOCAL_OFF.y);
                break;
            case geom.Direction.EAST:
                eastX = Math.max(eastX, LOCAL_OFF.x);
                break;
            case geom.Direction.SOUTH:
                southY = Math.max(southY, LOCAL_OFF.y);
                break;
            case geom.Direction.WEST:
                westX = Math.min(westX, LOCAL_OFF.x);
                break;
            }
        }
        return new geom.Rectangle(westX, northY, eastX - westX + 1, southY - northY + 1);
    }

    getArea() {
        let total = 0;
        LOCAL_OFF.copyFrom(this.start);
        for (const segment of this.segments) {
            LOCAL_OFF.addDirection(segment);
            switch (segment) {
            case geom.Direction.NORTH:
                total -= LOCAL_OFF.x;
                break;
            case geom.Direction.SOUTH:
                total += LOCAL_OFF.x;
                break;
            }
        }
        return Math.abs(total);
    }

    rasterize(bounds?: geom.RectangleLike): geom.RasterMask {
        const lines = new Array<number[]>();
        if (typeof bounds === 'undefined') {
            bounds = this.getBounds();
        }
        LOCAL_OFF.copyFrom(this.start);
        const {northY} = bounds;
        const southY = northY + bounds.height - 1;
        for (let y = northY; y < southY; y ++) {
            lines.push([]);
        }
        LOCAL_OFF.copyFrom(this.start);
        for (const segment of this.segments) {
            if (segment === geom.Direction.SOUTH) {
                sortedInsert(lines[LOCAL_OFF.y - northY], LOCAL_OFF.x);
            }
            LOCAL_OFF.addDirection(segment);
            if (segment === geom.Direction.NORTH) {
                sortedInsert(lines[LOCAL_OFF.y - northY], LOCAL_OFF.x);
            }
        }
        return new geom.RasterMask({
            westX: bounds.westX,
            northY: bounds.northY,
            width: bounds.width - 1,
            height: bounds.height - 1,
        }, lines);
    }
}
