/**
 * 입력받은 정수 배열 속에서의 만족되는 비퇴화 삼각형들 중 변의 길이의 합이 가장 큰 삼각형을 리턴하는 문제
 * 비퇴화 삼각형 -> a + b > c
 *                 a + c > b
 *                 b + c > a 가 만족하는 삼각형 (만족하지 않는 삼각형을 퇴화된 삼각형이라고 부릅니다.)
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

const getPermutations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]);

    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
        const permutations = getPermutations(rest, selectNumber - 1);
        const attached = permutations.map((permutation) => [fixed, ...permutation]);
        results.push(...attached);
    });
    return results;
};

/*
 * Complete the 'maximumPerimeterTriangle' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY sticks as parameter.
 */
function maximumPerimeterTriangle(sticks) {
    let triangle = getPermutations(sticks, 3); // 순열을 통해 배열 속 3가지수를 선택하여 삼각형을 형성합니다.
    let non_degenerate = [], result;
        
    for(let x of triangle) { // 삼각형들 중, 비퇴화 삼각형의 조건을 만족하는 삼각형들만 select
        if(x[0] + x[1] > x[2] && x[0] + x[2] > x[1] && x[1] + x[2] > x[0]) non_degenerate.push(x);
    }
    if(non_degenerate.length === 0) return [-1]; // 반환되는 게 없다면 [-1];

    result = non_degenerate[0];
    for(let x of non_degenerate) { // 비퇴화 삼각형들 중, 세변의 길이가 가장 큰 것을 select
        if(x[0] + x[1] + x[2] > result[0] + result[1] + result[2]) result = x;
    }

    result.sort(function (a, b) { // 모든 순열을 가져온 것이기에 정렬돼 있지 않음
        return a - b;
    });

    return result
}

// 세 변의 길이를 줬을 때, 길이가 가장 긴 변의 길이는 다른 두 변 길이의 합보다 작아야 삼각형을 그릴 수 있다는 사실을 잘 알아야한다.
// 따라서, 입력된 배열의 수를 정렬했을 때, a[i] + a[i+1] > a[i+2]이 항상 만족하는 것을 알 수 있고, 이는 항상 배열을 정렬했을 때, 해당 방식의 삼각형들이
// 항상 삼각형이 될 수 있음을 알 수 있다. - 이걸 몰랐습니다.
// function maximumPerimeterTriangle(sticks) {
//     let sorted = sticks.sort((a,b)=> a-b);

//     let final = []; 

//     for(var i = 0; i < sticks.length; i++){
//         let a = sticks[i];
//         let b = sticks[i+1];
//         let c = sticks[i+2];


//         if(a + b > c && a + c > b && b + c > a){
//             final.push([a,b,c])
//         }

//     }

//     return final.length > 0 ? final[final.length-1] : [-1] // final의 배열 뒤에 있는 배열일수록 수의 합이 클 것이므로 맨 뒤를 리턴합니다.
// }

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const sticks = readLine().replace(/\s+$/g, '').split(' ').map(sticksTemp => parseInt(sticksTemp, 10));

    const result = maximumPerimeterTriangle(sticks);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
