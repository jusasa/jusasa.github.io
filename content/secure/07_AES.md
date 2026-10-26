# AES (Advanced Encryption Standard)

## 1. AES 개요 (Overview)

- **AES (Advanced Encryption Algorithm)**: 대칭키 블록 암호
- **블록 크기**: 128비트 단위로 데이터를 암호화/복호화
- **키 크기**: 128, 192, 256비트 지원
- NIST는 5년마다 AES 표준을 공식적으로 재평가
  - 최초 발행: 2001년 11월 26일 / 갱신: 2023년 5월 9일

---

## 2. AES 역사 (History)

- **NIST (National Institute of Standards and Technology)**
  - 산업계 및 암호학 커뮤니티와 협력하여 AES를 개발
- **1997년 1월 2일**: NIST가 AES 개발 추진 시작을 공식 발표
- **1997년 9월 12일**: 알고리즘 공모에 대한 공식 요청
  - 비기밀(unclassified)이며 공개적으로 공개되는 암호화 알고리즘
  - 전 세계에서 로열티 없이(royalty-free) 사용 가능해야 함
  - 대칭키 암호 방식을 **블록 암호** 형태로 구현해야 함
  - (최소한) 블록 크기 128비트, 키 크기 128/192/256비트를 지원해야 함
- **1998년 8월 20일**: 제1차 AES 후보 컨퍼런스 (AES1) — **15개** 후보 알고리즘 발표
- **1999년 3월**: 제2차 AES 후보 컨퍼런스 (AES2) — **5개** 알고리즘 선정
  - MARS, RC6, Rijndael, Serpent, Twofish
- **2000년 4월**: 제3차 AES 후보 컨퍼런스 (AES3)
- **2000년 10월**: **Rijndael**이 AES 표준으로 선정
- **2001년 2월**: NIST가 AES에 대한 FIPS 초안을 공개 검토용으로 발행

---

## 3. AES 사양: 표기법 및 규칙 (Notations and Conventions)

### 3.1 주요 파라미터

| 기호 | 의미 | FIPS 197 값 |
| --- | --- | --- |
| $N_b$ | State를 구성하는 열(32비트 워드)의 개수 | $N_b = 4$ |
| $N_k$ | Cipher Key를 구성하는 32비트 워드의 개수 | $N_k = 4, 6, 8$ |
| $N_r$ | 라운드 수 ($N_k$와 $N_b$의 함수) | $N_r = 10, 12, 14$ |

- $N_b = 4$ (블록 길이 128비트를 32로 나눈 값)
- $N_k = 4 \rightarrow N_r = 10$ (AES-128), $N_k = 6 \rightarrow N_r = 12$ (AES-192), $N_k = 8 \rightarrow N_r = 14$ (AES-256)

### 3.2 연산 기호

- $\oplus$ : 배타적 논리합(XOR) 연산
- $\otimes$ : 두 다항식(각각 차수 < 4)의 곱셈을 $X^4 + 1$ 로 나눈 나머지 연산
- $\bullet$ 유한체(Finite Field) 곱셈

### 3.3 바이트 (Bytes)

- 모든 바이트 값은 개별 비트 값의 연결로 표현: $\{b_7, b_6, b_5, b_4, b_3, b_2, b_1, b_0\}$
- 바이트는 다항식 표현을 사용하여 유한체 원소로 해석됨:
  $$b_7X^7 + b_6X^6 + b_5X^5 + b_4X^4 + b_3X^3 + b_2X^2 + b_1X + b_0$$
- 예: $\{01100011\}$ 은 유한체 원소 $X^6 + X^5 + X + 1$ 을 나타냄

### 3.4 바이트 배열 (Arrays of Bytes)

- 바이트 배열: $a_0\, a_1\, a_2\, \dots\, a_{15}$
- 바이트 내 비트 순서: $\text{input}_0\, \text{input}_1\, \dots\, \text{input}_{126}\, \text{input}_{127}$

### 3.5 State

