/**
 * if) n = 148, k = 3
 * 
 * super_digit(P) = super_digit(148148148) 
 *              = super_digit(1+4+8+1+4+8+1+4+8)
 *              = super_digit(39)
 *              = super_digit(3+9)
 *              = super_digit(12)
 *              = super_digit(1+2)
 *              = super_digit(3)
 *              = 3
 * 
 * 이걸 재귀함수로
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
 * Complete the 'superDigit' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING n
 *  2. INTEGER k
 */
function superDigit(n, k) {
    let super_sum = n;
    let sum = 0;

    if(10 > n) return super_sum; // 수가 10미만일때 (return)

    for(let i = 0; i < super_sum.length; i++) sum += parseInt(super_sum[i]); // 각 자리수의 합
    if(k > 0) return superDigit((sum * k).toString(), 0); // 만약 첫번째 수행일때는 k 이용
    
    return superDigit((sum).toString(), 0); // 첫번째 수행이 아닐때, k 이용 x
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = firstMultipleInput[0];

    const k = parseInt(firstMultipleInput[1], 10);

    const result = superDigit(n, k);

    ws.write(result + '\n');

    ws.end();
}
