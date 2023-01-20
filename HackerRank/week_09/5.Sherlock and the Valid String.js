/**
 * Sherlock은 문자열의 모든 문자가 동일한 횟수로 나타나는 경우 문자열을 유효한 것으로 간주합니다.
 * 어느 한 인덱스의 한 문자를 제거해서 Sherlock이 돼도 YES EX) aabbc -> aabb
 * 한 문자만 존재해도 YES EX) aaaaa, a
 * 
 * 다른경우는 NO
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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s) {
    let count = Array(26).fill(0);
    for(let i = 0; i < s.length; i++) count[s[i].charCodeAt() - 97]++; // a ~ z까지 빈도수 체크
    
    let nums = [...new Set(count)]; // 중복 빈도수 제거
    if(nums.length > 3) return 'NO'; // 빈도수의 종류가 3가지가 넘어가면 절대 Sherlock를 만들 수 없음

    nums.sort((a,b) => a - b); // 0을 제거하기 위함
    if(nums[0] === 0) nums.shift(); // [0,3,4] -> [3,4]
    if(nums.length === 1) return 'YES'; // [3] -> 빈도수의 종류가 1가지라는 뜻
    
    // 빈도수의 종류가 각각 몇번씩 반복되는지
    let counts = [], cnt = 0;
    for(let i = 0; i < nums.length; i++) {
        for(let j = 0; j < count.length; j++) if(nums[i] === count[j]) cnt++;
        counts.push(cnt);
        cnt = 0;
    }
    
    /**
     * nums = [3,4]
     * counts = [2,3]
     * 이경우 어떠한 알파벳들이 3,3,4,4,4개씩 존재 한다라는 뜻으로 한개만 지워서 Sherlock못만듭니다.
     * 
     * nums = [3,4]
     * counts = [1,3]
     * 이경우 어떠한 알파벳들이 3,4,4,4개씩 존재하나 하나를 추가할 수 있는게 아니라 하나를 제거해서 모두 같은 빈도수를
     * 만들어야 하기때문에 Sherlock 못 만듭니다.
     * 
     * [if(nums[0] === nums[1]) return 'YES']
     * nums = [3,4]
     * counts = [3,1]
     * 이경우 어떠한 알파벳들이 3,3,3,4개씩 존재하니 4개존재하는것을 3개로 줄이면 가능
     * 
     * [else if (nums[0] === 0 || nums[1] === 0) return 'YES']
     * nums = [1,4]
     * counts = [1,2]
     * 이경우 어떠한 알파벳들이 1,4,4개씩 존재하니 1개만 존재하는것을 없애버리면 가능
     */
    let index = counts.indexOf(1)
    if(index >= 0) {
        nums[index]--;
        if(nums[0] === nums[1]) return 'YES';
        else if (nums[0] === 0 || nums[1] === 0) return 'YES'
        else return 'NO';
    } else return 'NO';
}

// 정렬후, splice를 이용하면 간단하지 않을까?
// function isValid(s) {
//     let fr = [], ar = s.split('').sort();
//     while(ar.length > 0) {
//         fr.push(ar.splice(0, ar.lastIndexOf(ar[0]) + 1).length);
//     };
//     const dif = fr.filter(n=> n!=fr[0]);
//     return dif.length < 2 && Math.abs(dif-fr[0]) < 2 || dif < 2?'YES':'NO';
// };

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
