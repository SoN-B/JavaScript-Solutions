/**
 * 모든 사람이 모든 꽃을 구매하기 위한 최소 비용을 결정
 * k = 사람수
 * c = 꽃의 가격 리스트
 * 한사람이 꽃을 구매할 때 마다 구매가격이 +1씩 비싸짐 => ((구매한 꽃의 수) + 1) * 현재 꽃 가격
 * 
 * 해결방법 - 최소한의 가격으로 사야하니 특정사람이 더 많이산다거나 하면 가격이 매우 비싸져버리니
 * 역정렬후(큰 거부터 사야 최소가격 유지됨), 균일하게 사람수로 나눠가며 더해간다.
 * 
 * Ex) k = 3, c = [10, 9, 8, .., 1]
 * 10 + 9 + 8 + 7(1+1) + 6(1+1) + 5(1+1) + 4(1+2) + 3(1+2) + 2(1+2) + 1*(3+1)
 *        3개 -> +1                  3개 -> +1                   3개 -> +1
 */

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the getMinimumCost function below.
function getMinimumCost(k, c) {
    let sum = 0, count = 1;
    if(k === c.length) { // 사람 수와 꽃의 수가 같다면 그냥 그 숫자들 다 더하면 됩니다.
        c.forEach((data) => sum += data);
        return sum;
    }
    
    c.sort((a,b) => b - a);
    for(let i = 0; i < c.length; i++) {
        sum += c[i] * count;
        if((i + 1) % k === 0 && (i + 1) !== 1) count++; // 해당 사람수들의 배수들만
    }
    
    return sum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    const minimumCost = getMinimumCost(k, c);

    ws.write(minimumCost + '\n');

    ws.end();
}
