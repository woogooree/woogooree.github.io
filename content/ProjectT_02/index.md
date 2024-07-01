---
emoji: 💻
title: WPF TCP 채팅 프로젝트 소스코드
date: '2024-06-26'
author: 심우진
tags: WPF TCP Socket 채팅
categories: WPF PROJECT
---

## 코드 설명

MVVM 구조로 만들어서 
View 는 MainWindow 하나로 구성되어 있고
주요 기능은 MainWindow에서 MainViewModel을 호출하는 구조
코어기능과 통신을 담당하는 기능은 Core 폴더와 Net.IO 폴더로 따로 작성하였고
복잡한 디자인은 Themes 폴더에 xaml 로 작성해서 스타일을 적용하는 방식으로 구현하였음

클라이언트에서 통신을 담당하는 Server.cs 파일과
따로 만든 콘솔앱 서버와 통신하는 서버-클라이언트 구조로 구현하였음


### View (MainWindow.xaml) 코드

```xml
<Window x:Class="WpfVanillaChat.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WpfVanillaChat" xmlns:viewmodel="clr-namespace:WpfVanillaChat.MVVM.ViewModel"
        mc:Ignorable="d"
        Height="650" Width="1200"
        Background="#36393F"
        WindowStyle="None"
        AllowsTransparency="True"
        ResizeMode="CanResizeWithGrip">

    <Window.DataContext>
        <viewmodel:MainViewModel/>
    </Window.DataContext>

    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="25"/>
            <RowDefinition/>
        </Grid.RowDefinitions>

        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="200"/>
            <ColumnDefinition/>
        </Grid.ColumnDefinitions>

        <Border Grid.ColumnSpan="2" Background="#252525" MouseDown="Border_MouseDown">
            <Grid HorizontalAlignment="Stretch">
                <Label Content="VanillaChat"
                       Foreground="Gray"
                       FontWeight="SemiBold"/>
                <StackPanel HorizontalAlignment="Right"
                            Orientation="Horizontal">
                    <Button x:Name="btnMinimaze" Width="20" Height="20" 
                            Content="_" Background="Transparent" 
                            BorderThickness="0" 
                            Foreground="Gray" 
                            FontWeight="Bold" 
                            Margin="0,0,0,3" 
                            Click="btnMinimaze_Click"/>
                    <Button x:Name="btnWindowState" Width="20" Height="20" 
                            Content="[ ]" Background="Transparent" 
                            BorderThickness="0" 
                            Foreground="Gray" 
                            FontWeight="Bold" 
                            Click="btnWindowState_Click"/>
                    <Button x:Name="btnClose" Width="20" Height="20" 
                            Content="X" Background="Transparent" 
                            BorderThickness="0" 
                            Foreground="Gray" 
                            FontWeight="Bold" 
                            Click="btnClose_Click"/>
                </StackPanel>
            </Grid>
        </Border>

        <Grid Background="#2F3136" Grid.Row="1">
            <Grid.RowDefinitions>
                <RowDefinition Height="50"/>
                <RowDefinition/>
                <RowDefinition Height="60"/>
            </Grid.RowDefinitions>

            <Label Content="@Channel" VerticalAlignment="Center" FontWeight="SemiBold" Foreground="White" Margin="8,0,0,0"/>
            <ListView ItemsSource="{Binding Users}" 
                      SelectedItem="{Binding SelectedContact}"
                      Background="Transparent" 
                      BorderThickness="0" Grid.Row="1" 
                      ItemContainerStyle="{StaticResource ContactCard}"/>
            
            <StackPanel Grid.Row="2">
                <TextBox Height="30"
                         Background="#292B2F"
                         Foreground="White"
                         FontWeight="SemiBold"
                         Text="{Binding Username, UpdateSourceTrigger=PropertyChanged}"/>
                <Button Height="30"
                        Background="#292B2F"
                        Foreground="White"
                        FontWeight="SemiBold"
                        Content="Connect"
                        Command="{Binding ConnectToServerCommand}"/>
            </StackPanel>
        </Grid>

        <Grid Grid.Column="1" Grid.Row="1">
            <Grid.RowDefinitions>
                <RowDefinition Height="50"/>
                <RowDefinition/>
                <RowDefinition Height="60"/>
            </Grid.RowDefinitions>

            <Border BorderBrush="#2F3136" BorderThickness="0,0,0,2">
                <Grid HorizontalAlignment="Stretch" Margin="8">
                    <Label Content="@Username" Foreground="White" FontWeight="Bold" Margin="5,0,5,0" VerticalAlignment="Center"/>
                    <StackPanel Orientation="Horizontal" HorizontalAlignment="Right">
                        <Image Width="20" Height="20" RenderOptions.BitmapScalingMode="Fant" Margin="5,0,5,0" Source="./Icons/call.png"/>
                    </StackPanel>
                </Grid>
            </Border>

            <ListView ItemsSource="{Binding Chats}"
                      Background="Transparent" BorderThickness="0"
                      Foreground="White" FontSize="16"
                      Margin="8,0,0,0"
                      Grid.Row="1"/>

            <Grid Grid.Row="2">
                <Grid.ColumnDefinitions>
                    <ColumnDefinition/>
                    <ColumnDefinition Width="90"/>
                </Grid.ColumnDefinitions>

                <TextBox Grid.Row="1" Height="59" Width="910" HorizontalAlignment="Left"
                         VerticalAlignment="Stretch"
                         VerticalContentAlignment="Center"
                         
                         Text="{Binding Chat, UpdateSourceTrigger=PropertyChanged}"
                         Grid.ColumnSpan="2"
                         Background="#292B2F"
                         BorderThickness="1"
                         Foreground="White"
                         FontWeight="Medium"/>

                <StackPanel Orientation="Horizontal" Width="90"
                            HorizontalAlignment="Right"
                            Background="#292B2F"
                            Grid.Column="1">

                    <Button Content="Enter" 
                            Height="59"
                            Width="89"
                            Background="#292B2F"
                            Foreground="White"
                            FontSize="20"
                            Command="{Binding SendMessageCommand}"
                            />
                </StackPanel>
            </Grid>
        </Grid>
    </Grid>
</Window>
```

