/**
 * Ex) w = [1,2,3,4,5,10,11,12,13] 무게배열이 입력으로 들어올때, 4단위씩 얼마나 자를 수 있는지 반환
 * 1~5[1,2,3,4,5], 10~14[10,11,12,13] 2단위 -> 2리턴
 * 
 * Ex) w = [1,2,3,21,7,12,13,21] -(정렬)->  w = [1,2,3,7,12,13,21,21]
 * 1~5[1,2,3], 7~11[7], 12~16[12,13], 21~25[21] 4단위 -> 4리턴
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
 * Complete the 'toys' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY w as parameter.
 */
function toys(w) {
    w.sort((a,b) => {return a - b}); // 우선 정렬부터

    let result = 0, point = 0, index = 0;
    while(w.length !== 0) { // 배열이 빌때까지
        point = w[0] + 4; // 처음요소 + 4
        
        if(point > w[w.length - 1]) index = w.length; // 마지막 요소
        else {
            for(let i = 0; i < w.length; i++) {
                if(w[i] > point) {
                    index = i;
                    break;
                }
            }
        }

        result++;
        w.splice(0, index); // 해당 수 만큼 자름
    }
    
    return result;
}

// [TypeScript Solution]
//
// function toys(w: number[]): number {
//     w.sort((a,b) => a - b)
//     let minimumValue = w[0]
//     let cotainers = 1

//     w.forEach((weight) => {
//         if(weight - minimumValue > 4) {
//             minimumValue = weight // 처음요소 갱신하면서 이동
//             cotainers++
//         }
//     })
//     return cotainers
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const w = readLine().replace(/\s+$/g, '').split(' ').map(wTemp => parseInt(wTemp, 10));

    const result = toys(w);

    ws.write(result + '\n');

    ws.end();
}
