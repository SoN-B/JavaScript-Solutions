/**
 * https://www.hackerrank.com/challenges/equal-stacks/problem?isFullScreen=true
 * h1 = [1, 2, 1, 1], h2 = [1, 1, 2], h3 = [1, 1] 각각 다른 높이들의 블록들을 가진 스택배열들을 입력으로 받습니다.
 * 문제에서는 위에서 각각 블록을 제거하며, 높이가 같은 지점을 찾는거라 설명하지만
 * 반대로 적용해야함
 * 
 * h1     h2     h3
 * 1
 * 2      2(2높이의 블록)   
 * 1      1      1
 * 1      1      1
 * 
 * h1에서는 위에서부터 1,2높이의 블록을 제거해야하고, h2에서는 2제거
 * 그럼 전부 2높이에서 같은 지점을 가짐 -> 2반환
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
 * Complete the 'equalStacks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY h1
 *  2. INTEGER_ARRAY h2
 *  3. INTEGER_ARRAY h3
 */

// 아래 풀이도 좋지만, shift를 사용했다면, 더 좋았을듯
function equalStacks(h1, h2, h3) {
    h1.reverse();
    h2.reverse();
    h3.reverse();
    
    let sum1 = 0, sum2 = 0, sum3 = 0;
    for(let i = 0; i < h1.length; i++) sum1 += h1[i];
    for(let i = 0; i < h2.length; i++) sum2 += h2[i];
    for(let i = 0; i < h3.length; i++) sum3 += h3[i];
    
    if(sum1 === sum2 && sum2 === sum3) return sum1;
    while(sum1 > 0) {
        sum1 -= h1.pop();
        if(sum1 === sum2 && sum2 === sum3) return sum1;
        
        while(sum1 < sum2) {
            sum2 -= h2.pop();
            if(sum1 === sum2 && sum2 === sum3) return sum1;
        }
        
        while(sum1 < sum3) {
            sum3 -= h3.pop();
            if(sum1 === sum2 && sum2 === sum3) return sum1;
        }
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n1 = parseInt(firstMultipleInput[0], 10);

    const n2 = parseInt(firstMultipleInput[1], 10);

    const n3 = parseInt(firstMultipleInput[2], 10);

    const h1 = readLine().replace(/\s+$/g, '').split(' ').map(h1Temp => parseInt(h1Temp, 10));

    const h2 = readLine().replace(/\s+$/g, '').split(' ').map(h2Temp => parseInt(h2Temp, 10));

    const h3 = readLine().replace(/\s+$/g, '').split(' ').map(h3Temp => parseInt(h3Temp, 10));

    const result = equalStacks(h1, h2, h3);

    ws.write(result + '\n');

    ws.end();
}
