/**
 * 배송 시간은 주문 번호와 준비 시간의 합으로 계산됩니다. 
 * 두 개의 주문이 동시에 배송되는 경우 고객 번호 오름차순으로 배송된다고 가정합니다.
 * 
 * 1번 고객: 8(주문번호) 1(준비시간) => 9(배송시간) 1번
 * 2번 고객: 4 2 => 6 2번
 * 3번 고객: 5 6 => 11 3번
 * 4번 고객: 3 1 => 4 4번
 * 5번 고객: 4 3 => 7 5번
 * 
 * 배송시간을 오름차순 정렬했을때, 그에따른 고객번호 순서대로 출력
 * 배송시간정렬 -> 4 6 7 9 11
 * 고객번호 -> 4 2 5 1 3
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
 * Complete the 'jimOrders' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY orders as parameter.
 */

function jimOrders(orders) {
    let sums = [], hash = {};
    for(let i = 0; i < orders.length; i++) { 
        sums.push(orders[i][0] + orders[i][1]);
        hash[orders[i][0] + orders[i][1]] = 0; 
        // 두 개의 주문이 동시에 배송되는 경우 고객 번호 오름차순으로 배송된다고 가정합니다.)
        // 해쉬를 이용하여, 찾은 인덱스 다음에서 찾기위해 갱신
    }
        
    let temp = [...sums], result = [];
    sums.sort((a, b) => {return a - b}); 
    
    let index;
    for(let i = 0; i < sums.length; i++) {
        index = temp.indexOf(sums[i], hash[sums[i]]);
        result.push(index + 1);
        hash[sums[i]] = index + 1;
    }
    
    return result;
}

// function jimOrders(orders) {
//     return orders.map((o,i) => [o[0]+o[1], i+1]).sort((a,b) => a[0]-b[0]).map(o => o[1])
// }

// 8 1 => 9 1
// 4 2 => 6 2
// 5 6 => 11 3
// 3 1 => 4 4
// 4 3 => 7 5

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let orders = Array(n);

    for (let i = 0; i < n; i++) {
        orders[i] = readLine().replace(/\s+$/g, '').split(' ').map(ordersTemp => parseInt(ordersTemp, 10));
    }

    const result = jimOrders(orders);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
