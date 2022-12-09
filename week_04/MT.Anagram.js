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
