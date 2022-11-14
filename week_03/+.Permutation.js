// 순열 알고리즘

const getPermutations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

    arr.forEach((fixed, index, origin) => {
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)]; // 해당하는 fixed를 제외한 나머지 배열
        const permutations = getPermutations(rest, selectNumber - 1); // 나머지에 대해 순열을 구한다.
        const attached = permutations.map((permutation) => [fixed, ...permutation]); // 돌아온 순열에 대해 떼 놓은(fixed) 값 붙이기
        results.push(...attached); // 배열 spread syntax 로 모두다 push
    });

    return results; // 결과 담긴 results return
};

/**
 *  구두설명
 *  if) [1,2,3,4], 3
 *
 *  반복 1)
 *  1을 선택(고정)하고 -> 나머지 [2,3,4] 중에서 2개씩 조합을 구한다. 그리고 그 각각을 고정했던 1에 이어붙인다.
 *      2을 선택(고정)하고 -> 나머지 [3,4] 중에서 1개씩 조합을 구한다. 그리고 그 각각을 고정했던 2에 이어붙인다.
 *          [[2,3], [2,4]]
 *      3을 선택(고정)하고 -> 나머지 [2,4] 중에서 1개씩 조합을 구한다. 그리고 그 각각을 고정했던 3에 이어붙인다.
 *          [[3,2], [3,4]]
 *      4을 선택(고정)하고 -> 나머지 [2,3] 중에서 1개씩 조합을 구한다. 그리고 그 각각을 고정했던 4에 이어붙인다.
 *          [[4,2], [4,3]]
 *      [[1,2,3], [1,2,4], [1,3,2], [1,3,4], [1,4,2], [1,4,3]] 저장
 *
 *  반복 2)
 *  2을 선택(고정)하고 -> 나머지 [1,3,4] 중에서 2개씩 조합을 구한다. 그리고 그 각각을 고정했던 2에 이어붙인다.
 *      1을 선택(고정)하고 -> 나머지 [3,4] 중에서 1개씩 조합을 구한다. 그리고 그 각각을 고정했던 1에 이어붙인다.
 *          [[1,3], [1,4]]
 *      3을 선택(고정)하고 -> 나머지 [1,4] 중에서 1개씩 조합을 구한다. 그리고 그 각각을 고정했던 3에 이어붙인다.
 *          [[3,1], [3,4]]
 *      4을 선택(고정)하고 -> 나머지 [1,3] 중에서 1개씩 조합을 구한다. 그리고 그 각각을 고정했던 4에 이어붙인다.
 *          [[4,1], [4,3]]
 *      [[2,1,3], [2,1,4], [2,3,1], [2,3,4], [2,4,1], [2,4,3]] 저장
 *
 *  ...
 *
 * 결과) [[1,2,3], [1,2,4], [1,3,2], [1,3,4], [1,4,2], [1,4,3], ... [4,3,2]]
 */

// 조합과 다른 점은 배열의 처음부터 선택(고정)하면서 나머지 배열을 구할 때 고정된 값 뒤에 있는 값들에 대해서 순열을 구하는게 아니라,
// 고정된 값을 제외한 모든 원소에 대해서 순열을 구해야 한다는 것이다.
