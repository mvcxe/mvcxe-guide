# 微服务

## 关于微服务
微服务是一种开发软件的架构和组织方法，微服务架构是相对于整体式架构来说的。整体式架构，所有进程紧密耦合，并可作为单项服务运行。这意味着，如果应用程序的一个进程遇到需求峰值，则必须扩展整个架构。随着代码库的增长，添加或改进整体式应用程序的功能变得更加复杂。这种复杂性限制了试验的可行性，并使实施新概念变得困难。整体式架构增加了应用程序可用性的风险，因为许多依赖且紧密耦合的进程会扩大单个进程故障的影响。

使用微服务架构，将应用程序构建为独立的组件，并将每个应用程序进程作为一项服务运行。这些服务使用轻量级 API 通过明确定义的接口进行通信。这些服务是围绕业务功能构建的，每项服务执行一项功能。由于它们是独立运行的，因此可以针对各项服务进行更新、部署和扩展，以满足对应用程序特定功能的需求。  开发框架专注于服务治理、监控、链路追踪

其中微服务开发框架，专注于服务治理、监控、链路追踪。

## RPC
微服务组件间的互通一般依托于RPC，`MVCXE`框架当前实出了`Hprose` RPC协议。

## 关于Hprose
Hprose (High Performance Remote Object Service Engine) 是一个MIT开源许可的新型轻量级跨语言跨平台的面向对象的高性能远程动态通讯中间件。它支持众多语言，例如nodeJs, C++, .NET, Java, Delphi, Objective-C, ActionScript, JavaScript, ASP, PHP, Python, Ruby, Perl 等语言，通过 Hprose 可以在这些语言之间实现方便且高效的互通。 Hprose 易学易用，且功能强大，您只需很短时间的学习，就可以用它方便地构建出跨语言跨平台分布式的电信级应用系统。

