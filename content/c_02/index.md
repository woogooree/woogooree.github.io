---
emoji: 📚
title: C언어 동적 메모리 관리와 함수 포인터
date: '2024-06-02'
author: 심우진
tags: C언어 포인터 메모리관리 함수포인터
categories: C언어계열
---

## 들어가기 전에 힙과 스택부터 알기

힙(Heap)과 스택(Stack)은 프로그램 실행 중에 메모리를 관리하는 두 가지 주요 영역이다. 
이 두 영역은 메모리 할당과 해제, 사용 방식에서 차이가 있다.

### 스택 메모리

#### 특징
- **고정 크기**: 스택 메모리는 일반적으로 프로그램이 시작될 때 고정된 크기로 할당된다.
- **빠른 할당 및 해제**: 메모리 할당과 해제는 매우 빠르게 이루어진다. 함수 호출 시 스택 프레임이 생성되고 함수가 종료되면 자동으로 해제된다.
- **LIFO 구조**: 스택은 Last In, First Out(LIFO) 구조를 따른다. 가장 최근에 할당된 메모리가 가장 먼저 해제된다.

#### 용도
- **지역 변수**: 함수 내에서 선언된 변수는 스택에 저장된다.
- **함수 호출 정보**: 함수 호출 시 전달된 인수, 복귀 주소, 그리고 함수 실행을 위한 로컬 변수가 스택에 저장된다.

#### 예제

```c
#include <stdio.h>

void foo() {
    int localVar = 10; // 지역 변수는 스택에 저장됨
    printf("지역 변수: %d\n", localVar);
}

int main() {
    foo(); // 함수 호출 시 스택 프레임 생성
    return 0; // 함수 종료 시 스택 프레임 해제
}
```

이 예제에서 `localVar`는 함수 `foo`의 스택에 저장된다. `foo`가 호출될 때 스택 프레임이 생성되고, `foo`가 종료될 때 스택 프레임이 해제된다.

### 힙 메모리

#### 특징
- **동적 크기**: 힙 메모리는 런타임 시 동적으로 할당되며, 필요에 따라 크기를 조정할 수 있다.
- **느린 할당 및 해제**: 힙 메모리의 할당과 해제는 스택에 비해 느리다. 할당된 메모리는 명시적으로 해제해야 한다.
- **비구조적**: 힙 메모리는 비구조적이며, 임의의 순서로 할당 및 해제될 수 있다.

#### 용도
- **동적 메모리 할당**: 런타임 시 크기가 결정되는 데이터 구조(예: 배열, 링크드 리스트 등)는 힙에 저장된다.
- **크기가 큰 데이터**: 큰 데이터는 스택에 저장하기 어렵기 때문에 힙에 저장된다.

#### 예제

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // 힙에 정수형 배열 동적 할당
    arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("메모리 할당 실패\n");
        return 1;
    }

    // 배열 초기화 및 출력
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
        printf("%d ", arr[i]);
    }
    printf("\n");

    // 힙 메모리 해제
    free(arr);

    return 0;
}
```

이 예제에서 `malloc` 함수를 사용하여 힙에 정수형 배열을 동적 할당하고, `free` 함수를 사용하여 할당된 메모리를 해제한다.

### 비교

| 특징 | 스택(Stack) | 힙(Heap) |
|------|--------------|----------|
| 메모리 할당 | 자동 | 수동 (`malloc`, `free`) |
| 할당 속도 | 빠름 | 느림 |
| 메모리 크기 | 고정 크기 | 동적 크기 |
| 메모리 구조 | LIFO | 비구조적 |
| 사용 용도 | 지역 변수, 함수 호출 정보 | 동적 데이터 구조, 큰 데이터 |

### 요약
- **스택**은 함수 호출 시 자동으로 할당되고 해제되는 고정 크기 메모리 영역이다. 주로 지역 변수와 함수 호출 정보를 저장한다.
- **힙**은 런타임 시 동적으로 할당되고 명시적으로 해제되는 메모리 영역이다. 주로 동적 데이터 구조와 큰 데이터를 저장한다.


## 동적 메모리 관리 (Dynamic Memory Management)

### 개요
동적 메모리를 사용하면 런타임 시에 필요한 만큼의 메모리를 할당하고, 더 이상 필요하지 않을 때 메모리를 해제할 수 있다.


### 1. malloc 함수
`malloc` 함수는 요청한 크기만큼의 메모리를 힙(heap)에서 할당한다. 성공적으로 메모리를 할당하면 메모리 블록의 시작 주소를 반환하고, 실패하면 `NULL`을 반환한다.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // n개의 정수형 공간을 동적 할당
    arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("메모리 할당 실패\n");
        return 1;
    }

    // 메모리 할당 성공, 배열 초기화
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }

    // 배열 요소 출력
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // 동적 할당된 메모리 해제
    free(arr);

    return 0;
}
```

