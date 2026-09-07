# 함수 소개

네크워크 프로그래밍?

- 소켓을 기반으로 하기 때문에 소켓 프로그래밍이라고도 함
- 네크워크로 연결된 둘 이상의 컴 사이에서 데이터 송수신 프로그램 작성 == TCP/IP 프로그래밍 == 인터넷 프로그래밍

---

소켓?

- 인터넷 연결 도구
- 파일 취급이라 넘버링 됨(0, 1, 2, 3,...)
- OS에서 제공하는 S/W 장치

---

클라/서버 모델

- 클리, 서버는 머신 아님 S/W임!
- 서버는 클라 연결요청 기다림
- 클라는 서버에 요청하고 응답 기다림(호스트)

---

서버 종류

- 1:1 : 거의 안씀, Iterative Server 한순간 하나의 클라만 응답
- 1:N : Concurent Server 동시에 여러 클라 응답
    - 프로세스 기반
    - 셀렉트 기반
    - 쓰레드 기반(프로세스는 무거워)

---

전화기를 통한 소켓 이해

주소 = IP & port

서버입장(들어오는거 아님 ㄴㄴㄴㄴ)

1. 전화기 구입      == 소켓 생성
2. 번호 할당        == IP 주소 할당(bind, binding)
3. 케이블 연결      == 연결 요청 준비(listen)
4. 수화기 들기      == 연결 수락(accpet)

요청을 거는놈이랑 받는 놈은 생성 방식이 다름

## 서버쪽

```C
#include <sys/socket.h>
int socket(int domain, int type, int protocol); // succ:file descripter, fail: -1
```

소켓 주소 할당 및 연결

소켓 주소 정보는 IP와 PORT로 구성

```C
#include <sys/socket.h>
int bind(int sockfd, struct sockaddr *myaddr, socklen_t addrlen); // succ: 0 fail: -1
```

연결 요청 가능 소켓

요청 받는 놈은 필요 없음

```C
#include <sys/socket.h>
int listen(int sockfd, int backlog); // succ:0 fail: -1
```

요청 받는거 수락

이걸 해야 데이터 송수신 가능

수락하면 양방향으로 송수신 가능

단, 연결 요청이 있을때만 반환함

```C
#include <sys/socket.h>
int accept(int sockfd, struct sockaddr *addr, socklen_t addrlen); // succ: file descripter fail: -1
```

서버 소켓은 엑셉트 이후에 사용 x

각각의 인수의 의미는 나중에

## 클라쪽

```C
#include <sys/socket.h>
int connect(int sockfd, struct sockaddr *serv_addr, socklen_t addrlen); // succ: 0 fail: -1
```

`listen`과 달리 구현 간단

*생성*과 *연결의 요청*으로 구분

# 요약

1. 소켓 생성------------- `socket` 함수
2. IP, PORT 할당-------- `bind`   함수
3. 연결요청 가능 상태 변경- `listen` 함수
4. 연결 요청 수락--------- `accept` 함수

--- 

# 리눅스에서 저수준 파일 입출력

ANSI 표준이 아니라 OS에서 제공
표준 아니라 OS 따라 호환 X
리눅스를 소켓도 파일이라 저수준 파일 입출력 함수로도 데이터 송수신 가능

- 파일 디스크립터
    - OS가 만든 파일(소켓)을 구분하기 위한 숫자
    - 저수준에선 파일 번호를 요구