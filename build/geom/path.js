"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
var geom = require(".");
var LOCAL_OFF = new geom.Offset();
function sortedInsert(array, value) {
    var low = 0;
    var high = array.length;
    while (low < high) {
        // tslint:disable-next-line:no-bitwise
        var mid = (low + high) >>> 1;
        if (array[mid] < value) {
            low = mid + 1;
        }
        else {
            high = mid;
        }
    }
    array.splice(low, 0, value);
}
var Path = /** @class */ (function () {
    function Path(start, segments) {
        this.start = new geom.Offset();
        if (typeof start !== 'undefined') {
            this.start.copyFrom(start);
        }
        if (typeof segments === 'undefined') {
            segments = new Array();
        }
        this.segments = segments;
    }
    Path.prototype.toString = function () {
        return this.start.toString() + ":"
            + ("" + this.segments.map(function (segment) { return geom.directionToString(segment); }).join(''));
    };
    Path.prototype.getIsClosed = function () {
        LOCAL_OFF.copyFrom(this.start);
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var segment = _a[_i];
            LOCAL_OFF.addDirection(segment);
        }
        return this.start.equals(LOCAL_OFF);
    };
    Path.prototype.getOffsets = function (callback) {
        var cursor = new geom.Offset();
        cursor.copyFrom(this.start);
        callback(cursor);
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var segment = _a[_i];
            cursor.addDirection(segment);
            callback(cursor);
        }
    };
    Path.prototype.getBounds = function () {
        var northY = this.start.y;
        var southY = northY;
        var westX = this.start.x;
        var eastX = westX;
        LOCAL_OFF.copyFrom(this.start);
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var segment = _a[_i];
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
    };
    Path.prototype.getArea = function () {
        var total = 0;
        LOCAL_OFF.copyFrom(this.start);
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var segment = _a[_i];
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
    };
    Path.prototype.rasterize = function (bounds) {
        var lines = new Array();
        if (typeof bounds === 'undefined') {
            bounds = this.getBounds();
        }
        LOCAL_OFF.copyFrom(this.start);
        var northY = bounds.northY;
        var southY = northY + bounds.height - 1;
        for (var y = northY; y < southY; y++) {
            lines.push([]);
        }
        LOCAL_OFF.copyFrom(this.start);
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var segment = _a[_i];
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
    };
    return Path;
}());
exports.Path = Path;
//# sourceMappingURL=path.js.map