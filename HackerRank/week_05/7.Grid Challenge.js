/**
 * n * m Grid형식의 문자배열이 주어지면, 열(가로)들을 사전식 오름차순정렬 시켰을때, 행(세로)또한 사전식 배열인지 체크하는 문제
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
 * Complete the 'gridChallenge' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function gridChallenge(grid) {
    let arr = [];
    for(let x of grid) arr.push([...x]);
    for(let x = 0; x < arr.length; x++) arr[x].sort();
    
    for(let x = 0; x < arr[0].length; x++) {
        for(let y = 0; y < arr.length - 1; y++) {
            if(arr[y][x].charCodeAt() > arr[y + 1][x].charCodeAt()) return "NO";
        }
    }

    return "YES";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        let grid = [];

        for (let i = 0; i < n; i++) {
            const gridItem = readLine();
            grid.push(gridItem);
        }

        const result = gridChallenge(grid);

        ws.write(result + '\n');
    }

    ws.end();
}
