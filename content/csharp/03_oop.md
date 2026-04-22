### 🧩 객체지향 설계 및 인터페이스

클래스를 통한 데이터 캡슐화부터, 인터페이스를 활용한 다형성 구현까지 객체지향의 핵심을 다룹니다.

### 속성 (Property) & 인덱서

#### 왜 속성을 사용하는가?

- 데이터 보호 (캡슐화) 및 제어

- 잘못된 값 입력 방지 (예: 나이가 음수)

- 읽기 전용(get), 쓰기 전용 구현 가능
```cs
private int age;
public int Age 
{
  get { return age; }
  set { 
    if(value < 0) return; 
    age = value; 
  }
}
```

### 인터페이스 (Interface)

#### 인터페이스의 특징

- 클래스가 반드시 구현해야 하는 기능의 규약

- 구현부 없음 (선언만 존재), 객체 생성 불가(new 불가)

- 다중 상속 가능

- 다형성 구현의 핵심 (예: 무기 교체 시스템)
```cs
interface IWeapon { 
  void Attack(); 
}

class Sword : IWeapon {
  public void Attack() {
    Console.WriteLine("칼로 공격!");
  }
}
```