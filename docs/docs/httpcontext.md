# HttpContext

## 获取 HttpContext
> 引入MVCXE.HttpContext单元

	uses MVCXE.HttpContext;
	
> 注入 IHttpContextAccessor

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
	  Result := 'Hello '+accessor.HttpContext.User.Identity.name;
	end;

> 在 TController或TWebApi 派生类中使用属性Response

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

