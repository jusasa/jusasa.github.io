# 현대 대칭키 암호를 이용한 암호화 기법 (Encipherment Using Modern Symmetric-Key Ciphers)

## 목차

- 8.1 현대 블록 암호의 사용 (블록 암호 운영 모드)
- 8.2 스트림 암호
- 8.3 그 밖의 이슈
  - 8.3.1 키 관리 (Key Management) — Chapter 15에서 다룸
  - 8.3.2 키 생성 (Key Generation) — Appendix K에서 다룸

---

## 8.1 블록 암호 운영 모드 (Modes of Operation)

### 8.1.1 기본 개념

- 임의 길이의 자료를 블록 암호로 암호화하려면, 우선 자료를 **블록 크기만큼 나눈다**
- 나눈 블록을 $m_1, m_2, \dots, m_n$ 이라 하자
- 주어진 자료가 블록 크기의 정수배가 아닐 경우, 마지막 블록 $m_n$ 의 비어 있는 뒷부분을 처리
  - **0으로 채운다 (padding)**
  - 또는 **암호문 훔침 기법 (Ciphertext Stealing)** 사용

### 8.1.2 ECB (Electronic Code Book) 모드

- 각 블록은 다른 블록들과 **무관하게 독립적으로** 암호화가 수행됨
- 평문 블록 두 개가 동일한 경우 대응하는 암호문도 같아짐
  - 공격자가 암호문만을 보고도 **평문의 특성을 추측**할 수 있음
- (Figure 8.2 참고)

### 8.1.3 CBC (Cipher Block Chaining) 모드

- $i$ 번째 평문 블록 $m_i$ 에 대하여 **이전 암호문 블록 $c_{i-1}$ 과 XOR** 를 수행하고, 이 결과에 암호화를 수행하여 $i$ 번째 암호문 블록 $c_i$ 생성
  $$c_i = E_k(m_i \oplus c_{i-1})$$
- 첫 번째 평문 블록을 위한 $c_0$ 는 **IV (Initial Vector)** 를 사용
- 결과적으로 CBC 모드에서는 각각의 암호문 블록이 이전 블록들의 영향을 받게 되므로, **평문이 동일하더라도 대응 암호문들은 서로 다르게 된다**

### 8.1.4 CFB (Cipher FeedBack) 모드

- 각 블록은 **이전 암호문 블록을 암호화한 결과와 XOR** 를 수행하여 해당 암호문을 생성
- 암호 알고리즘의 블록 크기 $n$, 평문이나 암호문 블록 크기 $r$ ($r \le n$)
- (Figure 8.4 참고)

### 8.1.5 OFB (Output FeedBack) 모드

- (Figure 8.6 참고)

### 8.1.6 CTR (Counter) 모드

- OFB와 유사
- 키 스트림의 의사난수성을 **Counter** 로부터 얻음
- (Figure 8.8 참고)

### 8.1.7 스트림 암호에 사용되는 CFB, OFB, CTR 모드

- CFB, OFB, CTR 모드는 블록 암호를 **스트림 암호처럼** 사용할 수 있게 함
- (Figure 8.9 참고)

### 8.1.8 5가지 연산 모드 비교

- ECB, CBC, CFB, OFB, CTR 모드의 특성 비교

### 8.1.9 암호문 훔침 기법 (Ciphertext Stealing, CBC/ECB)

- **암호문 훔침 (Ciphertext Stealing, CTS)** 이라 불리는 이 기술을 이용하면 **덧붙이기(padding) 없이** 연산 모드를 사용할 수 있다
- CTS에서 마지막 두 개의 평문 블록 $P_{N-1}$ 과 $P_N$ 은 다르게 암호화된다
  - 단, $P_{N-1}$ 은 $n$ 비트 블록이고 $P_N$ 은 $m$ ($m \le n$) 비트 블록이라고 가정

---

## 8.2 스트림 암호 (Stream Cipher)

### 8.2.1 RC4

- **현재 취약**한 암호
- 동작 순서: **초기화 → 상태 섞기 → 키 스트림 생성 → XOR 암호화**

### 8.2.2 A5/1

- **현재 취약**한 암호
- **GSM (Global System for Mobile Communication)** 에서 사용
- (Figure 8.11 참고)

#### 키 생성기 (Key Generator)

- A5/1은 **19, 22, 23개의 셀**을 갖는 **세 개의 LFSR** 을 사용
- (Figure 8.12 참고)

| LFSR | 길이 | 다항식 |
| --- | --- | --- |
| LFSR 1 | 19비트 | $x^{19} + x^5 + x^2 + x + 1$ |
| LFSR 2 | 22비트 | $x^{22} + x + 1$ |
| LFSR 3 | 23비트 | $x^{23} + x^{15} + x^2 + x + 1$ |

- **총 내부 상태**: $19 + 22 + 23 = 64$ 비트
- **동작 방식**: 3개의 LFSR + Majority(다수결) 기반 비동기 클럭
  - 3개의 빨간 비트 → majority 계산
  - majority와 같은 값을 가진 LFSR만 shift

---

## 8.3 그 밖의 이슈 (Other Issues)

### 8.3.1 키 관리 (Key Management)

- Chapter 15에서 다룸

### 8.3.2 키 생성 (Key Generation)

- Appendix K에서 다룸 (난수 생성기, Random number generators)

---

## 참고자료

- NIST SP 800-38A: https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-38a.pdf
- Ciphertext Stealing: https://en.wikipedia.org/wiki/Ciphertext_stealing
