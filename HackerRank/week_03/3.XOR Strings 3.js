/**
 * 두 개의 숫자로 표현된 문자열 입력받아 XOR 변환시키는 문제
 * XOR - 서로 다를 때만 1
 */

'use strict';

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

function xorstring(s1, s2) {
    let result = [];
    
    for(let i = 0; i < s1.length; i++) {
        if( s1[i] !== s2[i] ) result.push(1);
        else result.push(0); 
    }

    const string = result.join('');
    return string;
}

// function xorstring(s1, s2) {
//     let s = ""
//     for(let i = 0; i < s1.length; i++){
//         s+= s1[i] != s2[i] ? "1" : "0"
//     }
//     return s
// }

function main() {
    const s = readLine();
    const t = readLine();
    
    console.log(xorstring(s,t));
}