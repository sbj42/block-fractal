# BlockFractal

#### Generates a blocky fractal-like shape, like a tile-based randomized koch curve

...

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

...