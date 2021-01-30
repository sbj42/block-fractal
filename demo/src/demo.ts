import * as BlockFractal from '../../lib';
import * as seedrandom from 'seedrandom';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const demo = document.getElementById('canvas') as HTMLCanvasElement;
demo.width = Math.min(demo.width, window.innerWidth - 100);
const demoInner = document.getElementById('demoinner') as HTMLDivElement;
demoInner.style.width = `${demo.width}px`;
const {width, height} = demo;
const context = demo.getContext('2d') as CanvasRenderingContext2D;

const iterationsInput = (document.getElementById('iterations') as HTMLInputElement);
const variationInput = (document.getElementById('variation') as HTMLInputElement);
const seedInput = (document.getElementById('seed') as HTMLInputElement);
const newseedInput = (document.getElementById('newseed') as HTMLInputElement);

function getControlInteger(elem: HTMLInputElement, min: number, max: number, defaultValue: number) {
    const str = elem.value;
    const int = parseInt(str, 10);
    if (Number.isFinite(int)) {
        return Math.max(min, Math.min(max, int));
    }
    return defaultValue;
}

const DEFAULT_VARIATION = 60;
const DEFAULT_ITERATIONS = 7;
const MAX_VARIATION = 100;
const MAX_ITERATIONS = 11;

let iterations = DEFAULT_ITERATIONS;
let variation = DEFAULT_VARIATION;
let seed: string;
let hashSeed: string;
// let path: BlockFractal.Path;
let mask: BlockFractal.RasterMask | undefined;

let mult = 1;

function generate() {
    const thisIterations = getControlInteger(iterationsInput, 0, MAX_ITERATIONS, DEFAULT_ITERATIONS);
    const thisSeed = seedInput.value;
    const thisVariation = getControlInteger(variationInput, 0, MAX_VARIATION, DEFAULT_VARIATION);
    if (mask) {
        if (iterations === thisIterations && seed === thisSeed && variation === thisVariation) {
            return;
        }
    }
    iterations = thisIterations;
    seed = thisSeed;
    variation = thisVariation;
    const path = BlockFractal.makeBlockFractal({
        random: seedrandom.alea(seed),
        iterations,
        variation: variation / 100,
    });
    mask = path.rasterize();
    //const maxSize = (Math.pow(2, iterations + 2) - 1) * zoom;
    mult = Math.pow(2, 7 - iterations);
    document.getElementById('label')!.innerText = seed;
    document.title = `BlockFractal - ${seed}`;
    let newHash = `#${encodeURIComponent(seed)}`;
    if (variation !== DEFAULT_VARIATION) {
        newHash += `/v=${variation}`;
    }
    if (hashSeed !== seed) {
        window.location.hash = newHash;
        hashSeed = seed;
    } else {
        window.location.replace(newHash);
    }
}

let zoom = 1;
let centerX = 0;
let centerY = 0;

let targetZoom = 1;
let targetCenterX = 0;
let targetCenterY = 0;

function reset() {
    zoom = 0.5;
    targetZoom = 1;
    centerX = targetCenterX = 0;
    centerY = targetCenterY = 0;
}

const imageData = context.getImageData(0, 0, width, height);
function render() {
    if (document.hidden || typeof mask === 'undefined') {
        return;
    }
    const data = imageData.data;

    const halfHeight = height >>> 1;
    const halfWidth = width >>> 1;
    let index = 0;
    for (let sy = 0; sy < height; sy ++) {
        const my = Math.floor(centerY / mult + (sy - halfHeight) / zoom / mult);
        for (let sx = 0; sx < width; sx ++) {
            const mx = Math.floor(centerX / mult + (sx - halfWidth) / zoom / mult);
            if (mask.get(mx, my)) {
                data[index++] = 0x40;
                data[index++] = 0xfb;
                data[index++] = 0x06;
                data[index++] = 0xff;
            } else {
                data[index++] = 0x15;
                data[index++] = 0x57;
                data[index++] = 0x86;
                data[index++] = 0xff;
            }
        }
    }
    context.putImageData(imageData, 0, 0);
}

