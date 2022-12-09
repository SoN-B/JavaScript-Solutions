/**
 * 캥거루 2마리가 있고, 서로 시작위치 및 칸당 이동 속도가 다른상태에서 서로 같은시간, 같은위치에서 만날 수 있는지 판별하는문제
 * 
 * x = 시작위치, v 칸 당 이동속도
 * Ex) x1 = 2, v1 = 1, x2 = 1, v2 = 2
 * 
 * x1 -> 2(시작), 3(1초뒤)
 * x2 -> 1(시작), 3(1초뒤)
 * 
 * 즉, 두 캥거루는 1초뒤 같은위치에서 만난다. YES 출력
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
 * Complete the 'kangaroo' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER x1
 *  2. INTEGER v1
 *  3. INTEGER x2
 *  4. INTEGER v2
 */

function kangaroo(x1, v1, x2, v2) {
    // Write your code here
    let sum_x1 = x1, sum_x2 = x2;
    
    if(v1 === v2) return "NO"; // 서로 다른 위치에서, 속도가 같으면 절대 못만남
    
    while(true) {
        sum_x1 += v1;
        sum_x2 += v2;
        if(sum_x1 === sum_x2) return "YES";
        if(v1 > v2 && sum_x1 > sum_x2) return "NO";
        // 다른위치 1번 캥거루의 속도가 더 빠를때, 그 캥거루의 거리 합이 더 커져버리면,
        // 속도가 느린 2번 캥거루는 그 순간 절대 못 따라 잡습니다.
        else if(v1 < v2 && sum_x1 < sum_x2) return "NO"; 
    }
}

// function kangaroo(x1, v1, x2, v2) {
//     // equation - 방정식
//     // x1 + x(이동횟수) * v1 = x2 + x * v2 -> 각 위치에서 정해진 속도별로 움직이고 그 값이 같은 순간 리턴
//     // x * v1 - x * v2 = x2 - x1
//     // x * (v1 - v2) = x2 - x1
//     // x = (x2 - x1) / (v1 - v2)
//     const x = (x2 - x1) / (v1 - v2) -> x가 딱 떨어지는 정수이고 0보다 커야지만 만났다고 볼 수 있음
//     return Number.isInteger(x) && x >= 0 ? 'YES' : 'NO'
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const x1 = parseInt(firstMultipleInput[0], 10);

    const v1 = parseInt(firstMultipleInput[1], 10);

    const x2 = parseInt(firstMultipleInput[2], 10);

    const v2 = parseInt(firstMultipleInput[3], 10);

    const result = kangaroo(x1, v1, x2, v2);

    ws.write(result + '\n');

    ws.end();
}