### ViewModel 구성 요소

```csharp
namespace WpfVanillaChat.MVVM.ViewModel
{
    public class MainViewModel : INotifyPropertyChanged
    {
        public ObservableCollection<UserModel> Users { get; set; } = new ObservableCollection<UserModel>();
        public ObservableCollection<string> Chats { get; set; } = new ObservableCollection<string>();
        public ObservableCollection<ContactModel> Contacts { get; set; } = new ObservableCollection<ContactModel>();
        public ObservableCollection<MessageModel> Messages { get; set; } = new ObservableCollection<MessageModel>();

        /* Commands */

        public ICommand ConnectToServerCommand { get; set; }
        public ICommand SendMessageCommand { get; set; }
        

        /* Username 선언 */

        private string _username = string.Empty;
        public string Username
        {
            get => _username;
            set
            {
                if (_username != value)
                {
                    _username = value;
                    OnPropertyChanged();
                }
            }
        }

        /* Chat 선언 */
        private string _chat = string.Empty;
        public string Chat
        {
            get => _chat;
            set
            {
                if (_chat != value)
                {
                    _chat = value;
                    OnPropertyChanged();
                }
            }
        }

        /* ContactModel 선언 */
        private ContactModel _selectedcontact = new ContactModel();

        public ContactModel Selectedcontact
        {
            get { return _selectedcontact; }
            set
            {
                _selectedcontact = value;
                OnPropertyChanged();
            }
        }

        /* 서버&파이어베이스 선언 */
        private readonly Server _server;
        private readonly FirebaseHelper _firebaseHelper;

        public MainViewModel()
        {
            _server = new Server();
            _firebaseHelper = new FirebaseHelper();

            _server.UserConnectedEvent += UserConnected;
            _server.MsgReceivedEvent += MessageReceived;
            _server.UserDisconnectedEvent += RemoveUser;

            ConnectToServerCommand = new RelayCommand(async o => await ConnectToServer(), o => !string.IsNullOrEmpty(Username));
            SendMessageCommand = new RelayCommand(async o => await SendMessage(), o => !string.IsNullOrEmpty(Chat));
        }
        private async Task ConnectToServer()
        {
            _server.ConnectToServer(Username);
            await LoadMessages();
        }

        /* Chat Load&Send 1:N */
        private async Task LoadMessages()
        {
            if (Users.Count > 1)
            {
                var roomname = GetRoomName(Users.Select(u => u.Username).ToList());
                var chats = await _firebaseHelper.LoadMessagesAsync(roomname);
                Application.Current.Dispatcher.Invoke(() =>
                {
                    Chats.Clear();
                    foreach (var chat in chats)
                    {
                        Chats.Add(chat);
                    }
                });
            }
        }

        private async Task SendMessage()
        {
            if (Users.Count > 1)
            {
                var roomname = GetRoomName(Users.Select(u => u.Username).ToList());
                await _server.SendMessageToServer(Chat, roomname);
                await _firebaseHelper.SaveMessageAsync(roomname, Username, Chat);
                Chat = string.Empty; // 메시지 전송 후 입력창 비우기
            }
        }

        /* Action */
        private async void UserConnected(string username, string uid)
        {
            var user = new UserModel
            {
                Username = username,
                UID = uid,
            };

            if (!Users.Any(x => x.UID == user.UID))
            {
                Application.Current.Dispatcher.Invoke(() => Users.Add(user));
                await LoadMessages(); // 사용자 연결 시 메시지 불러오기 시도
            }
        }

        private void MessageReceived()
        {
            if (_server.PacketReader != null)
            {
                var msg = _server.PacketReader.ReadMessage();
                
                Application.Current.Dispatcher.Invoke(() => Chats.Add(msg));
            }
        }

        private void RemoveUser()
        {
            if (_server.PacketReader != null)
            {
                var uid = _server.PacketReader.ReadMessage();
                var user = Users.FirstOrDefault(x => x.UID == uid);
                if (user != null)
                {
                    Application.Current.Dispatcher.Invoke(() => Users.Remove(user));
                }
            }
        }

        /* RelayCommend 추가 */
        public event PropertyChangedEventHandler? PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string propertyName = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        private string GetRoomName(List<string> usernames)
        {
            var users = usernames;
            users.Sort();
            return $"ChatRoom_{string.Join("_", users)}";
        }
    }
}            
```

