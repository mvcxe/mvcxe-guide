# HttpContext

## Request
注入`IHttpContextAccessor`，里面定义了`HttpContext.Request`对象。

	TMVCXERequest = class
	published
		property PathInfo: string;
		property FileName: string;
		property ControllerName: string;
		property ActionName: string;
		property Method: string;
		property Body: string;
		property Host: string;
		property RemoteIP: string;
		property RemoteHost: string;
		property RemoteAddr: string;
		property ProtocolVersion: string;
		property URL: string;
		property Query: string;
		property From: string;
		property Referer: string;
		property UserAgent: string;
		property ServerPort: Integer;
		property RawPathInfo: string;
		property DerivedFrom: string;
		property SubDir: string;
	public
		Params: TDictionary<string, string>;
		Headers: TDictionary<string, string>;
		Cookies: TDictionary<string, string>;
	end;

### 如何使用

	uses MVCXE.HttpContext, MVCXE.HTTPApp;
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
	  Result := 'Hello '+accessor.HttpContext.Request.URL;
	end;

### 获取IP地址

	function getIpAddress: string;
	begin
	  if accessor.HttpContext.Request.Headers.ContainsKey('HTTP_X_FORWARDED_FOR') then
		Result := accessor.HttpContext.Request.Headers['HTTP_X_FORWARDED_FOR']
	  else
		Result := accessor.HttpContext.Request.RemoteIP;
	end;

## Response对象
在`TController或TWebApi`定义了Response对象，可以自定义Http返回内容。

	TMVCXEResponse = class
	published
		property ContentType: string;
		property Content: string;
		property StatusCode: Integer;
		property ContentEncoding: string;
		property IsRawData: Boolean;
		property ContentStream: TStream;
		property Location: string;
		property Server: string;
		property RedirectURI: string;
		property RawData: AnsiString;
	public
		procedure Abort;
		procedure Write(AContent: string); overload;
		procedure Write(AContent: AnsiString); overload;
		procedure Redirect(URI: string);
		procedure AddCookie(Name, Value: string; Expires: TDateTime = 0;
		Domain: string = ''; Path: string = '/'; Secure: Boolean = False;
		HttpOnly: Boolean = False);
		procedure AddHeader(Name, Value: string);
	end;

### 如何使用

	uses MVCXE.HTTPApp;
	type
	  TMyController = class(TController)
	  public
	    function Export: TMemoryStream;
	  end;
	implementation
	function TMyController.Export: TMemoryStream;
	begin
	  Response.ContentType := 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
	  Response.AddHeader('Content-Disposition', 'attachment;Filename=Goods_'+FormatDateTime('yyyyMMddHHmmss', Now)+'.xlsx');
	  Result := TMemoryStream.Create;
	end;

### Redirect

	function TPostController.Add: string;
	begin
	  if not IsLogin then
	  begin
		Response.Redirect(RouteData['Root']+'/account/login');
		Response.Abort;
		Exit;
	  end
	  else
	  begin
		Response.Location := RouteData['Root']+'/';
		Response.Abort;
	  end;
	end;