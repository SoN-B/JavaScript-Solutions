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
