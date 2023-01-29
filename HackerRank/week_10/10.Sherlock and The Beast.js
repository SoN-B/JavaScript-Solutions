/**
 * 숫자는 3 및/또는 5만 가능합니다. Ex) 55533333, 555555
 * 그것이 포함하는 3의 개수는 5로 나눌 수 있습니다. Ex) 55533333 -> 3의 개수 5로 나눠 떨어집니다. 
 * 그것이 포함하는 5의 개수는 3으로 나눌 수 있습니다. Ex) 55533333 -> 5의 개수 3으로 나눠 떨어집니다. 
 * 길이에 비해 가장 큰 숫자입니다. Ex) 55533333 -> 8자리를 구성하는 수의크기가 가장커야함 -> 5가 앞에 3이 뒤에 존재하면서 5가 가장 많아야함
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
 * Complete the 'decentNumber' function below.
 *
 * The function accepts INTEGER n as parameter.
 */
function decentNumber(n) {
    let num5 = '', num3 = '';
    while(n > 0) { // 0이 된다는 것은 어떠한 수를 만들 수 있다는뜻
        if(n % 3 === 0) { // 3으로 나눠 떨어질때, 5의수로 가득채운다
            for(let i = 0; i < n; i++) num5 += '5';
            break;
        }
        
        for(let i = 0; i < 5; i++) num3 += '3'; // 평소에는 3의수로 채운다
        n -= 5;
        if(n < 0) { // 0보다 작아진다는 것은 어떠한 수를 만들 수 없다는뜻
            console.log('-1');
            return;
        }
    }
    
    console.log(`${num5}`+`${num3}`);
    return;
}

function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        decentNumber(n);
    }
}