### Hprose官网
[https://hprose.com/](https://hprose.com/)

### Hprose特性

- 松散耦合的服务发布

大部分远程调用技术所发布的服务都需要单独编写，常见的服务编写方式有以下几种：

用中间语言编写接口，然后生成服务器端构架代码，然后在构架代码中填写服务代码。例如：Corba、Ice 都是采用这种中间语言方式。通过继承某个远程对象类来实现服务类。例如：.NET Remoting。通过先编写远程调用接口，再实现远程调用接口来实现服务类。例如：.NET Remoting，RMI。通过语言的某种特性来标示服务方法。例如：WCF。以上这些方式都紧密耦合方式。由于这些方式都有条件限制，你不可能将一个已有的本地函数、方法、对象或类直接发布为远程服务。 而 Hprose 所发布的服务不需要单独编写，一个已有的本地函数、方法、对象或类可以通过 Hprose 直接发布为远程服务，而不需要对它们进行任何改动，甚至连某些语言内置的函数和方法都可以直接发布为服务。因此这不但方便了新的服务编写，而且对已有系统的改造也变的非常方便。

- 同步调用和异步调用

Hprose 既支持同步调用，也支持异步调用。其同步调用方式与调用本地方法的形式几乎完全一致。异步调用方式采用回调形式来处理结果，用法相当简单直观。其用法与其它远程调用技术相比，既容易掌握，也容易使用。

- 异常处理

Hprose 不论是在服务器端还是在客户端都具有完善的异常处理机制。

在服务器端，默认情况下，服务器端发生的异常将会被包装后发送到客户端，在服务器端不做错误日志记录，这有效的提高了服务器端的处理效率。但如果需要记录错误日志，只要在服务器端挂载一个错误处理事件，即可用任何您喜欢的方式来记录错误日志，有效的提高了服务器端处理错误日志的灵活性。服务器端还可以设置为 debug 模式，这种模式下，服务器端发生异常后，会将详细的错误信息包装后发送给客户端，在服务开发阶段非常有用。

在客户端，当进行同步调用时，服务器端发生的异常（或客户端在调用时发生的网络异常）会在客户端直接抛出，通过各种语言内置的异常捕获方式就可以捕获并处理异常。当进行异步调用时，为保证线程安全，默认情况下异常不会被抛出，而是被静静的忽略，当你希望处理它们时，只需要为客户端挂载一个错误处理事件，就可以处理异步调用时发生的所有异常了。

- 多线程与线程安全

不论是 Hprose 服务器端还是客户端，都是线程安全的。因此你可以在多线程环境下安全的使用它们，而不必为每个线程创建一个对象副本。

- 性能与稳定性

Hprose 采用高效通用的序列化格式和算法，不论是序列化后的数据量还是序列化反序列化所花费的时间都远远小于其它远程调用所使用的序列化方式，因此在远程调用中与其它方式相比，完成同样功能的调用，Hprose占用更少的带宽和时间。另外在网络传输中，Hprose采用流式传输，避免了二次编码带来的效率损耗，同时有效的节省了内存和CPU的占用。

同样一台服务器在同样的带宽下，使用 Hprose 发布服务相对于其它方式来说，可以承载更大的用户量，比其它方式更加高效稳定。

- 类型映射

Hprose 序列化格式中虽然包含有完备的类型信息和到各种语言的类型映射。但它与其它远程调用不同的是，它还支持弱类型映射机制，一种 Hprose 类型可以映射为某语言中的多个类型，多种 Hprose 类型也可以映射为某语言中的一种类型。有了这种弱类型映射机制，强类型语言与弱类型语言之间的互通变得更加方便，甚至连强类型语言之间的互通都可以享受到弱类型带来的便利。

Hprose 与其它远程调用的另一点不同是，它具有很强的动态特征。例如：

它支持调用期的类型绑定。它支持可变长参数的调用。它支持引用参数传递的调用。它支持可变类型参数的调用。它支持可变类型结果的调用。它支持对不存在的方法进行调用。这些特性不仅对于动态语言来说相当有用，即便是对于静态语言来说，它同样可以享受到这些动态性带来的便利。

- 安全与身份认证

Hprose 支持通过使用 https 方式实现安全的服务发布与调用。而且 Hprose 还提供了专用于身份认证的事件机制，您只需要挂载自己需要的身份认证事件，就可以在服务被调用之前进行身份验证。

- 负载均衡

Hprose 目前基于 HTTP 传输的实现支持众多种类的 Web 服务器。任何在 Web 上可以使用的负载均衡手段，您都可以直接用于 Hprose 的服务发布中。另外，您还可以灵活的运用 Hprose 本身来实现各种复杂情况下的负载均衡。

- 事务

事务是面向数据的，而 Hprose 是面向动作的。因此 Hprose 与事务之间没有直接的联系。但是如果你需要在某种语言所发布的服务当中操作数据并需要事务处理时，你可以使用那种语言支持的方式来实现事务操作。

## 创建Hprose服务

    uses MVCXE, MVCXE.Hprose;
    type
      [Route('')]
      TMyFirstHprose = class(THprose)
      public
        function hello(const world: string): string;
      end;
    implementation
    { TMyFirstHprose }
    function TMyFirstHprose.hello(const world: string): string;
    begin
      //CustomHeader('a','b');
      //CustomHeader('cc','dd');
      Result := world;
      //raise Exception.Create('Error Message');
    end;

## Hprose路由
`Hprose`的路由格式(默认转换为小写路由地址)是：**前缀/模块名**

> 前缀

如果在`launchSettings.json`设置了该Hprose服务所在bpl的`RoutePrefix`，**以该设定为前缀**<br/>
否则**没有前缀**

> 模块名

模块名取值是控制器类名类名为T{?}Hprose的{?}部分，如果设置了控制类的属性`[Route('{自定义模块名}')]`则**用自定义模块名**

## 调用Hprose服务

    uses MVCXE.HproseClient;

    function CallHprose: string;
    var
      HproseClient: IHproseClient;
    begin
      HproseClient := THproseClient.Create('http://localhost:8080/Hprose');
      Result := HproseClient.Call('hello',['MVCXE']).AsType<string>;
      Result := HproseClient.Invoke<string>('hello',['MVCXE']);
    end;

### IHproseClient

    IHproseClient = interface
    ['{A8F5114F-9995-40FB-B346-F3507AABC8B2}']
    function GetCustomHeader: TDictionary<string, string>;
    property Header: TDictionary<string, string> read GetCustomHeader;
    function Call(const AName: string): THproseInvoke; overload;
    function Call(const AName: string; const Args: array of const)
      : THproseInvoke; overload;
    procedure CustomHeader(const name: string; const Value: string);
  end;

### 静态类`HproseClient`

    function CallHprose: string;
    begin
      Result := HproseClient.New('http://localhost:8080/Hprose').Call('hello',['MVCXE']).AsType<string>;
    end;

## Hprose序列化与反序列化
与[Json](./json-serialization.md)和[Xml](./xml-serialization.md)序列化使用方法类似。

    uses MVCXE.Hprose;
    type
      HproseSerializer = class
      public
        class function Serialize<T>(const R: T): string; overload;
        class function Serialize(const V: TValue): string; overload;
        class function Deserialize<T>(const AContent: string): T; overload;
      end;