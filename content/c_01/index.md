---
emoji: 🔍
title: C언어 포인터 개념정리
date: '2024-06-01'
author: 심우진
tags: C언어 포인터
categories: C언어계열
---

## 포인터란?

포인터(pointer)는 메모리 주소를 저장하는 변수이다. *변수명 으로 선언한다.
- 사용할때 *변수명을 사용하면 메모리 주소값이 아닌 메모리 주소가 가리키고 있는 변수의 값이 출력된다.
- 사용할때 포인터 변수명을 * 없이 사용하면 변수 값이 아닌 메모리 주소 그자체를 출력한다.

## 포인터의 기본 사용법

### 1. 포인터 선언과 초기화

```c
#include <stdio.h>

int main() {
    int a = 10;       // 정수형 변수 a 선언 및 초기화
    int *p;           // 정수형 포인터 p 선언
    p = &a;           // p에 변수 a의 주소 저장

    printf("a의 값: %d\n", a);           // a의 값을 출력
    printf("a의 주소: %p\n", (void*)&a); // a의 주소를 출력
    printf("p가 가리키는 값: %d\n", *p); // p가 가리키는 값을 출력 (a의 값)

    return 0;
}
```

위 예제에서 `int *p`는 정수형 포인터 p를 선언한다는 의미이다. 
`p = &a`는 변수 a의 주소를 p에 저장하는 것을 의미한다. 
`*p`는 p가 가리키는 주소에 저장된 값을 의미한다.

### 2. 배열과 포인터

```c
#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30}; // 정수형 배열 선언 및 초기화
    int *p = arr;              // 배열의 첫 번째 요소의 주소를 포인터 p에 저장

    for(int i = 0; i < 3; i++) {
        printf("arr[%d]의 값: %d\n", i, *(p + i)); // 포인터를 사용하여 배열의 각 요소에 접근
    }

    return 0;
}
```

위 예제에서 `int *p = arr`는 배열 `arr`의 첫 번째 요소의 주소를 p에 저장하는 것을 의미한다. 
`*(p + i)`는 포인터 연산을 통해 배열의 각 요소에 접근하는 방법을 보여준다.

### 3. 포인터를 이용한 함수 인수 전달

```c
#include <stdio.h>

// 두 정수의 값을 바꾸는 함수
void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a = 5, b = 10;

    printf("교환 전: a = %d, b = %d\n", a, b);
    swap(&a, &b); // 변수 a와 b의 주소를 함수에 전달
    printf("교환 후: a = %d, b = %d\n", a, b);

    return 0;
}
```

위 예제에서는 포인터를 사용하여 함수 인수로 변수의 주소를 전달한다.
변수의 주소를 전달하지만 *변수명으로 사용했기 때문에 주소를 전달하면서 **안에있는 값을 읽는다.**
이를 통해 함수 내에서 변수의 값을 변경한다.



## 포인터 연산

포인터 연산은 포인터를 사용하여 메모리 주소를 조작하는 다양한 방법을 의미한다. 
포인터 연산에는 주로 덧셈, 뺄셈, 증가, 감소 연산이 포함된다.

### 1. 포인터 덧셈과 뺄셈

포인터 덧셈은 포인터가 가리키는 주소에 정수를 더하는 연산으로, 배열의 다음 요소로 이동하는 데 사용된다. 반대로 포인터 뺄셈은 포인터가 가리키는 주소에서 정수를 빼는 연산이다.

```c
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr; // 배열의 첫 번째 요소를 가리키는 포인터 p

    printf("포인터 p가 가리키는 값: %d\n", *p); // 첫 번째 요소 출력

    p = p + 2; // 포인터를 두 칸 앞으로 이동
    printf("포인터 p+2가 가리키는 값: %d\n", *p); // 세 번째 요소 출력

    p = p - 1; // 포인터를 한 칸 뒤로 이동
    printf("포인터 p-1가 가리키는 값: %d\n", *p); // 두 번째 요소 출력

    return 0;
}
```

