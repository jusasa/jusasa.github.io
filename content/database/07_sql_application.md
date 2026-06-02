## CHAPTER 07. SQL 응용

프로그래밍적 요소와 데이터의 무결성·안전성을 보장하는 고급 기능을 다룹니다.

### 1. 내장 함수 및 객체

함수 vs 프로시저
|구분|함수 | 프로시저|
|---|---|---|
|반환값| O | X|

- 내장 함수: 숫자, 문자, **날짜** 처리를 위한 함수들이 이미 준비되어 있습니다.

- 저장 프로시저: 복잡한 SQL 로직을 하나로 묶어 DB에 저장해 두고 필요할 때 호출해 사용합니다. `CALL`로 호출하여 사용함.

```sql
CREATE PROCEDURE 프로시저이름(입력파라미터, 출력파라미터)
BEGIN
    -- SQL 로직
END
```

`PROCEDURE` 대신 `FUNCTION`을 사용하면 반환값을 가질 수 있음.
```sql
CREATE FUNCTION 함수이름(입력파라미터)
RETURNS 반환자료형
BEGIN
    -- SQL 로직
    RETURN 결과값;
END
```
- 트리거: 데이터 **변경 이벤트**가 발생할 때 *자동*으로 실행되어 **무결성을 유지합니다.**

- 사용자 정의 함수: 사용자가 직접 로직을 짜서 결과값을 반환하도록 만듭니다.

|구분|저장 프로시저|트리거|사용자 정의 함수|
|---|---|---|---|
|공통점| DB 객체|DBMS 안에 저장| 절차적 언어로 작성 |
|차이점| `CALL`문으로 직접 호출<br>SQL문을 포함<br>리턴 제공(선택) | 이벤트 발생 시 자동 실행<br>SQL문을 포함<br>리턴 제공(X) | SELECT문으로 호출<br>SQL문에 포함<br>리턴 제공(O) |

### 2. 트랜잭션 (Transaction)

간단히 말해서 하나의 **일** 혹은 **작업**

- 한 묶음으로 처리되어야 하는 논리적인 작업 단위입니다.

- ACID 특성: 원자성(Atomicity), 일관성(Consistency), 고립성(Isolation), 지속성(Durability)을 유지해야 합니다.

# **`진짜 중요!!!!` $\downarrow$**
| 특성 | 내용 |
|---|---|
|원자성 (Atomicity) | **All or Nothing**<br>실행된 작업은 **전부 반영**되거나<br>**전부 취소**되어야 합니다. |
|일관성 (Consistency) | **데이터의 무결성**이 항상 유지되어야 합니다. |
|고립성 (Isolation) | **독립적인 실행**<br>트랜잭션이 실행되는 동안에는<br>다른 트랜잭션이 접근할 수 없습니다. |
|지속성 (Durability) | **영구적인 저장**<br>커밋된 데이터는 시스템이 **오류가 나도**<br>**사라지지 않습니다.** |

- 장애 회복: 체크 포인트와 로그(Undo/Redo)를 활용하여 시스템 장애 시 데이터를 복구합니다.

* AD는 recovery(회복) $\rightarrow \text{Log}$ 기법

    * 즉시갱신방법

    * 지연갱신방법

* CI는 concurrency control(동시성제어) $\rightarrow \text{Locking}$ 기법

    * db에 걸기 $\rightarrow$ 가용성 $\downarrow$ 성능 $\uparrow$
    * table에 걸기 $\rightarrow$ 가용성 $\uparrow$ 성능 $\downarrow$
    * row, collonm 에 걸기 $\rightarrow$ 가용성 $\uparrow\uparrow$ 성능 $\downarrow\downarrow$

### 2Phase Locking(2PL)

일단 기다리더라도 차례차례 권한 얻기(1단계)
종료 되면 차례차례 해제하기(2단계)

lock의 종류를 나누기

- shared lock: 공유락 $\rightarrow$ only read no modify
    - select
- exclusive lock: 독점락 $\rightarrow$ read, write, modify
    - insert, update, delete

|기존 락| 공유락| 독점락 |
|:---:|:---:|:---:|
|공유락| O| X|
|독점락| X| X|

#### **제일 큰 문제**

**DEAD LOCK**

A가 X걸고 B가 Y걸고
A가 Y달라고 하고
B가 X달라고 하면
서로 영원히 기다림 -> 서버 죽음

 해결 방안 - 해결 못한다는 증명이 됨.
 강제 해결 외에 방법이 없음. OS에서도 마찬가지

 빨리 끝나는걸 죽임 -> 다른 애가 얻음