- 옵저버블컬렉션으로 리스트 관리
Users: 현재 연결된 사용자 목록을 관리하는 ObservableCollection<UserModel>.
Chats: 현재 채팅방의 메시지 목록을 관리하는 ObservableCollection<string>.
Contacts: 사용자의 연락처 목록을 관리하는 ObservableCollection<ContactModel>.
Messages: 개별 메시지 모델을 관리하는 ObservableCollection<MessageModel>.

- 명령(Command) 및 데이터 바인딩
릴레이커맨드를 만들어서 적용하는 방식을 시도함.
ConnectToServerCommand: 서버에 연결하는 명령.
SendMessageCommand: 메시지를 전송하는 명령.

- 사용자 이름 및 채팅 내용 관리
Username: 사용자의 이름을 저장하고 변경을 알리는 속성.
Chat: 현재 입력된 채팅 메시지를 저장하고 변경을 알리는 속성.

### TCP 클라이언트 부분 구현

```csharp
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using WpfVanillaChat.Firebase;
using WpfVanillaChat.Net.IO;

namespace WpfVanillaChat.Net
{
    public class Server
    {
        private readonly TcpClient _client;
        public PacketReader? PacketReader { get; private set; }
        private readonly FirebaseHelper _firebaseHelper;

        public event Action<string, string>? UserConnectedEvent;
        public event Action? MsgReceivedEvent;
        public event Action? UserDisconnectedEvent;

        private string _username = string.Empty;

        public Server() 
        {
            _client = new TcpClient();
            _firebaseHelper = new FirebaseHelper();
        }

        public void ConnectToServer(string username)
        {
            if (!_client.Connected) 
            {
                _username = username;
                _client.Connect("127.0.0.1", 7891);
                PacketReader = new PacketReader(_client.GetStream());

                if (!string.IsNullOrEmpty(username)) 
                {
                    var connectPacket = new PacketBuilder();
                    connectPacket.WriteOpCode(0);
                    connectPacket.WriteMessage(username);
                    _client.Client.Send(connectPacket.GetPacketBytes());
                }
                ReadPackets();             
            }
        }

        private void ReadPackets()
        {
            Task.Run(() =>
            {
                while (true)
                {
                    if (PacketReader == null)
                        continue;

                    var opcode = PacketReader.ReadByte();
                    switch (opcode)
                    {
                        case 1:
                            var username = PacketReader.ReadMessage();
                            var uid = PacketReader.ReadMessage();
                            UserConnectedEvent?.Invoke(username, uid);
                            break;
                        case 5:
                            MsgReceivedEvent?.Invoke();
                            break;
                        case 10:
                            UserDisconnectedEvent?.Invoke();
                            break;
                        default:
                            Console.WriteLine("Unknown opcode received...");
                            break;
                    }
                }
            });
        }

        public async Task SendMessageToServer(string chat, string roomname)
        {
            var messagePacket = new PacketBuilder();
            messagePacket.WriteOpCode(5);
            messagePacket.WriteMessage(chat);
            _client.Client.Send(messagePacket.GetPacketBytes());

            await _firebaseHelper.SaveMessageAsync(roomname, _username, chat);
        }
    }
}
```

