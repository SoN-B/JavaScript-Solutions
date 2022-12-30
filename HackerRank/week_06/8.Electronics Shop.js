/**
 * Ex) b = 60, keyboards = [40, 50, 60], drives = [5, 8, 12]
 * 
 * 주어진 예산(b)으로 구입할 수 있는 가장 비싼 컴퓨터 키보드(keyboards)와 USB 드라이브(drives)를 결정하려고 합니다. 
 * 키보드 및 USB 드라이브의 가격표와 예산이 주어졌을 때 구입 비용을 찾으십시오. 
 * 두 항목을 모두 구매할 수 없는 경우 -1 을 반환하십시오.
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

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the getMoneySpent function below.
 */
function getMoneySpent(keyboards, drives, b) {
    keyboards.sort((a, b) => { return a - b; });
    drives.sort((a, b) => { return a - b; });
    if(Math.min(...keyboards) + Math.min(...drives) > b) return -1;
    
    let result = 0;
    for(let i = 0; i < keyboards.length; i++) {
        for(let j = 0; j < drives.length; j++) {
            if(keyboards[i] + drives[j] > b) break;
            result = Math.max(result, keyboards[i] + drives[j]);
        }
    }
    
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const bnm = readLine().split(' ');

    const b = parseInt(bnm[0], 10);

    const n = parseInt(bnm[1], 10);

    const m = parseInt(bnm[2], 10);

    const keyboards = readLine().split(' ').map(keyboardsTemp => parseInt(keyboardsTemp, 10));

    const drives = readLine().split(' ').map(drivesTemp => parseInt(drivesTemp, 10));

    /*
     * The maximum amount of money she can spend on a keyboard and USB drive, or -1 if she can't purchase both items
     */

    let moneySpent = getMoneySpent(keyboards, drives, b);

    ws.write(moneySpent + "\n");

    ws.end();
}
