import * as assert from 'assert';

import * as geom from '../../src/geom';

describe('geom/mask-rect', () => {
    describe('#constructor()', () => {
        it('starts filled with false', () => {
            const o = new geom.MaskRect({westX: 1, northY: 2, width: 3, height: 4});
            assert.strictEqual(o.westX, 1);
            assert.strictEqual(o.northY, 2);
            assert.strictEqual(o.width, 3);
            assert.strictEqual(o.height, 4);
            assert.strictEqual(o.get({x: 1, y: 2}), false);
            assert.strictEqual(o.get({x: 0, y: 0}), false);
        });
        it('can be filled with true', () => {
            const o = new geom.MaskRect(new geom.Rectangle().set(1, 2, 3, 4), true);
            assert.strictEqual(o.westX, 1);
            assert.strictEqual(o.northY, 2);
            assert.strictEqual(o.width, 3);
            assert.strictEqual(o.height, 4);
            assert.strictEqual(o.get({x: 1, y: 2}), true);
            assert.strictEqual(o.get({x: 0, y: 0}), false);
        });
        it('can have outside values be true', () => {
            const o = new geom.MaskRect(new geom.Rectangle().set(1, 2, 3, 4), false, true);
            assert.strictEqual(o.westX, 1);
            assert.strictEqual(o.northY, 2);
            assert.strictEqual(o.width, 3);
            assert.strictEqual(o.height, 4);
            assert.strictEqual(o.get({x: 1, y: 2}), false);
            assert.strictEqual(o.get({x: 0, y: 0}), true);
        });
    });
    describe('#set()', () => {
        it('works', () => {
            const o = new geom.MaskRect({westX: 1, northY: 2, width: 3, height: 4});
            o.set({x: 2, y: 3}, true);
            assert.strictEqual(o.get({x: 2, y: 3}), true);
            o.set({x: 2, y: 3}, false);
            assert.strictEqual(o.get({x: 2, y: 3}), false);
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            const o = new geom.MaskRect({westX: 1, northY: 2, width: 3, height: 3});
            o.set({x: 1, y: 2}, true);
            o.set({x: 2, y: 3}, true);
            o.set({x: 3, y: 3}, true);
            assert.strictEqual(o.toString(), '(1,2)/false\n☑☐☐\n☐☑☑\n☐☐☐\n');
        });
    });
});
