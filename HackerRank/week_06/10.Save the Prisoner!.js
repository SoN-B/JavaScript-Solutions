/**
 * 간부가 의자에 수감수를 순서대로 앉히고, 사탕을 시작번호부터 순서대로 나눠준다
 * 마지막에 받은 사람의 번호는?
 * 
 * n = 사람수
 * m = 사탕수
 * s = 시작번호
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
 * Complete the 'saveThePrisoner' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. INTEGER s
 */

function saveThePrisoner(n, m, s) {
    let result = m % n + s - 1;
    
    if(result > n) { // 사탕을 순서대로 나눠주고 난뒤, 그 결과값이 수감수보다 클때,
        if(result % n === 0) return n; // 다시 돌아가기위해 수감수로 나눈 나머지
        return result % n;
    }
    
    if(result === 0) return n; // 끝 번호가 받게 될경우
    return result; // 아닌 경우
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const s = parseInt(firstMultipleInput[2], 10);

        const result = saveThePrisoner(n, m, s);

        ws.write(result + '\n');
    }

    ws.end();
}
