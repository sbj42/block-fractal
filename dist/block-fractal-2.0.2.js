var BlockFractal;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/tiled-geometry/lib/compass/axis.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/compass/axis.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.axisAddCardinalTurn = exports.axisFromNorthSouthTurn = exports.axisFromCardinalDirection = exports.axisOrthogonal = exports.axisToString = exports.AXES = exports.Axis = void 0;
var Axis;
(function (Axis) {
    Axis[Axis["NORTH_SOUTH"] = 0] = "NORTH_SOUTH";
    Axis[Axis["WEST_EAST"] = 1] = "WEST_EAST";
})(Axis = exports.Axis || (exports.Axis = {}));
exports.AXES = [
    Axis.NORTH_SOUTH,
    Axis.WEST_EAST,
];
const AXES_STR = [
    'N-S',
    'W-E',
];
function axisToString(axis) {
    return AXES_STR[axis];
}
exports.axisToString = axisToString;
function axisOrthogonal(axis) {
    return (axis ^ 1);
}
exports.axisOrthogonal = axisOrthogonal;
// conversion
function axisFromCardinalDirection(dir) {
    return (dir & 1);
}
exports.axisFromCardinalDirection = axisFromCardinalDirection;
function axisFromNorthSouthTurn(turn) {
    return (turn & 1);
}
exports.axisFromNorthSouthTurn = axisFromNorthSouthTurn;
// math
function axisAddCardinalTurn(axis, turn) {
    return ((axis + turn) & 1);
}
exports.axisAddCardinalTurn = axisAddCardinalTurn;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/compass/cardinal-direction-flags.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/compass/cardinal-direction-flags.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cardinalDirectionFlagsFromCardinalDirection = exports.cardinalDirectionFlagsRemoveCardinalDirection = exports.cardinalDirectionFlagsSetCardinalDirection = exports.cardinalDirectionFlagsHasCardinalDirection = exports.cardinalDirectionFlagsToString = exports.CardinalDirectionFlags = void 0;
var CardinalDirectionFlags;
(function (CardinalDirectionFlags) {
    CardinalDirectionFlags[CardinalDirectionFlags["NONE"] = 0] = "NONE";
    CardinalDirectionFlags[CardinalDirectionFlags["NORTH"] = 1] = "NORTH";
    CardinalDirectionFlags[CardinalDirectionFlags["EAST"] = 2] = "EAST";
    CardinalDirectionFlags[CardinalDirectionFlags["SOUTH"] = 4] = "SOUTH";
    CardinalDirectionFlags[CardinalDirectionFlags["WEST"] = 8] = "WEST";
    CardinalDirectionFlags[CardinalDirectionFlags["ALL"] = 15] = "ALL";
})(CardinalDirectionFlags = exports.CardinalDirectionFlags || (exports.CardinalDirectionFlags = {}));
function cardinalDirectionFlagsToString(flags) {
    let ret = '[';
    if ((flags & CardinalDirectionFlags.NORTH) !== 0) {
        ret += 'N';
    }
    if ((flags & CardinalDirectionFlags.EAST) !== 0) {
        ret += 'E';
    }
    if ((flags & CardinalDirectionFlags.SOUTH) !== 0) {
        ret += 'S';
    }
    if ((flags & CardinalDirectionFlags.WEST) !== 0) {
        ret += 'W';
    }
    return ret + ']';
}
exports.cardinalDirectionFlagsToString = cardinalDirectionFlagsToString;
function cardinalDirectionFlagsHasCardinalDirection(flags, dir) {
    return (flags & cardinalDirectionFlagsFromCardinalDirection(dir)) !== 0;
}
exports.cardinalDirectionFlagsHasCardinalDirection = cardinalDirectionFlagsHasCardinalDirection;
function cardinalDirectionFlagsSetCardinalDirection(flags, dir) {
    return (flags | cardinalDirectionFlagsFromCardinalDirection(dir));
}
exports.cardinalDirectionFlagsSetCardinalDirection = cardinalDirectionFlagsSetCardinalDirection;
function cardinalDirectionFlagsRemoveCardinalDirection(flags, dir) {
    return (flags & ~cardinalDirectionFlagsFromCardinalDirection(dir));
}
exports.cardinalDirectionFlagsRemoveCardinalDirection = cardinalDirectionFlagsRemoveCardinalDirection;
// conversion
function cardinalDirectionFlagsFromCardinalDirection(dir) {
    return (1 << dir);
}
exports.cardinalDirectionFlagsFromCardinalDirection = cardinalDirectionFlagsFromCardinalDirection;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/compass/cardinal-direction.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/compass/cardinal-direction.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cardinalDirectionAddCardinalTurn = exports.cardinalDirectionFromCardinalOrientation = exports.cardinalDirectionFromNorthTurn = exports.cardinalDirectionFromDirection = exports.cardinalDirectionOpposite = exports.cardinalDirectionToString = exports.CARDINAL_DIRECTIONS = exports.CardinalDirection = void 0;
var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection[CardinalDirection["NORTH"] = 0] = "NORTH";
    CardinalDirection[CardinalDirection["EAST"] = 1] = "EAST";
    CardinalDirection[CardinalDirection["SOUTH"] = 2] = "SOUTH";
    CardinalDirection[CardinalDirection["WEST"] = 3] = "WEST";
})(CardinalDirection = exports.CardinalDirection || (exports.CardinalDirection = {}));
exports.CARDINAL_DIRECTIONS = [
    CardinalDirection.NORTH,
    CardinalDirection.EAST,
    CardinalDirection.SOUTH,
    CardinalDirection.WEST,
];
const CARDINAL_DIRECTIONS_STR = [
    'N',
    'E',
    'S',
    'W',
];
function cardinalDirectionToString(dir) {
    return CARDINAL_DIRECTIONS_STR[dir];
}
exports.cardinalDirectionToString = cardinalDirectionToString;
function cardinalDirectionOpposite(dir) {
    return ((dir + 2) & 3);
}
exports.cardinalDirectionOpposite = cardinalDirectionOpposite;
// conversion
function cardinalDirectionFromDirection(dir) {
    return (dir >> 1);
}
exports.cardinalDirectionFromDirection = cardinalDirectionFromDirection;
function cardinalDirectionFromNorthTurn(turn) {
    return turn;
}
exports.cardinalDirectionFromNorthTurn = cardinalDirectionFromNorthTurn;
function cardinalDirectionFromCardinalOrientation(orientation) {
    return (orientation >>> 1);
}
exports.cardinalDirectionFromCardinalOrientation = cardinalDirectionFromCardinalOrientation;
// math
function cardinalDirectionAddCardinalTurn(dir, turn) {
    return ((dir + turn) & 3);
}
exports.cardinalDirectionAddCardinalTurn = cardinalDirectionAddCardinalTurn;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/compass/cardinal-orientation.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/compass/cardinal-orientation.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cardinalOrientationAddCardinalTurn = exports.cardinalOrientationFromFlipAndCardinalDirection = exports.cardinalOrientationReverse = exports.cardinalOrientationFlip = exports.cardinalOrientationToString = exports.CARDINAL_ORIENTATIONS = exports.CardinalOrientation = void 0;
const axis_1 = __webpack_require__(/*! ./axis */ "./node_modules/tiled-geometry/lib/compass/axis.js");
const flip_1 = __webpack_require__(/*! ./flip */ "./node_modules/tiled-geometry/lib/compass/flip.js");
var CardinalOrientation;
(function (CardinalOrientation) {
    CardinalOrientation[CardinalOrientation["HEADS_NORTH"] = 0] = "HEADS_NORTH";
    CardinalOrientation[CardinalOrientation["TAILS_NORTH"] = 1] = "TAILS_NORTH";
    CardinalOrientation[CardinalOrientation["HEADS_EAST"] = 2] = "HEADS_EAST";
    CardinalOrientation[CardinalOrientation["TAILS_EAST"] = 3] = "TAILS_EAST";
    CardinalOrientation[CardinalOrientation["HEADS_SOUTH"] = 4] = "HEADS_SOUTH";
    CardinalOrientation[CardinalOrientation["TAILS_SOUTH"] = 5] = "TAILS_SOUTH";
    CardinalOrientation[CardinalOrientation["HEADS_WEST"] = 6] = "HEADS_WEST";
    CardinalOrientation[CardinalOrientation["TAILS_WEST"] = 7] = "TAILS_WEST";
})(CardinalOrientation = exports.CardinalOrientation || (exports.CardinalOrientation = {}));
exports.CARDINAL_ORIENTATIONS = [
    CardinalOrientation.HEADS_NORTH,
    CardinalOrientation.TAILS_NORTH,
    CardinalOrientation.HEADS_EAST,
    CardinalOrientation.TAILS_EAST,
    CardinalOrientation.HEADS_SOUTH,
    CardinalOrientation.TAILS_SOUTH,
    CardinalOrientation.HEADS_WEST,
    CardinalOrientation.TAILS_WEST,
];
const CARDINAL_ORIENTATIONS_STR = [
    'HN',
    'TN',
    'HE',
    'TE',
    'HS',
    'TS',
    'HW',
    'TW',
];
function cardinalOrientationToString(orientation) {
    return CARDINAL_ORIENTATIONS_STR[orientation];
}
exports.cardinalOrientationToString = cardinalOrientationToString;
function cardinalOrientationFlip(orientation, axis) {
    if (axis === axis_1.Axis.NORTH_SOUTH) {
        return ((9 - orientation) & 7);
    }
    else {
        return ((13 - orientation) & 7);
    }
}
exports.cardinalOrientationFlip = cardinalOrientationFlip;
function cardinalOrientationReverse(orientation) {
    if (orientation === CardinalOrientation.HEADS_EAST) {
        return CardinalOrientation.HEADS_WEST;
    }
    else if (orientation === CardinalOrientation.HEADS_WEST) {
        return CardinalOrientation.HEADS_EAST;
    }
    else {
        return orientation;
    }
}
exports.cardinalOrientationReverse = cardinalOrientationReverse;
// conversion
function cardinalOrientationFromFlipAndCardinalDirection(flip, dir) {
    return (dir * 2 + (flip !== flip_1.Flip.HEADS ? 1 : 0));
}
exports.cardinalOrientationFromFlipAndCardinalDirection = cardinalOrientationFromFlipAndCardinalDirection;
// math
function cardinalOrientationAddCardinalTurn(orientation, turn) {
    return ((orientation + turn * 2) & 7);
}
exports.cardinalOrientationAddCardinalTurn = cardinalOrientationAddCardinalTurn;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/compass/cardinal-turn.js":
/*!******************************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/compass/cardinal-turn.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cardinalTurnAddCardinalTurn = exports.cardinalTurnFromTurn = exports.cardinalTurnFromCardinalDirections = exports.cardinalTurnReverse = exports.cardinalTurnToDegrees = exports.cardinalTurnToString = exports.CARDINAL_TURNS = exports.CardinalTurn = void 0;
var CardinalTurn;
(function (CardinalTurn) {
    CardinalTurn[CardinalTurn["NONE"] = 0] = "NONE";
    CardinalTurn[CardinalTurn["RIGHT"] = 1] = "RIGHT";
    CardinalTurn[CardinalTurn["AROUND"] = 2] = "AROUND";
    CardinalTurn[CardinalTurn["LEFT"] = 3] = "LEFT";
})(CardinalTurn = exports.CardinalTurn || (exports.CardinalTurn = {}));
exports.CARDINAL_TURNS = [
    CardinalTurn.NONE,
    CardinalTurn.RIGHT,
    CardinalTurn.AROUND,
    CardinalTurn.LEFT,
];
const CARDINAL_TURNS_STR = [
    'T0',
    'T+90',
    'T180',
    'T-90',
];
function cardinalTurnToString(dir) {
    return CARDINAL_TURNS_STR[dir];
}
exports.cardinalTurnToString = cardinalTurnToString;
function cardinalTurnToDegrees(turn) {
    return turn * 90;
}
exports.cardinalTurnToDegrees = cardinalTurnToDegrees;
function cardinalTurnReverse(dir) {
    return ((4 - dir) & 3);
}
exports.cardinalTurnReverse = cardinalTurnReverse;
// conversion
function cardinalTurnFromCardinalDirections(from, to) {
    return ((to - from) & 3);
}
exports.cardinalTurnFromCardinalDirections = cardinalTurnFromCardinalDirections;
function cardinalTurnFromTurn(turn) {
    return (turn >> 1);
}
exports.cardinalTurnFromTurn = cardinalTurnFromTurn;
// math
function cardinalTurnAddCardinalTurn(turn1, turn2) {
    return ((turn1 + turn2) & 3);
}
exports.cardinalTurnAddCardinalTurn = cardinalTurnAddCardinalTurn;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/compass/direction.js":
/*!**************************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/compass/direction.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.directionAddCardinalTurn = exports.directionAddTurn = exports.directionFromCardinalDirection = exports.directionOpposite = exports.directionIsCardinal = exports.directionToString = exports.DIRECTIONS = exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction[Direction["NORTHEAST"] = 1] = "NORTHEAST";
    Direction[Direction["EAST"] = 2] = "EAST";
    Direction[Direction["SOUTHEAST"] = 3] = "SOUTHEAST";
    Direction[Direction["SOUTH"] = 4] = "SOUTH";
    Direction[Direction["SOUTHWEST"] = 5] = "SOUTHWEST";
    Direction[Direction["WEST"] = 6] = "WEST";
    Direction[Direction["NORTHWEST"] = 7] = "NORTHWEST";
})(Direction = exports.Direction || (exports.Direction = {}));
exports.DIRECTIONS = [
    Direction.NORTH,
    Direction.NORTHEAST,
    Direction.EAST,
    Direction.SOUTHEAST,
    Direction.SOUTH,
    Direction.SOUTHWEST,
    Direction.WEST,
    Direction.NORTHWEST,
];
const DIRECTIONS_STR = [
    'N',
    'NE',
    'E',
    'SE',
    'S',
    'SW',
    'W',
    'NW',
];
function directionToString(dir) {
    return DIRECTIONS_STR[dir];
}
exports.directionToString = directionToString;
function directionIsCardinal(dir) {
    return (dir & 1) === 0;
}
exports.directionIsCardinal = directionIsCardinal;
function directionOpposite(dir) {
    return ((dir + 4) & 7);
}
exports.directionOpposite = directionOpposite;
// conversion
function directionFromCardinalDirection(dir) {
    return (dir << 1);
}
exports.directionFromCardinalDirection = directionFromCardinalDirection;
// math
function directionAddTurn(dir, turn) {
    return ((dir + turn) & 7);
}
exports.directionAddTurn = directionAddTurn;
function directionAddCardinalTurn(dir, turn) {
    return ((dir + turn * 2) & 7);
}
exports.directionAddCardinalTurn = directionAddCardinalTurn;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/compass/flip.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/compass/flip.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.flipFromCardinalOrientation = exports.flipFromBoolean = exports.flipOpposite = exports.flipToString = exports.FLIPS = exports.Flip = void 0;
var Flip;
(function (Flip) {
    Flip[Flip["HEADS"] = 0] = "HEADS";
    Flip[Flip["TAILS"] = 1] = "TAILS";
})(Flip = exports.Flip || (exports.Flip = {}));
exports.FLIPS = [
    Flip.HEADS,
    Flip.TAILS,
];
const FLIPS_STR = [
    'H',
    'T',
];
function flipToString(flip) {
    return FLIPS_STR[flip];
}
exports.flipToString = flipToString;
function flipOpposite(flip) {
    return (flip ^ 1);
}
exports.flipOpposite = flipOpposite;
// conversion
function flipFromBoolean(tails) {
    return tails ? Flip.TAILS : Flip.HEADS;
}
exports.flipFromBoolean = flipFromBoolean;
function flipFromCardinalOrientation(orientation) {
    return (orientation & 1);
}
exports.flipFromCardinalOrientation = flipFromCardinalOrientation;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/compass/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/compass/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./direction */ "./node_modules/tiled-geometry/lib/compass/direction.js"), exports);
__exportStar(__webpack_require__(/*! ./turn */ "./node_modules/tiled-geometry/lib/compass/turn.js"), exports);
__exportStar(__webpack_require__(/*! ./cardinal-direction */ "./node_modules/tiled-geometry/lib/compass/cardinal-direction.js"), exports);
__exportStar(__webpack_require__(/*! ./cardinal-turn */ "./node_modules/tiled-geometry/lib/compass/cardinal-turn.js"), exports);
__exportStar(__webpack_require__(/*! ./cardinal-direction-flags */ "./node_modules/tiled-geometry/lib/compass/cardinal-direction-flags.js"), exports);
__exportStar(__webpack_require__(/*! ./flip */ "./node_modules/tiled-geometry/lib/compass/flip.js"), exports);
__exportStar(__webpack_require__(/*! ./cardinal-orientation */ "./node_modules/tiled-geometry/lib/compass/cardinal-orientation.js"), exports);
__exportStar(__webpack_require__(/*! ./axis */ "./node_modules/tiled-geometry/lib/compass/axis.js"), exports);


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/compass/turn.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/compass/turn.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.turnAddTurn = exports.turnFromDirections = exports.turnFromCardinalTurn = exports.turnFromCardinalDirections = exports.turnReverse = exports.turnIsCardinal = exports.turnToDegrees = exports.turnToString = exports.TURNS = exports.Turn = void 0;
var Turn;
(function (Turn) {
    Turn[Turn["NONE"] = 0] = "NONE";
    Turn[Turn["R_45"] = 1] = "R_45";
    Turn[Turn["R_90"] = 2] = "R_90";
    Turn[Turn["R_135"] = 3] = "R_135";
    Turn[Turn["T_180"] = 4] = "T_180";
    Turn[Turn["L_135"] = 5] = "L_135";
    Turn[Turn["L_90"] = 6] = "L_90";
    Turn[Turn["L_45"] = 7] = "L_45";
})(Turn = exports.Turn || (exports.Turn = {}));
exports.TURNS = [
    Turn.NONE,
    Turn.R_45,
    Turn.R_90,
    Turn.R_135,
    Turn.T_180,
    Turn.L_135,
    Turn.L_90,
    Turn.L_45,
];
const TURNS_STR = [
    'T0',
    'T+45',
    'T+90',
    'T+135',
    'T180',
    'T-135',
    'T-90',
    'T-45',
];
function turnToString(turn) {
    return TURNS_STR[turn];
}
exports.turnToString = turnToString;
function turnToDegrees(turn) {
    return turn * 45;
}
exports.turnToDegrees = turnToDegrees;
function turnIsCardinal(turn) {
    return (turn & 1) === 0;
}
exports.turnIsCardinal = turnIsCardinal;
function turnReverse(turn) {
    return ((8 - turn) & 7);
}
exports.turnReverse = turnReverse;
// conversion
function turnFromCardinalDirections(from, to) {
    return (((to - from) * 2) & 7);
}
exports.turnFromCardinalDirections = turnFromCardinalDirections;
function turnFromCardinalTurn(turn) {
    return (turn << 1);
}
exports.turnFromCardinalTurn = turnFromCardinalTurn;
function turnFromDirections(from, to) {
    return ((to - from) & 7);
}
exports.turnFromDirections = turnFromDirections;
// math
function turnAddTurn(turn1, turn2) {
    return ((turn1 + turn2) & 7);
}
exports.turnAddTurn = turnAddTurn;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/grid/cardinal-path.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/grid/cardinal-path.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CardinalPath = void 0;
const compass_1 = __webpack_require__(/*! ../compass */ "./node_modules/tiled-geometry/lib/compass/index.js");
const offset_1 = __webpack_require__(/*! ./offset */ "./node_modules/tiled-geometry/lib/grid/offset.js");
const rectangle_1 = __webpack_require__(/*! ./rectangle */ "./node_modules/tiled-geometry/lib/grid/rectangle.js");
const raster_mask_1 = __webpack_require__(/*! ./raster-mask */ "./node_modules/tiled-geometry/lib/grid/raster-mask.js");
const LOCAL_OFF = new offset_1.Offset();
function sortedInsert(array, value) {
    array.push(value);
    let i = array.length - 1;
    while (i > 0 && value < array[i - 1]) {
        array[i] = array[i - 1];
        i--;
    }
    array[i] = value;
}
class CardinalPath {
    constructor(start, segments) {
        this._start = new offset_1.Offset();
        this._start.copyFrom(start);
        this._segments = segments;
    }
    // accessors
    toString() {
        return `${this._start.toString()}:`
            + `${this._segments.map((segment) => compass_1.cardinalDirectionToString(segment)).join('')}`;
    }
    equals(other) {
        return this._start.equals(other._start)
            && this._segments.length === other._segments.length
            && this._segments.every((v, i) => v === other._segments[i]);
    }
    get length() {
        return this._segments.length;
    }
    // utilities
    getIsClosed() {
        LOCAL_OFF.copyFrom(this._start);
        for (const segment of this._segments) {
            LOCAL_OFF.addCardinalDirection(segment);
        }
        return this._start.equals(LOCAL_OFF);
    }
    *offsets() {
        let { x, y } = this._start;
        yield { x, y };
        for (const segment of this._segments) {
            LOCAL_OFF.setFromCardinalDirection(segment);
            x += LOCAL_OFF.x;
            y += LOCAL_OFF.y;
            yield { x, y };
        }
    }
    getBounds() {
        let northY = this._start.y;
        let southY = northY;
        let westX = this._start.x;
        let eastX = westX;
        LOCAL_OFF.copyFrom(this._start);
        for (const segment of this._segments) {
            LOCAL_OFF.addCardinalDirection(segment);
            switch (segment) {
                case compass_1.CardinalDirection.NORTH:
                    northY = Math.min(northY, LOCAL_OFF.y);
                    break;
                case compass_1.CardinalDirection.EAST:
                    eastX = Math.max(eastX, LOCAL_OFF.x);
                    break;
                case compass_1.CardinalDirection.SOUTH:
                    southY = Math.max(southY, LOCAL_OFF.y);
                    break;
                case compass_1.CardinalDirection.WEST:
                    westX = Math.min(westX, LOCAL_OFF.x);
                    break;
                // istanbul ignore next
                default:
                    throw new Error(`bad direction ${segment} in cardinal path`);
            }
        }
        return new rectangle_1.Rectangle(westX, northY, eastX - westX + 1, southY - northY + 1);
    }
    getArea() {
        let total = 0;
        LOCAL_OFF.copyFrom(this._start);
        for (const segment of this._segments) {
            LOCAL_OFF.addCardinalDirection(segment);
            switch (segment) {
                case compass_1.CardinalDirection.NORTH:
                    total -= LOCAL_OFF.x;
                    break;
                case compass_1.CardinalDirection.SOUTH:
                    total += LOCAL_OFF.x;
                    break;
            }
        }
        return Math.abs(total);
    }
    rasterize(bounds) {
        const lines = new Array();
        if (typeof bounds === 'undefined') {
            bounds = this.getBounds();
        }
        // assert(this.getIsClosed())
        LOCAL_OFF.copyFrom(this._start);
        const { northY } = bounds;
        const southY = northY + bounds.height - 1;
        for (let y = northY; y < southY; y++) {
            lines.push([]);
        }
        LOCAL_OFF.copyFrom(this._start);
        // assert(LOCAL_OFF.y >= northY && LOCAL_OFF.y <= southY)
        for (const segment of this._segments) {
            if (segment === compass_1.CardinalDirection.SOUTH) {
                sortedInsert(lines[LOCAL_OFF.y - northY], LOCAL_OFF.x);
            }
            LOCAL_OFF.addCardinalDirection(segment);
            // assert(LOCAL_OFF.y >= northY && LOCAL_OFF.y <= southY)
            if (segment === compass_1.CardinalDirection.NORTH) {
                sortedInsert(lines[LOCAL_OFF.y - northY], LOCAL_OFF.x);
            }
        }
        return new raster_mask_1.RasterMask({
            westX: bounds.westX,
            northY: bounds.northY,
            width: bounds.width - 1,
            height: bounds.height - 1,
        }, lines);
    }
}
exports.CardinalPath = CardinalPath;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/grid/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/grid/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./offset */ "./node_modules/tiled-geometry/lib/grid/offset.js"), exports);
__exportStar(__webpack_require__(/*! ./size */ "./node_modules/tiled-geometry/lib/grid/size.js"), exports);
__exportStar(__webpack_require__(/*! ./rectangle */ "./node_modules/tiled-geometry/lib/grid/rectangle.js"), exports);
__exportStar(__webpack_require__(/*! ./mask */ "./node_modules/tiled-geometry/lib/grid/mask.js"), exports);
__exportStar(__webpack_require__(/*! ./mask-rectangle */ "./node_modules/tiled-geometry/lib/grid/mask-rectangle.js"), exports);
__exportStar(__webpack_require__(/*! ./raster-mask */ "./node_modules/tiled-geometry/lib/grid/raster-mask.js"), exports);
__exportStar(__webpack_require__(/*! ./cardinal-path */ "./node_modules/tiled-geometry/lib/grid/cardinal-path.js"), exports);
__exportStar(__webpack_require__(/*! ./transform-rectangle */ "./node_modules/tiled-geometry/lib/grid/transform-rectangle.js"), exports);


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/grid/mask-rectangle.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/grid/mask-rectangle.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaskRectangle = void 0;
const rectangle_1 = __webpack_require__(/*! ./rectangle */ "./node_modules/tiled-geometry/lib/grid/rectangle.js");
const mask_1 = __webpack_require__(/*! ./mask */ "./node_modules/tiled-geometry/lib/grid/mask.js");
class MaskRectangle {
    constructor(rect, initialValue = false, outsideValue = false) {
        this._rect = new rectangle_1.Rectangle();
        if (typeof rect !== 'undefined') {
            this._rect.copyFrom(rect);
        }
        this._mask = new mask_1.Mask(rect, initialValue);
        this._outsideValue = outsideValue;
    }
    // accessors
    toString() {
        return `${this._rect.northWest}/${this._outsideValue}\n${this._mask}`;
    }
    equals(other) {
        return this._rect.equals(other._rect)
            && this._mask.equals(other._mask)
            && this._outsideValue === other._outsideValue;
    }
    get westX() {
        return this._rect.westX;
    }
    get northY() {
        return this._rect.northY;
    }
    get width() {
        return this._rect.width;
    }
    get height() {
        return this._rect.height;
    }
    get(x, y) {
        if (!this._rect.contains(x, y)) {
            return this._outsideValue;
        }
        return this._mask.get(x - this.westX, y - this.northY);
    }
    getAtIndex(index) {
        return this._mask.getAtIndex(index);
    }
    getAtOffset(off) {
        return this.get(off.x, off.y);
    }
    // mutators
    copyFrom(other) {
        this._rect.copyFrom(other._rect);
        this._mask.copyFrom(other._mask);
        this._outsideValue = other._outsideValue;
        return this;
    }
    set(x, y, value) {
        this._mask.set(x - this.westX, y - this.northY, value);
        return this;
    }
    setAtOffset(off, value) {
        return this.set(off.x, off.y, value);
    }
    setAtIndex(index, value) {
        this._mask.setAtIndex(index, value);
        return this;
    }
    // utilities
    index(x, y) {
        return this._mask.index(x - this.westX, y - this.northY);
    }
    *locations() {
        for (const loc of this._mask.locations()) {
            const x = loc.x + this.westX;
            const y = loc.y + this.northY;
            const { value } = loc;
            yield { x, y, value };
        }
    }
    *offsetsWithTrue() {
        for (const off of this._mask.offsetsWithTrue()) {
            const x = off.x + this.westX;
            const y = off.y + this.northY;
            yield { x, y };
        }
    }
}
exports.MaskRectangle = MaskRectangle;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/grid/mask.js":
/*!******************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/grid/mask.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mask = void 0;
const size_1 = __webpack_require__(/*! ./size */ "./node_modules/tiled-geometry/lib/grid/size.js");
class Mask {
    constructor(size, initialValue = false) {
        this._size = new size_1.Size();
        if (typeof size !== 'undefined') {
            this._size.copyFrom(size);
        }
        this._bits = new Array(Math.ceil(this._size.area / 32)).fill(initialValue ? 0xffffffff : 0);
    }
    // accessors
    toString() {
        let ret = '';
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                ret += this.get(x, y) ? '☑' : '☐';
            }
            ret += '\n';
        }
        return ret;
    }
    equals(other) {
        return this._size.equals(other._size)
            && this._bits.length === other._bits.length
            && this._bits.every((v, i) => v === other._bits[i]);
    }
    get width() {
        return this._size.width;
    }
    get height() {
        return this._size.height;
    }
    get(x, y) {
        return this.getAtIndex(this.index(x, y));
    }
    getAtOffset(off) {
        return this.get(off.x, off.y);
    }
    getAtIndex(index) {
        // assert(index >= 0 && index < this._size.area)
        const arrayIndex = index >>> 5;
        const bitMask = 1 << (index & 31);
        return (this._bits[arrayIndex] & bitMask) !== 0;
    }
    // mutators
    copyFrom(other) {
        this._size.copyFrom(other._size);
        this._bits = other._bits.slice();
        return this;
    }
    set(x, y, value) {
        return this.setAtIndex(this.index(x, y), value);
    }
    setAtOffset(off, value) {
        return this.set(off.x, off.y, value);
    }
    setAtIndex(index, value) {
        // assert(index >= 0 && index < this._size.area)
        const arrayIndex = index >>> 5;
        const bitMask = 1 << (index & 31);
        if (value) {
            this._bits[arrayIndex] |= bitMask;
        }
        else {
            this._bits[arrayIndex] &= ~bitMask;
        }
        return this;
    }
    // utilities
    index(x, y) {
        return this._size.index(x, y);
    }
    *locations() {
        let arrayIndex = 0;
        let bitMask = 1;
        for (const { x, y } of this._size.offsets()) {
            const value = (this._bits[arrayIndex] & bitMask) !== 0;
            yield { x, y, value };
            if (bitMask === (1 << 31)) {
                bitMask = 1;
                arrayIndex++;
            }
            else {
                bitMask <<= 1;
            }
        }
    }
    *offsetsWithTrue() {
        for (const { x, y, value } of this.locations()) {
            if (value) {
                yield { x, y };
            }
        }
    }
}
exports.Mask = Mask;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/grid/offset.js":
/*!********************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/grid/offset.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Offset = void 0;
const compass_1 = __webpack_require__(/*! ../compass */ "./node_modules/tiled-geometry/lib/compass/index.js");
const X_FROM_DIRECTION = [0, 1, 1, 1, 0, -1, -1, -1];
const Y_FROM_DIRECTION = [-1, -1, 0, 1, 1, 1, 0, -1];
const X_FROM_CARDINAL_DIRECTION = [0, 1, 0, -1];
const Y_FROM_CARDINAL_DIRECTION = [-1, 0, 1, 0];
class Offset {
    constructor(x, y) {
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
    toString() {
        return `(${this.x},${this.y})`;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    // mutators
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    copyFrom(other) {
        return this.set(other.x, other.y);
    }
    setFromDirection(dir) {
        return this.set(X_FROM_DIRECTION[dir], Y_FROM_DIRECTION[dir]);
    }
    setFromCardinalDirection(dir) {
        return this.set(X_FROM_CARDINAL_DIRECTION[dir], Y_FROM_CARDINAL_DIRECTION[dir]);
    }
    add(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }
    addSize(size) {
        return this.add(size.width, size.height);
    }
    addOffset(off) {
        return this.add(off.x, off.y);
    }
    addDirection(dir) {
        return this.add(X_FROM_DIRECTION[dir], Y_FROM_DIRECTION[dir]);
    }
    addCardinalDirection(dir) {
        return this.add(X_FROM_CARDINAL_DIRECTION[dir], Y_FROM_CARDINAL_DIRECTION[dir]);
    }
    subtractOffset(off) {
        return this.add(-off.x, -off.y);
    }
    multiply(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }
    rotate(turn, anchor) {
        if (anchor) {
            return this.subtractOffset(anchor).rotate(turn).addOffset(anchor);
        }
        else {
            const dir = compass_1.cardinalDirectionFromNorthTurn(turn);
            const { x, y } = this;
            const dirx = X_FROM_CARDINAL_DIRECTION[dir];
            const diry = Y_FROM_CARDINAL_DIRECTION[dir];
            const nx = -y * dirx - x * diry;
            const ny = x * dirx - y * diry;
            return this.set(nx, ny);
        }
    }
    // utilities
    // chebyshev: can move in any direction (diagonals are ok)
    distanceChebyshev(other) {
        return Math.max(Math.abs(this.x - other.x), Math.abs(this.y - other.y));
    }
    // manhattan: can move only in cardinal directions (no diagonals)
    distanceManhattan(other) {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }
    // chebyshev: can move in any direction (diagonals are ok)
    *nearbyChebyshevOffsets(cursor, radius) {
        if (radius >= 0) {
            for (let dy = -radius; dy <= radius; dy++) {
                for (let dx = -radius; dx <= radius; dx++) {
                    yield cursor.set(this.x + dx, this.y + dy);
                }
            }
        }
    }
}
exports.Offset = Offset;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/grid/raster-mask.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/grid/raster-mask.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RasterMask = void 0;
const rectangle_1 = __webpack_require__(/*! ./rectangle */ "./node_modules/tiled-geometry/lib/grid/rectangle.js");
class RasterMask {
    constructor(bounds, lines) {
        this._rect = new rectangle_1.Rectangle();
        if (lines.length !== bounds.height) {
            throw new Error(`bad lines array length ${lines.length} for bounds ${bounds}`);
        }
        this._rect.copyFrom(bounds);
        this._lines = lines;
    }
    // accessors
    toString() {
        let shape = '';
        const { eastX } = this._rect;
        for (let y = 0; y < this.height; y++) {
            const line = this._lines[y];
            let x = this.westX;
            for (let i = 0; i < line.length; i += 2) {
                const start = line[i];
                const end = line[i + 1];
                while (x < start) {
                    shape += '∙';
                    x++;
                }
                while (x < end) {
                    shape += '█';
                    x++;
                }
            }
            while (x <= eastX) {
                shape += '∙';
                x++;
            }
            shape += '\n';
        }
        return `(${this._rect.westX},${this._rect.northY})\n${shape}`;
    }
    equals(other) {
        return this._rect.equals(other._rect)
            && this._lines.length === other._lines.length
            && this._lines.every((v, i) => (v.length === other._lines[i].length
                && v.every((w, j) => w === other._lines[i][j])));
    }
    get northY() {
        return this._rect.northY;
    }
    get southY() {
        return this._rect.southY;
    }
    get westX() {
        return this._rect.westX;
    }
    get width() {
        return this._rect.width;
    }
    get height() {
        return this._rect.height;
    }
    get(x, y) {
        if (y < this.northY || y > this._rect.southY) {
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
    getAtOffset(off) {
        return this.get(off.x, off.y);
    }
    // utilities
    *bandsAt(y) {
        if (y >= this.northY && y <= this._rect.southY) {
            const line = this._lines[y - this.northY];
            for (let i = 0; i < line.length; i += 2) {
                yield {
                    westX: line[i],
                    eastX: line[i + 1] - 1,
                };
            }
        }
    }
}
exports.RasterMask = RasterMask;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/grid/rectangle.js":
/*!***********************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/grid/rectangle.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rectangle = void 0;
const size_1 = __webpack_require__(/*! ./size */ "./node_modules/tiled-geometry/lib/grid/size.js");
const offset_1 = __webpack_require__(/*! ./offset */ "./node_modules/tiled-geometry/lib/grid/offset.js");
const ROTATE_CORNER_X = [0, 0, 1, 1];
const ROTATE_CORNER_Y = [0, 1, 1, 0];
class Rectangle {
    constructor(westX, northY, width, height) {
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
        this.northWest = new offset_1.Offset(westX, northY);
        this.size = new size_1.Size(width, height);
    }
    // accessors
    toString() {
        return `(${this.westX},${this.northY} ${this.width}x${this.height})`;
    }
    equals(other) {
        return this.westX === other.westX && this.northY === other.northY && this.size.equals(other);
    }
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
    get empty() {
        return this.size.empty;
    }
    get area() {
        return this.size.area;
    }
    // mutators
    set(westX, northY, width, height) {
        this.northWest.set(westX, northY);
        this.size.set(width, height);
        return this;
    }
    setFromCorners(off1, off2) {
        const westX = Math.min(off1.x, off2.x);
        const eastX = Math.max(off1.x, off2.x);
        const northY = Math.min(off1.y, off2.y);
        const southY = Math.max(off1.y, off2.y);
        return this.set(westX, northY, eastX - westX + 1, southY - northY + 1);
    }
    copyFrom(other) {
        return this.set(other.westX, other.northY, other.width, other.height);
    }
    addOffset(off) {
        this.northWest.addOffset(off);
        return this;
    }
    scale(factor) {
        this.northWest.multiply(factor);
        this.size.multiply(factor);
        return this;
    }
    rotate(turn, anchor) {
        const cx = ROTATE_CORNER_X[turn];
        const cy = ROTATE_CORNER_Y[turn];
        this.northWest.add(cx * (this.width - 1), cy * (this.height - 1)).rotate(turn, anchor);
        this.size.rotate(turn);
        return this;
    }
    extendToInclude(off) {
        const dx = off.x - this.westX;
        if (dx < 0) {
            this.size.width -= dx;
            this.northWest.x = off.x;
        }
        else if (dx >= this.size.width) {
            this.size.width = dx + 1;
        }
        const dy = off.y - this.northWest.y;
        if (dy < 0) {
            this.size.height -= dy;
            this.northWest.y = off.y;
        }
        else if (dy >= this.size.height) {
            this.size.height = dy + 1;
        }
        return this;
    }
    // utilities
    contains(x, y) {
        return this.size.contains(x - this.westX, y - this.northY);
    }
    index(x, y) {
        return this.size.index(x - this.westX, y - this.northY);
    }
    containsOffset(off) {
        return this.contains(off.x, off.y);
    }
    containsRectangle(other) {
        if (other.width === 0 && other.height === 0) {
            return false;
        }
        const x = other.westX - this.westX;
        const y = other.northY - this.northY;
        if (!this.size.contains(x, y)) {
            return false;
        }
        return this.size.contains(x + other.width - 1, y + other.height - 1);
    }
    overlapsRectangle(other) {
        return this.northY <= other.northY + other.height - 1
            && this.southY >= other.northY
            && this.westX <= other.westX + other.width - 1
            && this.eastX >= other.westX
            && !this.empty
            && other.width !== 0 && other.height !== 0;
    }
    *offsets() {
        const { eastX, southY } = this;
        for (let y = this.northY; y <= southY; y++) {
            for (let x = this.westX; x <= eastX; x++) {
                yield { x, y };
            }
        }
    }
    anyOf(predicate) {
        for (const { x, y } of this.offsets()) {
            if (predicate(x, y)) {
                return true;
            }
        }
        return false;
    }
}
exports.Rectangle = Rectangle;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/grid/size.js":
/*!******************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/grid/size.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Size = void 0;
const compass_1 = __webpack_require__(/*! ../compass */ "./node_modules/tiled-geometry/lib/compass/index.js");
class Size {
    constructor(width, height) {
        if (typeof width === 'undefined') {
            width = 0;
        }
        if (typeof height === 'undefined') {
            height = 0;
        }
        if (width < 0 || height < 0) {
            throw new Error(`bad size (${width}x${height})`);
        }
        this.width = width;
        this.height = height;
    }
    // accessors
    toString() {
        return `(${this.width}x${this.height})`;
    }
    equals(other) {
        return this.width === other.width && this.height === other.height;
    }
    get empty() {
        return this.width === 0 || this.height === 0;
    }
    get area() {
        return this.width * this.height;
    }
    // mutators
    set(width, height) {
        if (width < 0 || height < 0) {
            throw new Error(`bad size (${width}x${height})`);
        }
        this.width = width;
        this.height = height;
        return this;
    }
    copyFrom(other) {
        return this.set(other.width, other.height);
    }
    add(width, height) {
        this.width += width;
        this.height += height;
        return this;
    }
    multiply(factor) {
        this.width *= factor;
        this.height *= factor;
        return this;
    }
    rotate(turn) {
        if (compass_1.axisFromNorthSouthTurn(turn) === compass_1.Axis.WEST_EAST) {
            this.set(this.height, this.width);
        }
        return this;
    }
    // utilities
    contains(x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    }
    containsOffset(off) {
        return this.contains(off.x, off.y);
    }
    index(x, y) {
        return y * this.width + x;
    }
    *offsets() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                yield { x, y };
            }
        }
    }
    anyOf(predicate) {
        for (const { x, y } of this.offsets()) {
            if (predicate(x, y)) {
                return true;
            }
        }
        return false;
    }
}
exports.Size = Size;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/grid/transform-rectangle.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/grid/transform-rectangle.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformRectangle = void 0;
const rectangle_1 = __webpack_require__(/*! ./rectangle */ "./node_modules/tiled-geometry/lib/grid/rectangle.js");
const compass_1 = __webpack_require__(/*! ../compass */ "./node_modules/tiled-geometry/lib/compass/index.js");
const offset_1 = __webpack_require__(/*! ./offset */ "./node_modules/tiled-geometry/lib/grid/offset.js");
const size_1 = __webpack_require__(/*! ./size */ "./node_modules/tiled-geometry/lib/grid/size.js");
const LOCAL_OFF = new offset_1.Offset();
const LOCAL_OFF2 = new offset_1.Offset();
const LOCAL_SIZE = new size_1.Size();
class TransformRectangle {
    constructor(width, height) {
        this._size = new size_1.Size();
        this._flip = compass_1.Flip.HEADS;
        this._rotate = compass_1.CardinalTurn.NONE;
        this._translate = new offset_1.Offset();
        this._matrix = [1, 0, 0, 0, 1, 0];
        this._targetRect = new rectangle_1.Rectangle();
        if (typeof width === 'undefined') {
            // nothing
        }
        else if (typeof width === 'number') {
            this._size.set(width, height);
        }
        else {
            this._size.copyFrom(width);
        }
        this._update();
    }
    // accessors
    toString() {
        return `[${this._size}`
            + ` -> ${compass_1.flipToString(this._flip)} ${compass_1.cardinalTurnToString(this._rotate)} ${this._translate}`
            + ` -> ${this._targetRect}]`;
    }
    equals(other) {
        return this._size.equals(other._size)
            && this._flip === other._flip
            && this._rotate === other._rotate
            && this._translate.equals(other._translate);
    }
    get flip() {
        return this._flip;
    }
    get rotate() {
        return this._rotate;
    }
    get northY() {
        return this._translate.y;
    }
    get southY() {
        return this._translate.y + this._targetRect.height - 1;
    }
    get westX() {
        return this._translate.x;
    }
    get eastX() {
        return this._translate.x + this._targetRect.width - 1;
    }
    get width() {
        return this._targetRect.width;
    }
    get height() {
        return this._targetRect.height;
    }
    // internal
    // 0
    //    0 -1
    // +90
    //    1  0
    // 180
    //    0  1
    // -90
    //   -1  0
    //
    // heads:
    //   0
    //      1  0  x
    //      0  1  y
    //   +90
    //      0 -1  x + h - 1
    //      1  0  y
    //   180
    //     -1  0  x + w - 1
    //      0 -1  y + h - 1
    //   -90
    //      0  1  x
    //     -1  0  y + w - 1
    //
    // tails:
    //   0
    //     -1  0  x + w - 1
    //      0  1  y
    //   +90
    //      0 -1  x + h - 1
    //     -1  0  y + w - 1
    //   180
    //      1  0  x
    //      0 -1  y + h - 1
    //   -90
    //      0  1  x
    //      1  0  y
    _update() {
        LOCAL_OFF.setFromCardinalDirection(compass_1.cardinalDirectionFromNorthTurn(this._rotate));
        const flipSign = this._flip === compass_1.Flip.TAILS ? -1 : 1;
        this._matrix[0] = -LOCAL_OFF.y * flipSign;
        this._matrix[1] = -LOCAL_OFF.x;
        this._matrix[2] = this._translate.x;
        this._matrix[3] = LOCAL_OFF.x * flipSign;
        this._matrix[4] = -LOCAL_OFF.y;
        this._matrix[5] = this._translate.y;
        switch (this._rotate) {
            case compass_1.CardinalTurn.NONE:
                if (this._flip === compass_1.Flip.TAILS) {
                    this._matrix[2] += this._size.width - 1;
                }
                break;
            case compass_1.CardinalTurn.RIGHT:
                this._matrix[2] += this._size.height - 1;
                if (this._flip === compass_1.Flip.TAILS) {
                    this._matrix[5] += this._size.width - 1;
                }
                break;
            case compass_1.CardinalTurn.AROUND:
                this._matrix[5] += this._size.height - 1;
                if (this._flip === compass_1.Flip.HEADS) {
                    this._matrix[2] += this._size.width - 1;
                }
                break;
            case compass_1.CardinalTurn.LEFT:
                if (this._flip === compass_1.Flip.HEADS) {
                    this._matrix[5] += this._size.width - 1;
                }
                break;
        }
        LOCAL_SIZE.copyFrom(this._size).rotate(this._rotate);
        this._targetRect.set(this._translate.x, this._translate.y, LOCAL_SIZE.width, LOCAL_SIZE.height);
        return this;
    }
    // mutators
    copyFrom(other) {
        this._size.copyFrom(other._size);
        this._flip = other._flip;
        this._rotate = other._rotate;
        this._translate.copyFrom(other._translate);
        other._matrix.forEach((v, i) => this._matrix[i] = v);
        this._targetRect.copyFrom(other._targetRect);
        return this;
    }
    reset() {
        this._flip = compass_1.Flip.HEADS;
        this._rotate = compass_1.CardinalTurn.NONE;
        this._translate.set(0, 0);
        return this._update();
    }
    invert() {
        const nrotate = compass_1.cardinalTurnFromCardinalDirections(compass_1.CardinalDirection.NORTH, compass_1.cardinalDirectionFromCardinalOrientation(compass_1.cardinalOrientationReverse(compass_1.cardinalOrientationFromFlipAndCardinalDirection(this._flip, compass_1.cardinalDirectionFromNorthTurn(this._rotate)))));
        this._rotate = nrotate;
        this._size.rotate(nrotate);
        this._translate.multiply(-1);
        return this._update();
    }
    setTransform(flip, rotate, translate) {
        this._flip = flip;
        this._rotate = rotate;
        this._translate.copyFrom(translate);
        return this._update();
    }
    setFlip(flip) {
        this._flip = flip;
        return this._update();
    }
    setRotate(rotate) {
        this._rotate = rotate;
        return this._update();
    }
    setTranslate(x, y) {
        this._translate.set(x, y);
        return this._update();
    }
    setTranslateOffset(translate) {
        this._translate.copyFrom(translate);
        return this._update();
    }
    // utility
    applyToCardinalOrientation(orientation) {
        if (this._flip === compass_1.Flip.TAILS) {
            orientation = compass_1.cardinalOrientationFlip(orientation, compass_1.Axis.NORTH_SOUTH);
        }
        return compass_1.cardinalOrientationAddCardinalTurn(orientation, this._rotate);
    }
    unapplyFromCardinalOrientation(orientation) {
        orientation = compass_1.cardinalOrientationAddCardinalTurn(orientation, compass_1.cardinalTurnReverse(this._rotate));
        if (this._flip === compass_1.Flip.TAILS) {
            orientation = compass_1.cardinalOrientationFlip(orientation, compass_1.Axis.NORTH_SOUTH);
        }
        return orientation;
    }
    applyToCardinalDirection(orientation) {
        return compass_1.cardinalDirectionFromCardinalOrientation(this.applyToCardinalOrientation(compass_1.cardinalOrientationFromFlipAndCardinalDirection(compass_1.Flip.HEADS, orientation)));
    }
    unapplyFromCardinalDirection(orientation) {
        return compass_1.cardinalDirectionFromCardinalOrientation(this.unapplyFromCardinalOrientation(compass_1.cardinalOrientationFromFlipAndCardinalDirection(compass_1.Flip.HEADS, orientation)));
    }
    applyTo(offOut, x, y) {
        const nx = x * this._matrix[0] + y * this._matrix[1] + this._matrix[2];
        const ny = x * this._matrix[3] + y * this._matrix[4] + this._matrix[5];
        return offOut.set(nx, ny);
    }
    unapplyFrom(offOut, x, y) {
        const tx = x - this._matrix[2];
        const ty = y - this._matrix[5];
        const nx = tx * this._matrix[0] + ty * this._matrix[3];
        const ny = tx * this._matrix[1] + ty * this._matrix[4];
        return offOut.set(nx, ny);
    }
    applyToOffset(offOut, off) {
        if (typeof off === 'undefined') {
            off = offOut;
        }
        return this.applyTo(offOut, off.x, off.y);
    }
    unapplyFromOffset(offOut, off) {
        if (typeof off === 'undefined') {
            off = offOut;
        }
        return this.unapplyFrom(offOut, off.x, off.y);
    }
    applyToRectangle(rectOut, rect) {
        if (typeof rect !== 'undefined') {
            rectOut.copyFrom(rect);
        }
        LOCAL_OFF.set(rectOut.westX, rectOut.northY);
        LOCAL_OFF2.set(rectOut.eastX, rectOut.southY);
        this.applyToOffset(LOCAL_OFF);
        this.applyToOffset(LOCAL_OFF2);
        return rectOut.setFromCorners(LOCAL_OFF, LOCAL_OFF2);
    }
    unapplyFromRectangle(rectOut, rect) {
        if (typeof rect !== 'undefined') {
            rectOut.copyFrom(rect);
        }
        LOCAL_OFF.set(rectOut.westX, rectOut.northY);
        LOCAL_OFF2.set(rectOut.eastX, rectOut.southY);
        this.unapplyFromOffset(LOCAL_OFF);
        this.unapplyFromOffset(LOCAL_OFF2);
        return rectOut.setFromCorners(LOCAL_OFF, LOCAL_OFF2);
    }
}
exports.TransformRectangle = TransformRectangle;


