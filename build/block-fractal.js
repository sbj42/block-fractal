"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geom = require("./geom");
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
            if (!mask.get(np2)) {
                if (!mask.get(np1) || nextToLastMatch(newPoints, np1)) {
                    addPoint(newPoints, mask, np1);
                    addPoint(newPoints, mask, np2);
                }
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
            if (!mask.get(np2)) {
                if (!mask.get(np1) || nextToLastMatch(newPoints, np1)) {
                    addPoint(newPoints, mask, np1);
                    addPoint(newPoints, mask, np2);
                }
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
//# sourceMappingURL=block-fractal.js.map