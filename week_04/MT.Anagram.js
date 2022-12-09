/**
 * 문자들로 구성된 배열을 입력으로 받아, 반으로 나누어 서로가 서로의 anagram이 되야할 교체문자수 리턴하는 문제
 * 
 * if) xaxbbbxx
 * xaxb <-> bbxx
 * xaxb에서 a가 b로 바뀌어야 서로가 anagram이 됩니다.
 * 따라서 답은 1
 * 
 * if) mnop
 * mn <-> op
 * 문자들이 다 달라서 2개 전부 바꿔줘야합니다.
 * 따라서 답은 2
 * 
 * 홀수개의 문자들로 구성된 문자열은 반으로 못 나누므로, -1
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
 * Complete the 'anagram' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */
function anagram(s) {
    if(s.length % 2 !== 0) return -1;
    let arr = [...s];
    
    let s1 = [];
    let s2 = [];
    for(let i = 0; i < parseInt(s.length / 2); i++) s1.push(arr[i]);
    for(let i = parseInt(s.length / 2); i < s.length; i++) s2.push(arr[i]);
        
    for(let i = 0; i < s1.length; i++) {
        if(s2.indexOf(s1[i]) !== -1) s2.splice(s2.indexOf(s1[i]),1);
    }
    
    return s2.length;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = anagram(s);

        ws.write(result + '\n');
    }

    ws.end();
}
