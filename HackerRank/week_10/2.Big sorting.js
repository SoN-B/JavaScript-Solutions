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
 * Complete the 'bigSorting' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY unsorted as parameter.
 */

function bigSorting(unsorted) {
    let nums = [];
    for(let i = 0; i < unsorted.length; i++) nums.push(BigInt(unsorted[i]));
    
    function quickSort(array, start, end) {
        if (start >= end) return;

        let key = start;

        let i = start + 1;
        let j = end;

        let temp;

        while (i <= j) {
            while (array[i] <= array[key] && i <= end) i++;
            while (array[j] >= array[key] && j > start) j--;

            if (i > j) {
                temp = array[j];
                array[j] = array[key];
                array[key] = temp;
            } else {
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        quickSort(array, start, j - 1);
        quickSort(array, j + 1, end);
    }

    quickSort(nums, 0, nums.length - 1);
    nums.map((data) => Number(data));
    return nums;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let unsorted = [];

    for (let i = 0; i < n; i++) {
        const unsortedItem = readLine();
        unsorted.push(unsortedItem);
    }

    const result = bigSorting(unsorted);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
