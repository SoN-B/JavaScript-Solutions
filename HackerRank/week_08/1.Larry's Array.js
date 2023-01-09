/**
 * 주어진 배열속에서 3개를 선택후, 그안에서 왼쪽 or 오른쪽으로 1칸씩 Rotate를 할때,
 * 결과가 정렬이 되는가? 를 판단하는 문제
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
 * Complete the 'larrysArray' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY A as parameter.
 */

function larrysArray(A) {
    let index = 0, temp = [], diff = 0;
    for(let i = 0; i < A.length; i++) {
        while(i + 1 !== A[i]) { // 그 위치에 해당숫자가 정렬이 될 때까지
            if(i + 2 > A.length - 1) return 'NO'; // Rotate하려는 위치의 크기가 배열 크기보다 클 때, 
            index = A.indexOf(i + 1); // i = 0부터니, 실제 숫자와 같도록 i + 1
            
            // 만약 배열되야할 숫자가 포함된 배열이 i보다 클 경우,
            // Ex) 1 2 3 5 6 4
            // 5자리에 4가 와야하니 4의 위치를 찾는다.
            // 4를 포함한 3크기의 배열이 i보다 큼, (5 6 4) -> i = 3, index = 5
            // 오른쪽 로테돌리는게 더 빠름
            if(index - 2 >= i) { // right rotate
                temp = A.splice(index - 2, 3);
                temp.splice(0, 0, temp.pop());
                A.splice(index - 2, 0, ...temp);
                
                temp = [];
            }
            // Ex) 1 2 3 6 4 5 -> i = 3, index = 4
            else if (index - 2 < i) { // left rotate
                temp = A.splice(index - 1, 3); // 정렬된 배열까지 뽑아오지 않게, -1만 하여, 6 4 5를 뽑아옴
                temp.push(temp.shift()); // 이경우 왼쪽 로테돌리는게 더 빠름
                A.splice(index - 1, 0, ...temp);
                
                temp = [];
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
