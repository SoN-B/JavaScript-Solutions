/**
 * 책 전체 페이지 수 n, 봐야할 페이지 p가 주어집니다. 넘겨야할 최소 페이지 수를 구하는 문제
 * 앞, 뒤에서 책을 펼칠 수 있고, 맨 앞쪽 페이지에는 오른쪽에 1페이지만 존재
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
 * Complete the 'pageCount' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER p
 */

function pageCount(n, p) {
    let front, back; // 앞 뒤 에서 모두 확인 (그중, 작은거 출력)
    let sum = parseInt(n/2); // 페이지가 01 23 45 67 이라고 했을때,
                // 각각을 2로 나눈 값은   0   1  2  3 이됩니다. 이를 리버스시키면,
                //                       3   2  1  0
                // 각각을 더하면          3   3  3  3
                // 따라서, 뒤쪽에서 페이지를 확인할때는 n/2 - p/2
    front = parseInt(p/2);
    back = sum - front
    
    return Math.min(front,back);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const p = parseInt(readLine().trim(), 10);

    const result = pageCount(n, p);

    ws.write(result + '\n');

    ws.end();
}
