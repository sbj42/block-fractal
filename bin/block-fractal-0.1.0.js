var BlockFractal =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/bin/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));
__export(__webpack_require__(2));
__export(__webpack_require__(6));
__export(__webpack_require__(10));
__export(__webpack_require__(9));
__export(__webpack_require__(5));
__export(__webpack_require__(4));
__export(__webpack_require__(8));
__export(__webpack_require__(7));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var geom = __webpack_require__(0);
function nextToLastMatch(points, next) {
    return points.length > 1 && points[points.length - 2].equals(next);
}
function addPoint(points, mask, next) {
    if (nextToLastMatch(points, next)) {
        mask.set(points.splice(points.length - 1, 1)[0], false);
    }
    else {
        points.push(next);
        mask.set(next, true);
    }
}
function verticalHelper(points, random, variation, newPoints, mask, i, p1, p2) {
    var x = 2 * p1.x;
    var yDir = p2.y - p1.y;
    var _loop_1 = function (y) {
        var np3 = new geom.Offset(x, y + yDir);
        // console.info(`- ${np3}`);
        if (nextToLastMatch(newPoints, np3)) {
            // This can happen around a corner, when just before the corner
            // we dip into the corner
            // console.info(` remove ${newPoints[newPoints.length - 1]}`);
            mask.set(newPoints.splice(newPoints.length - 1, 1)[0], false);
            return "continue";
        }
        if (i === points.length - 2 && mask.get(np3)) {
            // This can happen if the first point was on a corner and the
            // first move was to dip into the corner
            var index = newPoints.findIndex(function (point) { return point.equals(np3); });
            // console.info(`remove ${index} from beginning`);
            for (var _i = 0, _a = newPoints.splice(0, index); _i < _a.length; _i++) {
                var point = _a[_i];
                mask.set(point, false);
            }
            addPoint(newPoints, mask, np3);
            return "break";
        }
        if (random() < variation) {
            var v = Math.floor(random() * 2) * 2 - 1;
            var np1 = new geom.Offset(x + v, y);
            var np2 = new geom.Offset(x + v, y + yDir);
            if (!mask.get(np1) && !mask.get(np2)) {
                addPoint(newPoints, mask, np1);
                addPoint(newPoints, mask, np2);
            }
        }
        addPoint(newPoints, mask, np3);
    };
    for (var y = 2 * p1.y; y !== 2 * p2.y; y += yDir) {
        var state_1 = _loop_1(y);
        if (state_1 === "break")
            break;
    }
}
function horizontalHelper(points, random, variation, newPoints, mask, i, p1, p2) {
    var y = 2 * p1.y;
    var xDir = p2.x - p1.x;
    var _loop_2 = function (x) {
        var np3 = new geom.Offset(x + xDir, y);
        // console.info(`- ${np3}`);
        if (nextToLastMatch(newPoints, np3)) {
            // This can happen around a corner, when just before the corner
            // we dip in the direction of the corner
            // console.info(` remove ${newPoints[newPoints.length - 1]}`);
            mask.set(newPoints.splice(newPoints.length - 1, 1)[0], false);
            return "continue";
        }
        if (i === points.length - 2 && mask.get(np3)) {
            // This can happen if the first point was on a corner and the
            // first move was to dip into the corner
            var index = newPoints.findIndex(function (point) { return point.equals(np3); });
            // console.info(`remove ${index} from beginning`);
            for (var _i = 0, _a = newPoints.splice(0, index); _i < _a.length; _i++) {
                var point = _a[_i];
                mask.set(point, false);
            }
            addPoint(newPoints, mask, np3);
            return "break";
        }
        if (random() < variation) {
            var v = Math.floor(random() * 2) * 2 - 1;
            var np1 = new geom.Offset(x, y + v);
            var np2 = new geom.Offset(x + xDir, y + v);
            if (!mask.get(np1) && !mask.get(np2)) {
                addPoint(newPoints, mask, np1);
                addPoint(newPoints, mask, np2);
            }
        }
        addPoint(newPoints, mask, np3);
    };
    for (var x = 2 * p1.x; x !== 2 * p2.x; x += xDir) {
        var state_2 = _loop_2(x);
        if (state_2 === "break")
            break;
    }
}
function blockFractalIteration(random, points, bounds, variation) {
    var newPoints = new Array();
    var newBounds = new geom.Rectangle(bounds.westX * 2 - 1, bounds.northY * 2 - 1, bounds.width * 2 + 2, bounds.height * 2 + 2);
    // console.info(` bounds ${newBounds}`);
    var mask = new geom.MaskRect(newBounds);
    for (var i = 0; i < points.length - 1; i++) {
        var p1 = points[i];
        var p2 = points[i + 1];
        if (i === 0) {
            addPoint(newPoints, mask, new geom.Offset(p1.x * 2, p1.y * 2));
        }
        if (p1.x === p2.x) {
            verticalHelper(points, random, variation, newPoints, mask, i, p1, p2);
        }
        else {
            horizontalHelper(points, random, variation, newPoints, mask, i, p1, p2);
        }
    }
    return {
        points: newPoints,
        bounds: newBounds,
    };
}
function makeBlockFractal(param) {
    var random = param.random, shape = param.shape, variation = param.variation;
    if (typeof random === 'undefined') {
        random = Math.random;
    }
    if (typeof shape === 'undefined') {
        shape = new geom.Path({ x: -1, y: -1 }, [
            geom.Direction.EAST,
            geom.Direction.EAST,
            geom.Direction.SOUTH,
            geom.Direction.SOUTH,
            geom.Direction.WEST,
            geom.Direction.WEST,
            geom.Direction.NORTH,
            geom.Direction.NORTH,
        ]);
    }
    if (typeof variation === 'undefined') {
        variation = 0.4;
    }
    var points = new Array();
    var bounds = shape.getBounds();
    shape.getOffsets(function (off) {
        points.push(new geom.Offset(off.x, off.y));
    });
    for (var iter = 0; iter < param.iterations; iter++) {
        // console.info(`iteration ${iter + 1}`);
        (_a = blockFractalIteration(random, points, bounds, variation), points = _a.points, bounds = _a.bounds);
    }
    var segments = new Array();
    for (var i = 0; i < points.length - 1; i++) {
        var curPoint = points[i];
        var nextPoint = points[i + 1];
        if (nextPoint.y === curPoint.y - 1) {
            segments.push(geom.Direction.NORTH);
        }
        else if (nextPoint.x === curPoint.x + 1) {
            segments.push(geom.Direction.EAST);
        }
        else if (nextPoint.y === curPoint.y + 1) {
            segments.push(geom.Direction.SOUTH);
        }
        else if (nextPoint.x === curPoint.x - 1) {
            segments.push(geom.Direction.WEST);
        }
    }
    return new geom.Path(points[0], segments);
    var _a;
}
exports.makeBlockFractal = makeBlockFractal;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-bitwise
var DirectionFlags;
(function (DirectionFlags) {
    DirectionFlags[DirectionFlags["NONE"] = 0] = "NONE";
    DirectionFlags[DirectionFlags["NORTH"] = 1] = "NORTH";
    DirectionFlags[DirectionFlags["EAST"] = 2] = "EAST";
    DirectionFlags[DirectionFlags["SOUTH"] = 4] = "SOUTH";
    DirectionFlags[DirectionFlags["WEST"] = 8] = "WEST";
    DirectionFlags[DirectionFlags["ALL"] = 15] = "ALL";
})(DirectionFlags = exports.DirectionFlags || (exports.DirectionFlags = {}));
function directionFlagsToString(flags) {
    var ret = '[';
    if ((flags & DirectionFlags.NORTH) !== 0) {
        ret += 'N';
    }
    if ((flags & DirectionFlags.EAST) !== 0) {
        ret += 'E';
    }
    if ((flags & DirectionFlags.SOUTH) !== 0) {
        ret += 'S';
    }
    if ((flags & DirectionFlags.WEST) !== 0) {
        ret += 'W';
    }
    return ret + ']';
}
exports.directionFlagsToString = directionFlagsToString;
// conversion
function directionFlagsFromDirection(dir) {
    return (1 << dir);
}
exports.directionFlagsFromDirection = directionFlagsFromDirection;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:no-bitwise
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction[Direction["EAST"] = 1] = "EAST";
    Direction[Direction["SOUTH"] = 2] = "SOUTH";
    Direction[Direction["WEST"] = 3] = "WEST";
})(Direction = exports.Direction || (exports.Direction = {}));
exports.DIRECTIONS = [
    Direction.NORTH,
    Direction.EAST,
    Direction.SOUTH,
    Direction.WEST,
];
var DIRECTIONS_STR = [
    'N',
    'E',
    'S',
    'W',
];
function directionToString(dir) {
    return DIRECTIONS_STR[dir];
}
exports.directionToString = directionToString;
function directionOpposite(dir) {
    return ((dir + 2) & 3);
}
exports.directionOpposite = directionOpposite;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var geom = __webpack_require__(0);
var LOCAL_OFF = new geom.Offset();
var MaskRect = (function () {
    function MaskRect(rect, initialValue, outsideValue) {
        if (initialValue === void 0) { initialValue = false; }
        if (outsideValue === void 0) { outsideValue = false; }
        this._rectangle = new geom.Rectangle();
        this._rectangle.copyFrom(rect);
        this._mask = new geom.Mask(rect, initialValue);
        this._outsideValue = outsideValue;
    }
    // accessors
    MaskRect.prototype.toString = function () {
        return this._rectangle.northWest + "/" + this._outsideValue + "\n" + this._mask;
    };
    Object.defineProperty(MaskRect.prototype, "westX", {
        get: function () {
            return this._rectangle.westX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskRect.prototype, "northY", {
        get: function () {
            return this._rectangle.northY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskRect.prototype, "width", {
        get: function () {
            return this._rectangle.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskRect.prototype, "height", {
        get: function () {
            return this._rectangle.height;
        },
        enumerable: true,
        configurable: true
    });
    MaskRect.prototype.index = function (off) {
        return this._mask.index(LOCAL_OFF.copyFrom(off).subtractOffset(this._rectangle.northWest));
    };
    MaskRect.prototype.getAt = function (index) {
        return this._mask.getAt(index);
    };
    MaskRect.prototype.get = function (off) {
        if (!this._rectangle.containsOffset(off)) {
            return this._outsideValue;
        }
        return this._mask.getAt(this._rectangle.index(off));
    };
    // mutators
    MaskRect.prototype.setAt = function (index, value) {
        this._mask.setAt(index, value);
        return this;
    };
    MaskRect.prototype.set = function (off, value) {
        this._mask.setAt(this._rectangle.index(off), value);
        return this;
    };
    return MaskRect;
}());
exports.MaskRect = MaskRect;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var geom = __webpack_require__(0);
var Mask = (function () {
    // TODO consider Uint8Array for bits
    function Mask(size, initialValue) {
        if (initialValue === void 0) { initialValue = false; }
        this._size = new geom.Size();
        this._size.copyFrom(size);
        this._bits = new Array(this._size.area).fill(initialValue);
    }
    // accessors
    Mask.prototype.toString = function () {
        var ret = '';
        var off = new geom.Offset();
        for (var y = 0; y < this._size.height; y++) {
            for (var x = 0; x < this._size.width; x++) {
                off.set(x, y);
                ret += this.get(off.set(x, y)) ? '☑' : '☐';
            }
            ret += '\n';
        }
        return ret;
    };
    Object.defineProperty(Mask.prototype, "width", {
        get: function () {
            return this._size.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mask.prototype, "height", {
        get: function () {
            return this._size.height;
        },
        enumerable: true,
        configurable: true
    });
    Mask.prototype.index = function (off) {
        return this._size.index(off);
    };
    Mask.prototype.getAt = function (index) {
        return this._bits[index];
    };
    Mask.prototype.get = function (off) {
        return this.getAt(this.index(off));
    };
    // mutators
    Mask.prototype.setAt = function (index, value) {
        this._bits[index] = value;
        return this;
    };
    Mask.prototype.set = function (off, value) {
        return this.setAt(this.index(off), value);
    };
    return Mask;
}());
exports.Mask = Mask;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var X_FROM_DIRECTION = [0, 1, 0, -1];
var Y_FROM_DIRECTION = [-1, 0, 1, 0];
var Offset = (function () {
    function Offset(x, y) {
        if (typeof x === 'undefined') {
            x = 0;
        }
        if (typeof y === 'undefined') {
            y = 0;
        }
        this.x = x;
        this.y = y;
    }
    // accessors
    Offset.prototype.toString = function () {
        return "(" + this.x + "," + this.y + ")";
    };
    Offset.prototype.equals = function (other) {
        return this.x === other.x && this.y === other.y;
    };
    Object.defineProperty(Offset.prototype, "magnitudeChebyshev", {
        // chebyshev: can move in any direction (diagonals are ok)
        get: function () {
            return Math.max(Math.abs(this.x), Math.abs(this.y));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Offset.prototype, "magnitudeManhattan", {
        // manhattan: can move only in cardinal directions (no diagonals)
        get: function () {
            return Math.abs(this.x) + Math.abs(this.y);
        },
        enumerable: true,
        configurable: true
    });
    // mutators
    Offset.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    Offset.prototype.copyFrom = function (other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    };
    Offset.prototype.setFromDirection = function (dir) {
        this.x = X_FROM_DIRECTION[dir];
        this.y = Y_FROM_DIRECTION[dir];
        return this;
    };
    Offset.prototype.add = function (x, y) {
        this.x += x;
        this.y += y;
        return this;
    };
    Offset.prototype.addSize = function (size) {
        this.x += size.width;
        this.y += size.height;
        return this;
    };
    Offset.prototype.addOffset = function (off) {
        this.x += off.x;
        this.y += off.y;
        return this;
    };
    Offset.prototype.addDirection = function (dir) {
        this.x += X_FROM_DIRECTION[dir];
        this.y += Y_FROM_DIRECTION[dir];
        return this;
    };
    Offset.prototype.addCardinalDirection = function (dir) {
        this.x += X_FROM_DIRECTION[dir];
        this.y += Y_FROM_DIRECTION[dir];
        return this;
    };
    Offset.prototype.subtractOffset = function (off) {
        this.x -= off.x;
        this.y -= off.y;
        return this;
    };
    Offset.prototype.multiply = function (factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    };
    // utilities
    // chebyshev: can move in any direction (diagonals are ok)
    Offset.prototype.distanceChebyshev = function (other) {
        return this.subtractOffset(other).magnitudeChebyshev;
    };
    // manhattan: can move only in cardinal directions (no diagonals)
    Offset.prototype.distanceManhattan = function (other) {
        return this.subtractOffset(other).magnitudeManhattan;
    };
    return Offset;
}());
exports.Offset = Offset;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var geom = __webpack_require__(0);
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
var Path = (function () {
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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var geom = __webpack_require__(0);
var RasterMask = (function () {
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "southY", {
        get: function () {
            return this.northWest.y + this.size.height - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "westX", {
        get: function () {
            return this.northWest.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "eastX", {
        get: function () {
            return this.northWest.x + this.size.width - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "width", {
        get: function () {
            return this.size.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RasterMask.prototype, "height", {
        get: function () {
            return this.size.height;
        },
        enumerable: true,
        configurable: true
    });
    RasterMask.prototype.bandsAt = function (y, callback) {
        var line = this._lines[y - this.northY];
        for (var i = 0; i < line.length; i += 2) {
            callback(line[i], line[i + 1] - 1);
        }
    };
    return RasterMask;
}());
exports.RasterMask = RasterMask;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var geom = __webpack_require__(0);
var LOCAL_OFF = new geom.Offset();
var Rectangle = (function () {
    function Rectangle(westX, northY, width, height) {
        if (typeof westX === 'undefined') {
            westX = 0;
        }
        if (typeof northY === 'undefined') {
            northY = 0;
        }
        if (typeof width === 'undefined') {
            width = 0;
        }
        if (typeof height === 'undefined') {
            height = 0;
        }
        this.northWest = new geom.Offset(westX, northY);
        this.size = new geom.Size(width, height);
    }
    // accessors
    Rectangle.prototype.toString = function () {
        return "(" + this.westX + "," + this.northY + " " + this.width + "x" + this.height + ")";
    };
    Rectangle.prototype.equals = function (other) {
        return this.westX === other.westX && this.northY === other.northY && this.size.equals(other);
    };
    Object.defineProperty(Rectangle.prototype, "northY", {
        get: function () {
            return this.northWest.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "southY", {
        get: function () {
            return this.northWest.y + this.size.height - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "westX", {
        get: function () {
            return this.northWest.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "eastX", {
        get: function () {
            return this.northWest.x + this.size.width - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this.size.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this.size.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "empty", {
        get: function () {
            return this.size.empty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "area", {
        get: function () {
            return this.size.area;
        },
        enumerable: true,
        configurable: true
    });
    // mutators
    Rectangle.prototype.set = function (westX, northY, width, height) {
        this.northWest.set(westX, northY);
        this.size.set(width, height);
        return this;
    };
    Rectangle.prototype.copyFrom = function (other) {
        this.northWest.set(other.westX, other.northY);
        this.size.set(other.width, other.height);
        return this;
    };
    Rectangle.prototype.extendToInclude = function (off) {
        var dx = off.x - this.westX;
        if (dx < 0) {
            this.size.width -= dx;
            this.northWest.x = off.x;
        }
        else if (dx >= this.size.width) {
            this.size.width = dx + 1;
        }
        var dy = off.y - this.northWest.y;
        if (dy < 0) {
            this.size.height -= dy;
            this.northWest.y = off.y;
        }
        else if (dy >= this.size.height) {
            this.size.height = dy + 1;
        }
        return this;
    };
    // utilities
    Rectangle.prototype.containsOffset = function (off) {
        return this.size.containsOffset(LOCAL_OFF.copyFrom(off).subtractOffset(this.northWest));
    };
    Rectangle.prototype.containsRectangle = function (other) {
        LOCAL_OFF.set(other.westX, other.northY).subtractOffset(this.northWest);
        if (!this.size.containsOffset(LOCAL_OFF)) {
            return false;
        }
        if (other.width === 0 && other.height === 0) {
            return false;
        }
        return this.size.containsOffset(LOCAL_OFF.add(other.width - 1, other.height - 1));
    };
    Rectangle.prototype.overlapsRectangle = function (other) {
        return this.northY <= other.northY + other.height - 1
            && this.southY >= other.northY
            && this.westX <= other.westX + other.width - 1
            && this.eastX >= other.westX
            && !this.empty
            && other.width !== 0 && other.height !== 0;
    };
    Rectangle.prototype.index = function (off) {
        return this.size.index(LOCAL_OFF.copyFrom(off).subtractOffset(this.northWest));
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Size = (function () {
    function Size(width, height) {
        if (typeof width === 'undefined') {
            width = 0;
        }
        if (typeof height === 'undefined') {
            height = 0;
        }
        this.width = width;
        this.height = height;
    }
    // accessors
    Size.prototype.toString = function () {
        return "(" + this.width + "x" + this.height + ")";
    };
    Size.prototype.equals = function (other) {
        return this.width === other.width && this.height === other.height;
    };
    Object.defineProperty(Size.prototype, "empty", {
        get: function () {
            return this.width === 0 || this.height === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size.prototype, "area", {
        get: function () {
            return this.width * this.height;
        },
        enumerable: true,
        configurable: true
    });
    // mutators
    Size.prototype.set = function (width, height) {
        this.width = width;
        this.height = height;
        return this;
    };
    Size.prototype.copyFrom = function (other) {
        this.width = other.width;
        this.height = other.height;
        return this;
    };
    Size.prototype.add = function (width, height) {
        this.width += width;
        this.height += height;
        return this;
    };
    Size.prototype.addOffset = function (off) {
        this.width += off.x;
        this.height += off.y;
        return this;
    };
    Size.prototype.multiply = function (factor) {
        this.width *= factor;
        this.height *= factor;
        return this;
    };
    // TODO: rotate
    // utilities
    Size.prototype.containsOffset = function (off) {
        return off.x >= 0 && off.y >= 0 && off.x < this.width && off.y < this.height;
    };
    Size.prototype.index = function (off) {
        return off.y * this.width + off.x;
    };
    return Size;
}());
exports.Size = Size;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 *  WallyFOV
 *  github.com/sbj42/WallyFOV
 *  James Clark
 *  Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var block_fractal_1 = __webpack_require__(1);
exports.makeBlockFractal = block_fractal_1.makeBlockFractal;
var geom_1 = __webpack_require__(0);
exports.Direction = geom_1.Direction;
exports.DirectionFlags = geom_1.DirectionFlags;
exports.Offset = geom_1.Offset;


/***/ })
/******/ ]);
//# sourceMappingURL=block-fractal-0.1.0.js.map