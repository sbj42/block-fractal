import * as Benchmark from 'benchmark';
import * as seedrandom from 'seedrandom';

import * as BlockFractal from '../src';

// tslint:disable:no-console

const suite = new Benchmark.Suite();
suite.on('cycle', (event: any) => {
    console.log(`BlockFractal/${event.target}`);
});
suite.add('makeBlockFractal([4 iterations])', () => {
    BlockFractal.makeBlockFractal({
        random: seedrandom.alea('A'),
        iterations: 4,
        variation: 1,
    });
});
suite.add('makeBlockFractal([5 iterations])', () => {
    BlockFractal.makeBlockFractal({
        random: seedrandom.alea('A'),
        iterations: 5,
        variation: 1,
    });
});
suite.add('makeBlockFractal([6 iterations])', () => {
    BlockFractal.makeBlockFractal({
        random: seedrandom.alea('A'),
        iterations: 6,
        variation: 1,
    });
});
suite.add('makeBlockFractal([7 iterations])', () => {
    BlockFractal.makeBlockFractal({
        random: seedrandom.alea('A'),
        iterations: 7,
        variation: 1,
    });
});
suite.run();
