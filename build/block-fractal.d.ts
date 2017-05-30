import * as geom from './geom';
export interface BlockFractalParam {
    random?: () => number;
    iterations: number;
    shape?: geom.Path;
    variation?: number;
}
export declare function makeBlockFractal(param: BlockFractalParam): geom.Path;
