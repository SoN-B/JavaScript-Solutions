/**
 * 숫자배열을 입력받아, 처음부터 끝까지 해당요소를 기준으로 왼쪽의 합 === 오른쪽의 합이 존재하는가를 판별하는 문제
 * 
 * Ex) arr = [5, 6, 8, 11]
 * 현재기준 = 8
 * 왼쪽 5 + 6 === 오른쪽 11 합이 동일
 * YES출력
 * 
 * 참고) 1 <= arr[i] <= 2 * 10^4 의 조건을 고려하면
 * 단순 무식하게 중첩for문을 사용할 수 있겠지만, 그럴경우
 * 최대 4억번의 연산이 수행됩니다. (중첩 for문 없이 진행)
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
 * Complete the 'balancedSums' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function balancedSums(arr) {
    if(arr.length === 1) return "YES"
    
    let left = 0, right = 0; // 처음에는 인덱스0이 기준 그전까지의 합은 0 이므로, left = 0
    for(let i = 1; i < arr.length; i++) right += arr[i]; // 인덱스 1 ~ 끝까지 right sum
    
    for(let i = 0; i < arr.length; i++) {
        if(i === arr.length - 1) break; // 끝 인덱스일 경우 탈출
        if(left === right) return "YES";
        
        left += arr[i];
        right -= arr[i + 1]; // 그 다음의 기준이 될 숫자를 빼줍니다
    }
    
    return "NO";
}

// function balancedSums(arr) {
//     // Write your code here
//     if (arr.length === 1) {
//         return "YES"
//     }
//     const sum = arr.reduce((pre, cur) => pre + cur, 0)
//     let rightSum = 0;
//     let leftSum = 0;
//     for (let i = arr.length - 2; i > -1; i--) {
//         rightSum += arr[i + 1]
//         leftSum = sum - rightSum - arr[i]
//         if (leftSum === rightSum) {
//             return "YES"
//         }
//     }
//     return "NO"
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = balancedSums(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