위 예제에서 `p + 2`는 포인터 `p`를 두 칸 앞으로 이동하여 `arr[2]`를 가리키게 한다. 반대로 `p - 1`은 포인터를 한 칸 뒤로 이동하여 `arr[1]`을 가리키게 한다.

### 2. 포인터 증가 및 감소

포인터 증가(`++`)와 감소(`--`) 연산은 포인터를 다음 또는 이전 메모리 위치로 이동시킨다.

```c
#include <stdio.h>

int main() {
    int arr[5] = {100, 200, 300, 400, 500};
    int *p = arr; // 배열의 첫 번째 요소를 가리키는 포인터 p

    printf("포인터 p가 가리키는 값: %d\n", *p); // 첫 번째 요소 출력

    p++; // 포인터를 다음 요소로 이동
    printf("포인터 p++가 가리키는 값: %d\n", *p); // 두 번째 요소 출력

    p--; // 포인터를 이전 요소로 이동
    printf("포인터 p--가 가리키는 값: %d\n", *p); // 다시 첫 번째 요소 출력

    return 0;
}
```

이 예제에서 `p++`은 포인터를 다음 요소로 이동시켜 `arr[1]`을 가리키게 하고, `p--`은 포인터를 이전 요소로 이동시켜 다시 `arr[0]`을 가리키게 한다.

### 3. 두 포인터의 차이 계산

두 포인터 간의 차이는 포인터가 가리키는 요소들 사이의 거리를 나타낸다.

```c
#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p1 = &arr[1]; // 두 번째 요소를 가리키는 포인터 p1
    int *p2 = &arr[4]; // 다섯 번째 요소를 가리키는 포인터 p2

    printf("p2 - p1의 차이: %ld\n", p2 - p1); // 두 포인터 간의 거리 출력

    return 0;
}
```

이 예제에서 `p2 - p1`은 두 포인터 사이의 거리를 나타내며, 이는 두 번째 요소와 다섯 번째 요소 사이의 요소 수를 의미한다.

### 4. 포인터 비교

포인터는 비교 연산을 통해 두 포인터가 같은 주소를 가리키는지, 또는 어떤 포인터가 더 앞이나 뒤를 가리키는지 비교할 수 있다.

```c
#include <stdio.h>

int main() {
    int arr[3] = {1, 2, 3};
    int *p1 = &arr[0];
    int *p2 = &arr[1];

    if (p1 < p2) {
        printf("p1은 p2보다 앞의 요소를 가리킵니다.\n");
    } else if (p1 > p2) {
        printf("p1은 p2보다 뒤의 요소를 가리킵니다.\n");
    } else {
        printf("p1과 p2는 같은 요소를 가리킵니다.\n");
    }

    return 0;
}
```

이 예제에서는 `p1`이 `p2`보다 앞의 요소를 가리키는지 비교하여 결과를 출력한다.



## 포인터와 배열 포인터의 사용법 차이

### 포인터 (Pointer)

포인터는 단순히 특정 타입의 변수 주소를 저장하는 변수이다. 배열의 첫 번째 요소를 가리키는 포인터로 배열의 각 요소에 접근할 수 있다.

```c
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int *p = arr; // 배열의 첫 번째 요소를 가리키는 포인터

    // 포인터를 이용한 배열 요소 접근
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\n", i, *(p + i));
    }

    return 0;
}
```

이 예제에서 `int *p = arr`는 `p`가 `arr`의 첫 번째 요소를 가리키도록 한다. `*(p + i)`를 사용하여 배열의 각 요소에 접근할 수 있다.

### 배열 포인터 (Pointer to Array)

배열 포인터는 배열 자체의 주소를 저장하는 포인터이다. 배열 포인터는 주로 다차원 배열을 다룰 때 사용된다.

#### 1차원 배열 포인터

```c
#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int (*p)[5] = &arr; // 배열 전체를 가리키는 포인터

    // 배열 포인터를 이용한 배열 요소 접근
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\n", i, (*p)[i]);
    }

    return 0;
}
```

