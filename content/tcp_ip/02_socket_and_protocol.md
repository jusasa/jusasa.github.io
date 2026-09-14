# 프로토콜 이해와 소켓 생성

## 프로토콜

프로토콜?
- 약속
- 컴 상호간 데이터 송수신시 통신 규약
- 소켓 생성시 기본적인 프로토컬 지정

```C
#include <sys/socket.h>

// suuc: file decripter, fail: -1
int socket(int domain, int type, int protocol);

```

## 프로토콜 체계

종류에 따라 나누는데 그 부류들을 프로토콜 체계

|이름|프로토콜 체계|
|:-|-:|
|PF_INET|IPv4|
|PF_INET6|IPv6|
|PF_LOCAL|Local 통신위한 UNIX|
|PF_PACKET|Low Level socket|
|PF_IPX|IPX 노벨|
 
## 소켓의 타입

- 소켓의 타입
    - 데이터 전송 방식 의미
    - 소켓 생성시 소켓의 타입도 결정돼야 함

### 프로토콜 체계 PF_INET의 대표 소켓 타입 둘

- 연결 지향형(SOCK_STREAM)
    - TCP
    - 중간 데이터 소멸 X
    - 전송 순서대로 수신
    - 데이터 경계 X
    - 소캣:소캣 연결은 반드시 1:1구조
- 비 연결 지향셩(SOCK_DGRAM)
    - 전송 순서 상관 X 빠른 속도의 전송 지향
    - 데이터 손실 & 파손 우려
    - 데이터 경계 O
    - 한번에 전송 할 수 있는 크기 제한

EX)
```C
// IPv4 인터넷 프로토콜 체계에서 동작하는 연결 지향형 데이터 전송 소켓
int tcp_socket = socket(PF_INET, SOCK_STREAM, IPPROTO_TCP);
```

```C
// IPv4 인터넷 프로토콜 체계에서 동작하는 비연결 지향형 데이터 전송 소켓
int udp_socket = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP);
```

> 1, 2번 인자로 인해 소켓 프로토콜이 결정되기 떄문에 3번 인자로 0 전달 가능