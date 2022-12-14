/**
 * 주어진 정수 배열속, k길의 만큼의 길이 만큼 새로운 배열을 만들었을때, 그 배열속
 * 최댓값 - 최소값이 최소가 되는 값을 구하는 문제
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
 * Complete the 'maxMin' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function maxMin(k, arr) {
    arr.sort(function compare(a, b) {
        return a - b;
    });
    
    let result = 1000000000;
    for(let i = 0; i <= arr.length - k; i++) {
        if(result >= arr[i + k - 1] - arr[i]) result = arr[i + k - 1] - arr[i];
    }    
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const k = parseInt(readLine().trim(), 10);

    let arr = [];

    for (let i = 0; i < n; i++) {
        const arrItem = parseInt(readLine().trim(), 10);
        arr.push(arrItem);
    }

    const result = maxMin(k, arr);

    ws.write(result + '\n');

    ws.end();
}
