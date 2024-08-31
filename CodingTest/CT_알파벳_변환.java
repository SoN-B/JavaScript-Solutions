package CodingTest;

class CT_알파벳_변환 {
  public static String LetterChanges(String str) {
    StringBuilder result = new StringBuilder();

    for(int i = 0; i < str.length(); i++) {
      char c = str.charAt(i);

      if(c >= 'a' && c <= 'z') {
        c = (char)((c - 'a' + 1) % 26 + 'a');
      } else if(c >= 'A' && c <= 'Z') {
        c = (char)((c - 'A' + 1) % 26 + 'A');
      }

      if ("aeiou".indexOf(c) != -1) {
        c = Character.toUpperCase(c);
      }

      result.append(c);
    }

    return result.toString();
  }

  public static void main (String[] args) {
    String s = "abcdefg";
    System.out.println(LetterChanges(s));
  }
}

/**
 * 문제 내용 정리:
 * 1. 함수 `LetterChanges(String str)`는 입력받은 문자열 `str`을 인자로 받아 특수한 방식으로 수정된 문자열을 반환합니다.
 * 2. 수정 규칙:
 *    - 문자열의 각 문자를 알파벳 다음 글자로 변경 (예: e는 f, z는 a).
 *    - 변경된 문자열에서 모음(a, e, i, o, u)은 대문자로 변환.
 * 3. 과정:
 *    - 문자열을 순회하며 각 문자에 대해 규칙을 적용.
 *    - 알파벳이 아닌 문자는 그대로 둠.
 *    - 결과 문자열을 반환.
 * 4. 예시:
 *    - 입력: "hello?"
 *    - 출력: "Ifmmp?"
 *
 * 문제의 예시와 예측된 출력 결과는 아래와 같습니다:
 * - 입력: "hello?"
 * - 출력: "Ifmmp?"
 * - 입력: "fun times!"
 * - 출력: "gVm Ujnft!"
 */