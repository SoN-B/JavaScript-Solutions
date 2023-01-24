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
 * Complete the 'palindromeIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function palindromeIndex(s) {
    let temp = [...s];
    let count = 0, result = [];

    for(let i = 0; i < parseInt(s.length / 2); i++) {
        if(s[i] !== s[s.length - 1 - i]) { 
            result.push([i,s.length - 1 - i]);
            count++;
        }
    }
    
    if(count >= 1) { 
        temp.splice(result[0][0], 1);
        
        count = 0;
        for(let i = 0; i < parseInt(temp.length / 2); i++) {
            if(temp[i] !== temp[temp.length - 1 - i]) { 
                count++;
            }
        }
        
        if(count === 0) return result[0][0];
        else return result[0][1];
    }
    else return -1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = palindromeIndex(s);

        ws.write(result + '\n');
    }

    ws.end();
}
