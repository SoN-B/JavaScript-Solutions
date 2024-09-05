import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @introduce
 *
 * 겹치지 않는 길이 2의 구간 중 합이 같은 구간의 최대 개수를 찾는 것
 *
 * 접근방식: 주어진 배열의 각 인덱스 쌍을 검사하여, 구간의 합이 같은 경우
 * 겹치지 않는 구간으로 간주하고, 해당 구간의 최대 개수를 찾으면 됨
 */
class Solution {
    public int solution(int[] A) {
        // 각 구간합과 시작 인덱스를 저장할 맵 생성
        Map<Integer, List<Integer>> sumToIndices = new HashMap<>();

        // 각 구간의 합과 시작 인덱스를 맵에 저장
        for (int i = 0; i < A.length - 1; i++) {
            int sum = A[i] + A[i + 1];
            if (!sumToIndices.containsKey(sum)) {
                sumToIndices.put(sum, new ArrayList<>());
            }
            sumToIndices.get(sum).add(i);
        }

        int maxSegments = 0;

        // 각 구간합에 대해 최대 겹치지 않는 구간 수 계산
        for (List<Integer> indices : sumToIndices.values()) {
            int count = 0;
            int lastIndex = -2; // 초기값을 -2로 설정하여 첫 구간 선택을 유효하게 만듦
            for (int index : indices) {
                if (index > lastIndex + 1) { // 구간이 겹치지 않으면
                    count++;
                    lastIndex = index;
                }
            }
            maxSegments = Math.max(maxSegments, count);
        }

        return maxSegments;
    }
}