- State는 각각 $N_b$개의 바이트를 포함하는 **4개의 행(row)** 으로 구성
- State 배열 $s$의 각 바이트는 두 개의 인덱스를 가짐
  - 행 번호 $r$ : $0 \le r < 4$
  - 열 번호 $c$ : $0 \le c < N_b$ (FIPS 197에서 $N_b = 4$ 이므로 $0 \le c < 4$)
- **입력 → State 복사** (Cipher 시작 시):
  $$s[r, c] = \text{in}[r + 4c] \quad (0 \le r < 4,\ 0 \le c < N_b)$$
- **State → 출력 복사** (Cipher 종료 시):
  $$\text{out}[r + 4c] = s[r, c] \quad (0 \le r < 4,\ 0 \le c < N_b)$$

---

## 4. AES 수학적 기초 (Mathematical Preliminaries)

AES 알고리즘의 모든 바이트는 **유한체 원소**로 해석됨

### 4.1 덧셈 (Addition, FIPS 197 Sec.4.1)

- 유한체에서 두 원소의 덧셈은 두 원소 다항식의 대응하는 거듭제곱 계수를 "더함"
- 덧셈은 **XOR 연산**으로 수행됨
- 따라서 다항식의 뺄셈은 덧셈과 동일함
- 예:
  - $(X^6 + X^4 + X^2 + X + 1) + (X^7 + X + 1) = X^7 + X^6 + X^4 + X^2$ (다항식 표기)
  - $\{01010111\} \oplus \{10000011\} = \{11010100\}$ (2진 표기)
  - $\{57\} \oplus \{83\} = \{d4\}$ (16진 표기)

### 4.2 곱셈 (Multiplication, FIPS 197 Sec.4.2)

- 다항식 표현에서 $GF(2^8)$ 상의 곱셈은 **차수 8의 기약 다항식(irreducible polynomial)으로 나눈 나머지**에 해당
  - 기약 다항식: 약수가 1과 자기 자신뿐인 다항식
- AES에서 사용하는 기약 다항식:
  $$m(x) = X^8 + X^4 + X^3 + X + 1 \quad (\text{16진 표기: } \{01\}\{1b\})$$
- 예: $\{57\} \bullet \{83\} = \{c1\}$
  - $(X^6 + X^4 + X^2 + X + 1)(X^7 + X + 1) = X^{13} + X^{11} + X^9 + X^8 + X^6 + X^5 + X^4 + X^3 + 1$
  - 위 결과를 $X^8 + X^4 + X^3 + X + 1$ 로 나눈 나머지 $= X^7 + X^6 + 1$

### 4.3 $GF(2^8)$ 상의 계수를 갖는 다항식 (MixColumns 관련, FIPS 197 Sec.4.3)

- 유한체 원소를 계수로 갖는 4항 다항식 정의:
  $$a(x) = a_3X^3 + a_2X^2 + a_1X + a_0 \quad \rightarrow \quad [a_0, a_1, a_2, a_3]$$
  $$b(x) = b_3X^3 + b_2X^2 + b_1X + b_0$$
- **덧셈**: 각 워드의 대응하는 바이트 간 XOR (워드 전체 값의 XOR)
  $$a(x) + b(x) = (a_3 \oplus b_3)X^3 + (a_2 \oplus b_2)X^2 + (a_1 \oplus b_1)X + (a_0 \oplus b_0)$$
- **곱셈**:
  1. 다항식 곱 $c(x) = a(x) \bullet b(x)$ 를 대수적으로 전개
     $$c(x) = c_6X^6 + c_5X^5 + c_4X^4 + c_3X^3 + c_2X^2 + c_1X + c_0$$
     $$c_0 = a_0 \bullet b_0,\quad c_1 = a_1 \bullet b_0 \oplus a_0 \bullet b_1,\quad c_2 = a_2 \bullet b_0 \oplus a_1 \bullet b_1 \oplus a_0 \bullet b_2,\ \dots,\ c_6 = a_3 \bullet b_3$$
  2. $c(x)$ 를 차수 4의 다항식으로 나눈 나머지로 축약
     - AES에서는 $x^4 + 1$ 을 사용

