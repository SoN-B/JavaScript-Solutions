/**
 * 입력으로 n, m & a, b 배열이 주어지고, a 배열 속 최소공배수를 구해, 그 수를 더해가며, b 배열 속 요소들의 약수에 속하는지 확인하는 문제
 * 즉, a의 배수인 동시에 b의 약수인 정수의 개수를 구하라
 * 
 * EX)
 * 2 3
 * 2 4
 * 16 32 96
 * 
 * 2, 4의 최소공배수 - 4
 * 계속 더해가면, 4 - 8 - 12 - 16
 * 다만, b의 첫 요소 16보다는 작아야 하므로, 16까지만
 * 
 * 16 32 96의 약수에 해당하는 공배수는 4, 8, 16
 * 따라서 답은 3
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
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function getTotalX(a, b) {
    let lcm = 1;
    let count = 0, result =0;
    
    if(Math.min(...a) > Math.min(...b)) return 0; // 애초에 a 배열 요소들이 커버리면, 답을 못 구함
    
    while(true){
        for(let x of a) {
            if(lcm % x === 0) count++;
        }

        if(count === a.length) break;
        count= 0;
        lcm++;
    }
    let temp = lcm;
    
    count = 0;
    while(lcm <= b[0]) {
        for(let x of b) {
            if(x % lcm === 0) count++;
        }
        
        if(count === b.length) result++;
        count = 0;
        lcm += temp;
    }
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total = getTotalX(arr, brr);

    ws.write(total + '\n');

    ws.end();
}

// https://qhrhksgkazz.tistory.com/194 참고
// 최대공약수 최소공배수