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
    describe('#get()', () => {
        it('works', () => {
            const m = new geom.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [2, 4],
            ]);
            assert.equal(m.get(1, 0), false);
            assert.equal(m.get(1, 2), true);
            assert.equal(m.get(2, 2), false);
            assert.equal(m.get(0, 3), false);
            assert.equal(m.get(5, 3), false);
            assert.equal(m.get(2, 4), false);
            assert.equal(m.get(3, 4), true);
            assert.equal(m.get(4, 4), false);
        });
    });
    describe('#bandsAt()', () => {
        it('works', () => {
            const m = new geom.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [2, 4],
            ]);
            let count = 0;
            m.bandsAt(1, () => count++);
            assert.equal(count, 0);
            m.bandsAt(3, () => count++);
            assert.equal(count, 1);
            count = 0;
            m.bandsAt(4, () => count++);
            assert.equal(count, 2);
        });
    });
});
