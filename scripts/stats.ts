import * as BlockFractal from '../src';

// tslint:disable:no-console

function getArea(mask: BlockFractal.RasterMask) {
    let count = 0;
    for (let y = mask.northY; y <= mask.southY; y ++) {
        mask.bandsAt(y, (x1, x2) => {
            count += x2 - x1 + 1;
        });
    }
    return count;
}
for (let iter = 0; iter <= 8; iter ++) {
    let totalArea = 0;
    let totalArea2 = 0;
    let totalCircumference = 0;
    let totalCircumference2 = 0;
    const count = 1000;
    for (let i = 0; i < count; i ++) {
        const path = BlockFractal.makeBlockFractal({
            iterations: iter,
        });
        const circumference = path.segments.length;
        const area = getArea(path.rasterize());
        totalCircumference += circumference;
        totalCircumference2 += Math.pow(circumference, 2);
        totalArea += area;
        totalArea2 += Math.pow(area, 2);
    }
    const maxRadius = Math.pow(2, iter + 1) - 1;
    const maxDiameter = maxRadius * 2;
    const maxArea = Math.pow(maxDiameter, 2);
    console.info(`iterations=${iter}`);
    // console.info(`  max radius       : ${maxRadius}`);
    // console.info(`  max area         : ${maxArea}`);
    const avgCircumference = totalCircumference / count;
    console.info(`  avg circ   : ${avgCircumference}`
        + ` ${(avgCircumference * 100 / maxDiameter).toFixed(2)}%-of-maxdiam`);
    const sdCircumference = Math.sqrt((totalCircumference2 - Math.pow(totalCircumference, 2) / count) / (count - 1));
    console.info(`  stddev circ: ${sdCircumference.toFixed(2)}`
        + ` ${(sdCircumference * 100 / maxDiameter).toFixed(2)}%-of-maxdiam`);
    const avgArea = totalArea / count;
    console.info(`  avg area   : ${avgArea} ${(avgArea * 100 / maxArea).toFixed(2)}%-of-maxarea`);
    const sdArea = Math.sqrt((totalArea2 - Math.pow(totalArea, 2) / count) / (count - 1));
    console.info(`  stddev area: ${sdArea.toFixed(2)} ${(sdArea * 100 / maxArea).toFixed(2)}%-of-maxarea`);
}
