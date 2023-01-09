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
 * Complete the 'larrysArray' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY A as parameter.
 */

function larrysArray(A) {
    let index = 0, temp = [], temp_v = 0, diff = 0;
    for(let i = 0; i < A.length; i++) {
        while(i+1 !== A[i]) {
            index = A.indexOf(i+1);
            if(i + 2 > A.length - 1) return 'NO';
            
            if(index - 2 >= i) {
                temp = A.splice(index - 2, 3)
                temp_v = temp.pop();
                temp.splice(0,0,temp_v);
                A.splice(index-2,0,...temp);
                
                temp = [], temp_v = 0;
            } else if (index - 2 < i) {
                diff = i - (index - 2);
                temp = A.splice(index - 2 + diff, 3)
                temp_v = temp.pop();
                temp.splice(0,0,temp_v);
                A.splice(index-2 + diff,0,...temp);
                
                temp = [], temp_v = 0;
            }
        }
    }
    
    return 'YES';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

        const result = larrysArray(A);

        ws.write(result + '\n');
    }

    ws.end();
}
