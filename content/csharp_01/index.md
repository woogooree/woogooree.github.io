---
emoji: 💡
title: C# 데이터타입과 형변환
date: '2024-06-03'
author: 심우진
tags: 데이터타입 리터럴 박싱 스택 힙
categories: C언어계열
---

## 형변환

```c#
int i = 10;
double b = i; // 컴파일러가 자동으로 암시적 변환 (더 큰 자료형)

double d = 10.5;
int i = (int)d; // 명시적 형 변환 (자료구조가 같은 형태만)

```

## 박싱과 언박싱

```C#
// Boxing (값 형식을 참조 형식으로 변환)
object obj = 123;

// Unboxing (참조 형식을 값 형식으로 변환)
int i = (int)obj;

// 박싱은 값 형식을 참조 형식으로 변환하느라 메모리 할당 및 복사가 일어나서 성능에 부담을 주게 되므로 자주 사용하지 않음
```


## as operator (참조 형식을 다른 참조형식으로 변환, 실패시 null 반환)

```C#

void BoxingUnboxing(object obj)
{
	Button? button = obj as Button; // as Button 형태인 경우에만 button에 저장하고 아닐 경우 null 값을 저장하기 때문에 Button? 자료형로 선언함
	if (button != null)
	{
		Console.WriteLine(button.GetString());
	}
	else
	{
		Console.WriteLine("button is null");
	}
	
}

BoxingUnboxing(new Button()); // 이렇게 버튼 형으로 언박싱하면 button으로 취급되고 하지 않으면 null로 적용됨


```


## Convert (데이터 타입 변환)

```C#
string s = "10.5";
double d = Convert.ToDouble(s); // Convert를 사용하면 형태가 다른 자료형도 변환이 가능하다.

double d2 = double.Parse(s); // Parse 를 사용해도 같다.

// 유효성을 체크한 후 넘기고 싶다면 try.Parse 사용
double.tryParse(s, out double d);
int.tryParse(s, out int i); //10.5 는 int 형식이 아니기에 0이 반환됨

if (int.tryParse(s, out int i))
{
	console.WriteLine("변환성공")
} 
else
{
	console.WriteLine("변환실패") // 실패한 것으로 취급하고 이게 출력됨
}
```

## 배열 형변환

```C#
class Animal
{
	public string Name { get; set; } = default;
}

class Cat : Animal { }
class Dog : Animal { }
class Pig : Animal { }
class Tiger : Animal { }

List<Animal> animals = new()
{
	new Cat {Name = "냐옹이1"},
	new Cat {Name = "냐옹이2"},
	new Cat {Name = "냐옹이3"},
};

// Cast
List<Cat> cats = animals.Cast<Cat>().ToList(); // Cat이 아닌 형태가 있으면 오류가 남

// ofType : 리스트에 Cat, Dog 등 섞여 있을 때 Cat 만 추출함
List<Cat> cats = animals.ofType<Cat>().ToList();

foreach (Cat cat in cats)
{
	Console.WriteLine(cat.Name);
}
```


## 데이터 타입

int == System.Int32
string == System.String
bool == System.Boolean

object : C# 모든 데이터 타입의 최상위 기본 클래스, 박싱/언박싱 가능

```C#
//명시적 변수 선언
int n = 123; //초기화
string name;
float s;

//암시적 변수 선언(초기화 필수)
var number = 123;
var name = "홍길동";
var c = '가';
var score = 10.5; // double로 가변됨
```

## 리터럴

소스 코드에서 값을 나타내는 고정된 값
컴파일 시간에 값을 결정함
실행 시간에 변경 되지 않음

```C#
int x = 10; // 10은 정수형 리터럴

//리터럴이 아닌 것은?
int z = x * y; // x와 y가 아직 안정해졌으므로 리터럴이 아님
string? str = Console.ReadLine(); // 입력값 받기
Console.WriteLine(11d.GetType()); // 아직 안정해져서 리터럴이 아님

```

```C#
// 숫자형 접미사
var longValue = 10f; // 자료형을 알려주는 접미사 
```

## 스택 메모리

스택 메모리는 함수 호출과 관련된 변수, 지역 볓수 및 매게변수를 저장하는 데 사용됨 (후입선출 방식으로 관리됨, 메모리 할당과 해제가 자동이며 매우 빠름)

```C#
void MyMethod()
{
	int i = 123; // 4바이트 스택 메모리 할당
}
```

## 힙 메모리

프로그램 실행 도중 동적으로 할당되고 해제되는 변수와 데이터를 저장하는 데 사용됨 (메모리 할당과 해제를 명시적으로 프로그래머가 수행해야하지만 C#에서는 GC가 자동으로 처리함)

클래스, 인터페이스, 배열, 대리자, 객체, 문자열 등이 C# 참조 형식임

```C#
var p1 = new Person() { name = "홍" }
var p2 = new person() { name = "김" }
```

## Index 찾기

```C#
string str = "Hi, Good Morning";

//IndexOf : 어디 있는지 찾아줌
int i = str.IndexOf("Good") // 찾지 못하면 -1 반환
int i_ = str.LastIndexOf("Good") // 뒤에서부터 찾음

//StartsWith & EndsWith : 지정된 걸로 시작/끝 나는지 확인
bool result = str.StartsWith("Hi");
bool result_ = strEndsWith("Hi"); // False

//Contains : 존재하는지 알려줌
bool result = str.Contains("Morning"); //True
bool reseult_ = str.Contains("morning"); //False

// 지정된 문자열을 찾아 다른 문자열을 변환
string result = str.Replace("Morning", "evening")
```

(출처) 유튜브 - 까불이코더 님

```toc

```