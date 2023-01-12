/**
 * 동적 프로그래밍 문제로 분류됐지만, 아닙니다.
 * 
 * 주식시장을 예측하는 데 매우 능숙해져서 이제 다음 며칠 동안 WOT(Wooden Orange Toothpicks Inc.)의 주가가 얼마가 될지 알 수 있습니다.
 * 하루동안 팔거나, 사거나, 아무것도 안할 수 있음
 * 최적의 거래 전략으로 얻을 수 있는 최대 수익은 얼마입니까?
 * 
 * Ex) 
 * 1 3 1 2 -> 1일에 사고 2일에 팜 (이득 +2). 3일에 사고 4일에 팜 (이득 +1)
 * 이득의 총합 3출력
 * 
 * Ex)
 * 5 4 3 4 5 -> 1일무시, 2,3,4일에 사고 5일에 팜 (이득 +1 +2 +1)
 * 이득의 총합 4출력
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
 * Complete the 'stockmax' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY prices as parameter.
 */
function stockmax(prices) {
    let result = 0, arr = [...prices]; // 깊은복사
    arr.sort((a, b) =>  b - a); // 주가가 가장 비싼순대로 내림차순정렬
    
    // 가장 비싼날 전까지 매수했다가, 가장 비싼날에 매도하면됨
    // Ex) prices = [5 4 3 4 5], arr = [5 5 4 4 3]
    // 첫번째 수행, prices = [4 3 4 5], arr = [(5) 5 4 4 3] result = 0
    // 두번째 수행, prices = [], arr = [5 (5) 4 4 3] result = 4
    let index;
    for(let i = 0; i < arr.length; i++) {
        index = prices.indexOf(arr[i]);
        for(let j = 0; j <= index; j++) result += arr[i] - prices.shift();
        if(prices.length === 0) return result; // 배열이 비었다면 리턴
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const prices = readLine().replace(/\s+$/g, '').split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

        const result = stockmax(prices);

        ws.write(result + '\n');
    }

    ws.end();
}
