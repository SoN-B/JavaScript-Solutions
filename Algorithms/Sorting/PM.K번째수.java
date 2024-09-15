import java.util.Arrays;

public class Solution {
    public int[] solution(int[] array, int[][] commands) {
        int[] result = new int[commands.length];

        for (int i = 0; i < commands.length; i++) {
            int start = commands[i][0] - 1; // 시작 인덱스
            int end = commands[i][1]; // 끝 인덱스 (포함)
            int k = commands[i][2] - 1; // k번째 숫자

            // 부분 배열 추출 및 정렬
            int[] subArray = Arrays.copyOfRange(array, start, end);
            Arrays.sort(subArray);

            // k번째 숫자를 결과 배열에 저장
            result[i] = subArray[k];
        }

        return result;
    }
}