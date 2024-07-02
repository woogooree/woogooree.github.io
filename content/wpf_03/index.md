---
emoji: 📊
title: WPF 데이터바인딩 더 알아보기
date: '2024-06-09'
author: 심우진
tags: 데이터바인딩
categories: Framework
---

## 데이터바인딩

데이터바인딩(Data Binding)은 사용자 인터페이스(UI) 요소와 데이터 소스 간의 연결을 설정하여, 데이터가 자동으로 동기화되도록 하는 기술이다. 이를 통해 데이터 소스의 변경이 UI에 즉시 반영되며, UI를 통해 변경된 데이터가 데이터 소스에도 즉시 반영된다.

주로 WPF에서 데이터바인딩을 활용하게 된다.

## 데이터바인딩의 주요 구성 요소

1. **데이터 소스(Data Source)**: 바인딩할 실제 데이터이다. 이는 객체, 컬렉션, 데이터베이스 등일 수 있다.
2. **바인딩 타겟(Binding Target)**: 데이터를 표시할 UI 요소이다. 예를 들어 텍스트 박스, 레이블 등이 있다.
3. **바인딩 객체(Binding Object)**: 데이터 소스와 바인딩 타겟 간의 연결을 설정하는 객체이다.


## 데이터바인딩의 활용
일반적으로 소스는 데이터(ViewModel)이고 타겟은 컨트롤이다. 모든 바인딩에는 소스 객체, 소스 속성, 타겟 객체 및 타겟 속성이 있다. 소스 객체는 Binding Source속성 또는 ViewModel 클래스인 경우 DataContext 속성으로 지정하면 됩니다.

데이터 바인딩은 이벤트 핸들러를 대체할 수 있는데 이는 C# 코드를 줄이는 역할을 합니다. XAML에서 정의된 데이터 바인딩은 C# 코드 비하인드 파일에서 이벤트 핸들러를 정의할 필요가 없다.


## 예제 1: 간단한 데이터바인딩

다음은 텍스트 박스와 데이터 소스 간의 간단한 데이터바인딩 예제이다.

**MainWindow.xaml**

```xml
<Window x:Class="DataBindingExample.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Data Binding Example" Height="200" Width="400">
    <Grid>
        <!-- TextBox의 Text 속성을 Person 객체의 Name 속성과 바인딩 -->
        <TextBox Text="{Binding Name, UpdateSourceTrigger=PropertyChanged}" 
                 VerticalAlignment="Center" HorizontalAlignment="Center" Width="200"/>
    </Grid>
</Window>
```
XAML의 바인딩은 DataContext로 설정된 객체의 속성을 참조하기 때문에 Binding Person이라고 하면 동작하지 않는다. 

DataContext가 Person 객체로 설정되어 있고, Person 객체의 Name 속성과 바인딩해야 한다.

UpdateSourceTrigger=PropertyChanged 속성은 Name 속성이 변경될 때마다 TextBox의 내용이 업데이트됨을 의미한다.

**MainWindow.xaml.cs**

```csharp
using System.Windows;

namespace DataBindingExample
{
    public partial class MainWindow : Window
    {
        public Person Person { get; set; }

        public MainWindow()
        {
            InitializeComponent(); // XAML을 로드하고 초기화
            Person = new Person { Name = "홍길동" }; // Person 객체 생성 및 초기화
            this.DataContext = Person; // DataContext를 Person 객체로 설정
        }
    }

    public class Person
    {
        public string Name { get; set; }
    }
}
```

Person 객체를 생성하고 Name 속성을 "홍길동"으로 초기화한다.

MainWindow의 DataContext를 Person 객체로 설정한다. 이는 XAML에서 바인딩된 모든 요소들이 이 Person 객체를 데이터 소스로 사용함을 의미한다.



## 예제 2: 컬렉션 데이터바인딩

다음은 리스트박스와 컬렉션 간의 데이터바인딩 예제이다.

**MainWindow.xaml**

```xml
<Window x:Class="DataBindingExample.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Data Binding Example" Height="300" Width="400">
    <Grid>
        <ListBox ItemsSource="{Binding People}" 
                 DisplayMemberPath="Name" 
                 HorizontalAlignment="Center" VerticalAlignment="Center" Width="200" Height="200"/>
    </Grid>
</Window>
```


**MainWindow.xaml.cs**

```csharp
using System.Collections.ObjectModel;
using System.Windows;

namespace DataBindingExample
{
    public partial class MainWindow : Window
    {
        public ObservableCollection<Person> People { get; set; }

        public MainWindow()
        {
            InitializeComponent();
            People = new ObservableCollection<Person> // ObservableCollection 객체 초기화 및 요소 추가
            {
                new Person { Name = "홍길동" },
                new Person { Name = "김철수" },
                new Person { Name = "이영희" }
            };
            this.DataContext = this; // DataContext를 MainWindow 자신으로 설정
        }
    }

    public class Person
    {
        public string Name { get; set; } // 바인딩할 속성 정의
    }
}
```

### 동작 순서 및 원리

XAML 로드 및 초기화:
- MainWindow 클래스의 생성자에서 InitializeComponent 메서드를 호출하여 XAML 파일을 로드하고 초기화한다.

데이터 컬렉션 생성:
- ObservableCollection 객체를 생성하고 초기화한다. 
- ObservableCollection은 컬렉션의 변경사항이 자동으로 UI에 반영되도록 한다.

DataContext 설정:
- MainWindow의 DataContext를 this로 설정한다.
- 이는 MainWindow 클래스의 모든 속성들이 데이터 바인딩에 사용될 수 있음을 의미한다.

데이터바인딩 설정:
- XAML에서 ListBox의 ItemsSource 속성이 People 컬렉션과 바인딩된다. 
- DisplayMemberPath를 Name으로 설정하여, ListBox가 Person 객체의 Name 속성을 표시하도록 한다.

컬렉션 변경사항 반영:
- ObservableCollection은 컬렉션의 요소가 추가되거나 제거될 때 자동으로 UI에 반영된다.


```toc

```
