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
 * Complete the 'bfs' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. 2D_INTEGER_ARRAY edges
 *  4. INTEGER s
 */

function bfs(n, m, edges, s) {
    const graph = Array.from(new Array(n + 1), () => []);

    edges.forEach(([u, v]) => {
        graph[u].push(v);
        graph[v].push(u);
    });
    
    const visited = new Array(n + 1).fill(0);
    const queue = [[s, Infinity]];
    
    visited[s] = Infinity;
    
    while(queue.length) {
        const [current, distance] = queue.shift();
        
        for (const next of graph[current]) {
            if (!visited[next]) {
                const _distance = distance === Infinity ? 1 : distance + 1;
                visited[next] = _distance;
                queue.push([next, _distance]);
            }
        }
    }
    
    return visited.reduce((ret, distance, i) => {
        if (i != 0 && i != s) {
            ret.push(distance ? distance * 6 : -1);
        }
        return ret;
    }, []);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        let edges = Array(m);

        for (let i = 0; i < m; i++) {
            edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const s = parseInt(readLine().trim(), 10);

        const result = bfs(n, m, edges, s);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
