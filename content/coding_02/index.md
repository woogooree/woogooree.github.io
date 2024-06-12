---
emoji: 💡
title: C# 배열 인덱싱
date: '2024-06-08'
author: 심우진
tags: 배열 인덱싱 슬라이스
categories: CODING
---

## 배열 인덱싱 '^연산자'

8.0 버전부터 사용할 수 있게 된 ^ 연산자를 이용해서 뒤에서부터 접근할 수 있다

```C#
public ArraySlice()
{
	var list = new List<string>() {"apple", "banana"};

	string result = list[^2]; // 뒤에서 2 번째 인덱스를 구하라

	Console.WriteLine($"result: {result}");
	/*
		==> string result = list[list.conut - 2];
	*/
}
```

## Linq를 이용하여 배열 자르기

Skip 과 Take 를 통해 가져오는 방식을 사용하면 배열의 Range 를 넘어선 요소를 선택하게 되더라도
오류가 발생하지 않는 구조적 차이가 있다

```C#
public ArraySlice()
{
	var list = new List<string>() {"a", "b", "c", "d", "e"};

	IEnumerable<string> skip = list.Skip(2); // 앞 2개 건너뛰기
	IEnumerable<string> take = list.Take(2); // 앞 2개 가져오기
	IEnumerable<string> skipAndTake = list.Skip(2).Take(2); // 앞 2개 건너뛰고 3번째부터 2개 가져오기
	List<string> getRange = list.GetRange(2, 2); // SkipAndTake와 똑같이 동작하지만 배열 범위를 넘으면 오류가 발생함
}
```

```toc

```
