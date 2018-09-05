# BlockFractal

#### Generates a blocky fractal-like shape, like a tile-based randomized koch curve

[See the demo](https://sbj42.github.io/projects/block-fractal-demo/www/)

![Example Result](https://raw.githubusercontent.com/sbj42/block-fractal/master/doc/example-new-pletharia.png)

## Installation

~~~
npm install block-fractal
~~~

## Usage

Create a block fractal:
```js
const BlockFractal = require('block-fractal');

const path = BlockFractal.makeBlockFractal({
    iterations: 7
});
```

Convert the path into a set of raster lines (makes cell tests faster):
```js
const mask = path.rasterize();
```

Test if a tile is in the shape:
```js
const inside = mask.get(x, y);
```

...

## Details

BlockFractal starts with a "seed" shape, which by default is a 2x2 square:

![Example 1](https://raw.githubusercontent.com/sbj42/block-fractal/master/doc/walkthrough1.png)

The shape is doubled, and then each edge is either left in place or moved to one side or the other:

![Example 10](https://raw.githubusercontent.com/sbj42/block-fractal/master/doc/walkthrough10.png)

The result is a new, bigger shape, similar to the previous shape but with a more varied border:

![Example 13](https://raw.githubusercontent.com/sbj42/block-fractal/master/doc/walkthrough13.png)

That process is then repeated as many times as requested.

For more information, see the [Algorithm Overview](https://github.com/sbj42/block-fractal/wiki/Algorithm-Overview)