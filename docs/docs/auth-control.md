# 安全鉴权

## 什么是鉴权
鉴权实际上就是一种身份认证。

由用户提供凭据，然后将其与存储在操作系统、数据库、应用或资源中的凭据进行比较。 在授权过程中，如果凭据匹配，则用户身份验证成功，可执行已向其授权的操作。 授权指判断允许用户执行的操作的过程。 也可以将身份验证理解为进入空间（例如服务器、数据库、应用或资源）的一种方式，而授权是用户可以对该空间（服务器、数据库或应用）内的哪些对象执行哪些操作。

常见的鉴权方式

- HTTP Basic Authentication

这是 HTTP 协议实现的基本认证方式，我们在浏览网页时，从浏览器正上方弹出的对话框要求我们输入账号密码，正是使用了这种认证方式

- Session + Cookie

利用服务器端的 session（会话）和浏览器端的 cookie 来实现前后端的认证，由于 http 请求时是无状态的，服务器正常情况下是不知道当前请求之前有没有来过，这个时候我们如果要记录状态，就需要在服务器端创建一个会话(session),将同一个客户端的请求都维护在各自的会话中，每当请求到达服务器端的时候，先去查一下该客户端有没有在服务器端创建 session，如果有则已经认证成功了，否则就没有认证。

- Token

客户端在首次登录以后，服务端再次接收 HTTP 请求的时候，就只认 Token 了，请求只要每次把 Token 带上就行了，服务器端会拦截所有的请求，然后校验 Token 的合法性，合法就放行，不合法就返回 401（鉴权失败）

Token验证比较灵活，适用于大部分场景。常用的 Token 鉴权方式的解决方案是 JWT，JWT 是通过对带有相关用户信息的进行加密，加密的方式比较灵活，可以根据需求具体设计。

- OAuth

OAuth（开放授权）是一个开放标准，允许用户授权第三方网站访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方网站或分享他们数据的所有内容，为了保护用户数据的安全和隐私，第三方网站访问用户数据前都需要显式的向用户征求授权。我们常见的提供 OAuth 认证服务的厂商有支付宝、QQ 和微信。

OAuth 协议又有 1.0 和 2.0 两个版本。相比较 1.0 版，2.0 版整个授权验证流程更简单更安全，也是目前最主要的用户身份验证和授权方式。

## 如何使用

  uses MVCXE.Authorization;

> 默认的身份结构包括名字字符串，是否已认证通过，角色字符串，认证类型。

  TIdentity = record
      Name: string;
      IsAuthenticated: Boolean;
      Roles: string;
      AuthenticationType: string;
  end;

> 使用`accessor.HttpContext.User`获取包含TIdentity的接口`IPrincipal`

  IPrincipal = interface
    ['{952A2782-CE55-41C0-A155-35080914FEAA}']
    function GetIdentity: TIdentity;
    procedure SetIdentity(Value: TIdentity);
    property Identity: TIdentity read GetIdentity write SetIdentity;
    function IsInRole(const role: string): Boolean;
    procedure UpdateFormsAuthenticationTicket(Response: TMVCXEResponse; const Expires: TDateTime);
    procedure RemoveFormsAuthenticationTicket(Response: TMVCXEResponse);
  end;

  THttpContext = class
  public
    function User: IPrincipal; overload;
  end;

> 例子, 我们将登陆信息存储在TIdentity.Name中，格式是：`用户名$用户id$用户Email$是否登陆`

  type
    BaseController = class(TController)
    private
    protected
      [IOC('MVCXE.HttpContext.THttpContextAccessor')]
      accessor: IHttpContextAccessor;
      function IsLogin: Boolean;
      function CurrentAccount: String;
      function CurrentUserId: Integer;
      function EmailConfirmed: Boolean;
      function IsAdmin: Boolean;
    public
    end;

  implementation

  uses
    Fly.Authorization;

  { BaseController }

  function BaseController.CurrentAccount: String;
  var
    name: string;
  begin
    if not IsLogin then
      Result := nil
    else
    begin
      name := accessor.HttpContext.User.Identity.name;
      Result := name.Split(['$'])[0];
    end;
  end;

  function BaseController.CurrentUserId: Integer;
  var
    name: string;
  begin
    if not IsLogin then
      Result := -1
    else
    begin
      name := accessor.HttpContext.User.Identity.name;
      Result := StrToInt(name.Split(['$'])[1]);
    end;
  end;

  function BaseController.EmailConfirmed: Boolean;
  var
    name: string;
  begin
    if not IsLogin then
      Result := False
    else
    begin
      name := accessor.HttpContext.User.Identity.name;
      Result := StrToBool(name.Split(['$'])[2]);
    end;
  end;

  function BaseController.IsAdmin: Boolean;
  begin
    Result := accessor.HttpContext.User.IsInRole('admin');
  end;

  function BaseController.IsLogin: Boolean;
  begin
    Result := accessor.HttpContext.User.Identity.IsAuthenticated;
  end;

