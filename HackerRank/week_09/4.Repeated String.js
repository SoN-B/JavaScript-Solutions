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
    let temp = [...s], count = 0;
    for(let i = 0; i < temp.length; i++) {
        if(temp[i] === 'a') count++;
    }
    
    let result = 0, divide, mod;
    divide = parseInt(n / temp.length);
    result += divide * count;
    
    mod = n % temp.length, count = 0;
    temp = temp.slice(0,mod);
    for(let i = 0; i < temp.length; i++) {
        if(temp[i] === 'a') count++;
    }
    result += count;
    
    return result
}

// function countFrom(string,end){
//     let total = 0
//     for(let i =0; i < end; i++){
//         if(string[i]==="a") total ++
//     }
//     return total
// }

// // Complete the repeatedString function below.
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
