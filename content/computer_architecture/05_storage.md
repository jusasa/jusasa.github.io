# 기억장치

# 기억장치의 분류와 특성

- 기억장치 엑세스 : cpu가 읽기쓰기 하는거
    - 유형
        - 순차적 : 저장된 순서대로 ex) `자기테이프` <br>정보단위 `record`
        - 직접 : 엑세스 위치 근처로 가서 순차검색 ex) `CD-ROM`, `DVD`, `하드디스크(HDD)` <br> 정보단위 `record` or `block`
        - 렌덤 : 주소를 가지고 찾음, 시간이 항상 같음<br>ex) `반도체 메모리`
        - 연관 : 내용으로 찾음
    - 설계시 주의점
        - 용량
        - 속도
    - 전송단위
        - cpu가 한번에 읽고 쓰는 단위 `word`
    - 엑세스 시간 : 읽기쓰기 시작해서 완료까지 걸리는 시간
    - 데이터 전송률 : $\frac{1}{엑세스\ 시간} \times word \times bus\ width$ (단위 : word/sec)<br>ex) $50ns \times 4byte \times 8bit = 50ns \times 4byte \times 8bit = 400MB/s$
    - 제조 재료에 따른 유형
        - `반도체 소자` : `RAM` `ROM` `Flash`
        - `자기 매체` : `HDD` `자기 테이프`
        - 휘발성 : `RAM`
        - 비휘발성 : `ROM` `Flash` `HDD` `자기 테이프`
        - 삭제 불가능 : `ROM` `Flash`

---

## 계층적 기억장치 시스템
- 가성비 향상 \^0\^
    - 계층이 깊어질수록 전송단위, 엑세스 시간, 전송률, 가격이 나빠짐

| 계층 | 종류 | 엑세스 시간 | 전송 단위 | 가격 (cost/bit) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 레지스터, 캐시 |ns, sub ns | word | 최고 |
| 2 | 반도체 기억장치 | ns | block | 좋음 |
| 3 | 자기기억장치 | $\mu s$ | block | 보통 |
| 4 | 자기 테이프 | ms | record | 저렴 |

### 지역성의 원리

 정보가 특정 위치에 쏠림
 
 - 원인 : 반복루프, 빈번한 서브루틴

```mermaid
graph LR
    subgraph 레지스터
    end
    subgraph 캐시
    end
    subgraph 주
    end
    subgraph 보조 기억장치
    end
```
-  캐시메모리
(다음시간)

### 내부기억장치
- cpu가 직접 엑세스 가능
- `RAM` `ROM`
### 외부기억장치
- cpu가 직접 엑세스 불가능
- `HDD` `SSD` `자기테이프`

---

## RAM (Random Access Memory)
> RWM(Read Write Memory)가 더 적절한 명칭
- 읽고 쓰기 가능
- DRAM `Dynamic Random Access Memory` : 캐패시터로 비트를 저장, 주기적 리프레시 필요, 고집적화 가능, 느림, 저가
- SRAM `Static Random Access Memory` : 플립플롭으로 비트를 저장, 리프레시 필요 없음, 저밀도, 고속, 고가

## ROM (Read Only Memory)
영구 저장
쓰기 불가

빈번 사용되는 서브루틴 저장
시스템 초기화 및 진단
제어 유닛의 마이크로 프로그램
저장함.

- "mask ROM"
    - 공장에서 만들때 설계도 대로 마스크를 만들어서 제작
    - 비싸서 대량 생산용
    - 수정 불가능
- " PROM (Programmable ROM)"
    - 공장에서 만든후에 퓨즈를 끊어서 저장
    - 수정 불가능
- "EPROM (Erasable Programmable ROM)"
    - 자외선으로 삭제후 재기록 가능
    - 뚜껑 열어야함
- "EEPROM (Electrically Erasable Programmable ROM)"
    - 전기적으로 삭제후 재기록 가능
    - 수정 용이
    - 수정 횟수 제한
- "Flash Memory"
    - EEPROM의 발전형
    - 고속, 대용량, 고집적화
    - 반도체 기술의 발달로 저렴해짐
    - SSD, USB 등에서 사용
    후에 추가 설명

---

## 기억장치 모듈 설계

I/O 비트가 모듈보다 클경우 -> 병렬로 연결

### 순서

용량결정 -> 사용 칩 결정, 주소도(주소표) -> 회로설계