/**
 * 서로 Anagram이 되도록하기 위해 최소한 몇개의 문자를 지워야하는가?
 * 
 * Ex) s1 = abc, s2 = amnop
 * s1에서 b,c s2에서 m, n, o, p 총 6개의 문자제거필요
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
 * Complete the 'makingAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s1
 *  2. STRING s2
 */

// 문자 발생 빈도수 저장후 큰것에서 작은거 빼주면 됩니다.
function makingAnagrams(s1, s2) {
    let count1 = Array(26).fill(0), count2 = Array(26).fill(0);
    for(let i = 0; i < s1.length; i++) count1[s1[i].charCodeAt() - 97]++;
    for(let i = 0; i < s2.length; i++) count2[s2[i].charCodeAt() - 97]++;
    
    let result = 0;
    for(let i = 0; i < count1.length; i++) {
        if(count1[i] > count2[i]) result += (count1[i] - count2[i]);
        else result += (count2[i] - count1[i]);
    }
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s1 = readLine();

    const s2 = readLine();

    const result = makingAnagrams(s1, s2);

    ws.write(result + '\n');

    ws.end();
}
