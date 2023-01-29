/**
 * 10 3
 * 0 1 0 0 0 1 1 1 1 1
 * 
 * 1 = 전력 공급원
 * k는 전력을 공급할 수 있는 범위라고 생각하면 된다. 
 * k보다 작은 distance에 위치한 인덱스에는 전력 공급이 가능하다.
 * 0 1 0 0 0 ... -> (? 0 1 0 0) 0 괄호부분 전력공급가능 1로부터 2만큼 떨어진곳까지
 * 이렇게 해서 도시전체에 공급해줄 수 있는 최소 공급원 수를 구하는 문제
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
 * Complete the 'pylons' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function pylons(k, arr) {
    let res = 0, i = 0
    while (i < arr.length) {
        let found = false
        for (let j = i+k-1; j >= i-k+1 && !found; j--){ // i지점기준의 공급범위내에서 j--하며, found가 false일때 계속반복(공급원을 찾을때까지)
            if (j < arr.length && arr[j]) res++, i = j+k, found = true // 공급원(1)을 찾았다면, 찾은지점으로부터 + k로 넘어감
        }
        if (!found) return -1
    }
    return res
}
/**
 * 예시)
 * 10 3
 * 0 1 0 0 0 1 1 1 1 1
 * 
 * i지점기준의 공급범위내에서 j--하며, found가 false일때 계속반복(공급원을 찾을때까지)
 * i = 0, (? ? 0 1 0) 0 0 1 1 1 1 1
 *               ↑
 *            끝에서부터 공급원 위치 찾았음
 * 
 * 공급원(1)을 찾았다면, 찾은지점으로부터 + k로 넘어감
 * i = 0, 0 1 (0 0 0 1 1) 1 1 1
 *                     ↑
 *            끝에서부터 공급원 위치 찾았음
 */

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = pylons(k, arr);

    ws.write(result + '\n');

    ws.end();
}