Net.IO 폴더에 패킷빌더와 패킷리더를 구현하고 호출하는 방식으로 작성함

### 서버 콘솔앱

```csharp
using System.Net;
using System.Net.Sockets;
using System.Collections.Generic;
using VanillaServer.Net.IO;

namespace VanillaServer
{
    public class Program
    {
        private static readonly List<Client> _users = new();
        private static readonly TcpListener _listener = new(IPAddress.Parse("127.0.0.1"), 7891);
        static void Main(string[] args)
        {
            _listener.Start();

            while (true)
            {
                var client = new Client(_listener.AcceptTcpClient());
                _users.Add(client);
                SendUserList(client);
                BroadcastConnection(client);
            }
        }
        private static void SendUserList(Client client)
        {
            foreach (var usr in _users)
            {
                var userListPacket = new PacketBuilder();
                userListPacket.WriteOpCode(1);
                userListPacket.WriteMessage(usr.Username);
                userListPacket.WriteMessage(usr.UID.ToString());
                client.ClientSocket.Client.Send(userListPacket.GetPacketBytes());
            }
        }
        private static void BroadcastConnection(Client newClient)
        {
            foreach (var client in _users)
            {
                if (client == newClient) continue; // 이미 신규 클라이언트에게는 보냈으므로 생략
                var broadcastPacket = new PacketBuilder();
                broadcastPacket.WriteOpCode(1);
                broadcastPacket.WriteMessage(newClient.Username);
                broadcastPacket.WriteMessage(newClient.UID.ToString());
                client.ClientSocket.Client.Send(broadcastPacket.GetPacketBytes());
            }
        }

        public static void BroadcastMessage(string message) 
        {
            foreach (var user in _users)
            {
                var msgPacket = new PacketBuilder();
                msgPacket.WriteOpCode(5);
                msgPacket.WriteMessage(message);
                user.ClientSocket.Client.Send(msgPacket.GetPacketBytes());
            }
        }

        public static void BroadcastDisconnect(string uid)
        {
            var disconnectedUser = _users.FirstOrDefault(x => x.UID.ToString() == uid);
            if (disconnectedUser != null)
            {
                _users.Remove(disconnectedUser);

                foreach (var user in _users)
                {
                    var broadcastPacket = new PacketBuilder();
                    broadcastPacket.WriteOpCode(10);
                    broadcastPacket.WriteMessage(uid);
                    user.ClientSocket.Client.Send(broadcastPacket.GetPacketBytes());
                }

                BroadcastMessage($"[{disconnectedUser.Username}] Disconnected!");
            }
        }
    }
}
```