이 예제에서 `int (*p)[5] = &arr`는 `p`가 배열 `arr` 전체를 가리키도록 한다. `(*p)[i]`를 사용하여 배열의 각 요소에 접근할 수 있다.

#### 2차원 배열 포인터

```c
#include <stdio.h>

int main() {
    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int (*p)[3] = arr; // 2차원 배열의 행을 가리키는 포인터

    // 배열 포인터를 이용한 2차원 배열 요소 접근
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("arr[%d][%d] = %d\n", i, j, p[i][j]);
        }
    }

    return 0;
}
```

이 예제에서 `int (*p)[3] = arr`는 `p`가 2차원 배열 `arr`의 첫 번째 행을 가리키도록 한다. `p[i][j]`를 사용하여 2차원 배열의 각 요소에 접근할 수 있다.



## 조금 더 난이도 높은 포인터 사용법

### 1. 다중 포인터 (Pointer to Pointer)

포인터 자체도 메모리의 한 부분이기 때문에, 포인터를 가리키는 포인터, 즉 다중 포인터를 사용할 수 있다.

```c
#include <stdio.h>

int main() {
    int a = 100;
    int *p = &a;      // 정수형 변수 a의 주소를 저장하는 포인터 p
    int **pp = &p;    // 포인터 p의 주소를 저장하는 이중 포인터 pp

    printf("a의 값: %d\n", a);            // a의 값 출력
    printf("p가 가리키는 값: %d\n", *p);  // p가 가리키는 값 (a의 값) 출력
    printf("pp가 가리키는 값: %d\n", **pp); // pp가 가리키는 값 (a의 값) 출력

    return 0;
}
```

이중 포인터 `pp`는 포인터 `p`의 주소를 저장하고, `**pp`는 `a`의 값을 가리킨다.

### 2. 동적 메모리 할당

동적 메모리 할당은 프로그램 실행 중에 메모리를 할당하고 해제하는 방법으로, C에서는 `malloc`, `calloc`, `realloc`, `free` 함수를 사용한다.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n;
    printf("정수형 배열의 크기를 입력하세요: ");
    scanf("%d", &n);

    int *arr = (int*)malloc(n * sizeof(int)); // n개의 정수형 공간을 동적 할당

    if (arr == NULL) {
        printf("메모리 할당 실패\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = i + 1; // 배열 요소 초기화
    }

    printf("동적 할당된 배열 요소: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]); // 배열 요소 출력
    }
    printf("\n");

    free(arr); // 동적 할당된 메모리 해제

    return 0;
}
```

이 예제에서는 `malloc` 함수를 사용하여 사용자로부터 입력받은 크기만큼의 정수형 배열을 동적 할당하고, `free` 함수를 사용하여 할당된 메모리를 해제한다.

### 3. 함수 포인터

함수 포인터는 함수의 주소를 저장하는 포인터로, 런타임에 함수를 호출할 수 있는 유연성을 제공한다.

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

int main() {
    int (*operation)(int, int); // 함수 포인터 선언

    operation = add;
    printf("10 + 5 = %d\n", operation(10, 5)); // add 함수 호출

    operation = subtract;
    printf("10 - 5 = %d\n", operation(10, 5)); // subtract 함수 호출

    return 0;
}
```

이 예제에서는 `operation`이라는 함수 포인터를 선언하고, `add` 함수와 `subtract` 함수의 주소를 각각 저장하여 호출한다.

### 4. 포인터 배열

포인터 배열은 포인터의 배열로, 주로 문자열 배열을 관리할 때 사용된다.

```c
#include <stdio.h>

int main() {
    const char *fruits[] = {"Apple", "Banana", "Cherry"}; // 문자열 상수를 가리키는 포인터 배열

    for (int i = 0; i < 3; i++) {
        printf("%s\n", fruits[i]); // 포인터 배열을 통해 각 문자열에 접근
    }

    return 0;
}
```

배열포인터와 포인터배열은 유사한 이름이지만 실제로 완전히 다른 개념이다.
배열포인터는 배열 자체의 주소를 저장하는 포인터 이고, 포인터 배열은 포인터를 요소로 가지는 배열이다.