const ADJECTIVES = ['North', 'East', 'South', 'West', 'Upper', 'Lower', 'Middle', 'Far', 'Near', 'Great', 'High', 'Low',
    'Ancient', 'True', 'Superior', 'Greater', 'Lesser', 'Distant', 'Old', 'Ye Olde', 'New', 'Lost', 'Forgotten'];

const CONSONANT = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y',
    'Z', 'Br', 'Bl', 'By', 'Cr', 'Cl', 'Ch', 'Dr', 'Fr', 'Fl', 'Gr', 'Gl', 'Gh', 'G\'', 'Kr', 'Kl', 'Kh', 'Pr', 'Pl',
    'Ph', 'Py', 'Q\'', 'St', 'Scr', 'Sch', 'Sh', 'Sm', 'Sn', 'Sp', 'Spr', 'Sv', 'Sw', 'Th', 'Thr', 'T\'', 'Tw', 'Vr',
    'Wr'];

const VOWEL = ['A', 'E', 'I', 'O', 'U', 'A', 'E', 'I', 'O', 'U', 'A', 'E', 'I', 'O', 'U', 'Ae', 'Aeo', 'Ai', 'Ao',
    'Au', 'Ea', 'Ee', 'Ei', 'Eo', 'Ia', 'Ie', 'Io', 'Iou', 'Iu', 'Oa', 'Oe', 'Oi', 'Oo', 'Ou', 'Uio'];

const CSUFFIXES = ['shire', 'land', 'tis', 'fell', 'ness', 'sia', 'ria', 'delle', 'landia', 'dom', 'vania', 'ville',
    'ton', 'berg', 'ham', 'pico', 'stead', 'dero', 'lato' ];

const VSUFFIXES = ['ica', 'inor', 'eros', 'ilia', 'istan', 'edonia', 'uguay', 'onia', 'arnia', 'ing', 'onne', 'ine',
    'ovo', 'ovka', 'ique'];

function newSeed() {
    let name = '';
    if (Math.random() < 0.5) {
        if (name) {
            name += ' ';
        }
        name += ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    }
    if (name) {
        name += ' ';
    }
    let length = Math.floor(Math.random() * 3 + 1);
    if (Math.random() < 0.15) {
        length ++;
    }
    let consonant = Math.random() < 0.7;
    for (let i = 0; i < length; i ++) {
        let next: string;
        if (consonant) {
            next = CONSONANT[Math.floor(Math.random() * CONSONANT.length)];
        } else {
            next = VOWEL[Math.floor(Math.random() * VOWEL.length)];
        }
        if (i > 0) {
            next = next.toLowerCase();
        }
        name += next;
        consonant = !consonant;
    }
    if (consonant) {
        name += CSUFFIXES[Math.floor(Math.random() * CSUFFIXES.length)];
    } else {
        name += VSUFFIXES[Math.floor(Math.random() * VSUFFIXES.length)];
    }
    seedInput.value = name;
    generate();
    reset();
}

function hashChange() {
    const hash = location.hash;
    if (hash.length > 1) {
        const firstSlash = hash.indexOf('/');
        const nextSeed = decodeURIComponent(hash.substr(1, firstSlash < 0 ? hash.length : firstSlash - 1));
        let newVariation = DEFAULT_VARIATION;
        let newIterations = DEFAULT_ITERATIONS;
        if (firstSlash >= 0) {
            for (const arg of hash.substr(firstSlash + 1).split('/')) {
                if (arg.startsWith('v=')) {
                    newVariation = parseInt(arg.substr(2));
                    if (isNaN(newVariation) || newVariation < 0 || newVariation > MAX_VARIATION) {
                        newVariation = DEFAULT_VARIATION;
                    }
                } else if (arg.startsWith('i=')) {
                    newIterations = parseInt(arg.substr(2));
                    if (isNaN(newIterations) || newIterations < 0 || newIterations > MAX_ITERATIONS) {
                        newIterations = DEFAULT_ITERATIONS;
                    }
                }
            }
        }
        if (nextSeed !== seed) {
            hashSeed = nextSeed;
            seedInput.value = nextSeed;
            variationInput.value = String(newVariation);
            iterationsInput.value = String(newIterations);
            generate();
        }
    }
}

