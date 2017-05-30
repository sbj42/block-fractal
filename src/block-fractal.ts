import * as geom from './geom';

export interface BlockFractalParam {
    random?: () => number;
    iterations: number;
    shape?: geom.Path;
    variation?: number;
}

function nextToLastMatch(points: geom.Offset[], next: geom.Offset) {
    return points.length > 1 && points[points.length - 2].equals(next);
}

function addPoint(points: geom.Offset[], mask: geom.MaskRect, next: geom.Offset) {
    if (nextToLastMatch(points, next)) {
        mask.set(points.splice(points.length - 1, 1)[0], false);
    } else {
        points.push(next);
        mask.set(next, true);
    }
}

function verticalHelper(points: geom.Offset[], random: () => number, variation: number,
                        newPoints: geom.Offset[], mask: geom.MaskRect, i: number,
                        p1: geom.Offset, p2: geom.Offset) {
    const x = 2 * p1.x;
    const yDir = p2.y - p1.y;
    for (let y = 2 * p1.y; y !== 2 * p2.y; y += yDir) {
        const np3 = new geom.Offset(x, y + yDir);
        // console.info(`- ${np3}`);
        if (nextToLastMatch(newPoints, np3)) {
            // This can happen around a corner, when just before the corner
            // we dip into the corner
            // console.info(` remove ${newPoints[newPoints.length - 1]}`);
            mask.set(newPoints.splice(newPoints.length - 1, 1)[0], false);
            continue;
        }
        if (i === points.length - 2 && mask.get(np3)) {
            // This can happen if the first point was on a corner and the
            // first move was to dip into the corner
            const index = newPoints.findIndex((point) => point.equals(np3));
            // console.info(`remove ${index} from beginning`);
            for (const point of newPoints.splice(0, index)) {
                mask.set(point, false);
            }
            addPoint(newPoints, mask, np3);
            break;
        }
        if (random() < variation) {
            const v = Math.floor(random() * 2) * 2 - 1;
            const np1 = new geom.Offset(x + v, y);
            const np2 = new geom.Offset(x + v, y + yDir);
            if (!mask.get(np1) && !mask.get(np2)) {
                addPoint(newPoints, mask, np1);
                addPoint(newPoints, mask, np2);
            }
        }
        addPoint(newPoints, mask, np3);
    }
}

function horizontalHelper(points: geom.Offset[], random: () => number, variation: number,
                          newPoints: geom.Offset[], mask: geom.MaskRect, i: number,
                          p1: geom.Offset, p2: geom.Offset) {
    const y = 2 * p1.y;
    const xDir = p2.x - p1.x;
    for (let x = 2 * p1.x; x !== 2 * p2.x; x += xDir) {
        const np3 = new geom.Offset(x + xDir, y);
        // console.info(`- ${np3}`);
        if (nextToLastMatch(newPoints, np3)) {
            // This can happen around a corner, when just before the corner
            // we dip in the direction of the corner
            // console.info(` remove ${newPoints[newPoints.length - 1]}`);
            mask.set(newPoints.splice(newPoints.length - 1, 1)[0], false);
            continue;
        }
        if (i === points.length - 2 && mask.get(np3)) {
            // This can happen if the first point was on a corner and the
            // first move was to dip into the corner
            const index = newPoints.findIndex((point) => point.equals(np3));
            // console.info(`remove ${index} from beginning`);
            for (const point of newPoints.splice(0, index)) {
                mask.set(point, false);
            }
            addPoint(newPoints, mask, np3);
            break;
        }
        if (random() < variation) {
            const v = Math.floor(random() * 2) * 2 - 1;
            const np1 = new geom.Offset(x, y + v);
            const np2 = new geom.Offset(x + xDir, y + v);
            if (!mask.get(np1) && !mask.get(np2)) {
                addPoint(newPoints, mask, np1);
                addPoint(newPoints, mask, np2);
            }
        }
        addPoint(newPoints, mask, np3);
    }
}

function blockFractalIteration(random: () => number, points: geom.Offset[],
                               bounds: geom.RectangleLike, variation: number) {
    const newPoints = new Array<geom.Offset>();
    const newBounds = new geom.Rectangle(
        bounds.westX * 2 - 1,
        bounds.northY * 2 - 1,
        bounds.width * 2 + 2,
        bounds.height * 2 + 2,
    );
    // console.info(` bounds ${newBounds}`);
    const mask = new geom.MaskRect(newBounds);
    for (let i = 0; i < points.length - 1; i ++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        if (i === 0) {
            addPoint(newPoints, mask, new geom.Offset(p1.x * 2, p1.y * 2));
        }
        if (p1.x === p2.x) {
            verticalHelper(points, random, variation, newPoints, mask, i, p1, p2);
        } else {
            horizontalHelper(points, random, variation, newPoints, mask, i, p1, p2);
        }
    }
    return {
        points: newPoints,
        bounds: newBounds,
    };
}

export function makeBlockFractal(param: BlockFractalParam): geom.Path {
    let {random, shape, variation} = param;
    if (typeof random === 'undefined') {
        random = Math.random;
    }
    if (typeof shape === 'undefined') {
        shape = new geom.Path({x: -1, y: -1}, [
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

    let points = new Array<geom.Offset>();
    let bounds = shape.getBounds();
    shape.getOffsets((off) => {
        points.push(new geom.Offset(off.x, off.y));
    });

    for (let iter = 0; iter < param.iterations; iter ++) {
        // console.info(`iteration ${iter + 1}`);
        ({points, bounds} = blockFractalIteration(random, points, bounds, variation));
    }

    const segments = new Array<geom.Direction>();
    for (let i = 0; i < points.length - 1; i ++) {
        const curPoint = points[i];
        const nextPoint = points[i + 1];
        if (nextPoint.y === curPoint.y - 1) {
            segments.push(geom.Direction.NORTH);
        } else if (nextPoint.x === curPoint.x + 1) {
            segments.push(geom.Direction.EAST);
        } else if (nextPoint.y === curPoint.y + 1) {
            segments.push(geom.Direction.SOUTH);
        } else if (nextPoint.x === curPoint.x - 1) {
            segments.push(geom.Direction.WEST);
        }
    }

    return new geom.Path(points[0], segments);
}
