# 고전 대칭키 암호 (Classical Symmetric-Key Ciphers)

## 1. 대칭키 암호 개요 (Symmetric-Key Ciphers Overview)

### 1.1 기본 개념
- **평문(Plaintext, $P$)**: 원래의 원본 메시지
- **암호문(Ciphertext, $C$)**: 안전하지 않은 채널(Insecure channel)을 통해 전송되는 암호화된 메시지
- **암호 알고리즘(Encryption Algorithm, $E$)**: 평문을 암호문으로 변환하는 알고리즘
- **복호 알고리즘(Decryption Algorithm, $D$)**: 암호문으로부터 평문을 복원하는 알고리즘
- **암호(Cipher)**: 암호화 및 복호화 알고리즘의 총칭
- **비밀키(Secret Key, $K$)**: 암호 알고리즘이 동작하는 데 필요한 매개변수 값(숫자)들의 집합

### 1.2 대칭키 암호의 수학적 표현 및 특징
- **비밀키 공유**: 송신자(Alice)와 수신자(Bob)가 **동일한 비밀키($K$)**를 안전한 채널(Secure key-exchange channel)을 통해 공유
- **수식 관계**:
  $$C = E_K(P)$$
  $$P = D_K(C) = D_K(E_K(P))$$
  $$D_K(E_K(x)) = E_K(D_K(x)) = x$$
- **비유**: 동일한 열쇠(비밀키)를 사용하여 자물쇠를 채우고(암호화) 여는(복호화) 구조

---

## 2. 대치 암호 (Substitution Ciphers, 치환 암호)

### 2.1 개념 및 분류
- **개념**: 하나의 기호를 다른 기호로 대체하는 암호화 방식 (예: A → D, 3 → 7)
- **분류**:
  1. **단일문자 암호(Monoalphabetic Ciphers)**: 평문의 기호와 암호문의 기호가 항상 **일대일(1:1) 대응 관계**를 가짐
  2. **다중문자 암호(Polyalphabetic Ciphers)**: 평문의 기호와 암호문의 기호가 **일대다(1:N) 대응 관계**를 가짐

---

### 2.2 단일문자 암호 (Monoalphabetic Ciphers)

문자를 모듈로 26 상의 정수($\mathbb{Z}_{26} = \{0, 1, \dots, 25\}$)로 사상하여 연산합니다.

#### 1) 덧셈 암호 (Additive Cipher / Shift Cipher / Caesar Cipher)
- 가장 간단한 단일문자 암호 (시저 암호, 이동 암호로도 불림)
- **평문/암호문/키**: $P, C, K \in \mathbb{Z}_{26}$
- **수식**:
  - 암호화: $C = (P + K) \bmod 26$
  - 복호화: $P = (C - K) \bmod 26$
- **특징 및 한계**:
  - 키 공간 크기: 26개 ($0 \sim 25$)
  - **전수조사 공격(Brute-force attack)**에 극히 취약

#### 2) 곱셈 암호 (Multiplicative Cipher)
- **평문 및 암호문**: $P, C \in \mathbb{Z}_{26}$
- **키**: $K \in \mathbb{Z}_{26}^*$ (26과 서로소인 정수)
- **수식**:
  - 암호화: $C = (P \times K) \bmod 26$
  - 복호화: $P = (C \times K^{-1}) \bmod 26$ (단, $K^{-1}$은 $K$의 모듈로 26에 대한 곱셈 역원)
- **특징 및 한계**:
  - 유효한 키의 집합: $\{1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25\}$
  - 키 공간 크기: 12개로 매우 작아 전수조사 공격에 매우 취약

#### 3) 아핀 암호 (Affine Cipher)
- 덧셈 암호와 곱셈 암호를 결합한 형태
- **키 쌍**: $(k_1, k_2)$ (단, $k_1 \in \mathbb{Z}_{26}^*$, $k_2 \in \mathbb{Z}_{26}$)
- **수식**:
  - 암호화: $C = (P \times k_1 + k_2) \bmod 26$
  - 복호화: $P = ((C - k_2) \times k_1^{-1}) \bmod 26$
- **특징**:
  - $k_1 = 1$이면 덧셈 암호, $k_2 = 0$이면 곱셈 암호와 동일
  - 키 공간 크기: $12 \times 26 = 312$가지로 여전히 전수조사에 취약

#### 4) 단일문자 대치 암호 (Monoalphabetic Substitution Cipher)
- 26개 알파벳 각각에 대응되는 임의의 문자를 매핑하는 치환표 사용
- **키 공간 크기**: $26! \approx 4 \times 10^{26}$ (전수조사 불가능)
- **취약점**: 
  - **빈도 분석 공격(Frequency Analysis Attack)**에 매우 취약
  - 영어 문장에서 자주 출현하는 단일 알파벳(E, T, A, O, I 등)과 단어 쌍(Digram: TH, HE, IN 등), 3문자열(Trigram: THE, ING, AND 등)의 출현 통계가 암호문에도 그대로 보존됨

---

### 2.3 다중문자 암호 (Polyalphabetic Ciphers)

평문 문자가 위치나 규칙에 따라 서로 다른 암호문 문자로 사상(일대다 대응)되어, **언어 고유의 문자 출현 빈도 특성을 감추는 장점**이 있습니다.

