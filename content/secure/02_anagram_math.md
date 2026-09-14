# 암호 수학 (Mathematics of Cryptography)

## 1. 정수 연산 (Integer Arithmetic)

### 1.1 정수의 집합 ($\mathbb{Z}$)
- **정수 집합**: 음의 무한대에서 양의 무한대까지 모든 (분수가 아닌) 정수의 집합
  $$\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}$$
- **이항 연산 (Binary Operations)**: 두 개의 입력값을 받아 하나의 결과값을 도출하는 연산이며, 정수 집합에 대해 덧셈($+$), 뺄셈($-$), 곱셈($\times$)이 정의됨.

---

### 1.2 정수의 나눗셈 (Integer Division)
- 정수 $a$를 양의 정수 $n$으로 나누면 몫($q$)과 나머지($r$)가 결정됨:
  $$a = q \times n + r \quad (0 \le r < n)$$
- **음수 나눗셈 처리**: $a$가 음수일 때도 나머지 $r$은 항상 음이 아닌 정수($0 \le r < n$)여야 함.
  - 음수 몫에서 1을 빼고($q - 1$), 나머지에 제수 $n$을 더하여($r + n$) 양의 나머지로 보정
  - 예: $-255$를 $11$로 나눌 때:
    $$-255 = (-23 \times 11) + (-2) \iff -255 = (-24 \times 11) + 9 \quad (\text{몫: } -24, \text{ 나머지: } 9)$$

---

### 1.3 가분성 (Divisibility)
- **정의**: $a = q \times n$ (나머지 $r = 0$)일 때, $n$은 $a$를 나누어떨어뜨린다고 하며 다음과 같이 표기:
  - $n \mid a$ : $n$이 $a$의 약수임 (나머지가 0)
  - $n \nmid a$ : $n$이 $a$의 약수가 아님 (나머지가 0이 아님)
- **가분성의 주요 성질**:
  1. $a \mid 1 \implies a = \pm 1$
  2. $a \mid b \text{ 이고 } b \mid a \implies a = \pm b$
  3. $a \mid b \text{ 이고 } b \mid c \implies a \mid c$
  4. $a \mid b \text{ 이고 } a \mid c \implies a \mid (m \times b + n \times c) \quad (m, n \text{은 임의의 정수})$

---

### 1.4 최대공약수 (Greatest Common Divisor, GCD)
- **개념**: 두 양의 정수를 동시에 나누는 가장 큰 정수 ($\gcd(a, b)$)
- **서로소 (Relatively Prime)**: 두 정수 $a, b$에 대하여 $\gcd(a, b) = 1$인 관계

#### 1) 유클리드 알고리즘 (Euclidean Algorithm)
- 큰 수에 대해 소인수분해 없이 효율적으로 GCD를 구하는 알고리즘
- **핵심 원리**:
  - $\gcd(a, 0) = a$
  - $\gcd(a, b) = \gcd(b, r)$ (단, $r = a \bmod b$)
- **알고리즘 절차**:
  $$r_1 \leftarrow a, \quad r_2 \leftarrow b$$
  $$r_2 > 0 \text{인 동안 } q \leftarrow \lfloor r_1 / r_2 \rfloor, \quad r \leftarrow r_1 - q \times r_2, \quad r_1 \leftarrow r_2, \quad r_2 \leftarrow r$$
  $$r_2 = 0 \text{이 되었을 때 } \gcd(a, b) = r_1$$
- **예제 ($\gcd(2740, 1760)$)**:
  - $2740 = 1 \times 1760 + 980$
  - $1760 = 1 \times 980 + 780$
  - $980 = 1 \times 780 + 200$
  - $780 = 3 \times 200 + 180$
  - $200 = 1 \times 180 + 20$
  - $180 = 9 \times 20 + 0 \implies \gcd(2740, 1760) = 20$

