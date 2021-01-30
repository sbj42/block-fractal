/* eslint-disable @typescript-eslint/no-var-requires */
const { benchmark } = require('high-score');
const seedrandom = require('seedrandom');

const BlockFractal = require('../lib');

/* eslint-disable no-console */

benchmark('makeBlockFractal-4', () => {
    BlockFractal.makeBlockFractal({
        random: seedrandom.alea('A'),
        iterations: 4,
        variation: 1,
    });
});
benchmark('makeBlockFractal-5', () => {
    BlockFractal.makeBlockFractal({
        random: seedrandom.alea('A'),
        iterations: 5,
        variation: 1,
    });
});
benchmark('makeBlockFractal-6', () => {
    BlockFractal.makeBlockFractal({
        random: seedrandom.alea('A'),
        iterations: 6,
        variation: 1,
    });
});
benchmark('makeBlockFractal-7', () => {
    BlockFractal.makeBlockFractal({
        random: seedrandom.alea('A'),
        iterations: 7,
        variation: 1,
    });
});