---

## 5. 암호 알고리즘 명세 (Algorithm Specification)

### 5.1 Cipher (암호화) 의사코드

```
Cipher (byte in[4*Nb], byte out[4*Nb], word w[Nb*(Nr+1)])
begin
    byte state[4,Nb]
    state = in
    AddRoundKey (state, w[0, Nb-1])
    for round = 1 step 1 to Nr-1
        SubBytes(state)
        ShiftRows(state)
        MixColumn(state)
        AddRoundKey(state, w[round*Nb, (round+1)*Nb-1])
    end for
    SubBytes(state)
    ShiftRows(state)
    AddRoundKey(state, w[Nr*Nb, (Nr+1)*Nb-1])
    out = state
end
```

- 마지막 라운드에서는 **MixColumns를 수행하지 않음**

### 5.2 SubBytes()

- State의 각 바이트에 **S-box**를 적용하는 변환
- S-box: 바이트 $xy$ (16진수)에 대한 치환 값 테이블

### 5.3 ShiftRows()

- State의 각 행을 왼쪽으로 순환 이동(cyclic shift)하는 변환

### 5.4 MixColumns()

- State의 각 열을 $GF(2^8)$ 상의 다항식으로 취급하여 고정 다항식과 곱하는 변환

### 5.5 AddRoundKey()

- State와 라운드 키(확장된 키)를 XOR하는 변환

### 5.6 Key Expansion (키 확장)

- Cipher Key로부터 각 라운드에 사용할 라운드 키를 생성하는 과정

### 5.7 Cipher 예제

- 블록 길이와 Cipher Key 길이가 각각 16바이트인 경우 ($N_b = 4$, $N_k = 4$)의 State 배열 진행 과정을 도시

---

## 6. 기타 내용 (Other Contents)

- **Inverse Cipher** (역암호 / 복호화)
- **Implementation Issues** (구현 관련 사항)

### 참고 그림

- Figure 7.1 : AES 암호화 암호의 일반 설계
- Figure 7.2 : AES 암호의 구조도
- Figure 7.3 : AES에서 스테이트와 블록의 변환
- Figure 7.4 : 평문을 스테이트로 변환
- Figure 7.5 : 암호화 과정의 라운드 함수 구조
- Figure 7.6 / 7.7 : SubBytes 변환 (예제 포함)
- Figure 7.9 / 7.10 : ShiftRows 변환 (예제 포함)

---

## 7. AES의 분석 (Analysis of AES, 7.6절)

평가 기준: **보안성(Security)**, **구현(Implementation)**, **단순성과 비용(Simplicity and Cost)**

### 7.1 보안성 (Security)

- AES는 DES가 설계된 이후에 설계되었으므로, DES에 대한 알려진 대부분의 공격들이 이미 AES에 적용됨
- **전수조사 공격(Brute-Force Attack)**
  - AES는 DES보다 큰 사이즈의 키를 사용하므로 DES보다 더 안전함
- **통계적 공격(Statistical Attacks)**
  - 수많은 테스트들이 암호문의 통계적 분석에 실패함
- **차분 공격 및 선형 공격(Differential and Linear Attacks)**
  - 아직까지 AES에 대한 차분 공격과 선형 공격이 알려지지 않음

### 7.2 구현 (Implementation)

- AES는 **소프트웨어, 하드웨어, 펌웨어**로 구현 가능
- Table lookup 또는 잘 정의된 대수적 구조를 사용하는 루틴으로 구현될 수 있음

### 7.3 단순성과 비용 (Simplicity and Cost)

- AES에 사용하는 알고리즘은 매우 단순하므로 **저렴한 프로세서와 최소량의 메모리**를 이용하여 쉽게 구현 가능

---

## 참고문헌

- Announcing the Advanced Encryption Standard (AES), FIPS 197, November 26, 2001. http://csrc.nist.gov/encryption/aes
