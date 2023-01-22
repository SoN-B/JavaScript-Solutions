/**
 * 엄청나게 큰 팩토리얼 값을 출력하는 문제
 * BigInt사용
 * 
 * 25! = 25 * 24 * 23 * ... * 1
 * 결과 -> 155112100043330985984000000
 */

'use strict';

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
 * Complete the 'extraLongFactorials' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

function extraLongFactorials(n) {
    let result = BigInt(1); // BigInt는 BigInt끼리만 계산 가능
    for(let i = n; i >= 1; i--) result *= BigInt(i);

    console.log(result.toString()); // 뒤에 n제거
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    extraLongFactorials(n);
}
