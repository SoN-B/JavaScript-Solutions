/**
 * 123 -> 1, 2, 3, 12, 23, 123 모두더하면 -> 164
 * 단, 결과에 10^9 + 7을 나눈 나머지반환
 */
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
 * Complete the 'substrings' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING n as parameter.
 */

function substrings(n) {
    let ret = 0, tmp = 0;
    for(let i = 0; i < n.length; i++) {
        tmp = (tmp * 10 + parseInt(n[i]) * (i + 1)) % (10 ** 9 + 7)
        ret = (ret + tmp) % (10 ** 9 + 7)
    }
    return ret
}
/**
 * if) n = 223
 * 
 * 0 + 2 * 1 = 2
 * 20 + 2 * 2 = 24
 * 240 + 3 * 3 = 249
 * 
 * 2 + 24 + 249 = 275반환
 */

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = readLine();

    const result = substrings(n);

    ws.write(result + '\n');

    ws.end();
}
