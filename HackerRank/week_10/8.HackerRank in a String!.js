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
 * Complete the 'hackerrankInString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

// hackerrank라는 철자가 입력받는 s문자열에 순서대로 존재하는지 확인
// s = hereiamstackerrank -> YES
function hackerrankInString(s) {
    let string = 'hackerrank', result = '';
    let cur = 0;
    for(let i = 0; i < s.length; i++) {
        if(string[cur] === s[i]) {
            result += string[cur];
            cur++;
        }
    }
    
    if(string === result) return 'YES';
    else return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = hackerrankInString(s);

        ws.write(result + '\n');
    }

    ws.end();
}
