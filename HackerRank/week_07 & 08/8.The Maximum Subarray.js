/**
 * 최대합 부분 배열(연속된 값 O)구하는 문제 + 최대합 집합 배열 구하는 문제(연속된 값 X)
 * 참고 - https://ko.javascript.info/task/maximal-subarray
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
 * Complete the 'maxSubarray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function maxSubarray(arr) {
    let result = 0, subseq_sum = 0, subarr_sum = 0;
    arr.forEach((data) => {
        subseq_sum += data;
        if(data > 0) subarr_sum += data;

        if(result < subseq_sum) result = subseq_sum;
        if(subseq_sum < 0) subseq_sum =0;
    })
    
    if(result === 0) {
        return [Math.max(...arr), Math.max(...arr)];
    } else {
        return [result, subarr_sum];
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = maxSubarray(arr);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
