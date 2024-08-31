package CodingTest;

import java.util.*;

class CT_소수_별점_변환 {
  public static String StarRating(String str) {
    double rating = Double.parseDouble(str);

    int fullStars = (int) rating;
    double point = rating - fullStars;
    int halfStars;

    if (point >= 0.7) {
      fullStars++;
      halfStars = 0;
    } else if (point >= 0.3) {
      halfStars = 1;
    } else {
      halfStars = 0;
    }

    int emptyStars = 5 - fullStars - halfStars;

    List<String> stars = new ArrayList<>();

    for (int i = 0; i < fullStars; i++) stars.add("full");
    if(halfStars == 1) stars.add("half");
    for (int i = 0; i < emptyStars; i++) stars.add("empty");

    return String.join(" ", stars);
  }

  public static void main (String[] args) {
    String s = "3.83";
    System.out.println(StarRating(s));
  }
}

/**
 * 문제 내용 정리:
 * 1. 함수 `StarRating(String str)`는 입력받은 문자열 `str`을 인자로 받아 평점을 나타내는 문자열을 반환합니다.
 * 2. 평점은 0에서 5.0까지의 소수 값으로 주어지며, 이를 세부적으로 반올림하여 'full', 'half', 'empty' 문자열로 변환하여 반환해야 합니다.
 * 3. 각 평점의 반올림:
 *    - 0.3 이하는 'half'별을 포함하지 않음.
 *    - 0.3 이상 ~ 0.7 미만은 'half'별을 포함함.
 *    - 0.7 이상은 다음 'full'별로 반올림.
 * 4. 최종 결과 형식은 최대 5개의 별(`full`, `half`, `empty`)을 포함하는 문자열입니다.
 * 5. 예시:
 *    - 입력: "3.0"
 *    - 출력: "full full full empty empty"
 *    - 입력: "4.5"
 *    - 출력: "full full full full half"
 */