import * as assert from 'assert';

import * as geom from '../../src/geom';

describe('geom/raster-mask', () => {
    describe('#constructor()', () => {
        it('works', () => {
            const m = new geom.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [2, 4],
            ]);
            assert.equal(m.westX, 1);
            assert.equal(m.northY, 2);
            assert.equal(m.width, 3);
            assert.equal(m.height, 4);
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            const m = new geom.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [2, 4],
            ]);
            assert.equal(m.toString(), `(1,2)
█∙∙
███
█∙█
∙██
`);
        });
    });
});
