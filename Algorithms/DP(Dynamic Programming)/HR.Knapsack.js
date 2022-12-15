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
 * Complete the 'unboundedKnapsack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function unboundedKnapsack(k, arr) {
    let dp = Array(k+1).fill(0)
    for(let i = 0; i <= k; i++)
        arr.forEach(e => dp[i] = Math.max(dp[i], e <= i ? dp[i-e] + e : 0))
        // e가 i보다 클때는 항상 0 = 즉, 초기 3보다 작은 dp들은 전부 0
    return dp[k];
}
// k = 9, arr = [3, 4, 4, 4, 8]
// 0 0 0 3 4 4 6 7 8 9 

// if) i = 5, 3 4 4 4 8
// dp[5 - 3] + 3 = 0 + 3 = 3
// dp[5 - 4] + 4 = 0 + 4 = 4
// dp[5 - 8] = 0
// Max = 4

// if) i = 6, 3 4 4 4 8
// dp[6 - 3] + 3 = 3 + 3 = 6
// dp[6 - 4] + 4 = 0 + 4 = 4
// dp[6 - 8] = 0
// Max = 6

// if) i = 7, 3 4 4 4 8
// dp[7 - 3] + 3 = 4 + 3 = 7
// dp[7 - 4] + 4 = 3 + 4 = 7
// dp[7 - 8] = 0
// Max = 7

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = unboundedKnapsack(k, arr);

    ws.write(result + '\n');

    ws.end();
}
