/**
 * 각자의 substring이 서로의 문자열속에 존재하는지 확인
 * 즉, 둘이 한문자라도 같으면 YES 아니면 NO
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
 * Complete the 'twoStrings' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */
function twoStrings(s1, s2) {
    let arr1 = [...s1], arr2 = [...s2];
    let count = Array(26).fill(0); // 알파벳 총 개수 26
    
    // 해당 문자 나올때마다, 각 알파벳 위치에 +1 (a자리 = count[0], b자리 = count[1], ...)
    // 'a'의 아스키값 = 97 따라서 97을 빼줘 0번 인덱스에 넣어지도록
    for(let i = 0; i < arr1.length; i++) count[arr1[i].charCodeAt() - 97]++;
    // 두번째 문자열 돌면서 존재여부 확인
    for(let i = 0; i < arr2.length; i++) if(count[arr2[i].charCodeAt() - 97]) return 'YES';
    
    return 'NO';
}

// function twoStrings(s1, s2) {
//     let hashMap = {};

//     for(let char of s1){
//         hashMap[char] = true;
//     }
//     Ex. { h: true, e: true, l: true, o: true }

//     for(let char of s2){
//         if(char in hashMap ){
//             return 'YES';
//         }
//     }
//     return 'NO';
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s1 = readLine();

        const s2 = readLine();

        const result = twoStrings(s1, s2);

        ws.write(result + '\n');
    }

    ws.end();
}