#### 선언 방식 차이
배열 포인터: int (*p)[N]; (N은 배열의 크기)
포인터 배열: int *arr[N]; (N은 배열의 크기)

#### 사용법 차이
배열 포인터: (*p)[i] 또는 p[0][i] 형태로 배열 요소에 접근.
포인터 배열: *arr[i] 형태로 각 포인터가 가리키는 값에 접근.


### 5. 구조체와 포인터

구조체 포인터를 사용하면 구조체의 멤버에 보다 효율적으로 접근할 수 있다.

```c
#include <stdio.h>

struct Person {
    char name[50];
    int age;
};

int main() {
    struct Person person;
    struct Person *pPerson = &person; // 구조체 포인터 선언 및 초기화

    // 구조체 포인터를 통해 멤버에 접근
    pPerson->age = 30;
    snprintf(pPerson->name, 50, "Alice");

    printf("이름: %s, 나이: %d\n", pPerson->name, pPerson->age);

    return 0;
}
```

이 예제에서는 구조체 포인터 `pPerson`을 사용하여 구조체 `person`의 멤버에 접근한다.

## 미니 프로젝트: 학생 점수 관리 시스템

### 요구사항

1. 학생의 이름과 점수를 저장한다.
2. 각 학생의 평균 점수를 계산한다.
3. 모든 학생의 정보를 출력한다.

### 코드

```c
#include <stdio.h>
#include <stdlib.h>

#define NUM_STUDENTS 3  // 학생 수 정의
#define NUM_SUBJECTS 4  // 과목 수 정의

// 학생 구조체 정의
typedef struct {
    char name[50];              // 학생 이름
    int scores[NUM_SUBJECTS];   // 과목별 점수 배열
    float average;              // 평균 점수
} Student;

// 함수 선언
void calculateAverage(Student *student); // 평균 점수 계산 함수 선언
void printStudentInfo(Student *student); // 학생 정보 출력 함수 선언

int main() {
    // 학생 배열 동적 할당
    Student *students = (Student *)malloc(NUM_STUDENTS * sizeof(Student));
    
    // 메모리 할당 실패 시 처리
    if (students == NULL) {
        printf("메모리 할당 실패\n");
        return 1;
    }

    // 학생 정보 입력
    for (int i = 0; i < NUM_STUDENTS; i++) {
        printf("학생 %d 이름: ", i + 1);  // 학생 번호 입력
        scanf("%s", students[i].name);    // 학생 이름 입력

        printf("%s의 점수를 입력하세요:\n", students[i].name);
        for (int j = 0; j < NUM_SUBJECTS; j++) {
            printf("과목 %d: ", j + 1);   // 과목 번호 입력
            scanf("%d", &students[i].scores[j]); // 과목 점수 입력
        }

        // 평균 점수 계산
        calculateAverage(&students[i]);
    }

    // 학생 정보 출력
    for (int i = 0; i < NUM_STUDENTS; i++) {
        printStudentInfo(&students[i]); // 학생 정보 출력 함수 호출
    }

    // 동적 할당된 메모리 해제
    free(students);

    return 0;
}

// 평균 점수 계산 함수
void calculateAverage(Student *student) {
    int total = 0;  // 점수 합계를 저장할 변수
    for (int i = 0; i < NUM_SUBJECTS; i++) {
        total += student->scores[i]; // 총 점수 계산
    }
    student->average = total / (float)NUM_SUBJECTS; // 평균 점수 계산
}

// 학생 정보 출력 함수
void printStudentInfo(Student *student) {
    printf("\n학생 이름: %s\n", student->name); // 학생 이름 출력
    printf("점수: ");
    for (int i = 0; i < NUM_SUBJECTS; i++) {
        printf("%d ", student->scores[i]); // 각 과목 점수 출력
    }
    printf("\n평균 점수: %.2f\n", student->average); // 평균 점수 출력
}

```

```toc

```
