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
 * Complete the 'commonChild' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */

function commonChild(s1, s2) {
    let arr_s1 = s1.split("");
    let arr_s2 = s2.split("");
    let common = [];
    
    for(let x of arr_s1) {
        if(arr_s2.includes(x) && !common.includes(x)) common.push(x);
    } // 동일요소삽입 & 중복제거
    
    // 그후 s1, s2 동일요소외 요소들은 전부제거하고 한 배열기준으로 잡은다음
    // 두 배열간 연속되는 문자열 보면될듯 (그중 가장긴거 리턴)
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    const result = commonChild(s1, s2);

    ws.write(result + '\n');

    ws.end();
}
