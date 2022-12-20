/**
 * arr = [3,4,5];
 * what is the answer? 3 ^ 4 ^ 5 ^ (3 ^ 4) ^ (4 ^ 5) ^ (3 ^ 4 ^ 5)
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
 * Complete the 'sansaXor' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function sansaXor(arr) {
    let temp = [];
    for(let i = 1; i <= arr.length; i++) { // 몇개를 자를 것인가
        for(let j = 0; j < arr.length; j++) { // 처음부터 끝까지
            if(j + i > arr.length) break;
            temp.push(...arr.slice(j, j + i));
        }
    }
    
    let answer = 0;
    for(let i = 0; i < temp.length; i++) answer ^= temp[i]; // 전부 xor
    
    return answer; // 배열 공간 초과로 인한 오류
    // 사실, 자바스크립트 배열의 최대공간은 42억 9천만 요소정도를 가질 수 있지만
    // 컴퓨터와 실제 코드에 따라 다르므로 허용되는 것을 확인하려면 해당 플랫폼에서 테스트해야 합니다.
    // 해커랭크에서는 불가하다는것
}

// 배열의 길이가 짝수일때는 무조건 0
// 예시) arr = [3,4,5,6]
// 3 4 5 6 (3 4) (4 5) (5 6) (3 4 5) (4 5 6) (3 4 5 6)
// xor은 같은 숫자끼리는 0임.
// 짝수는 무조건 자기들 끼리의 갯수가 동일 = 0 (직접 수를 지워보면 알 수 있음)

// 배열의 길이가 짝수일때는 무조건 i += 2
// 예시) arr = [3,4,5]
// 이것도 지워보면 알 수 있음

// function sansaXor(arr) {
//     if (arr.length % 2 === 0) return 0
    
//     let res
    
//     for (let i = 0; i < arr.length; i += 2)
//         res ^= arr[i]
    
//     return res
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = sansaXor(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
