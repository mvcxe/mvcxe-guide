# 会话和状态管理

## 关于会话和状态管理
HTTP 是无状态的协议。 默认情况下，HTTP 请求是不保留用户值的独立消息。但是我们可以通过以下几种方式保留请求用户数据：

- Cookie：通常存储在客户端的数据，请求时带回服务端
- Session：存储在服务端的数据（可以在存储在内存、进程等介质中）
- Query Strings：通过 Http 请求地址参数共享
- Cache：服务端缓存，包括内存缓存、分布式内存缓存、IO 缓存、序列化缓存以及数据库缓存

## 如何使用
### Cookie 使用

- 读取`Cookies`

Cookies类型是：`TDictionary<string, string>`

    uses MVCXE.HttpContext;
    type
      TMyWebApi = class(TWebApi)
      protected
        [IOC('MVCXE.HttpContext.THttpContextAccessor')]
        accessor: IHttpContextAccessor;
      public
        function GET: string;
      end;
    implementation
    function TMyWebApi.GET: string;
    begin
        if accessor.HttpContext.Request.Cookies.ContainsKey('CookieKey') then
            Result := 'Hello '+accessor.HttpContext.Request.Cookies['CookieKey'];
    end;

- 设置`Cookies`

在WebApi/Controller中，定义了Response对象，使用Response的AddCookie设置Cookies

    procedure AddCookie(Name, Value: string; Expires: TDateTime = 0;
        Domain: string = ''; Path: string = '/'; Secure: Boolean = False;
        HttpOnly: Boolean = False);

例

    type
      TMyWebApi = class(TWebApi)
      protected
      public
        function GET: string;
      end;
    implementation
    function TMyWebApi.GET: string;
    begin
        Response.AddCookie('CookieKey', 'CookieValue');
        Response.AddCookie('CookieKey1', 'CookieValue', Now+1);
        Response.AddCookie('CookieKey1', 'CookieValue', 0, 'mvcxe.com', '/');
    end;

- 删除`Cookies`

        Response.AddCookie('CookieKey', '');

### Session 使用
在使用 Session 之前，必须注册`Session`服务，当前实现了Inproc的服务，以后会增加数据库，redis等的实现。

    app.UseSession('MVCXE.Session.Inproc.TInprocSession');

- 读取 Session

        uses MVCXE.HttpContext;
        type
        TMyController = class(TController)
        protected
            [IOC('MVCXE.HttpContext.THttpContextAccessor')]
            accessor: IHttpContextAccessor;
        public
            function Home: string;
        end;
        implementation
        function TMyController.Home: string;
        begin
        if accessor.HttpContext.Session.Contains('UserId') then
            ViewBag.Add('UserId', accessor.HttpContext.Session.Get<Integer>('UserId'));
        ViewBag.Add('UserName', accessor.HttpContext.Session.Get<string>('UserName'));
        Result := View;
        end;

- 设置 Session

        function TMyController.Home: string;
        begin
        accessor.HttpContext.Session.Put<Integer>('UserId', 1);
        accessor.HttpContext.Session.Put<string>('UserName', 'MVCXE');
        Result := View;
        end;

- 删除 Session

        function TMyController.Home: string;
        begin
        accessor.HttpContext.Session.Remove('UserId');
        accessor.HttpContext.Session.Clear;
        Result := View;
        end;

## Query Strings 使用

    uses MVCXE.HttpContext;
    type
      TMyWebApi = class(TWebApi)
      protected
        [IOC('MVCXE.HttpContext.THttpContextAccessor')]
        accessor: IHttpContextAccessor;
      public
        function GET: string;
      end;
    implementation
    function TMyWebApi.GET: string;
    begin
        if accessor.HttpContext.Request.Params.ContainsKey('QueryKey') then
            Result := 'Hello '+accessor.HttpContext.Request.Params['QueryKey'];
    end;

### Cache 方式
参见 [分布式缓存](cache.md) 文档

