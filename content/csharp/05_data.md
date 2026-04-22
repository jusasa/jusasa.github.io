### 💾 예외 처리 및 데이터 직렬화(I/O)

프로그램의 안정성을 보장하는 예외 처리(Exception Handling) 메커니즘과, 메모리의 객체 데이터를 파일이나 네트워크용 텍스트 포맷으로 변환하는 직렬화(Serialization) 개념을 다룹니다.

### 예외 처리 (Try-Catch-Finally)
```cs
try {
  // 정상 코드 실행 중...
  int result = 10 / 0; // 강제 예외 발생!
} catch (Exception ex) {
  // 오류 처리
  Console.WriteLine("0으로 나눌 수 없음");
} finally {
  // 무조건 실행 (자원 해제)
}
```

### 직렬화 (Serialization)

객체를 저장하거나 네트워크로 전송 가능한 포맷으로 변환합니다.

### C# Object:
```cs
Person p = new Person();
p.Name = "홍길동";
p.Age = 30;
```

### JSON Text 변환 결과:
```json
{
  "Name": "홍길동",
  "Age": 30
}
```