if (location.hash.length > 1) {
    hashChange();
} else {
    newSeed();
}

iterationsInput.onchange = generate;
iterationsInput.oninput = generate;
variationInput.onchange = generate;
variationInput.oninput = generate;
seedInput.onchange = generate;
seedInput.oninput = generate;
newseedInput.onclick = newSeed;

window.onhashchange = hashChange;

const PAN_SPEED = 45;
const ZOOM_SPEED = 1.15;

document.getElementById('zoomin')!.onclick = () => {
    targetZoom *= ZOOM_SPEED;
};
document.getElementById('zoomout')!.onclick = () => {
    targetZoom /= ZOOM_SPEED;
};

let mousePressed = false;
let mouseDragX: number;
let mouseDragY: number;
let mouseOver = false;

demoInner.onmouseleave = () => {
    mouseOver = false;
};
demoInner.onmousedown = (event: MouseEvent) => {
    mousePressed = true;
    mouseDragX = targetCenterX + event.clientX / zoom;
    mouseDragY = targetCenterY + event.clientY / zoom;
};
demoInner.onmousemove = (event: MouseEvent) => {
    if (mousePressed === true) {
        centerX = targetCenterX = mouseDragX - event.clientX / zoom;
        centerY = targetCenterY = mouseDragY - event.clientY / zoom;
    }
    mouseOver = true;
};
document.onmouseup = () => {
    mousePressed = false;
};
demoInner.onwheel = (event: WheelEvent) => {
    if (mouseOver) {
        const x = centerX + (event.offsetX - (width >>> 1)) / zoom;
        const y = centerY + (event.offsetY - (height >>> 1)) / zoom;
        targetZoom *= Math.pow(ZOOM_SPEED, - event.deltaY / 120);
        targetCenterX = x - (event.offsetX - (width >>> 1)) / targetZoom;
        targetCenterY = y - (event.offsetY - (height >>> 1)) / targetZoom;
        event.preventDefault();
    }
};
document.onkeypress = (event: KeyboardEvent) => {
    if (document.getElementById('seed') === document.activeElement) {
        return;
    }
    switch (event.code) {
        case 'Digit0':
        case 'Numpad5':
            reset();
            break;
        case 'Numpad8':
            targetCenterY -= PAN_SPEED / zoom;
            break;
        case 'Numpad2':
            targetCenterY += PAN_SPEED / zoom;
            break;
        case 'Numpad4':
            targetCenterX -= PAN_SPEED / zoom;
            break;
        case 'Numpad6':
            targetCenterX += PAN_SPEED / zoom;
            break;
        case 'Equal':
        case 'NumpadAdd':
            targetZoom *= ZOOM_SPEED;
            break;
        case 'Minus':
        case 'NumpadSubtract':
            targetZoom /= ZOOM_SPEED;
            break;
    }
};
document.onkeydown = (event: KeyboardEvent) => {
    if (document.getElementById('seed') === document.activeElement) {
        return;
    }
    if (mouseOver) {
        switch (event.code) {
            case 'ArrowUp':
                targetCenterY -= PAN_SPEED / zoom;
                event.preventDefault();
                break;
            case 'ArrowDown':
                targetCenterY += PAN_SPEED / zoom;
                event.preventDefault();
                break;
            case 'ArrowLeft':
                targetCenterX -= PAN_SPEED / zoom;
                event.preventDefault();
                break;
            case 'ArrowRight':
                targetCenterX += PAN_SPEED / zoom;
                event.preventDefault();
                break;
        }
    }
};

function animate() {
    zoom = (zoom * 4 + targetZoom) / 5;
    centerX = (centerX * 4 + targetCenterX) / 5;
    centerY = (centerY * 4 + targetCenterY) / 5;
    render();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        mask = undefined;
    } else {
        generate();
    }
});