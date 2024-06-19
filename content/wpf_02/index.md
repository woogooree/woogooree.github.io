---
emoji: 📘
title: WPF XAML과 코드비하인드(CS) 구조 이해
date: '2024-06-08'
author: 심우진
tags: WPF XAML CS 그리드 
categories: WPF
---

## 1. XAML

**XAML (Extensible Application Markup Language)**은 WPF에서 UI를 정의하는 데 사용되는 XML 기반 언어이다. XAML을 사용하면 UI를 선언적으로 정의할 수 있다.

```xml
<Window x:Class="WpfApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="MainWindow" Height="350" Width="525">
    <Grid>
        <Button Content="Click Me" Width="100" Height="50" />
    </Grid>
</Window>
```

이 예제는 간단한 윈도우와 버튼을 정의하는 XAML 코드이다.

## 2. 코드 비하인드

XAML과 연결된 C# 코드를 코드 비하인드라고 한다. 이는 XAML로 정의된 UI 요소에 대한 이벤트 핸들러 및 기타 논리를 포함한다.

```csharp
using System.Windows;

namespace WpfApp
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
```

## 3. 레이아웃

WPF XAML은 다양한 레이아웃 컨테이너를 제공하여 UI 요소를 배치할 수 있다. 
주요 레이아웃 컨테이너는 다음과 같다 : 
- **Grid**: 행과 열로 구성된 격자 레이아웃
- **StackPanel**: 수직 또는 수평으로 요소를 쌓는 레이아웃
- **DockPanel**: 요소를 도킹하여 배치하는 레이아웃
- **Canvas**: 절대 위치를 사용하여 요소를 배치하는 레이아웃

```xml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="*"/>
        <ColumnDefinition Width="2*"/>
    </Grid.ColumnDefinitions>

    <Button Grid.Row="0" Grid.Column="0" Content="Button 1"/>
    <Button Grid.Row="0" Grid.Column="1" Content="Button 2"/>
    <Button Grid.Row="1" Grid.Column="0" Content="Button 3"/>
    <Button Grid.Row="1" Grid.Column="1" Content="Button 4"/>
</Grid>
```

### 그리드 기본 사용법
그리드는 Grid.RowDefinitions와 Grid.ColumnDefinitions를 사용하여 행과 열을 정의한다.
(Height와 Width 속성으로 크기를 설정할 수 있고 *으로 남는공간 비율 할당 및 Auto 설정 가능)
- 셀 병합은 Grid.RowSpan과 Grid.ColumnSpan 속성을 사용한다.
- 각 UI 요소는 Grid.Row와 Grid.Column 속성을 사용하여 특정 셀에 배치된다.


## 4. 데이터 바인딩

WPF의 데이터 바인딩은 UI 요소를 데이터 소스에 연결하는 강력한 기능이다. 
이는 MVVM(Model-View-ViewModel) 패턴에서 중요한 역할을 한다.

```xml
<TextBox Text="{Binding Path=Name}" Width="200"/>
```

```csharp
public class Person
{
    public string Name { get; set; }
}

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
        this.DataContext = new Person { Name = "John Doe" };
    }
}
```

## 5. 스타일과 템플릿

WPF XAML은 스타일과 템플릿을 사용하여 UI 요소의 모양과 동작을 정의할 수 있다.

- **스타일**: 여러 UI 요소에 공통적으로 적용되는 속성 집합

```xml
<Window.Resources>
    <Style TargetType="Button">
        <Setter Property="Background" Value="LightBlue"/>
        <Setter Property="Width" Value="100"/>
    </Style>
</Window.Resources>

<Grid>
    <Button Content="Styled Button"/>
</Grid>
```

- **컨트롤 템플릿**: 컨트롤의 기본 구조와 외관을 재정의하는 템플릿

```xml
<Window.Resources>
    <ControlTemplate x:Key="MyButtonTemplate" TargetType="Button">
        <Border Background="LightGreen" BorderBrush="Black" BorderThickness="2">
            <ContentPresenter HorizontalAlignment="Center" VerticalAlignment="Center"/>
        </Border>
    </ControlTemplate>
</Window.Resources>

<Grid>
    <Button Content="Custom Template" Template="{StaticResource MyButtonTemplate}"/>
</Grid>
```

#### 6. 이벤트 처리

WPF에서는 다양한 이벤트를 통해 사용자 인터페이스와 상호 작용할 수 있다. 
대표적인 이벤트로는 클릭, 마우스 이동, 키보드 입력 등이 있다.

```xml
<Button Content="Click Me" Click="Button_Click" Width="100" Height="50"/>
```

```csharp
private void Button_Click(object sender, RoutedEventArgs e)
{
    MessageBox.Show("Button clicked!");
}
```


## 7. 리소스(Resource)와 스타일(Style)

리소스와 스타일은 WPF 애플리케이션의 일관된 UI를 유지하고, 재사용 가능한 디자인 요소를 만들 때 유용하다.

- **StaticResource와 DynamicResource**
- **스타일과 템플릿**
- **리소스 사전 (Resource Dictionary)**

**예제**:
```xml
<Window.Resources>
    <Style TargetType="Button">
        <Setter Property="Background" Value="LightBlue"/>
        <Setter Property="Width" Value="100"/>
    </Style>
</Window.Resources>
```

## 8. 트리거(Trigger)와 애니메이션(Animation)

트리거와 애니메이션을 사용하여 인터랙티브하고 생동감 있는 UI를 만들 수 있다.

- **Property Triggers**
- **Event Triggers**
- **Data Triggers**
- **스토리보드(Storyboard)와 애니메이션**

**예제**:
```xml
<Button Content="Hover Me">
    <Button.Triggers>
        <Trigger Property="IsMouseOver" Value="True">
            <Setter Property="Background" Value="Yellow"/>
        </Trigger>
    </Button.Triggers>
</Button>
```

## 9. 명령(Command)

명령은 WPF에서 버튼 클릭과 같은 사용자 인터페이스 액션을 처리하는 방법이다. 명령 패턴을 사용하면 코드를 더 모듈화하고 재사용 가능하게 만들 수 있다.

- **ICommand 인터페이스**
- **RoutedCommand와 RoutedUICommand**
- **커맨드 바인딩 (Command Binding)**

**예제**:
```csharp
public class MyCommand : ICommand
{
    public bool CanExecute(object parameter)
    {
        return true;
    }

    public void Execute(object parameter)
    {
        MessageBox.Show("Command Executed!");
    }

    public event EventHandler CanExecuteChanged;
}
```

```xml
<Button Content="Execute Command" Command="{Binding MyCommand}"/>
```

## 10. 사용자 정의 컨트롤 (User Control)과 커스텀 컨트롤 (Custom Control)

복잡한 UI 요소를 재사용 가능한 사용자 정의 컨트롤로 분리하여 개발할 수 있다.

- **UserControl**
- **CustomControl**
- **템플릿 바인딩 (Template Binding)**

**예제**:
```xml
<UserControl x:Class="WpfApp.MyUserControl">
    <Grid>
        <TextBlock Text="Hello, User Control!"/>
    </Grid>
</UserControl>
```

## 요약

아주 간단하게 말해서 XAML 파일에서 프론트엔드 부분을 구현하고
CS 파일에서 백엔드 로직을 구현하는 식의 구조를 가지고 있다.

```toc

```
