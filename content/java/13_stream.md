### 🌊 13장. 람다와 스트림

모던 자바의 꽃입니다. 익명 함수인 람다식과 컬렉션을 조작하는 스트림 API를 통해 복잡한 반복문을 간결한 파이프라인으로 처리합니다.

### 📌 핵심 특징

- 내부/익명 클래스: 특정 클래스 안에서만 사용하거나, 1회용 객체를 즉석 생성

- 람다식 `->`: 메서드 이름 없이 매개변수와 구현부만으로 함수 표현

- 스트림 (Stream): `filter`, `map`, `collect`를 이용한 선언형 데이터 파이프라인

- Optional: null 반환 가능성을 대비한 안전한 래퍼 객체 (NPE 방어)

#### 💼 실무 활용 예시

- 스트림: 수만 건의 결제 데이터 중 '카드 결제'만 필터링하여 총 매출액 통계 산출

- 스트림: 사용자 리스트(`List<User>`)에서 '이름'만 추출하여 `List<String>`으로 변환 (`map`)

- Optional: DB에서 회원을 조회할 때 없는 경우 `orElseThrow`로 안전하게 예외 발생

#### 💻 코드 예시 (StreamTest.java)
```java
import java.util.*;
import java.util.stream.Collectors;

public class StreamTest {
    public static void main(String[] args) {
        List<String> logs = Arrays.asList("ERROR: Timeout", "INFO: Login", "ERROR: DB Down");
        
        List<String> errorLogs = logs.stream()
            .filter(log -> log.startsWith("ERROR"))
            .map(log -> log.replace("ERROR: ", ""))
            .collect(Collectors.toList());

        System.out.println("추출된 에러 원인: " + errorLogs);
        // 출력 결과: [Timeout, DB Down]
    }
}
```