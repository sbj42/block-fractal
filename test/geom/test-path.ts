import * as assert from 'assert';

import * as geom from '../../src/geom';

function makePath(x: number, y: number, path: string) {
    const segments = new Array<geom.Direction>();
    for (let i = 0; i < path.length; i ++) {
        switch (path.charAt(i).toUpperCase()) {
            case 'N':
                segments.push(geom.Direction.NORTH);
                break;
            case 'E':
                segments.push(geom.Direction.EAST);
                break;
            case 'S':
                segments.push(geom.Direction.SOUTH);
                break;
            case 'W':
                segments.push(geom.Direction.WEST);
                break;
        }
    }
    return new geom.Path({x, y}, segments);
}

describe('geom/path', () => {
    it('starts empty', () => {
        const p = new geom.Path();
        assert.equal(p.start.x, 0);
        assert.equal(p.start.y, 0);
        assert.equal(p.segments.length, 0);
    });
    describe('#constructor()', () => {
        it('works', () => {
            const p = makePath(1, 2, 'N');
            assert.equal(p.start.x, 1);
            assert.equal(p.start.y, 2);
            assert.equal(p.segments.length, 1);
            assert.equal(p.segments[0], geom.Direction.NORTH);
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            const p = makePath(1, 2, 'NW');
            assert.equal(p.toString(), '(1,2):NW');
        });
    });
    describe('#getIsClosed()', () => {
        it('works for a simple closed path', () => {
            const p = makePath(1, 2, 'NWSE');
            assert.equal(p.getIsClosed(), true);
        });
        it('works for a simple open path', () => {
            const p = makePath(1, 2, 'NWE');
            assert.equal(p.getIsClosed(), false);
        });
        it('works for a more complex shape', () => {
            //    1 2 3 4 5
            // 1    .....
            // 2  ...   .
            // 3  . ... ...
            // 4  . . ... .
            // 5  ...   ...
            const p = makePath(1, 2, 'ENEESSESSWNWNWSSWNNN');
            assert.equal(p.getIsClosed(), true);
        });
    });
    describe('#getBounds()', () => {
        it('works for a simple square', () => {
            const p = makePath(1, 2, 'NWSE');
            assert.equal(p.getBounds().toString(), '(0,1 2x2)');
        });
        it('works for a more complex shape', () => {
            //    1 2 3 4 5
            // 1    .....
            // 2  ...   .
            // 3  . ... ...
            // 4  . . ... .
            // 5  ...   ...
            const p = makePath(1, 2, 'ENEESSESSWNWNWSSWNNN');
            assert.equal(p.getBounds().toString(), '(1,1 5x5)');
        });
    });
    describe('#getArea()', () => {
        it('works for a simple square', () => {
            const p = makePath(1, 2, 'NWSE');
            assert.equal(p.getArea(), 1);
        });
        it('works for a more complex shape', () => {
            //    1 2 3 4 5
            // 1    .....
            // 2  ...   .
            // 3  . ... ...
            // 4  . . ... .
            // 5  ...   ...
            const p = makePath(1, 2, 'ENEESSESSWNWNWSSWNNN');
            assert.equal(p.getArea(), 10);
        });
    });
    describe('#rasterize()', () => {
        it('works for a simple square', () => {
            const p = makePath(1, 2, 'NWSE');
            assert.equal(p.rasterize().toString(), `(0,1)
█
`);
        });
        it('works for a more complex shape', () => {
            //    1 2 3 4 5
            // 1    .....
            // 2  ...   .
            // 3  . ... ...
            // 4  . . ... .
            // 5  ...   ...
            const p = makePath(1, 2, 'ENEESSESSWNWNWSSWNNN');
            assert.equal(p.rasterize().toString(), `(1,1)
∙██∙
███∙
█∙██
█∙∙█
`);
        });
    });
});
