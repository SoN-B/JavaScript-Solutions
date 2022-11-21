/**
 * 조류의 타입을 관찰한 id 1 ~ 5까지 범위의 배열이 입력으로 들어옵니다.
 * 그중, 가장 자주 보이는 유형의 id를 결정합니다. 그리고, 또 그중 가장 작은 id를 반환합니다.
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
 * Complete the 'migratoryBirds' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function migratoryBirds(arr) {
    let count = [0,0,0,0,0], result;
    
    for(let x = 0; x < arr.length; x++) {
        count[arr[x] - 1]++;
    }
    const maxValue = Math.max(...count);
    
    for(let x = 0; x < count.length; x++) {
        if(count[x] === maxValue) {
            result = x + 1;
            x = 4;
        }
    }
    
    // return count.indexOf(Math.max(...count)) + 1 -> 해당 수를 찾은 처음 위치 반환
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = migratoryBirds(arr);

    ws.write(result + '\n');

    ws.end();
}