> 登陆代码

  function TAccountController.check(const email, pass, vercode: string)
    : TAccountFormResult;
  var
    User: TUsers;
    HashMD5: THashMD5;
    s: string;
    Membership: TIdentity;
  begin
    Response.ContentType := 'application/json';
    Result.success := False;
    s := accessor.HttpContext.Session.Get<string>('ValidationCode');
    if not SameText(vercode, s) then
    begin
      Result.msg := '验证码不正确.';
      Exit;
    end;
    User := UserService.GetUser(email);
    if User = nil then
    begin
      Result.msg := '找不到用户.';
      Exit;
    end;
    HashMD5 := THashMD5.Create;
    s := HashMD5.GetHashString(pass);
    if not SameText(User.Password, s) then
    begin
      Result.msg := '密码不正确.';
      Exit;
    end;
    Membership.Name := User.Email + '$' + IntToStr(User.Id) + '$' + BoolToStr(User.EmailConfirmed) + '$' + BoolToStr(User.IsAdmin);
    Membership.IsAuthenticated := True;
    if User.IsAdmin then
      Membership.Roles := 'admin,';
    accessor.HttpContext.User.Identity := Membership;
    accessor.HttpContext.User.UpdateFormsAuthenticationTicket(Response, Now+30);

    Result.msg := '登陆成功.';
    User.Password := '';
    Result.user := User;
    Result.success := True;
  end;

## 自定身份验证类

> 自定我们的身份验证类TMyPrincipal

    uses
      System.Classes, System.SysUtils, MVCXE.HTTPApp, MVCXE.HttpContext,
      Fly.Model.Users;

    type
      TMyPrincipal = class(BasePrincipal)
      const SecretKey = 'Fly.Authorization';
      const CookieKey = 'Fly.Authorization';
      private
        FAuthorization: string;
        FIdentity: TUsers;
        procedure TrySetUserInfo;
        function FormsAuthenticationTicket: string;
      public
        function Identity: TUsers;
        function IsInRole(const role: string): Boolean;
        procedure SignIn(const User: TUsers);
        procedure UpdateFormsAuthenticationTicket(Response: TMVCXEResponse; const Expires: TDateTime);
        procedure RemoveFormsAuthenticationTicket(Response: TMVCXEResponse);
      end;

> TMyPrincipal中Identity是获取身份的方法，它一般返回用户表的实体类，也可以自定义，其它辅助方法可以自由添加。

  uses
    MVCXE.JWT;

  { TMyPrincipal }

  function TMyPrincipal.FormsAuthenticationTicket: string;
  var
    JwtBearer: TJwtBearer;
  begin
    JwtBearer := TJwtBearer.Create;
    JwtBearer.SecretKey := SecretKey;
    JwtBearer.Algorithm := TJWTAlgorithm.HS256;
    JwtBearer.Subject := 'Fly Authentication Ticket';
    JwtBearer.Audience := 'Fly';
    JwtBearer.AddClaim('MemberShip', Identity);
    Result := JwtBearer.Token;
  end;

  procedure TMyPrincipal.TrySetUserInfo;
  var
    JwtBearer: TJwtBearer;
  begin
    //演示用cookie来记录登陆状态，也可以用session
    if HttpContext.Request.Cookies.ContainsKey(CookieKey) then
      FAuthorization := HttpContext.Request.Cookies[CookieKey];
    if FAuthorization<>'' then
    begin
      try
        JwtBearer := TJwtBearer.Create(FAuthorization,SecretKey);
        FIdentity := JwtBearer.GetClaim<TUsers>('MemberShip');
      except
      end;
      if Assigned(JwtBearer) then
        FreeAndNil(JwtBearer);
    end;
  end;

  procedure TMyPrincipal.UpdateFormsAuthenticationTicket(Response: TMVCXEResponse;
    const Expires: TDateTime);
  begin
    Response.AddCookie(CookieKey, FormsAuthenticationTicket, Expires);
  end;

  procedure TMyPrincipal.RemoveFormsAuthenticationTicket(
    Response: TMVCXEResponse);
  begin
    Response.AddCookie(CookieKey, '', 0);
  end;

  function TMyPrincipal.Identity: TUsers;
  begin
    if not Assigned(FIdentity) then
    begin
      TrySetUserInfo;
    end;
    Result := FIdentity;
  end;

  function TMyPrincipal.IsInRole(const role: string): Boolean;
  begin
    Result := False;
    if Not Assigned(FIdentity) then
      FIdentity := Identity;
    if Assigned(FIdentity) and (FIdentity.Id>0) then
    begin
      if role='admin' then
        Result := FIdentity.IsAdmin;
    end;
  end;

  procedure TMyPrincipal.SignIn(const User: TUsers);
  begin
    FIdentity := User;
  end;

