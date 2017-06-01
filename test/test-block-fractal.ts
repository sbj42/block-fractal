import * as assert from 'assert';
import * as seedrandom from 'seedrandom';

import * as BlockFractal from '../src';

describe('block-fractal', () => {
    it('works with 0 iterations from square, seed A', () => {
        const path = BlockFractal.makeBlockFractal({
            random: seedrandom.alea('A'),
            iterations: 0,
        });
        assert.equal(path.toString(), '(-1,-1):EESSWWNN');
    });
    it('works with 1 iteration from square, seed A', () => {
        const path = BlockFractal.makeBlockFractal({
            random: seedrandom.alea('A'),
            iterations: 1,
        });
        assert.equal(path.toString(), '(-2,-2):ENESEESSSSWWWNWNWNEN');
    });
    it('works with 1 iteration from square, variation 1, seed A', () => {
        const path = BlockFractal.makeBlockFractal({
            random: seedrandom.alea('A'),
            iterations: 1,
            variation: 1,
        });
        assert.equal(path.toString(), '(-2,-2):NESSEEEESSWWWWSSWNNWNNEN');
    });
    it('works with 2 iterations from square, variation 1, seed A', () => {
        const path = BlockFractal.makeBlockFractal({
            random: seedrandom.alea('A'),
            iterations: 2,
            variation: 1,
        });
        assert.equal(path.toString(), '(-4,-4):'
            + 'WNEEEESSWWSESEENNESSENNESSEENNESSESWWSWWWSSWWNNWWSESSSWWNWWNNNWWNEENNNEN');
    });
    it('works with 4 iterations from square, variation 1, many different seeds', () => {
        for (let i = 0; i < 1000; i ++) {
            try {
                BlockFractal.makeBlockFractal({
                    random: seedrandom.alea(String(i)),
                    iterations: 4,
                    variation: 1,
                });
            } catch (e) {
                e.message = `failed at seed ${i}: ${e.message}`;
                throw e;
            }
        }
    });
});
