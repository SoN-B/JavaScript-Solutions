/**
 * Gird)
 * 1234567890  
 * 0987654321  
 * 1111111111  
 * 1111111111  
 * 2222222222  
 * 
 * Pattern)
 * 876543  
 * 111111  
 * 111111
 * 
 * Grid속에 해당 Pattern이 존재하는지 확인
 * 
 * 위의 예제는 단순히 876543이 한줄에 한번존재해서 생각하기 쉽지만,
 * 876543876543 이런식의 예제를 생각할 수 있음 -> 첫요소가 여러개일 수 있음
 * 패턴의 첫요소로부터 다음 패턴들이 연속으로 등장하며, 시작인덱스도 같아야함
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
 * Complete the 'gridSearch' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING_ARRAY G
 *  2. STRING_ARRAY P
 */

function gridSearch(G, P) {
    let startIndex;
    
    for(let i=0; i<G.length; i++) {
        for(let j=0; j<G[0].length; j++) {
            if(G[i].includes(P[0], j)) {
                startIndex=G[i].indexOf(P[0], j)
                for(let k=1; k<P.length; k++) {
                    if(G[i+k].indexOf(P[k], startIndex)!==startIndex){
                        break;
                    } else {
                        if(k==P.length-1){
                            return 'YES'
                        }
                    }
                } 
            }
        }
    }
    
    return 'NO'
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const R = parseInt(firstMultipleInput[0], 10);

        const C = parseInt(firstMultipleInput[1], 10);

        let G = [];

        for (let i = 0; i < R; i++) {
            const GItem = readLine();
            G.push(GItem);
        }

        const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const r = parseInt(secondMultipleInput[0], 10);

        const c = parseInt(secondMultipleInput[1], 10);

        let P = [];

        for (let i = 0; i < r; i++) {
            const PItem = readLine();
            P.push(PItem);
        }

        const result = gridSearch(G, P);

        ws.write(result + '\n');
    }

    ws.end();
}
