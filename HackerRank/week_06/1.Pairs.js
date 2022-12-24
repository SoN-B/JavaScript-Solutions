/**
 * Ex) 두수의 차이가 k = 1이 되는 쌍의 갯수찾기
 * arr = [1, 2, 3]
 * 2 - 1, 3 - 2, 4 - 3 -> 3개
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
 * Complete the 'pairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */
function pairs(k, arr) {
    let result = 0;
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            if(Math.abs(arr[i] - arr[j]) === k) result++;
        }
    }
    return result;
}

// 정렬후, 두 포인터의 접근
// var i=0,j=1,count=0;
    
//     while(j < n) {
//         var diff = nums[j] - nums[i];
        
//         if (diff == k) {
//             count++;
//             j++;
//         } else if (diff > k) {
//             i++;
//         } else if (diff < k) {
//             j++;
//         }
//     }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = pairs(k, arr);

    ws.write(result + '\n');

    ws.end();
}
