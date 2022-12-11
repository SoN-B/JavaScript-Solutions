/**
 * BOB, ANDY둘이서, 주어진 배열로부터 최대값을 찾아, 그값포함 뒤에 있는 모든 값들을 제거해가며
 * 최후에 마지막으로 제거할 수 있는사람이 이기는 게임 (첫 시작 === BOB)
 * 
 * Ex) arr = [5,2,6,3,4];
 * BOB - 6 3 4제거 [5,2];
 * ANDY - 5 2제거 []; <- 승리
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
 * Complete the 'gamingArray' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function gamingArray(arr) {
    let max = 0, max_idx = 0;
    let length = arr.length;
    
    let player = "BOB"; // 처음 시작 유저
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < arr.length; j++) {
            if(max < arr[j]) {
                max = arr[j];
                max_idx = j;
            }
        }
        
        arr.splice(max_idx); // 찾은 최대값으로부터 그 뒤에 값들 전부 제거
        max = 0; // 다음 반복문 초기화

        if(arr.length === 0) break;
        if(player === "BOB") player = "ANDY"
        else player = "BOB"
    }
    
    return player;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const g = parseInt(readLine().trim(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const arrCount = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = gamingArray(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