```csharp
using System.Net.Sockets;
using VanillaServer.Net.IO;

namespace VanillaServer
{
    public class Client
    {
        public string Username { get; set; }
        public Guid UID { get; set; }
        public TcpClient ClientSocket { get; set; }

        PacketReader _PacketReader;
        
        public Client(TcpClient client)
        {
            ClientSocket = client;
            UID = Guid.NewGuid();
            _PacketReader = new PacketReader(ClientSocket.GetStream());

            var opcode = _PacketReader.ReadByte();
            Username = _PacketReader.ReadMessage();

            Console.WriteLine($"[{DateTime.Now}]: Client has Connected With the username: {Username}");

            Task.Run(Process);
        }

        private void Process()
        {
            while (true)
            {
                try
                {
                    var opcode = _PacketReader.ReadByte();
                    switch (opcode)
                    {
                        case 5:
                            var msg = _PacketReader.ReadMessage();
                            Console.WriteLine($"[{DateTime.Now}]: Message received! {msg}");
                            Program.BroadcastMessage($"[{DateTime.Now}]: [{Username}]: {msg}");
                            break;
                        default:
                            break;
                    }
                }
                catch (Exception)
                {
                    Console.WriteLine($"[{UID}]: Disconnected!");
                    Program.BroadcastDisconnect(UID.ToString());
                    ClientSocket.Close();
                    break;
                }
            }
        }
    }
}
```



### Firebase 연동

```csharp
namespace WpfVanillaChat.Firebase
{
    public class FirebaseHelper
    {
        private static readonly string FirebaseDatabaseUrl = "파이어베이스 URL";
        private readonly FirebaseClient _firebaseClient;

        public FirebaseHelper()
        {
            _firebaseClient = new FirebaseClient(FirebaseDatabaseUrl);
        }

        public async Task SaveMessageAsync(string room, string username, string message)
        {
            var chatMessage = new
            {
                Username = username,
                Message = message,
                Timestamp = DateTime.UtcNow
            };

            await _firebaseClient
                .Child("ChatRooms")
                .Child(room)
                .Child("Messages")
                .PostAsync(chatMessage);
        }

        public async Task<List<string>> LoadMessagesAsync(string room)
        {
            var messages = await _firebaseClient
                .Child("ChatRooms")
                .Child(room)
                .Child("Messages")
                .OrderByKey()
                .OnceAsync<Dictionary<string, object>>();


            List<string> chatMessages = new List<string>();
            foreach (var message in messages)
            {
                var msg = message.Object;
                chatMessages.Add($"{msg["Username"]}: {msg["Message"]}");
            }

            return chatMessages;
        }
    }
}
```

리얼타임데이터베이스에 채팅로그가 저장되고 같은 유저끼리 채팅할 때 이전내용이 호출되게끔 구성함
채팅앱에 참가하는 유저의 조합으로 채팅방이름이 설정되고 같은 사람끼리 구성된 방일 경우만 채팅이 호출됨

전체 소스코드는 깃허브에 정리되어있음
https://github.com/woogooree/WpfChat/tree/main

```toc

```


