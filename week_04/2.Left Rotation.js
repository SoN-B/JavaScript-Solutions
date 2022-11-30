/**
 * 배열을 입력받고 해당 숫자만큼 왼쪽으로 이동시키는 문제
 * 
 * d = 2
 * arr = [1,2,3,4,5]
 * 
 * 1               2
 * [2,3,4,5,1] ->  [2,3,4,1,2]
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

class Queue {
    constructor() {
        this.arr = [];
    }
    enqueue(item) {
        this.arr.push(item);
    }
    dequeue() {
        return this.arr.shift();
    }
    front() {
        return this.arr[0];
    }
}

/*
 * Complete the 'rotateLeft' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER d
 *  2. INTEGER_ARRAY arr
 */

function rotateLeft(d, arr) {
    const queue = new Queue();
    
    for(let x of arr) {
        queue.enqueue(x);   
    }
    
    for(let x = 0; x < d; x++) {
        queue.enqueue(queue.dequeue());
    }
    
    return queue.arr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const d = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = rotateLeft(d, arr);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
