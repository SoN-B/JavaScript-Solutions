'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */
function biggerIsGreater(w) {
    let arr = [...w];
    
    let test = [...w];
    test.sort(function compare(a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    });
    if(test.join('') === w) return 'no answer';
    
    let priv = arr[arr.length - 1], slice = [];
    for(let i = arr.length - 2; i >= 0; i--) {
        if(priv > arr[i]) {
            slice = arr.slice(i + 1);
            priv = arr[i];
            break;
        }
        priv = arr[i];
    }
    
    let temp;
    for(let i = slice.length - 1; i >= 0; i--) {
        if(priv < slice[i]) {
            temp = priv;
            priv = slice[i];
            slice[i] = temp;
            break;
        }
    }
    
    let arrange = `${priv}` + `${slice.sort().join('')}`;
    arr = arr.splice(0, w.length - arrange.length);
    return `${arr.join('')}` + arrange;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        const result = biggerIsGreater(w);

        ws.write(result + '\n');
    }

    ws.end();
}