/***/ }),

/***/ "./node_modules/tiled-geometry/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/tiled-geometry/lib/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./compass */ "./node_modules/tiled-geometry/lib/compass/index.js"), exports);
__exportStar(__webpack_require__(/*! ./grid */ "./node_modules/tiled-geometry/lib/grid/index.js"), exports);


/***/ }),

/***/ "./src/block-fractal.ts":
/*!******************************!*\
  !*** ./src/block-fractal.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.makeBlockFractal = void 0;
const geom = __importStar(__webpack_require__(/*! tiled-geometry */ "./node_modules/tiled-geometry/lib/index.js"));
function nextToLastMatch(points, next) {
    return points.length > 1 && points[points.length - 2].equals(next);
}
function addPoint(points, mask, next) {
    if (nextToLastMatch(points, next)) {
        mask.setAtOffset(points.splice(points.length - 1, 1)[0], false);
    }
    else {
        points.push(next);
        mask.setAtOffset(next, true);
    }
}
function verticalHelper(points, random, variation, newPoints, mask, i, p1, p2) {
    const x = 2 * p1.x;
    const yDir = p2.y - p1.y;
    for (let y = 2 * p1.y; y !== 2 * p2.y; y += yDir) {
        const np3 = new geom.Offset(x, y + yDir);
        // console.info(`- ${np3}`);
        if (nextToLastMatch(newPoints, np3)) {
            // This can happen around a corner, when just before the corner
            // we dip into the corner
            // console.info(` remove ${newPoints[newPoints.length - 1]}`);
            mask.setAtOffset(newPoints.splice(newPoints.length - 1, 1)[0], false);
            continue;
        }
        if (i === points.length - 2 && mask.getAtOffset(np3)) {
            // This can happen if the first point was on a corner and the
            // first move was to dip into the corner
            const index = newPoints.findIndex((point) => point.equals(np3));
            // console.info(`remove ${index} from beginning`);
            for (const point of newPoints.splice(0, index)) {
                mask.setAtOffset(point, false);
            }
            addPoint(newPoints, mask, np3);
            break;
        }
        if (random() < variation) {
            const v = Math.floor(random() * 2) * 2 - 1;
            const np1 = new geom.Offset(x + v, y);
            const np2 = new geom.Offset(x + v, y + yDir);
            if (!mask.getAtOffset(np2)) {
                if (!mask.getAtOffset(np1) || nextToLastMatch(newPoints, np1)) {
                    addPoint(newPoints, mask, np1);
                    addPoint(newPoints, mask, np2);
                }
            }
        }
        addPoint(newPoints, mask, np3);
    }
}
function horizontalHelper(points, random, variation, newPoints, mask, i, p1, p2) {
    const y = 2 * p1.y;
    const xDir = p2.x - p1.x;
    for (let x = 2 * p1.x; x !== 2 * p2.x; x += xDir) {
        const np3 = new geom.Offset(x + xDir, y);
        // console.info(`- ${np3}`);
        if (nextToLastMatch(newPoints, np3)) {
            // This can happen around a corner, when just before the corner
            // we dip in the direction of the corner
            // console.info(` remove ${newPoints[newPoints.length - 1]}`);
            mask.setAtOffset(newPoints.splice(newPoints.length - 1, 1)[0], false);
            continue;
        }
        if (i === points.length - 2 && mask.getAtOffset(np3)) {
            // This can happen if the first point was on a corner and the
            // first move was to dip into the corner
            const index = newPoints.findIndex((point) => point.equals(np3));
            // console.info(`remove ${index} from beginning`);
            for (const point of newPoints.splice(0, index)) {
                mask.setAtOffset(point, false);
            }
            addPoint(newPoints, mask, np3);
            break;
        }
        if (random() < variation) {
            const v = Math.floor(random() * 2) * 2 - 1;
            const np1 = new geom.Offset(x, y + v);
            const np2 = new geom.Offset(x + xDir, y + v);
            if (!mask.getAtOffset(np2)) {
                if (!mask.getAtOffset(np1) || nextToLastMatch(newPoints, np1)) {
                    addPoint(newPoints, mask, np1);
                    addPoint(newPoints, mask, np2);
                }
            }
        }
        addPoint(newPoints, mask, np3);
    }
}
function blockFractalIteration(random, points, bounds, variation) {
    const newPoints = new Array();
    const newBounds = new geom.Rectangle(bounds.westX * 2 - 1, bounds.northY * 2 - 1, bounds.width * 2 + 2, bounds.height * 2 + 2);
    // console.info(` bounds ${newBounds}`);
    const mask = new geom.MaskRectangle(newBounds);
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
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
    let { random, shape, variation } = param;
    if (typeof random === 'undefined') {
        random = Math.random;
    }
    if (typeof shape === 'undefined') {
        shape = new geom.CardinalPath({ x: -1, y: -1 }, [
            geom.CardinalDirection.EAST,
            geom.CardinalDirection.EAST,
            geom.CardinalDirection.SOUTH,
            geom.CardinalDirection.SOUTH,
            geom.CardinalDirection.WEST,
            geom.CardinalDirection.WEST,
            geom.CardinalDirection.NORTH,
            geom.CardinalDirection.NORTH,
        ]);
    }
    if (typeof variation === 'undefined') {
        variation = 0.4;
    }
    let points = new Array();
    let bounds = shape.getBounds();
    for (const off of shape.offsets()) {
        points.push(new geom.Offset(off.x, off.y));
    }
    for (let iter = 0; iter < param.iterations; iter++) {
        // console.info(`iteration ${iter + 1}`);
        ({ points, bounds } = blockFractalIteration(random, points, bounds, variation));
    }
    const segments = new Array();
    for (let i = 0; i < points.length - 1; i++) {
        const curPoint = points[i];
        const nextPoint = points[i + 1];
        if (nextPoint.y === curPoint.y - 1) {
            segments.push(geom.CardinalDirection.NORTH);
        }
        else if (nextPoint.x === curPoint.x + 1) {
            segments.push(geom.CardinalDirection.EAST);
        }
        else if (nextPoint.y === curPoint.y + 1) {
            segments.push(geom.CardinalDirection.SOUTH);
        }
        else if (nextPoint.x === curPoint.x - 1) {
            segments.push(geom.CardinalDirection.WEST);
        }
    }
    return new geom.CardinalPath(points[0], segments);
}
exports.makeBlockFractal = makeBlockFractal;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

