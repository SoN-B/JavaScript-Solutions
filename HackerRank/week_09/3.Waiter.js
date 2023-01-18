/**
 * Ex) A = [2,3,4,5,6,7], q = 3
 * 웨이터가 A에 쌓여져 있는 접시들을 위에서 차례대로 q번동안 반복하며, 
 * 각 범위의 소수들로 나눠떨어지는지 확인하며 나눠줍니다.
 * 
 * 소수) 2, 3, 5, 7, 11, 13, 17, ... -> 문제에서는 q = 3 -> 2,3,5까지 총 3번만 반복수행
 * 1) 소수 2
 * A = [7,5,3] A요소들로부터 2로 나눠 떨어지지 않는다면 A에
 * B = [6,4,2] A요소들로부터 2로 나눠 떨어진다면 B에
 * 
 * B = []
 * result = [2,4,6] -> B요소 pop후 result삽입
 * 
 * 2) 소수 3
 * A = [7,5] 3 //
 * B = [3] 3 //
 * 
 * B = []
 * result = [2,4,6,3] -> B요소 pop후 result삽입
 * 
 * 3) 소수 5
 * A = [7] 5 //
 * B = [5] 5 //
 * 
 * B = []
 * result = [2,4,6,3,5] -> B요소 pop후 result삽입
 * 
 * 정해진 소수들에 한정하여 반복이 끝났으니 A의 남은요소들 pop후 result삽입
 * result = [2,4,6,3,5,7]
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
 * Complete the 'waiter' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY number
 *  2. INTEGER q
 */
function isPrime(num) {
    if(num === 2) return true;
    for(let i = 2; i <= Math.floor(Math.sqrt(num)); i++) if(num % i === 0) return false; 
    
    return true; 
}

function waiter(number, q) {
    let A = [], B = [], result = [];
    
    let prime_nums = [], range = Math.max(...number), count = 0;
    for(let i = 2; i <= range; i++) {
        if(isPrime(i)) { 
            prime_nums.push(i);
            if(++count === q) break; // 범위내의 소수들중 앞에서부터 q개만
        }
    }
    
    let temp = [...number];
    for(let i = 0; i < q; i++) {
        A = []; // 매번 A로부터 요소들을 가져와 새로운 다음A, B 배열이 생성되니
        
        range = temp.length;
        for(let j = range - 1; j >= 0; j--) { 
            if(temp[j] % prime_nums[i] === 0) B.push(temp.pop());
            else A.push(temp.pop());
        }
        
        range = B.length;   
        for(let z = 0; z < range; z++) result.push(B.pop());
        
        temp = [...A];
    }
    
    if(A.length !== 0) { // 남은 A요소 삽입
        range = A.length;
        for(let j = range - 1; j >= 0; j--) result.push(A.pop());
    }
    
    return result;
} 

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const q = parseInt(firstMultipleInput[1], 10);

    const number = readLine().replace(/\s+$/g, '').split(' ').map(numberTemp => parseInt(numberTemp, 10));

    const result = waiter(number, q);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
