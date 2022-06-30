'use strict';

const fs = require('fs');
const TextToSVG = require('text-to-svg');
const svg2png = require("svg2png");

const textToSVG = TextToSVG.loadSync();


async function gen(dir, prop, val) {
    const attributes = { fill: 'yellow', stroke: 'blue' };
    const options = { x: 0, y: 0, fontSize: 24, anchor: 'top', attributes: attributes };
    const svg1 = textToSVG.getSVG(prop + val, options);

    const targetImg1Path = dir + '/' + val + '.png';
    const buffer1 = await svg2png(svg1);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(targetImg1Path, buffer1);
    console.log("done", dir + val)
}

async function main() {
    const props = 'ABCDEFG';
    for (let j = 0; j < props.length; j++) {
        for (let i = 0; i < 10; i++) {
            await gen(j + '', props[j], i);
        }
    }
}

main()
