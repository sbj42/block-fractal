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
            assert.strictEqual(m.westX, 1);
            assert.strictEqual(m.northY, 2);
            assert.strictEqual(m.width, 3);
            assert.strictEqual(m.height, 4);
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
            assert.strictEqual(m.toString(), `(1,2)
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
            assert.strictEqual(m.get(1, 0), false);
            assert.strictEqual(m.get(1, 2), true);
            assert.strictEqual(m.get(2, 2), false);
            assert.strictEqual(m.get(0, 3), false);
            assert.strictEqual(m.get(5, 3), false);
            assert.strictEqual(m.get(2, 4), false);
            assert.strictEqual(m.get(3, 4), true);
            assert.strictEqual(m.get(4, 4), false);
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
            assert.strictEqual(count, 0);
            m.bandsAt(3, () => count++);
            assert.strictEqual(count, 1);
            count = 0;
            m.bandsAt(4, () => count++);
            assert.strictEqual(count, 2);
        });
    });
});