> 上面的例子，使用cookie记录了一个身份信息的JWT token字符串，如果不使用cookie也可以用Session记录，也可以用HttpHeader的Authorization来记录。

> 使用`accessor.HttpContext.User<TMyPrincipal>`获取我们自定的身份验证类TMyPrincipal

  function TAccountController.check(const email, pass, vercode: string)
    : TAccountFormResult;
  var
    User: TUsers;
    HashMD5: THashMD5;
    s: string;
  begin
    Response.ContentType := 'application/json';
    Result.success := False;
    s := accessor.HttpContext.Session.Get<string>('ValidationCode');
    if not SameText(vercode, s) then
    begin
      Result.msg := '验证码不正确.';
      Exit;
    end;
    User := UserService.GetUser(email);
    if User = nil then
    begin
      Result.msg := '找不到用户.';
      Exit;
    end;
    HashMD5 := THashMD5.Create;
    s := HashMD5.GetHashString(pass);
    if not SameText(User.Password, s) then
    begin
      Result.msg := '密码不正确.';
      Exit;
    end;

    with accessor.HttpContext.User<TMyPrincipal> do
    begin
      SignIn(User);
      UpdateFormsAuthenticationTicket(Response, Now+30);
    end;

    Result.msg := '登陆成功.';
    User.Password := '';
    Result.user := User;
    Result.success := True;
  end;

## WebApi验证

> 创建我们的验证类

  type
    TFerryAuthorization = class(TAuthorization)
    private
      [IOC('MVCXE.HttpContext.THttpContextAccessor')]
      accessor: IHttpContextAccessor;
    published
    public
      procedure OnAuthorization; override;
    end;
  implementation
  { TFerryAuthorization }

  procedure TFerryAuthorization.OnAuthorization;
  begin
    inherited;
    isAuth := True;
    if AuthorizeParam = 'dashboard' then
    begin
      if not accessor.HttpContext.User<TFerryPrincipal>.IsAuthenticated then
      begin
        isAuth := False;
        Response.Content := '{"code":401,"msg":"cookie token is empty"}';
      end;
    end
    else if AuthorizeParam = 'index' then
    begin
      if not accessor.HttpContext.User<TFerryPrincipal>.IsAuthenticated then
      begin
        isAuth := False;
        Response.StatusCode := 403;
        Exit;
      end;
    end
    else if AuthorizeParam = 'admin' then
    begin
      if not accessor.HttpContext.User<TFerryPrincipal>.IsAuthenticated then
      begin
        isAuth := False;
        Response.StatusCode := 403;
        Exit;
      end;
    end;
  end;

> 在WebApi中用`[Authorize]`标记该Api或某方法使用我们定义的验证类，当访问这些Api的时候，`MVCXE`框架会先触发我们定义的验证类的OnAuthorization，如果验证不通过，返回Response的StatusCode并结束这次处理。

  type
    TsysUserWebApi = class(BackendBaseWebApi)
    private
      [IOC]
      SysService: ISysService;
    public
      constructor Create;
      [Authorize('Ferry.Authorization.TFerryAuthorization', 'dashboard')]
      function GET: TSysUserResult;
      [Authorize('Ferry.Authorization.TFerryAuthorization', 'dashboard')]
      function POST([FormBody]user: TSysUser): TSysUserResult;
    end;
  implementation
  function TsysUserWebApi.GET: TSysUserResult;
  begin
    Result.code := 200;
    Result.data.posts := SysService.Posts;
    Result.data.roles := SysService.Roles;
    Result.msg := '';
  end;

  function TsysUserWebApi.POST(user: TSysUser): TSysUserResult;
  begin
    Result.code := 200;
    if SysService.UserByName(user.username).user_id>0 then
    begin
      Result.code := -1;
      Result.msg := '账户已存在！';
      Exit;
    end;
    user.create_by := IntToStr(current_user.user_id);
    user.update_by := IntToStr(current_user.user_id);
    user.create_time := Now;
    user.password := THashMD5.GetHashString(user.password);
    try
    if SysService.SaveUser(user)<1 then
    begin
      Result.code := -1;
      Result.msg := '保存失败！';
      Exit;
    end;
    except
      on e:Exception do
      begin
        Result.code := -1;
        Result.msg := '保存失败！'+e.Message;
        Exit;
      end;
    end;
    Result.msg := '保存成功！';
  end;