#### 1) 자동키 암호 (Autokey Cipher)
- 초기 비밀키 $k_1$ 이후부터는 **평문 자신을 키 스트림으로 사용**하는 암호
- 키 스트림: $K = (k_1, P_1, P_2, \dots)$
- 암호화: $C_i = (P_i + k_i) \bmod 26$
- 복호화: $P_i = (C_i - k_i) \bmod 26$

#### 2) 플레이페어 암호 (Playfair Cipher)
- $5 \times 5$ 행렬 형태의 비밀키 표 사용 (I와 J를 한 칸에 배치하여 25문자 처리)
- 평문을 2글자 쌍(Digram) 단위로 분할하여 암호화:
  - 같은 행에 위치: 각 문자의 오른쪽 문자로 대치
  - 같은 열에 위치: 각 문자의 아래쪽 문자로 대치
  - 서로 다른 행/열(직사각형 형태): 상대방의 행과 자신의 열이 교차하는 대각선 문자로 대치

#### 3) 비즈네르 암호 (Vigenère Cipher)
- $m$개의 덧셈 암호(이동 암호)가 주기적으로 결합된 형태
- 반복되는 키워드(Key stream) 사용: $K = [(k_1, \dots, k_m), (k_1, \dots, k_m), \dots]$
- **암호화**: $C_i = (P_i + k_i) \bmod 26$
- **복호화**: $P_i = (C_i - k_i) \bmod 26$
- **해독 기법 (Kasiski Test)**:
  - 암호문 내에서 반복되는 3문자 이상의 패턴 간격(Difference)들을 조사
  - 간격들의 **최대공약수(GCD)**를 통해 키의 길이 $m$을 추정
  - 분할된 각 위치별 암호문에 단일문자 통계 공격(빈도 분석)을 적용하여 복호화

#### 4) 힐 암호 (Hill Cipher)
- 선형대수의 행렬(Matrix)을 이용한 다중문자 블록 치환 암호
- 평문 블록 벡터 $P$와 $m \times m$ 암호화 키 행렬 $K$ 사용
- **암호화**: $C = P \times K \pmod{26}$
- **복호화**: $P = C \times K^{-1} \pmod{26}$ (단, $\gcd(\det(K), 26) = 1$이어야 역행렬 $K^{-1}$ 존재)
- **취약점**: 알려진 평문 공격(Known-Plaintext Attack)에 취약. $m$개의 독립적인 평문-암호문 블록 쌍을 알면 $K = P^{-1} \times C \pmod{26}$으로 키 행렬 복원 가능

#### 5) 일회용 패드 (One-Time Pad, OTP)
- Shannon의 정보이론에 의해 **완벽한 보안(Perfect Secrecy)**이 수학적으로 증명된 암호 (Vernam 고안)
- 평문과 동일한 길이의 완전히 무작위(Random)인 키를 생성하여 단 한 번만 사용

#### 6) 로터 암호와 에니그마 (Rotor Cipher & Enigma Machine)
- 회전하는 다수의 기계적 로터(Rotor)를 통해 전류의 연결 배선이 계속 바뀌며 복잡한 다중문자 치환을 수행하는 전자기계식 암호기
- 2차 세계대전 당시 독일군이 에니그마(Enigma)를 채택하여 사용

---

## 3. 전치 암호 (Transposition Ciphers)

### 3.1 개념
- 기호 자체를 다른 기호로 대체하지 않고, **기호의 위치(순서)만 재배열**하는 암호화 방식
- 문자들의 출현 빈도는 원본 평문과 완전히 동일하게 유지됨

---

### 3.2 키가 없는 전치 암호 (Keyless Transposition Ciphers)

#### 1) 레일 펜스 암호 (Rail Fence Cipher)
- 평문을 지그재그(Zig-zag) 대각선 패턴으로 행을 오가며 배치한 뒤, 행 순서대로 읽어서 암호문 생성
- 예: "Meet me at the park" 2단 레일 배치 후 행 단위 추출 $\rightarrow$ "MEMATEAKETETHPR"

#### 2) 열 기반 전치 암호 (Row-Column Transposition)
- 평문을 정해진 $m$개 열을 가진 표에 **행 우선(Row by row)**으로 기록
- 읽을 때는 **열 우선(Column by column)**으로 읽어 암호문 생성
- 문자 위치 변환 시 일정한 순열 규칙 및 고정된 숫자 간격 패턴이 발생

---

### 3.3 키가 있는 전치 암호 (Keyed Transposition Ciphers)

- 평문을 $m$개 크기의 블록 단위로 분할하고(부족한 경우 마지막에 가짜 문자/bogus character 삽입), 각 블록 내에서 **정의된 순열 키(Permutation key)**에 따라 열/위치를 교환
- 예: 순열 키 $[3, 1, 4, 5, 2]$
  - 1번째 문자는 2번째 위치로, 2번째 문자는 5번째 위치 등으로 재배치

---

### 3.4 두 가지 접근법의 결합 및 고도화 (Combining Two Approaches)

#### 1) 행렬 곱을 이용한 전치 암호 표현
- $m \times m$ 치환 행렬(Permutation matrix) $K$를 평문 행렬과 곱하여 열 순서 재배치를 선형대수 연산으로 일관되게 표현 가능

#### 2) 이중 전치 암호 (Double Transposition Ciphers)
- 1단계 전치를 거친 중간 텍스트(Middle-text)에 대해 다시 2단계 열 전치를 순차적으로 수행
- 암호학적 안전성(확산 효과)을 크게 강화하여 단순 전치 암호보다 훨씬 높은 보안성 제공