### 2. calloc 함수
`calloc` 함수는 `malloc` 함수와 유사하지만, 할당된 메모리를 0으로 초기화한다. `calloc` 함수는 두 개의 인수를 받는다: 할당할 요소의 개수와 각 요소의 크기.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // n개의 정수형 공간을 동적 할당 및 초기화
    arr = (int *)calloc(n, sizeof(int));

    if (arr == NULL) {
        printf("메모리 할당 실패\n");
        return 1;
    }

    // 배열 요소 출력
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // 동적 할당된 메모리 해제
    free(arr);

    return 0;
}
```

### 3. realloc 함수
`realloc` 함수는 이미 할당된 메모리 블록의 크기를 변경한다. 새로운 크기가 기존 크기보다 크면 추가 메모리는 초기화되지 않은 상태로 남아 있다.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // n개의 정수형 공간을 동적 할당
    arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("메모리 할당 실패\n");
        return 1;
    }

    // 배열 초기화
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }

    // 배열 크기를 두 배로 재할당
    arr = (int *)realloc(arr, 2 * n * sizeof(int));

    if (arr == NULL) {
        printf("메모리 재할당 실패\n");
        return 1;
    }

    // 추가된 공간 초기화
    for (int i = n; i < 2 * n; i++) {
        arr[i] = i + 1;
    }

    // 배열 요소 출력
    for (int i = 0; i < 2 * n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // 동적 할당된 메모리 해제
    free(arr);

    return 0;
}
```

### 4. free 함수
`free` 함수는 동적 할당된 메모리를 해제한다. 할당된 메모리를 더 이상 사용하지 않을 때는 반드시 `free` 함수를 호출하여 메모리 누수를 방지해야 한다.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr;
    int n = 5;

    // n개의 정수형 공간을 동적 할당
    arr = (int *)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("메모리 할당 실패\n");
        return 1;
    }

    // 배열 초기화 및 출력
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
        printf("%d ", arr[i]);
    }
    printf("\n");

    // 동적 할당된 메모리 해제
    free(arr);

    return 0;
}
```

### 주의사항
- 메모리 할당 실패를 항상 확인해야 한다.
- 동적 할당된 메모리는 사용 후 반드시 `free` 함수로 해제해야 한다.
- 이미 해제된 메모리에 접근하는 것은 위험하며, 프로그램 오류를 일으킬 수 있다.


## 함수 포인터 (Function Pointers)

### 개요
함수 포인터는 함수의 주소를 저장하는 포인터로, 런타임에 함수를 동적으로 호출할 수 있는 유연성을 제공한다. 함수 포인터를 사용하면 함수 테이블을 만들거나, 콜백 함수를 구현할 수 있다.


### 1. 함수 포인터 선언과 사용
함수 포인터는 함수의 시그니처를 따라 선언한다. 예를 들어, 두 개의 `int` 인수를 받아 `int`를 반환하는 함수 포인터는 다음과 같이 선언할 수 있다.

```c
#include <stdio.h>

// 두 정수의 합을 구하는 함수
int add(int a, int b) {
    return a + b;
}

int main() {
    // 함수 포인터 선언 및 초기화
    int (*operation)(int, int) = add;

    // 함수 포인터를 사용하여 함수 호출
    printf("10 + 5 = %d\n", operation(10, 5));

    return 0;
}
```

### 2. 콜백 함수
콜백 함수는 다른 함수의 인수로 전달되는 함수로, 이벤트 기반 프로그래밍에서 자주 사용된다.

```c
#include <stdio.h>

// 두 정수의 합을 구하는 함수
int add(int a, int b) {
    return a + b;
}

// 두 정수의 곱을 구하는 함수
int multiply(int a, int b) {
    return a * b;
}

// 두 정수에 대해 연산을 수행하는 함수
void compute(int (*operation)(int, int), int x, int y) {
    printf("결과: %d\n", operation(x, y));
}

int main() {
    // 합을 구하는 콜백 함수 호출
    compute(add, 10, 5);

    // 곱을 구하는 콜백 함수 호출
    compute(multiply, 10, 5);

    return 0;
}
```

### 3. 함수 테이블
함수 테이블은 함수 포인터 배열을 사용하여 여러 함수를 저장하고, 런타임에 동적으로 호출할 수 있는 구조를 제공한다.

```c
#include <stdio.h>

// 두 정수의 합을 구하는 함수
int add(int a, int b) {
    return a + b;
}

// 두 정수의 차를 구하는 함수
int subtract(int a, int b) {
    return a - b;
}

// 두 정수의 곱을 구하는 함수
int multiply(int a, int b) {
    return a * b;
}

int main() {
    // 함수 포인터 배열 선언 및 초기화
    int (*operations[3])(int, int) = {add, subtract, multiply};

    int x = 10, y = 5;

    // 함수 포인터 배열을 사용하여 함수 호출
    printf("10 + 5 = %d\n", operations[0](x, y));
    printf("10 - 5 = %d\n", operations[1](x, y));
    printf("10 * 5 = %d\n", operations[2](x, y));

    return 0;
}
```

### 주의사항
- 함수 포인터를 사용할 때 시그니처가 일치하는지 확인해야 한다.
- 함수 포인터 배열을 사용할 때는 인덱스 범위를 벗어나지 않도록 주의해야 한다.
- 잘못된 함수 포인터 사용은 프로그램 오류를 일으킬 수 있다.

```toc

```
