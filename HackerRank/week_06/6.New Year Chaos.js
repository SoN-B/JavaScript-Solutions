/**
 * 참고 : https://pkiop.tistory.com/214
 */

'use strict';

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
 * Complete the 'minimumBribes' function below.
 *
 * The function accepts INTEGER_ARRAY q as parameter.
 */
function minimumBribes(q) {
    let arr = [];
    for(let i = 1; i <= q.length + 1; i++) arr.push(i);
    let answer = 0;
    
    for(let i=0;i<q.length-1;i++) {
        let originValue = q[i];
        if(arr[i] !== originValue) {
            if(arr[i+1] !== originValue) {
                if(arr[i+2] !== originValue) {
                return 'Too chaotic';
                }
                
                let temp = arr[i+2];
                arr[i+2] = arr[i+1];
                arr[i+1] = temp;
                answer++;
            }

            let temp = arr[i+1];
            arr[i+1] = arr[i];
            arr[i] = temp;
            answer++;
        }
    }
    return answer;
}

function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const q = readLine().replace(/\s+$/g, '').split(' ').map(qTemp => parseInt(qTemp, 10));

        let result = minimumBribes(q);
        console.log(result);
    }
}