#### 2) 확장 유클리드 알고리즘 (Extended Euclidean Algorithm)
- **목적**: $\gcd(a, b)$뿐만 아니라, 베주 항등식(Bézout's identity)을 만족하는 두 정수 $s, t$를 계산:
  $$s \times a + t \times b = \gcd(a, b)$$
- 암호학(특히 공개키 암호 및 모듈로 역원 계산)에서 필수적으로 활용됨.
- **점화식**:
  $$r = r_1 - q \times r_2$$
  $$s = s_1 - q \times s_2 \quad (\text{초깃값: } s_1 = 1, s_2 = 0)$$
  $$t = t_1 - q \times t_2 \quad (\text{초깃값: } t_1 = 0, t_2 = 1)$$
- **예제 ($a = 161, b = 28$)**:
  - 결과: $\gcd(161, 28) = 7$, $s = -1$, $t = 6$
  - 검증: $(-1) \times 161 + 6 \times 28 = -161 + 168 = 7$

---

## 2. 모듈로 연산 (Modular Arithmetic)

### 2.1 모듈로 연산자 ($\bmod$)
- $a \bmod n = r$ : 정수 $a$를 양의 정수 $n$(모듈러스, modulus)으로 나누었을 때의 나머지(잉여, residue $r$)를 구하는 연산
  $$0 \le r < n$$
  - 예: $23 \bmod 5 = 3$, $-17 \bmod 5 = 3$

---

### 2.2 잉여류 및 완전 잉여계 ($\mathbb{Z}_n$)
- **완전 잉여계 (Complete Residue System, $\mathbb{Z}_n$)**:
  - 법 $n$으로 나누었을 때 나올 수 있는 가능한 모든 나머지들의 집합
  $$\mathbb{Z}_n = \{0, 1, 2, \dots, n-1\}$$
  - 예: $\mathbb{Z}_2 = \{0, 1\}$, $\mathbb{Z}_6 = \{0, 1, 2, 3, 4, 5\}$, $\mathbb{Z}_{11} = \{0, 1, \dots, 10\}$

---

### 2.3 합동 (Congruence, $\equiv$)
- **개념**: 두 정수 $a$와 $b$를 $n$으로 나누었을 때 나머지가 같으면 $a$와 $b$는 법 $n$에 대해 합동이라 함.
  $$a \equiv b \pmod n \iff n \mid (a - b) \iff (a \bmod n) = (b \bmod n)$$
- **합동의 동치 관계 특성**:
  - 반사율: $a \equiv a \pmod n$
  - 대칭율: $a \equiv b \pmod n \iff b \equiv a \pmod n$
  - 추이율: $a \equiv b \pmod n \text{ 이고 } b \equiv c \pmod n \implies a \equiv c \pmod n$
- **기하학적 해석**: 정수선 $\mathbb{Z}$는 무한한 직선 형태이나, $\mathbb{Z}_n$은 $0$부터 $n-1$까지 순환하는 원형(시계 형태) 구조를 가짐.

---

### 2.4 $\mathbb{Z}_n$ 상에서의 이항 연산
- $\mathbb{Z}_n$ 집합 내에서도 덧셈, 뺄셈, 곱셈 연산이 닫혀 있도록 정의됨:
  - $(a + b) \bmod n = [(a \bmod n) + (b \bmod n)] \bmod n$
  - $(a - b) \bmod n = [(a \bmod n) - (b \bmod n)] \bmod n$
  - $(a \times b) \bmod n = [(a \bmod n) \times (b \bmod n)] \bmod n$
- **의의**: 큰 수들의 연산 결과를 모듈로 취할 때, 각 입력값을 먼저 $\mathbb{Z}_n$ 상의 작은 수로 줄인 후 연산해도 결과가 동일함.
- **지수 거듭제곱 성질**:
  $$10^n \bmod x = (10 \bmod x)^n \bmod x$$
  - 예: 정수를 3으로 나눈 나머지는 각 자릿수의 합을 3으로 나눈 나머지와 같음 (자릿수 판별법의 수학적 증명).

---

### 2.5 역원 (Inverses)

#### 1) 덧셈에 대한 역원 (Additive Inverse)
- $a + b \equiv 0 \pmod n$ 을 만족하는 $b$를 $a$의 덧셈 역원이라 함 ($b = -a \bmod n$).
- $\mathbb{Z}_n$의 모든 원소는 항상 유일한 덧셈 역원을 가짐.
  - 예 ($\mathbb{Z}_{10}$): $(0,0), (1,9), (2,8), (3,7), (4,6), (5,5)$

#### 2) 곱셈에 대한 역원 (Multiplicative Inverse)
- $a \times b \equiv 1 \pmod n$ 을 만족하는 $b$를 $a$의 곱셈 역원이라 함 ($b = a^{-1} \bmod n$).
- **존재 조건 (필요충분조건)**:
  $$\gcd(a, n) = 1 \quad (\text{즉, } a\text{와 } n\text{이 서로소일 때만 존재})$$
  - 예 ($\mathbb{Z}_{10}$): $10$과 서로소인 원소 $\{1, 3, 7, 9\}$만 역원을 가짐 $\rightarrow (1,1), (3,7), (9,9)$. 짝수 및 5는 역원 없음.

#### 3) 기약 잉여계 (Reduced Residue System, $\mathbb{Z}_n^*$)
- 완전 잉여계 $\mathbb{Z}_n$의 원소 중 법 $n$과 **서로소인 원소들만 모아놓은 집합**:
  $$\mathbb{Z}_n^* = \{a \in \mathbb{Z}_n \mid \gcd(a, n) = 1\}$$
  - 예: $\mathbb{Z}_8^* = \{1, 3, 5, 7\}$, $\mathbb{Z}_{10}^* = \{1, 3, 7, 9\}$
- **암호학적 의미**:
  - 덧셈 역원이 필요할 때는 $\mathbb{Z}_n$ 전체를 사용
  - 곱셈 역원이 필요할 때는 $\mathbb{Z}_n^*$ 집합을 사용

#### 4) 확장 유클리드 알고리즘을 이용한 곱셈 역원 계산
- $\gcd(a, n) = 1$일 때:
  $$s \times a + t \times n = 1 \implies s \times a \equiv 1 \pmod n$$
  - 따라서 계산된 계수 $s$가 바로 $a$의 곱셈 역원($a^{-1}$)이 됨 ($s$가 음수이면 $s + n$).
- **예제 ($\mathbb{Z}_{26}$에서 $11$의 곱셈 역원)**:
  - $\gcd(26, 11) = 1$
  - 확장 유클리드 적용 시 계수 $t = -7$
  - $11^{-1} \equiv -7 \equiv 19 \pmod{26}$ (검증: $11 \times 19 = 209 = 26 \times 8 + 1 \equiv 1$)

#### 5) 소수(Prime Number) 모듈러스 ($\mathbb{Z}_p, \mathbb{Z}_p^*$)
- 모듈러스가 소수 $p$인 경우:
  - $0$을 제외한 모든 원소가 $p$와 서로소임.
  $$\mathbb{Z}_p = \{0, 1, 2, \dots, p-1\}$$
  $$\mathbb{Z}_p^* = \{1, 2, \dots, p-1\}$$
- 따라서 소수 모듈러스를 사용하면 **$0$을 제외한 모든 원소가 항상 곱셈 역원을 갖게 됨**.
  - 예 ($\mathbb{Z}_{13}$): $\mathbb{Z}_{13}^* = \{1, 2, 3, \dots, 12\}$

