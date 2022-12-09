/**
 * 주어진 정수배열속, 두 수의 차의 절대값이 1보다 작거나 같을 서브배열의 길이중 가장큰값을 리턴하는 문제
 * 
 * EX) [1,1,2,2,4,4,5,5,5]
 * 
 * 두 수의 차의 절대값이 1보다 작거나 같을 조건을 만족하는 서브배열들
 * [1,1,2,2] -> 길이 4 (범위 1 ~ 2 = |2| - |1| = 1)
 * [4,4,5,5,5] -> 길이 5 (범위 4 ~ 5 = |5| - |4| = 1)
 * 
 * 5 리턴
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
 * Complete the 'pickingNumbers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function pickingNumbers(a) {
    a.sort(function (a, b) { // 우선정렬
        return a - b;
    });
    
    // 처음부터 보다가 두수의 차가 2이상 커져버릴때, 그다음 인덱스부터 다시 count
    let result = [];
    let count = 1, temp = a[0];
    for(let x = 0; x < a.length; x++) {
        if(a[x + 1] - temp >= 2) {
            result.push(count);
            
            count = 0;
            temp = a[x + 1];
        }
        count++;
    }
    
    // 다만 정수배열속 숫자들이 모두 같은수일 경우 위의 반복문속 조건문에 해당하는것이 없기때문에
    // result의 반환값이 없을경우 그 길이를 바로리턴
    if(result.length === 0) return a.length;
    return Math.max(...result);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = pickingNumbers(a);

    ws.write(result + '\n');

    ws.end();
}
