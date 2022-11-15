/**
 * 리스트 S 가 주어지고, 앞에서부터 순서대로 m 길이만큼 잘라서 더한 후 값이 d와 같으면 count++
 * ex) 1,2,1,3,2 | m = 2 | d = 3
 * 12, 21, 13, 32의 경우의 수가 나오고
 * 합한 숫자가 3인 경우가 총 2개이므로 결과는 2
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
 * Complete the 'birthday' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY s
 *  2. INTEGER d
 *  3. INTEGER m
 */

// if) s = [2, 2, 1, 3, 2], d = 5, m = 3
function birthday(s, d, m) {
    let sum = 0, result = 0;

    for(let x = 0; x < s.length; x++) { // 0 ~ 4 - 5번 반복
        for(let y = 0; y < m; y++) { // 0 ~ 3 - 3번 반복
            sum += s[x + y]; 
            //x = 0, s[0] ~ s[2] - 1 (정상 범위)
            //x = 1, s[1] ~ s[3] - 2
            //x = 2, s[2] ~ s[4] - 3
            //x = 3, s[3] ~ s[5] - 4 (인덱스 범위 초과)
            // 반복문 탈출을 위해 반복 변수 최대화 - 해당 문제에서는 1 <= m <= 12이므로 어떤 케이스든, 13을 주면 탈출합니다.
            if(x + y >= s.length) { 
                y = 13;
                sum = 0; // 인덱스 초과된 부분은 계산되면 안 되므로 sum = 0;
            } 
        }
        if(sum === d) result++;
        sum = 0;
    }
    
    return result;
}

// if) s = [2, 2, 1, 3, 2], d = 5, m = 3
// function birthday(s, d, m) {
//     let sum = 0, result = 0;

//     for(let x = 0; x < s.length; x++) {
//         // 2(인덱스 0) + 2(인덱스 1) + 1 - 2(인덱스 0) + 3 - 2(인덱스 1) + 2
//         sum += s[x];
//         if(x>=m) sum -= s[x-m]; // m의 조건에 맞춰 범위에 제외된 지난 인덱스를 뺍니다.
//         if(x>=m-1 && sum == d) result++; // m의 조건 범위에 드는 순간부터 result 조건 판정
//     }

//     return result;
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const d = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const result = birthday(s, d, m);

    ws.write(result + '\n');

    ws.end();
}
