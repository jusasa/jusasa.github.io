### ☕ 11장. 기본 클래스

자바 프로그래밍의 뼈대가 되는 클래스들입니다. 모든 클래스의 조상인 Object, 문자열 String, 기본형을 객체로 감싸는 Wrapper 클래스 등이 포함됩니다.

#### 📌 핵심 특징

- Object: equals()(동등성 비교), toString()(객체 문자열 반환) 제공

- String: 불변성(Immutability). 변경이 잦으면 StringBuilder 사용

- Wrapper: 기본형(int, double)을 객체형(Integer, Double)으로 감싸 오토박싱 지원

- Class: 런타임에 클래스 정보를 동적으로 로딩(Reflection)

#### 💼 실무 활용 예시

- 데이터베이스에서 조회한 DTO 객체 간의 논리적 동일성 검사 (equals 재정의)

- 로그 파일에 객체의 현재 상태를 텍스트로 남길 때 (toString 재정의)

- 웹 API로 들어온 문자열 파라미터를 숫자로 파싱 Integer.parseInt()

#### 💻 코드 예시 (LangTest.java)
```java
public class LangTest {
    public static void main(String[] args) {
        // String은 불변(Immutable)입니다.
        String str = "Hello";
        str.concat(" World"); 
        System.out.println("String 결과: " + str); // 원본은 변하지 않음
        
        // StringBuilder는 가변적입니다.
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");
        System.out.println("StringBuilder 결과: " + sb.toString());
    }
}
```