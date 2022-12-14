/**
 * 
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
 * Complete the 'minimumNumber' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING password
 */

let check = ["0123456789", "abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "!@#$%^&*()-+"];

function minimumNumber(n, password) {
    let password_arr = [];
    password_arr.push(...password);
    
    let temp = [], count = 0, result = 0;
    for(let i = 0; i < check.length; i++) {
        temp.push(...check[i]);
        for(let j = 0; j < temp.length; j++) {
            if(password_arr.includes(temp[j])) count++;
        }
        
        if(count < 1) result++;
        temp = [];
        count = 0;
    }

    if(result < 6 - n) return 6 - n;
    return result;
}

// function minimumNumber(n, password) {
//     let lowerCase = /[a-z]/g;
//     let uperCase = /[A-Z]/g;
//     let number = /[0-9]/g;
//     let special = /[-!@#$%^&*()-+]/
//     let count = 0
//     if(!lowerCase.test(password)){ // test() 메서드는 주어진 문자열이 정규 표현식을 만족하는지 판별
//         count += 1
//     }
//     if(!uperCase.test(password)){
//         count += 1
//     }
//     if(!number.test(password)){
//         count += 1
//     }
//     if(!special.test(password)){
//         count += 1
//     }
//     if(n + count < 6){
//         return count = 6 - n
//     }
//     return count
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const password = readLine();

    const answer = minimumNumber(n, password);

    ws.write(answer + '\n');

    ws.end();
}
