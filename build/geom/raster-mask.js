"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RasterMask = void 0;
var geom = require(".");
var RasterMask = /** @class */ (function () {
    function RasterMask(bounds, lines) {
        this.northWest = new geom.Offset(bounds.westX, bounds.northY);
        this.size = new geom.Size(bounds.width, bounds.height);
        this._lines = lines;
    }
    RasterMask.prototype.toString = function () {
        var shape = '';
        for (var y = 0; y < this.height; y++) {
            var line = this._lines[y];
            var x = this.westX;
            for (var i = 0; i < line.length; i += 2) {
                var start = line[i];
                var end = line[i + 1];
                while (x < start) {
                    shape += '∙';
                    x++;
                }
                while (x < end) {
                    shape += '█';
                    x++;
                }
            }
            while (x <= this.eastX) {
                shape += '∙';
                x++;
            }
            shape += '\n';
        }
        return this.northWest + "\n" + shape;
    };
    Object.defineProperty(RasterMask.prototype, "northY", {
        // accessors
        get: function () {
            return this.northWest.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "southY", {
        get: function () {
            return this.northWest.y + this.size.height - 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "westX", {
        get: function () {
            return this.northWest.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "eastX", {
        get: function () {
            return this.northWest.x + this.size.width - 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "width", {
        get: function () {
            return this.size.width;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "height", {
        get: function () {
            return this.size.height;
        },
        enumerable: false,
        configurable: true
    });
    RasterMask.prototype.get = function (x, y) {
        if (y < this.northY || y > this.southY) {
            return false;
        }
        var line = this._lines[y - this.northY];
        for (var i = 0; i < line.length; i += 2) {
            if (x >= line[i] && x < line[i + 1]) {
                return true;
            }
        }
        return false;
    };
    RasterMask.prototype.bandsAt = function (y, callback) {
        if (y < this.northY || y > this.southY) {
            return;
        }
        var line = this._lines[y - this.northY];
        for (var i = 0; i < line.length; i += 2) {
            callback(line[i], line[i + 1] - 1);
        }
    };
    return RasterMask;
}());
exports.RasterMask = RasterMask;
//# sourceMappingURL=raster-mask.js.map