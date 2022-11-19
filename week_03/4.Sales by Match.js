/**
 * 일치하는 색상의 양말이 몇 켤레인지 확인하는 문제. 즉, 해당 숫자 배열 내 pair의 수를 리턴하는 문제
 * 숫자 배열 ar과 그 크기인 n을 입력으로 받습니다.
 *
 * 1 <= n <= 100
 * 1 <= ar[i] <= 100
 *
 * 계수 정렬의 수 카운팅 방법 + map 함수 활용
 * 숫자들이 특정 범위 안에 있는 경우, 해당 인덱스에 카운팅 하는 방식
 * 해당 수를 카운트하여 2로 나눠 pair를 확인했습니다.
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
 * Complete the 'sockMerchant' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER_ARRAY ar
 */

function sockMerchant(n, ar) {
    let count = [];
    let result = 0;
    
    for(let i = 0; i < 101; i++) count.push(0); // 0 ~ 100 -> 1 <= n <= 100
    for(let i = 0; i < 100; i++) count[ar[i]]++; // 0 ~ 100의 수 카운팅 후, 해당 인덱스에 삽입

    const pair = count.map((number) => number / 2); // map 함수로 각각의 수를 2로 나눠 삽입
    
    for(let x of pair) {
        if(x > 1) result += parseInt(x); // 1보다 큰 경우 pair가 존재하기에, 소수점 버리고 +
        else if(x % 1 === 0) result += x; // 정수 실수 판별 (정수는 1로 나누었을 경우 항상 나머지가 0이 되는 속성)
    }
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const ar = readLine().replace(/\s+$/g, '').split(' ').map(arTemp => parseInt(arTemp, 10));

    const result = sockMerchant(n, ar);

    ws.write(result + '\n');

    ws.end();
}
