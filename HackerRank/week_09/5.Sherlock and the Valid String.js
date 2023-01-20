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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s) {
    let count = Array(26).fill(0);
    for(let i = 0; i < s.length; i++) count[s[i].charCodeAt() - 97]++;
    
    let nums = [...new Set(count)];
    if(nums.length > 3) return 'NO';

    nums.sort((a,b) => a - b);
    if(nums[0] === 0) nums.shift();
    if(nums.length === 1) return 'YES';
    
    let counts = [], cnt = 0;
    for(let i = 0; i < nums.length; i++) {
        for(let j = 0; j < count.length; j++) if(nums[i] === count[j]) cnt++;
        counts.push(cnt);
        cnt = 0;
    }
    
    let index = counts.indexOf(1)
    if(index >= 0) {
        nums[index]--;
        if(nums[0] === nums[1]) return 'YES';
        else if (nums[0] === 0 || nums[1] === 0) return 'YES'
        else return 'NO';
    } else return 'NO';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
