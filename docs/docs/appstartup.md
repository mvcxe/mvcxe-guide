# Startup
MVCXE框架是基于Webborker开发，一般情况下生成工程后直接关注Controller/Webapi等业务代码即可。<br/>
这里描述一下MVCXE框架是怎样加载工作的，用户可更全面了解MVCXE框架。

## Webborker程序加载MVCXE框架条件
在工程属性中勾选Link with runtime packages，引用server\include\ApplicationBuilder.pas。

全局方法function launchSettings: TLaunchSetting;功能是加载MVCXE，只要在WebModuleCreate事件触发前调用即可，如：

	initialization
	  launchSettings;

## 用Rtti创建Startup类的对象
创建IApplicationBuilder接口的实例app

	TWebModule1 = class(TWebModule)
	  procedure WebModule1DefaultHandlerAction(Sender: TObject;
		Request: TWebRequest; Response: TWebResponse; var Handled: Boolean);
	  procedure WebModuleCreate(Sender: TObject);
	  procedure WebModuleDestroy(Sender: TObject);
	private
	  app: IWebborkerBuilder;
	end;
	procedure TWebModule1.WebModuleCreate(Sender: TObject);
	var
	 instanceType: TRttiInstanceType;
	begin
	 instanceType := TRttiContext.Create.FindType
	   ('MVCXE.Builder.Webborker.Startup').AsInstance;
	 app := instanceType.GetMethod('Create').Invoke(instanceType.MetaclassType, [])
	   .AsType<IApplicationBuilder>;
	end;

## 拦截应用请求
调用IApplicationBuilder接口的实现方法Action

	procedure TWebModule1.WebModule1DefaultHandlerAction(Sender: TObject;
	 Request: TWebRequest; Response: TWebResponse; var Handled: Boolean);
	begin
	 Handled := app.Action(Request, Response);
	end;
	
## 特殊场景配置
当有下列情况，需要在WebModuleCreate中加入相关的处理代码

- 用于区分不同的运行环境

		app.UseEnvironment('Development');
		app.UseEnvironment('Staging');
		app.UseEnvironment('{Environment}');
	
- 当在IIS/Apache部署用到querystring传递rewrite路径才需要使用，一般情况不需要使用

		app.UseRewrite('urlrewrite');
	
- 响应静态文件请求(IIS/Apache/Nginx部署不需要使用)，纯Webapi模式不需使用

		app.UseStaticFiles;
	
- 有Session时使用,Webapi开发不建议使用

		app.UseSession('MVCXE.Session.Inproc.TInprocSession');
	
- 自定义Swagger信息(info是一个结构体)

		app.UseSwagger(info);
	
- MVC模式需要使用，只写Webapi不需要

		app.UseMvc;