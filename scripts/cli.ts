import * as BlockFractal from '../src';

// tslint:disable:no-console

const p = BlockFractal.makeBlockFractal({
    iterations: 4,
});
console.info(p.rasterize().toString());