/*
 *  BlockFractal
 *  github.com/sbj42/block-fractal
 *  James Clark
 *  Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RasterMask = exports.CardinalPath = exports.Offset = exports.CardinalDirectionFlags = exports.CardinalDirection = exports.makeBlockFractal = void 0;
var block_fractal_1 = __webpack_require__(/*! ./block-fractal */ "./src/block-fractal.ts");
Object.defineProperty(exports, "makeBlockFractal", ({ enumerable: true, get: function () { return block_fractal_1.makeBlockFractal; } }));
var tiled_geometry_1 = __webpack_require__(/*! tiled-geometry */ "./node_modules/tiled-geometry/lib/index.js");
Object.defineProperty(exports, "CardinalDirection", ({ enumerable: true, get: function () { return tiled_geometry_1.CardinalDirection; } }));
Object.defineProperty(exports, "CardinalDirectionFlags", ({ enumerable: true, get: function () { return tiled_geometry_1.CardinalDirectionFlags; } }));
Object.defineProperty(exports, "Offset", ({ enumerable: true, get: function () { return tiled_geometry_1.Offset; } }));
Object.defineProperty(exports, "CardinalPath", ({ enumerable: true, get: function () { return tiled_geometry_1.CardinalPath; } }));
Object.defineProperty(exports, "RasterMask", ({ enumerable: true, get: function () { return tiled_geometry_1.RasterMask; } }));

})();

BlockFractal = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=block-fractal-2.0.2.js.map