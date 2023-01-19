/**
 * 무한히 반복되는 영문 소문자의 문자열 s가 있습니다. 정수 n이 주어지면 무한 문자열속 문자 a의 수를 찾아서 인쇄하십시오.
 * 
 * Ex) s = 'abcac', n = 11
 * -> abcacabcaca (n의 크기만큼 원래 문자열들의 요소들을 반복)
 * 이 문자열속 a의 개수는 5개
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
 * Complete the 'repeatedString' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. LONG_INTEGER n
 */
function repeatedString(s, n) {
    let string = [...s], count = 0;
    // 원래 문자열의 a의 개수를 count;
    for(let i = 0; i < string.length; i++) if(string[i] === 'a') count++;

    let result = 0, divide, mod;
    // (반복된 문자열을 포함한 n크기의 문자열속) 원래 문자열이 몇번들어가는지
    divide = parseInt(n / string.length);
    result += divide * count; // 반복되는 문자열만큼 count를 곱함
    
    mod = n % string.length, count = 0; // 그 후, 남는 문자열 만큼 a를 count
    for(let i = 0; i < mod; i++) if(string[i] === 'a') count++;
    result += count;
    
    return result;
}

// 아래코드와 크게 다르지 않음 좀더 읽기 좋은 코드인점
// function countFrom(string,end){
//     let total = 0
//     for(let i =0; i < end; i++){
//         if(string[i]==="a") total ++
//     }
//     return total
// }

// Complete the repeatedString function below.
// function repeatedString(string, n) {
//     const numberOfAsInString = countFrom(string,string.length)
//     const remainder = n % string.length
//     const timesStringIsRepeated = Math.floor(n/string.length) 
//     const numberOfAsInStringRemainder = countFrom(string,remainder)
//     return numberOfAsInString * timesStringIsRepeated + numberOfAsInStringRemainder;
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine().trim(), 10);

    const result = repeatedString(s, n);

    ws.write(result + '\n');

    ws.end();
}
