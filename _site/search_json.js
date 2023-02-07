window.ydoc_plugin_search_json = {
  "文档": [
    {
      "title": "MVCXE环境要求支持平台",
      "content": "中国首个DELPHI MVC WEB框架Delphi 10\nDelphi 11\n运行环境\nWindows\nLinux(计划中)\n数据库\nSqlServer\nSqlite\nMySQL\nOracle\nPgSQL(计划中)\n应用部署\nIIS\nApache\nHttpSys\nLibUv\nIndy\nNginx(计划中)\n",
      "url": "\\docs\\index.html",
      "children": []
    },
    {
      "title": "先欣赏两段常见代码创建工程",
      "content": "MVC\ntype  THomeController = class(TController)\n  private\n\t[IOC]\n\tPostService: IPostService;\n  public\n\tfunction Index: string;\n  end;\nimplementation\nfunction THomeController.Index: string;\nbegin\n  ViewBag.Add('TopPosts', PostService.GetTopPosts(5));\n  Result := View;\nend;\nWebapi\ntype  [Route('user/profile')]\n  TUserWebApi = class(TWebApi)\n  private\n\t[IOC('Your.Service.UserService')]\n\tUserService: IUserService;\n  public\n\t[Authorize('Your.Authorization.YourAuthorization', 'your_role_str')]\n\tfunction GET: TUser;\n  end;\nimplementation\nfunction TUserProfileWebApi.GET: TUser;\nbegin\n  Result.code := 200;\n  Result.data := current_user;\n  Result.dept := SysService.DeptById(current_user.dept_id);\n  SetLength(Result.postIds, 1);\n  Result.postIds[0] := current_user.post_id;\n  Result.posts := SysService.Posts;\n  SetLength(Result.roleIds, 1);\n  Result.roleIds[0] := current_user.role_id;\n  Result.roles := SysService.Roles;\n  Result.msg := '';\nend;\n先将Dcp目录的文件Copy到Delphi 11的Dcp公共目录，如：C:\\Users\\Public\\Documents\\Embarcadero\\Studio\\22.0\\Dcp在Delphi IDE中打开mvcxe.groupproj，运行Project:Webborker.Console\n在控制台窗口中选择1，创建工程",
      "url": "\\docs\\installation.html",
      "children": []
    },
    {
      "title": "序言名字的由来框架特点框架依赖性能",
      "content": "聪明的程序员用Delphi，Web开发Delphi程序员不应缺席。该框架第一版开发时Delphi的版本号是XE，于是就起名为MVCXE基于Delphi 10/11平台，没有历史包袱\nBPL模块化，极少依赖\n极速上手，继承TController/TWebApi即可用\n代码无侵入性，100% 兼容原生写法\n强大的模板功能，快速开发丰富的页面\n真编译，极速加载\n为了追求极速入门，极致性能，尽可能的不使用或减少第三方依赖。目前 MVCXE 仅集成了Logpro日志控件。MVCXE是编译型，比解析型语言效率更高。",
      "url": "\\docs\\intro.html",
      "children": []
    },
    {
      "title": "StartupWebborker程序加载MVCXE框架条件用Rtti创建Startup类的对象拦截应用请求特殊场景配置",
      "content": "MVCXE框架是基于Webborker开发，一般情况下生成工程后直接关注Controller/Webapi等业务代码即可。这里描述一下MVCXE框架是怎样加载工作的，用户可更全面了解MVCXE框架。在工程属性中勾选Link with runtime packages，并用代码加载MVCXE.Core.bpl。initialization  h := LoadPackage('MVCXE.Core.bpl');\n  if h = 0 then\n\tWriteLn('Loading Package MVCXE.Core.bpl ...... failure!')\n  else\n\tWriteLn('Loading Package MVCXE.Core.bpl ...... success!');\n创建IApplicationBuilder接口的实例appprocedure TWebModule1.WebModuleCreate(Sender: TObject);var\n instanceType: TRttiInstanceType;\nbegin\n instanceType := TRttiContext.Create.FindType\n   ('MVCXE.Builder.Webborker.Startup').AsInstance;\n app := instanceType.GetMethod('Create').Invoke(instanceType.MetaclassType, [])\n   .AsType;\nend;\n调用IApplicationBuilder接口的实现方法Actionprocedure TWebModule1.WebModule1DefaultHandlerAction(Sender: TObject; Request: TWebRequest; Response: TWebResponse; var Handled: Boolean);\nbegin\n Handled := app.Action(Request, Response);\nend;\n当有下列情况，需要在WebModuleCreate中加入相关的处理代码用于区分不同的运行环境\napp.UseEnvironment('Development');app.UseEnvironment('Staging');\napp.UseEnvironment('{Environment}');\n当在IIS/Apache部署用到urlrewrite时需要使用\napp.UseRewrite('q');响应静态文件请求(IIS/Apache/Nginx部署不需要使用)，纯Webapi模式不需使用\napp.UseStaticFiles;有Session时使用,Webapi开发不建议使用\napp.UseSession('MVCXE.Session.Inproc.TInprocSession');自定义Swagger信息(info是一个结构体)\napp.UseSwagger(info);MVC模式需要使用，只写Webapi不需要\napp.UseMvc;",
      "url": "\\docs\\appstartup.html",
      "children": []
    },
    {
      "title": "配置",
      "content": "",
      "url": "\\docs\\configuration.html",
      "children": [
        {
          "title": "什么是配置",
          "url": "\\docs\\configuration.html#什么是配置",
          "content": "什么是配置简单来说，配置将系统应用可动态调配的选项放在统一地方管理，通过不同的配置让系统做出动态调整。在 MVCXE 应用程序启动时默认加载 启动项目 下的 appsettings.json 作为应用配置。同时还支持不同的运行环境加载对应的配置文件，如：Development：加载 appsettings.Development.json\nStaging：加载 appsettings.Staging.json\n{Environment}：appsettings.{Environment}.json\n"
        },
        {
          "title": "配置的使用",
          "url": "\\docs\\configuration.html#配置的使用",
          "content": "配置的使用假设我们需要在系统运行时获取系统名称、版本号及版权信息，这些信息可能随时变化而且需要在多个地方使用。这时就需要将这些信息配置起来。具体步骤如下："
        },
        {
          "title": "在appsettings.json加入配置信息",
          "url": "\\docs\\configuration.html#配置的使用-在appsettings.json加入配置信息",
          "content": "在appsettings.json加入配置信息{  \"AppInfo\": {\n\t\"Name\": \"MVCXE\",\n\t\"Version\": \"1.0.0\",\n\t\"Company\": \"Roc\"\n  }\n}\n某些 linux 系统不支持读取带 注释 的 json 文件，直接读取将会报错。需要将 json 内的注释全部 删除 才能正常读取。"
        },
        {
          "title": "读取 appsettings.json 信息",
          "url": "\\docs\\configuration.html#配置的使用-读取-appsettings.json-信息",
          "content": "读取 appsettings.json 信息在 MVCXE 框架中，提供了两种读取方式：依赖注入 IConfigurationManager 对象读取\nuses  MVCXE;\ntype\n  [Route('api/Default')]\n  TDefaultWebapi = class(TWebApi)\n  private\n\t[IOC('MVCXE.ConfigurationManager.TConfigurationManager')]\n\tconfiguration: IConfigurationManager;\n  public\n\t[HttpGet]\n\tfunction GET([IOC('MVCXE.ConfigurationManager.TConfigurationManager')] _configuration: IConfigurationManager): string;\n  end;\nimplementation\nfunction TDefaultWebapi.GET([IOC('MVCXE.ConfigurationManager.TConfigurationManager')] _configuration: IConfigurationManager): string;\nbegin\n  Result := '名称：'+configuration.Configuration['AppInfo:Name']+'，'+\n\t\t\t'版本：'+configuration.Configuration['AppInfo:Version']+'，'+\n\t\t\t'公司：'+configuration.Configuration['AppInfo:Company:Name']+'\"'+\n\t\t\t'名称：'+_configuration.Configuration['AppInfo:Name']+'，'+\n\t\t\t'版本：'+_configuration.Configuration['AppInfo:Version']+'，'+\n\t\t\t'公司：'+_configuration.Configuration['AppInfo:Company:Name']+'\"';\nend;\n通过 App.Configuration[path] 读取\nuses  MVCXE;\ntype\n  [Route('api/Default')]\n  TDefaultWebapi = class(TWebApi)\n  public\n\t[HttpGet]\n\tfunction GET: string;\n  end;\nimplementation\nfunction TDefaultWebapi.GET: string;\nbegin\n  Result := '名称：'+App.Configuration['AppInfo:Name']+'，'+\n\t\t\t'版本：'+App.Configuration['AppInfo:Version']+'，'+\n\t\t\t'公司：'+App.Configuration['AppInfo:Company:Name']+'\"';\nend;\n"
        },
        {
          "title": "如何选择读取方式",
          "url": "\\docs\\configuration.html#配置的使用-如何选择读取方式",
          "content": "如何选择读取方式在可依赖注入类中，依赖注入 IConfigurationManager 读取\n在静态类/非依赖注入类中，选择 App.Configuration[path] 读取\n"
        },
        {
          "title": "路径符 查找节点",
          "url": "\\docs\\configuration.html#路径符-查找节点",
          "content": "路径符 查找节点在 MVCXE 中，配置采用 : 分隔符来读取分层配置数据。如上述例子中的 AppInfo:Name。如有更多层级数据则只需要通过 : 进入下一层节点即可。假设我们有以下配置信息：{  \"AppInfo\": {\n\t\"Name\": \"MVCXE\",\n\t\"Version\": \"1.0.0\",\n\t\"Company\": {\n\t  \"Name\": \"Roc\",\n\t  \"Address\": {\n\t\t\"City\": \"中国\",\n\t\t\"Province\": \"广东省\",\n\t\t\"Detail\": \"广州市\"\n\t  }\n\t}\n  }\n}\n读取第二层\nappName:= App.Configuration['AppInfo:Name]; // => MVCXE读取第三层\ncompanyName:= App.Configuration['AppInfo:Company:Name]; // => Roc读取第四层\naddressDetail:= App.Configuration['AppInfo:Company:Address:Detail]; // => 广州市读取第N层\nnTier:= App.Configuration['AppInfo:Tier2:Tier3:Tier4...Tiern1:Tiern3...];查找数组节点\n有些时候我们需要或者数组特定的某些，可以通过 App.Configuration[\"array:0\"] 获取，0 是索引数字。"
        },
        {
          "title": "自定义配置文件",
          "url": "\\docs\\configuration.html#自定义配置文件",
          "content": "自定义配置文件大多情况下，我们的配置只需要在appsettings.json中配置即可，但一些特殊情况下，我们希望某些组件或功能拥有独立的配置，这个时候就需要用到自定义配置如：创建配置文件emailsetting.json\n{  \"outlook\": {\n\t\"smtp\": {\n\t  \"server\": \"smtp.office365.com\",\n\t  \"port\": \"587\",\n\t  \"ssl\": \"STARTTLS\"\n\t},\n\t\"pop\": {\n\t  \"server\": \"outlook.office365.com\",\n\t  \"port\": \"995\",\n\t  \"ssl\": \"TLS\"\n\t}\n  }\n}\nMVCXE 框架会在启动时自动扫描每一个项目层根目录下的 *.json 文件加入配置中，所以无需手工配置。读取emailsetting.json配置\nserverName:= App.Configuration['outlook:smtp:server]; // => smtp.office365.comport:= _configuration['outlook:smtp:port']; // => 587\n"
        },
        {
          "title": "不同环境读取",
          "url": "\\docs\\configuration.html#不同环境读取",
          "content": "不同环境读取在实际应用开发中，我们可能会根据不同的环境加载不同的配置文件，如 数据库连接字符串。这时我们只需要遵循特定命名规范 {name}.{Environment}.json 即可。如：appsettings.Development.json\nappsettings.Staging.json\nappsettings.Production.json\nemailsetting.Development.json\nemailsetting.Staging.json\nemailsetting.Production.json\n这时，MVCXE 会在应用启动时自动加载不同环境的配置文件。"
        },
        {
          "title": "配置的优缺点",
          "url": "\\docs\\configuration.html#配置的优缺点",
          "content": "配置的优缺点优点\n能够在系统运行时快速读取\n无需额外配置\n缺点\n存在重复读取\n通过硬编码字符串读取，容易出错\n不能设置默认值\n不能在运行环境中动态配置\n不能验证配置有效性\n不支持更改通知\n"
        }
      ]
    },
    {
      "title": "选项(开发中。。。)",
      "content": "",
      "url": "\\docs\\options.html",
      "children": [
        {
          "title": "什么是选项",
          "url": "\\docs\\options.html#什么是选项",
          "content": "什么是选项将配置文件数据用一个强类型来托管，能够实现配置验证、默认值配置、实时读取等功能。"
        },
        {
          "title": "选项的优缺点",
          "url": "\\docs\\options.html#选项的优缺点",
          "content": "选项的优缺点优点\n强类型配置\n提供多种读取方式\n支持热加载\n支持设置默认值/后期配置\n支持在运行环境中动态配置\n支持验证配置有效性\n支持更改通知\n支持命名选项\n缺点\n需要定义对应类型\n需要在启动时注册\n"
        }
      ]
    },
    {
      "title": "动态 WebAPI",
      "content": "",
      "url": "\\docs\\dynamic-api-controller.html",
      "children": [
        {
          "title": "什么是控制器",
          "url": "\\docs\\dynamic-api-controller.html#什么是控制器",
          "content": "什么是控制器简单来说，控制器是一个承上启下的作用，根据用户输入，执行响应行为（动作方法），同时在行为中调用模型的业务逻辑，返回给用户结果（视图）。"
        },
        {
          "title": "控制器的表现形式",
          "url": "\\docs\\dynamic-api-controller.html#控制器的表现形式",
          "content": "控制器的表现形式在 MVCXE 中，控制器有两种表现形式：引入MVCXE单元\nuses MVCXE;Mvc（带视图）\ntype  TMvcController = class(TController)\n  public\n\tfunction Index: string;\n  end;\nimplementation\nfunction TMvcController.Index: string;\nbegin\n  Result := View;\nend;\nWebAPI（RESTful API）\ntype  TSysUserResult = record\n\tcode: Integer;\n\tdata: TSysUserData;\n\tmsg: string;\n  end;\n  [Route('user/profile')]\n  TMyWebApi = class(TWebApi)\n  public\n\tfunction GET: TSysUserResult;\n  end;\nimplementation\nfunction TMyWebApi.GET: TSysUserResult;\nbegin\n  Result.code := 0;\n  Result.msg := '';\nend;\nMvc 控制器和 WebAPI 控制器最大的区别是 WebAPI 控制器不带 视图 和通过 请求谓词和路由地址响应行为。"
        },
        {
          "title": "控制器的约定",
          "url": "\\docs\\dynamic-api-controller.html#控制器的约定",
          "content": "控制器的约定在 MVCXE 中，MVC与WebAPI都需要遵循一些约定MVC 约定\n控制器类必须继承 TController 或间接继承\n动作方法不区分HttpVerb，如果要区分必须贴有 [HttpMethod] 特性，如：[HttpGet]\n无需手动配置 [Route] 特性，支持更加灵活的配置及自动路由生成\n生成路由地址时会自动截取控制器名称 T和Controller 之间的内容，同时也会去掉动作方法匹配的 HttpVerb 谓词，如 GET，POST，DELETE，PUT 等\n支持返回字符串或流对象，如果返回类，会序列化成json或xml\n支持 GET、HEAD 请求自动转换 类类型参数\nWebAPI 约定\n控制器类必须继承 TWebApi 或间接继承, 具备原有的 TController 所有功能\n无需手动配置 [HttpMethod] 特性，同时支持一个动作方法多个 HttpVerb\n无需手动配置 [Route] 特性，支持更加灵活的配置及自动路由生成\n支持返回泛型接口，泛型类\n和 Swagger 深度结合，提供极其方便的创建 Swagger 分组配置\n支持 Basic Auth，Jwt，ApiKey 等多种权限灵活配置\n支持 GET、HEAD 请求自动转换 类类型参数\n"
        },
        {
          "title": "注册动态 MVC/WebAPI 服务",
          "url": "\\docs\\dynamic-api-controller.html#注册动态-mvcwebapi-服务",
          "content": "注册动态 MVC/WebAPI 服务MVCXE应用构建时，我们可将应用代码写在不同的Project,他们生成bpl放于Web应用的根目录中，MVCXE会自动发现bpl中的控制器，无需手动注册。可在launchSettings.json中进行相关设置{  \"packages\": {\n\t\"EnabledPackageScan\": false,\n\t\"IgnorePackageFiles\": [\"MVCXE.Core.bpl\",\"inet280.bpl\",\"rtl280.bpl\",\"vcl280.bpl\",\"xmlrtl280.bpl\",\"IndyCore280.bpl\",\"IndyProtocols280.bpl\",\"IndySystem280.bpl\",\"dbrtl280.bpl\"],\n\t\"ExternalPackages\": [{\n\t  \"Name\": \"Test1\",\n\t  \"Area\": \"test\",\n\t  \"RoutePrefix\": \"test\"\n\t}]\n  }\n}\nEnabledPackageScan=true\nMVCXE会自动扫描加载除IgnorePackageFiles外的所有bpl文件EnabledPackageScan=false\nMVCXE会加载ExternalPackages所设定的bpl列表，Name为bpl文件名(不带扩展名.bpl)，Area是控制器配置文件及视图所在目录如果为空使用根目录，RoutePrefix是路由生成的前缀目录"
        },
        {
          "title": "第一个例子",
          "url": "\\docs\\dynamic-api-controller.html#第一个例子",
          "content": "第一个例子创建一个 TMyWebApi 类继承 TWebApi，并在这个类中编写一个 Get 方法。type  TMyWebApi = class(TWebApi)\n  public\n\tfunction GET: string;\n  end;\nimplementation\nfunction TMyWebApi.GET: string;\nbegin\n  'Hello '+Self.ToString;\nend;\n如下图所示，一个 WebAPI 接口就这么生成了。"
        },
        {
          "title": "动态 WebAPI 原理解析",
          "url": "\\docs\\dynamic-api-controller.html#动态-webapi-原理解析",
          "content": "动态 WebAPI 原理解析MVCXE 框架会在应用启动时注册 类名为T{?}Controller或T{?}WebApi控制器特性提供器，该提供器继承自TController或TWebApi类。"
        },
        {
          "title": "请求谓词默认约定",
          "url": "\\docs\\dynamic-api-controller.html#动态-webapi-原理解析-请求谓词默认约定",
          "content": "请求谓词默认约定动作方法名\n\n以 Post/Add/Create/Insert/Submit/Change 开头，则添加 [HttpPost] 特性。\n以 GetAll/GetList/Get/Find/Fetch/Query 开头，则添加 [HttpGet] 特性。\n以 Put/Update 开头，则添加 [HttpPut] 特性。\n以 Delete/Remove/Clear 开头，则添加 [HttpDelete] 特性。\n以 Patch 开头，则添加 [HttpPatch] 特性\n\n如果不在上面约定中，MVC忽略，WebAPI则默认添加 [HttpPost] 特性。\n"
        },
        {
          "title": "路由地址默认约定",
          "url": "\\docs\\dynamic-api-controller.html#动态-webapi-原理解析-路由地址默认约定",
          "content": "路由地址默认约定MVCXE 框架的路由格式(默认转换为小写路由地址)是：前缀/模块名/动作方法名/参数前缀\n如果在launchSettings.json设置了该动态WebAPI所在bpl的RoutePrefix，以该设定为前缀否则 MVC 没有前缀，WebAPI 的前缀是api模块名\n模块名取值是控制器类名类名为T{?}Controller或T{?}WebApi的{?}部分，如果设置了控制类的属性[Route('{自定义模块名}')]则用自定义模块名动作方法名\n动作方法名取值控制器类public的函数或方法名，默认去除以 Post/Add/Create/Insert/Submit，GetAll/GetList/Get/Find/Fetch/Query/Search，Put/Update，Delete/Remove/Clear，Patch 开头的字符串。如果设置了函数或方法的属性[Route('{自定义动作方法名}')]则用自定义动作方法名参数\n如果有参数这部份，以/分割为多个参数，按顺序传入动作方法对应的函数参数中"
        }
      ]
    },
    {
      "title": "HttpContext",
      "content": "",
      "url": "\\docs\\httpcontext.html",
      "children": [
        {
          "title": "获取 HttpContext",
          "url": "\\docs\\httpcontext.html#获取-httpcontext",
          "content": "获取 HttpContext引入MVCXE.HttpContext单元\nuses MVCXE.HttpContext;注入 IHttpContextAccessor\ntype  TMyWebApi = class(TWebApi)\n  protected\n    [IOC('MVCXE.HttpContext.THttpContextAccessor')]\n    accessor: IHttpContextAccessor;\n  public\n\tfunction GET: string;\n  end;\nimplementation\nfunction TMyWebApi.GET: string;\nbegin\n  'Hello '+accessor.HttpContext.User.Identity.name;\nend;\n在 TController或TWebApi 派生类中使用属性Response\ntype  TMyController = class(TController)\n  public\n\tfunction Export: TMemoryStream;\n  end;\nimplementation\nfunction TMyController.Export: TMemoryStream;\nbegin\n  Response.ContentType := 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';\n  Response.AddHeader('Content-Disposition', 'attachment;Filename=Goods_'+FormatDateTime('yyyyMMddHHmmss', Now)+'.xlsx');\n  Result := TMemoryStream.Create;\nend;\n"
        }
      ]
    },
    {
      "title": "规范化接口文档",
      "content": "",
      "url": "\\docs\\specification-document.html",
      "children": [
        {
          "title": "什么是接口文档",
          "url": "\\docs\\specification-document.html#什么是接口文档",
          "content": "什么是接口文档在现在移动为王、多端互辅、前端百花齐放的开放时代，不再是一人包揽式开发，大家各司其职，后端工程师负责接口开发，前端负责接口联调，也就是互联网现在流行的前后端分离架构。所以就需要由前后端工程师共同定义接口，编写接口文档，之后大家按照这个接口文档进行开发、维护及开放给第三方。"
        },
        {
          "title": "为什么要写接口文档",
          "url": "\\docs\\specification-document.html#为什么要写接口文档",
          "content": "为什么要写接口文档能够让前端开发与后台开发人员更好的配合，提高工作效率\n项目迭代或者项目人员更迭时，方便后期人员查看和维护\n方便测试人员进行接口测试\n"
        },
        {
          "title": "为什么需要规范化文档",
          "url": "\\docs\\specification-document.html#为什么需要规范化文档",
          "content": "为什么需要规范化文档由于每个公司后端人员技术参差不齐，技术文档能力也不例外，导致接口定义及文档五花八门，不同项目或不同公司对接极其困难，而且体验糟糕。所以，无规矩不成方圆，为了开发人员间更好的配合，迫切需要整理出一套规范。通常接口规范分为六个部分："
        },
        {
          "title": "协议规范",
          "url": "\\docs\\specification-document.html#为什么需要规范化文档-协议规范",
          "content": "协议规范为了确保不同系统/模块间的数据交互，需要事先约定好通讯协议，如：TCP、HTTP、HTTPS 协议。为了确保数据交互安全，建议使用 HTTPS 协议"
        },
        {
          "title": "接口路径规范",
          "url": "\\docs\\specification-document.html#为什么需要规范化文档-接口路径规范",
          "content": "接口路径规范作为接口路径，为了方便清晰的区分来自不同的系统，可以采用不同系统/模块名作为接口路径前缀，如：支付模块：/pay/xxx，订单模块：/order/xxx"
        },
        {
          "title": "版本控制规范",
          "url": "\\docs\\specification-document.html#为什么需要规范化文档-版本控制规范",
          "content": "版本控制规范为了便于后期接口的升级和维护，建议在接口路径中加入版本号，便于管理，实现接口多版本的可维护性。如：接口路径中添加类似\"v1\"、\"v2\"等版本号"
        },
        {
          "title": "接口命名规范",
          "url": "\\docs\\specification-document.html#为什么需要规范化文档-接口命名规范",
          "content": "接口命名规范和 Pascal 命名规范一样，好的、统一的接口命名规范，不仅可以增强其可读性，而且还会减少很多不必要的口头/书面上的解释。可使用\"驼峰命名法\"按照实现接口的业务类型、业务场景等命名，有必要时可采取多级目录命名，但目录不宜过长，两级目录较为适宜常见命名方式:接口名称动词前/后缀化： 接口名称以接口数据操作的动词为前/后缀，常见动词有：Add、Delete、Update、Query、Get、Send、Save、Detail、List等，如：新建用户 AddUser、查询订单详情 QueryOrderDetail。\n接口名称动词 + 请求方式：接口路径中包含具体接口名称的名词，接口数据操作动作以 HTTP 请求方式来区分。常用的 HTTP 请求方式有：\nGET：从服务器取出资源（一项或多项）\nPOST：在服务器新建一个资源\nPUT：在服务器更新资源（客户端提供改变后的完整资源）\nPATCH：在服务器更新资源（客户端提供改变的属性）\nDELETE：从服务器删除资源\n"
        },
        {
          "title": "请求参数规范",
          "url": "\\docs\\specification-document.html#为什么需要规范化文档-请求参数规范",
          "content": "请求参数规范请求方式：按照 GET、POST、PUT 等含义定义，避免出现不一致现象，对人造成误解、歧义请求头：请求头根据项目需求添加配置参数。如：请求数据格式，accept=application/json 等。如有需要，请求头可根据项目需求要求传入用户 token、唯一验签码等加密数据\n请求参数/请求体： 请求参数字段，尽可能与数据库表字段、对象属性名等保持一致，因为保持一致是最省事，最舒服的一件事\n"
        },
        {
          "title": "返回数据规范",
          "url": "\\docs\\specification-document.html#为什么需要规范化文档-返回数据规范",
          "content": "返回数据规范统一规范返回数据的格式，对己对彼都有好处，此处以 json 格式为例。返回数据应包含：返回状态码、返回状态信息、具体数据。返回数据中的状态码、状态信息，常指具体的业务状态，不建议和 HTTP 状态码混在一起。HTTP 状态，是用来体现 HTTP 链路状态情况，如：404-Not Found。HTTP 状态码和 json 结果中的状态码，并存尚可，用于体现不同维度的状态。"
        },
        {
          "title": "什么是 Swagger",
          "url": "\\docs\\specification-document.html#什么是-swagger",
          "content": "什么是 Swagger相信无论是前端还是后端开发，都或多或少地被接口文档折磨过。前端经常抱怨后端给的接口文档与实际情况不一致。后端又觉得编写及维护接口文档会耗费不少精力，经常来不及更新。其实无论是前端调用后端，还是后端调用后端，都期望有一个好的接口文档。但是这个接口文档对于程序员来说，就跟注释一样，经常会抱怨别人写的代码没有写注释，然而自己写起代码起来，最讨厌的，也是写注释。所以仅仅只通过强制来规范大家是不够的，随着时间推移，版本迭代，接口文档往往很容易就跟不上代码了。发现了痛点就要去找解决方案。解决方案用的人多了，就成了标准的规范，这就是 Swagger 的由来。通过这套规范，你只需要按照它的规范去定义接口及接口相关的信息。再通过 Swagger 衍生出来的一系列项目和工具，就可以做到生成各种格式的接口文档，生成多种语言的客户端和服务端的代码，以及在线接口调试页面等等。这样，如果按照新的开发模式，在开发新版本或者迭代版本的时候，只需要更新 Swagger 描述文件，就可以自动生成接口文档和客户端服务端代码，做到调用端代码、服务端代码以及接口文档的一致性。所以，Swagger 是一个规范和完整的框架，用于生成、描述、调用和可视化RESTful 风格的 Web 服务。总体目标是使客户端和文件系统作为服务器以同样的速度来更新。文件的方法、参数和模型紧密集成到服务器端的代码，允许 API 来始终保持同步。Swagger 让部署管理和使用功能强大的 API 从未如此简单。"
        },
        {
          "title": "Swagger 使用",
          "url": "\\docs\\specification-document.html#swagger-使用",
          "content": "Swagger 使用MVCXE 框架提供了非常方便且灵活的 Swagger 配置，无需增加额外学习成本。打开Swagger\napp.UseStaticFiles;app.UseSwagger(info);\n默认地址\n默认规范化文档地址为/swagger/index.html, 相关文件在wwwroot目录中。"
        }
      ]
    },
    {
      "title": "友好异常处理",
      "content": "",
      "url": "\\docs\\friendly-exception.html",
      "children": [
        {
          "title": "什么是异常",
          "url": "\\docs\\friendly-exception.html#什么是异常",
          "content": "什么是异常异常一般是指运行期（此处特指TException类）会发生的导致程序意外中止的问题，是一种对问题的描述后的封装对象。在过去开发中，通常异常由系统运行时出错抛出，但现在的开发过程中，我们应在程序开发中合理的抛出异常，比如更新一条不存在的实体，或查询一个不存在的数据等等。"
        },
        {
          "title": "处理异常方式",
          "url": "\\docs\\friendly-exception.html#处理异常方式",
          "content": "处理异常方式不处理，直接中断程序执行（不推荐）\n通过 try catch finally 处理（不推荐）\n全局统一处理，并记录异常信息（推荐）\n异常注解方式处理，支持本地化 （推荐）\n"
        },
        {
          "title": "什么是友好异常处理",
          "url": "\\docs\\friendly-exception.html#什么是友好异常处理",
          "content": "什么是友好异常处理非友好异常处理\n在了解友好异常处理之前可以看看非友好异常处理：对终端用户抛出 500状态码 堆栈信息\n大量的 try catch 代码，污染正常业务逻辑\n没有规范化的异常状态码和异常消息管理\n没有异常日志收集记录\n不支持异常消息本地化处理\n不支持异常策略，失败后程序立即终止\n不支持分布式事务 CAP\n不支持异常传播\n返回的异常格式杂乱\n友好异常处理\n对终端用户提示友好\n对后端开发人员提供详细的异常堆栈\n不干扰正常业务逻辑代码，如 没有 try catch 代码\n支持异常状态码多方设置\n支持异常消息本地化\n异常信息统一配置管理\n支持异常策略，如重试\n支持异常日志收集记录\n支持 CAP 分布式事务关联\n支持内部异常外部传播\n支持返回统一的异常格式数据\n"
        },
        {
          "title": "友好异常处理使用示例",
          "url": "\\docs\\friendly-exception.html#友好异常处理使用示例",
          "content": "友好异常处理使用示例MVCXE 框架提供了非常灵活的友好异常处理方式。引入友好异常单元\nuses MVCXE.Exception;两个例子\n简单抛个异常type  TMyWebApi = class(TWebApi)\n  public\n\tfunction Get(id: Integer): string;\n  end;\nimplementation\nfunction TMyWebApi.Get(id: Integer): string;\nbegin\n  if id < 3 then\n  begin\n    raise Oops.Oh('%d 不能小于3', [id]);\n  end;\n\n  Result := id;\nend;\n抛出特定类型异常type  TMyWebApi = class(TWebApi)\n  public\n\tfunction Get(id: Integer): string;\n  end;\nimplementation\nfunction TMyWebApi.Get(id: Integer): string;\nbegin\n  if id < 3 then\n  begin\n    raise Oops.Oh('%d 不能小于3', TypeInfo(TMyException), [id]);\n  end;\n\n  Result := id;\nend;\n"
        },
        {
          "title": "关于 Oops.Oh",
          "url": "\\docs\\friendly-exception.html#关于-oops.oh",
          "content": "关于 Oops.Oh通过上面的例子可以看出，Oops.Oh(errorMessage) 可以结合 raise 抛出异常。对于熟悉C#的人员来说，raise 后面只能 TException 实例。Oops.Oh(...) 方法返回正是 TException 实例。为什么起这个名字？\n这个名字来源于一个英语句子：Oh, Oops!，意思是 噢（哎），出错了！，所以就有了 Oops.Oh。Oops.Oh 重载方法\ntype  Oops = class\n  public\n\tclass function Oh(const errorMessage: string;\n\t  const args: array of const): Exception; overload;\n\tclass function Oh(const errorCode: Integer;\n\t  const args: array of const): Exception; overload;\n\tclass function Oh(const errorMessage: string; exceptionType: PTypeInfo;\n\t  const args: array of const): Exception; overload;\n\tclass function Oh(const errorCode: Integer; exceptionType: PTypeInfo;\n\t  const args: array of const): Exception; overload;\n\tclass function Bah(const errorMessage: string;\n\t  const args: array of const): Exception; overload;\n\tclass function Bah(const errorCode: Integer;\n\t  const args: array of const): Exception; overload;\n  end;\n"
        },
        {
          "title": "最佳实践",
          "url": "\\docs\\friendly-exception.html#最佳实践",
          "content": "最佳实践在MVCXE框架中，提供了非常灵活且规范化的友好异常处理方式，通过这个方式可以方便管理异常状态码、异常信息及异常本地化。appsetting.json 中配置异常信息类型\n{  \"ErrorCodeMessageSettings\": {\n\t\"Definitions\": [\n\t  [5000, \"%s 不能小于 %s\", \"1\", \"0\"],\n\t  [5001, \"我叫 %s 名字\", \"MVCXE\"],\n\t  [5002, \"Oops! 出错了\"]\n\t]\n  }\n}\nDefinitions 类型为二维数组，二维数组中的每一个数组第一个参数为 ErrorCode 也就是错误码，第二个参数为 ErrorMessage 消息内容，剩余参数作为 ErrorMessage 的格式化参数。使用示例\ntype  TMyWebApi = class(TWebApi)\n  public\n\tfunction Get(id: Integer): string;\n  end;\nimplementation\nfunction TMyWebApi.Get(id: Integer): string;\nbegin\n  if id < 3 then\n  begin\n    raise Oops.Oh(500, [IntToStr(id), '3']);\n  end;\n\n  Result := id;\nend;\n更多例子\nraise Oops.Oh(1000);raise Oops.Oh(\"哈哈哈哈\");\nraise Oops.Oh(errorCode: \"x1001\");\nraise Oops.Oh(1000, TypeInfo(TMyException));\nraise Oops.Bah(\"用户名或密码错误\"); // 抛出业务异常，状态码为 400\nraise Oops.Bah(1000);\n"
        },
        {
          "title": "OnException 使用",
          "url": "\\docs\\friendly-exception.html#onexception-使用",
          "content": "OnException 使用在控制器类中添加OnException方法，当控制器类中的动作抛出异常会触发OnExceptiontype  TMyWebApi = class(TWebApi)\n  public\n\tfunction Get(id: Integer): string;\n\tfunction OnException(const e: Exception): string;\n  end;\nimplementation\nfunction TMyWebApi.Get(id: Integer): string;\nbegin\n  if id < 3 then\n  begin\n    raise Oops.Oh(500, [IntToStr(id), '3']);\n  end;\n\n  Result := id;\nend;\n\nfunction TIndexController.OnException(const e: Exception): string;\nbegin\n  Result := e.Message;\nend;\n"
        },
        {
          "title": "MVC错误页",
          "url": "\\docs\\friendly-exception.html#mvc错误页",
          "content": "MVC错误页如果在views目录中有模板文件{HttpStatusCode}.htm，当MVC的控制器抛出异常，系统会根据对应的HttpStatusCode加载对应的模板，错误信息注入变量{message}"
        }
      ]
    },
    {
      "title": "入门简要",
      "content": "",
      "url": "\\docs\\dbcontext-start.html",
      "children": [
        {
          "title": "安装对应数据库包",
          "url": "\\docs\\dbcontext-start.html#安装对应数据库包",
          "content": "安装对应数据库包MVCXE的数据库操作实例底层是FireDAC，所以发布时需要附带相关bpl。基础库\nMVCXE.ORM.bpl/dbrtl280.bpl/FireDAC280.bpl/FireDACCommon280.bpl/FireDACCommonDriver280.bpl/FireDACCommonOdbc280.bpl/FireDACSqliteDriver280.bplSQLServer\nFireDACMSSQLDriver280.bpl和SQLNativeClientMySQL\nFireDACMySQLDriver280.bpl和libmysql.dllOracle\nFireDACOracleDriver280.bpl和OracleInstantClient"
        },
        {
          "title": "配置连接字符串",
          "url": "\\docs\\dbcontext-start.html#配置连接字符串",
          "content": "配置连接字符串appsettings.json 中配置{  \"AppSettings\": {\n\t\"CONNECTION_NAME\": \"MvcXEMySQL\"\n  },\n  \"ConnectionString\": {\n\t\"MvcXEMySQL\": \"DriverID=MySQL;Server=127.0.0.1;Database=fly;User_Name=root;Password=root;CharacterSet=utf8;Pooled=True;\",\n\t\"MvcXEOracle\": \"DriverID=Ora;Database=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=orcl)));User_Name=orcl;Password=orcl;CharacterSet=utf8;Pooled=True;\",\n\t\"MvcXESQLServer\": \"DriverID=MSSQL;Server=127.0.0.1;Database=ferry;User_Name=sa;Password=sa;CharacterSet=utf8;Pooled=True;\"\n  }\n}\n"
        },
        {
          "title": "引入MVCXE.ORM单元",
          "url": "\\docs\\dbcontext-start.html#引入mvcxe.orm单元",
          "content": "引入MVCXE.ORM单元uses MVCXE.ORM;"
        }
      ]
    },
    {
      "title": "数据库上下文",
      "content": "",
      "url": "\\docs\\dbcontext.html",
      "children": [
        {
          "title": "什么是数据库上下文",
          "url": "\\docs\\dbcontext.html#什么是数据库上下文",
          "content": "什么是数据库上下文简单来说，数据库上下文是负责和数据库交互的对象，提供程序对数据库存取提供了大量的方法。"
        },
        {
          "title": "创建默认数据库上下文",
          "url": "\\docs\\dbcontext.html#创建默认数据库上下文",
          "content": "创建默认数据库上下文注入IORM\ntype  TMyService = class\n  private\n\t[IOC('MVCXE.ORM.TORMXE')]\n\torm: IORM;\n  end;\n使用全局方法创建IORM对象\nfunction BuildORM: IORM; overload;var    orm: IORM;\nbegin\n    orm := BuildORM;\nend;\n"
        },
        {
          "title": "创建其他数据库上下文",
          "url": "\\docs\\dbcontext.html#创建其他数据库上下文",
          "content": "创建其他数据库上下文function BuildORM(const AConnectionName, AConnectionString: string): IORM; overload;var    orm: IORM;\nbegin\n    orm := BuildORM('myconnection','DriverID=MySQL;Server=127.0.0.1;Database=fly;User_Name=root;Password=root;CharacterSet=utf8;Pooled=True;');\nend;\n"
        },
        {
          "title": "各类数据库连接字符串配置示例",
          "url": "\\docs\\dbcontext.html#各类数据库连接字符串配置示例",
          "content": "各类数据库连接字符串配置示例SQLite: DriverID=SQLite;Database=;\nMySQL: DriverID=MySQL;Server=127.0.0.1;Database=fly;User_Name=root;Password=root;CharacterSet=utf8;Pooled=True;\nOracle: DriverID=Ora;Database=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=orcl)));User_Name=orcl;Password=orcl;CharacterSet=utf8;Pooled=True;\nSQLServer: DriverID=MSSQL;Server=127.0.0.1;Database=ferry;User_Name=sa;Password=sa;CharacterSet=utf8;Pooled=True;\n"
        }
      ]
    },
    {
      "title": "数据库实体",
      "content": "",
      "url": "\\docs\\entity.html",
      "children": [
        {
          "title": "什么是数据库实体",
          "url": "\\docs\\entity.html#什么是数据库实体",
          "content": "什么是数据库实体在面向对象开发思想中，最重要尤为对象二字，在Delphi开发过去，操作数据库往往采用DataTable和DataSet来接收数据库返回结果集，而操作数据库也离不开手写sql语句。在过去面向过程和应用不发达的时代，这些操作确实好使。然后随着中国互联网网民的激增，电子化时代的到来，各行各业对应用需求也达到了前所未有的量级。所以，在过去手写sql的时代各种问题显露无疑：程序员能力参差不齐，写出的sql性能自然也天差地别\nsql属于字符串硬编程，后期维护难上加难\n许多单表甚至多表结构一致，出现大量重复sql代码\nsql本身在不同的数据库提供器中写法有差，后续迁移头痛不已\n当然，sql是时代的产物，我们也离不开sql，但对于大多数程序员和项目来说，sql未必能够带给他们多大的效益。\n所以，ORM就诞生了，所谓的ORM就是对象关系映射，英文：Object Relational Mapping，简单点说，ORM根据特有的POCO 贫血模型 规则生成sql语句。大大避免了重复sql和sql能力参差不齐等问题。（当然ORM作者sql能力也会影响最终性能）上面所说的POCO 贫血模型正是我们本章节的 数据库实体。简单来说，数据库实体就是数据库表的类表现，通过一定的规则使这个类能够一一对应表结构。通常这样的类也称为：POCO 贫血模型，也就是只有定义，没有行为。"
        },
        {
          "title": "如何定义实体",
          "url": "\\docs\\entity.html#如何定义实体",
          "content": "如何定义实体MVCXE框架建议实体类放在专用的bpl中，Controller和WebAPI的bpl引用数据库实体类bpl。实体类可以是Pascal一个普通类，也可以将公用的字段写成父类，子类可以继承这些字段。"
        },
        {
          "title": "实体类示范",
          "url": "\\docs\\entity.html#实体类示范",
          "content": "实体类示范usesSystem.SysUtils, System.Classes, MVCXE.ORM;\n\ntype\n[Table('users')]\nTUsers = class\nprivate\n    FIntegral: Integer;\n    FEmail: string;\n    FSign: string;\n    FNickname: string;\n    FGender: Integer;\n    FTitle: string;\n    FId: Integer;\n    FEmailConfirmToken: string;\n    FIsVip: Boolean;\n    FIsDisabled: Boolean;\n    FCreateTime: TDateTime;\n    FVipLevel: Integer;\n    FHeadPortrait: string;\n    FPassword: string;\n    FEmailIsUpdate: Boolean;\n    FCity: string;\n    FEmailConfirmed: Boolean;\n    FIsAdmin: Boolean;\n    procedure SetCity(const Value: string);\n    procedure SetCreateTime(const Value: TDateTime);\n    procedure SetEmail(const Value: string);\n    procedure SetEmailConfirmed(const Value: Boolean);\n    procedure SetEmailConfirmToken(const Value: string);\n    procedure SetEmailIsUpdate(const Value: Boolean);\n    procedure SetGender(const Value: Integer);\n    procedure SetHeadPortrait(const Value: string);\n    procedure SetId(const Value: Integer);\n    procedure SetIntegral(const Value: Integer);\n    procedure SetIsAdmin(const Value: Boolean);\n    procedure SetIsDisabled(const Value: Boolean);\n    procedure SetIsVip(const Value: Boolean);\n    procedure SetNickname(const Value: string);\n    procedure SetPassword(const Value: string);\n    procedure SetSign(const Value: string);\n    procedure SetTitle(const Value: string);\n    procedure SetVipLevel(const Value: Integer);\npublished\n    [Key(True)]\n    [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]\n    property Id: Integer read FId write SetId;\n    property Email: string read FEmail write SetEmail;\n    property EmailConfirmed: Boolean read FEmailConfirmed write SetEmailConfirmed;\n    property Password: string read FPassword write SetPassword;\n    property Nickname: string read FNickname write SetNickname;\n    property Title: string read FTitle write SetTitle;\n    property Gender: Integer read FGender write SetGender;\n    property City: string read FCity write SetCity;\n    property Sign: string read FSign write SetSign;\n    property HeadPortrait: string read FHeadPortrait write SetHeadPortrait;\n    property Integral: Integer read FIntegral write SetIntegral;\n    property IsVip: Boolean read FIsVip write SetIsVip;\n    property VipLevel: Integer read FVipLevel write SetVipLevel;\n    property CreateTime: TDateTime read FCreateTime write SetCreateTime;\n    property IsDisabled: Boolean read FIsDisabled write SetIsDisabled;\n    property EmailIsUpdate: Boolean read FEmailIsUpdate write SetEmailIsUpdate;\n    property EmailConfirmToken: string read FEmailConfirmToken write SetEmailConfirmToken;\n    property IsAdmin: Boolean read FIsAdmin write SetIsAdmin;\npublic\nend;\n"
        },
        {
          "title": "数据库实体配置",
          "url": "\\docs\\entity.html#数据库实体配置",
          "content": "数据库实体配置配置数据库表名\n可以通过在实体类型贴 [Table('表名')] 配置。配置列名\n有时候我们需要手动设置列名，这时候只需要在属性上面贴 [Column('列名')] 即可。配置列属性\n可以用 [Required]设置必需有值，用 [StringLength(len)] 配置字符串长度，用 [MaxLength(len)] 配置类型长度 用 [NotMapped] 设置跳过该列。配置Key\n可以通过在实体类型贴 [Key(True)] 配置。如果是自增类型要加上 [DatabaseGenerated(TDatabaseGeneratedOption.Identity)] 配置。\n"
        }
      ]
    },
    {
      "title": "仓储模式",
      "content": "",
      "url": "\\docs\\dbcontext-repository.html",
      "children": [
        {
          "title": "什么是仓储",
          "url": "\\docs\\dbcontext-repository.html#什么是仓储",
          "content": "什么是仓储在领域层和数据映射层的中介,使用类似集合的接口来存取领域对象，实际上，仓储被用于领域对象在数据库上的操作（实体 Entity 和值对象 Value types）。一般来说,我们针对不同的实体(或聚合根 Aggregate Root)会创建相对应的仓储。简单来说，仓储就是数据存取操作的载体，但不限定于数据库。"
        },
        {
          "title": "内置仓储",
          "url": "\\docs\\dbcontext-repository.html#内置仓储",
          "content": "内置仓储配置好数据库上下文 orm 后，使用 属性 Repository 获取仓储对象 TORMRepository 的实例。var\torm: IORM;\n\trepository: TORMRepository;\nbegin\n\torm := BuildORM;\n\trepository := orm.Repository;\nend;\n"
        },
        {
          "title": "仓储使用",
          "url": "\\docs\\dbcontext-repository.html#仓储使用",
          "content": "仓储使用TORMRepository定义了几个常用方法。TORMRepository = classpublic\n\tprocedure StartTransaction(const AIsolation: Integer = 2);\n\tprocedure Commit;\n\tprocedure Rollback;\n\tfunction Select: IORMSelectRepo; overload;\n\tfunction Select(const ASqlMap: string): IORMSelectRepo; overload;\n\n\tfunction Update: IORMUpdateRepo; overload;\n\tfunction Update(const ASqlMap: string): IORMUpdateRepo; overload;\n\tfunction Update(const Entity: T): IORMUpdateRepo; overload;\n\n\tfunction Delete: IORMDeleteRepo; overload;\n\tfunction Delete(const ASqlMap: string): IORMDeleteRepo; overload;\n\tfunction Delete(const Entity: T): IORMDeleteRepo; overload;\n\n\tfunction Insert: IORMInsertRepo; overload;\n\tfunction Insert(const ASqlMap: string): IORMInsertRepo; overload;\n\tfunction Insert(const Entity: T): IORMInsertRepo; overload;\nend;\n"
        },
        {
          "title": "SqlMap",
          "url": "\\docs\\dbcontext-repository.html#sqlmap",
          "content": "SqlMap仓储的查询/更新/新增/删除操作，如果传入的是数据库实体，MVCXE.ORM 会按sql标准生成sql语句，用于执行，但有的时候，我们需要使用一些特殊的sql语句语法来进行数据库操作，那么我们可以使用SqlMap。在根目录建立SqlMap.xml文件，在里面定义你的SqlMap。\n\t\n\t\t\n\t\t\tSELECT A.*, \n\t\t\tB.Id _TUsers_Id, B.Email _TUsers_Email, B.Nickname _TUsers_Nickname, B.Title _TUsers_Title, \n\t\t\tB.Gender _TUsers_Gender, B.HeadPortrait _TUsers_HeadPortrait, B.IsVip _TUsers_IsVip, B.VipLevel _TUsers_VipLevel \n\t\t\tFROM posts A\n\t\t\tLEFT JOIN users B ON B.Id = A.UserId\n\t\t\tWHERE A.IsTop=0 \n\t\t\tORDER BY A.UpdateTime DESC\n\t\t\tLIMIT {Count}\n\t\t\n\t\t\n\t\t\tSELECT A.*\n\t\t\tFROM posts A\n\t\t\tWHERE A.UserId=:UserId \n\t\t\tORDER BY A.CreateTime DESC\n\t\t\tLIMIT {Count}\n\t\t\n\t\n\t\n\t\t\n\t\t\tSELECT A.*, \n\t\t\tB.Title PostTitle \n\t\t\tFROM comments A\n\t\t\tLEFT JOIN posts B ON B.Id = A.PostId\n\t\t\tWHERE A.UserId=:UserId \n\t\t\tORDER BY A.CreateTime DESC\n\t\t\tLIMIT {Count}\n\t\t\n\t\n\t\n\t\t\n\t\t\tSELECT A.*, \n\t\t\tB.role_name \n\t\t\tFROM sys_user A\n\t\t\tLEFT JOIN sys_role B ON B.role_id = A.role_id\n\t\t\tWHERE A.username=:username \n\t\t\n\t\t\n\t\t\tSELECT A.*, \n\t\t\tB.role_name \n\t\t\tFROM sys_user A\n\t\t\tLEFT JOIN sys_role B ON B.role_id = A.role_id\n\t\t\tLimit {Skip},{Count}\n\t\t\t\n\t\t\t\tSELECT count(*) \n\t\t\t\tFROM sys_user A\n\t\t\t\n\t\t\n\t\t\n\t\t\tinsert into sys_user \n(nick_name,phone,role_id,salt,avatar,sex,email,dept_id,post_id,create_by,update_by,remark,status,create_time,username,password)\nvalues\n(:nick_name,:phone,:role_id,:salt,:avatar,:sex,:email,:dept_id,:post_id,:create_by,:update_by,:remark,:status,:create_time,:username,:password)\n\t\t\n\t\t\n\t\t\tupdate sys_user set\nnick_name=:nick_name,phone=:phone,role_id=:role_id,salt=:salt,avatar=:avatar,sex=:sex,email=:email,dept_id=:dept_id,post_id=:post_id,update_by=:update_by,remark=:remark,status=:status,update_time=:update_time\nwhere user_id=:user_id\n\t\t\n\t\n\t\n\t\t\n\t\t\tSELECT A.*, \n\t\t\tFROM sys_role A\n\t\t\tLimit {Skip},{Count}\n\t\t\t\n\t\t\t\tSELECT count(*) \n\t\t\t\tFROM sys_role A\n\t\t\t\n\t\t\n\t\n\t\n\t\t\n\tSELECT\n\t\ta.click_date,\n\t\tifnull( b.total, 0 ) AS total,\n\t\tifnull( b.overs, 0 ) AS overs,\n\t\tifnull( b.processing, 0 ) AS processing\n\tFROM\n\t\t({DataValue}) a\n\t\tLEFT JOIN (\n\t\tSELECT\n\t\t\ta1.datetime AS datetime,\n\t\t\ta1.count AS total,\n\t\t\tb1.count AS overs,\n\t\t\tc.count AS processing\n\t\tFROM\n\t\t\t(\n\t\t\tSELECT\n\t\t\t\tdate( create_time ) AS datetime,\n\t\t\t\tcount(*) AS count\n\t\t\tFROM\n\t\t\t\tp_work_order_info\n\t\t\tGROUP BY\n\t\t\tdate( create_time )) a1\n\t\t\tLEFT JOIN (\n\t\t\tSELECT\n\t\t\t\tdate( create_time ) AS datetime,\n\t\t\t\tcount(*) AS count\n\t\t\tFROM\n\t\t\t\tp_work_order_info\n\t\t\tWHERE\n\t\t\t\tis_end = 1\n\t\t\tGROUP BY\n\t\t\tdate( create_time )) b1 ON a1.datetime = b1.datetime\n\t\t\tLEFT JOIN (\n\t\t\tSELECT\n\t\t\t\tdate( create_time ) AS datetime,\n\t\t\t\tcount(*) AS count\n\t\t\tFROM\n\t\t\t\tp_work_order_info\n\t\t\tWHERE\n\t\t\t\tis_end = 0\n\t\t\tGROUP BY\n\t\t\tdate( create_time )) c ON a1.datetime = c.datetime\n\t\t) b ON a.click_date = b.datetime order by a.click_date\n\t\t\n\t\n\t\n\t\t\n\t\t\tselect p_process_info.name as name, count(p_work_order_info.id) as total from p_work_order_info\nleft join p_process_info on p_process_info.id = p_work_order_info.process\nwhere p_work_order_info.create_time between :start_time and :end_time\ngroup by p_work_order_info.process\norder by total desc\nlimit 10\n\t\t\n\t\n\t\n\t\t\n\t\t\tselect p_work_order_circulation_history.processor_id as user_id, p_work_order_circulation_history.processor as nickname, sys_user.username as username, count(p_work_order_circulation_history.id) as count from p_work_order_circulation_history\nleft join sys_user on sys_user.user_id = p_work_order_circulation_history.processor_id and p_work_order_circulation_history.create_time between :start_time and :end_time\nwhere p_work_order_circulation_history.source like 'receiveTask%' and p_work_order_circulation_history.status = 1\ngroup by p_work_order_circulation_history.processor, p_work_order_circulation_history.processor_id\norder by count desc\n\t\t\n\t\n\t\n\t\t\n\t\t\tselect p_work_order_circulation_history.processor_id as user_id, p_work_order_circulation_history.processor as nickname, sys_user.username as username, round(sum(p_work_order_circulation_history.cost_duration), 2) as cost_duration from p_work_order_circulation_history\nleft join sys_user on sys_user.user_id = p_work_order_circulation_history.processor_id\nwhere p_work_order_circulation_history.source like 'receiveTask%' and p_work_order_circulation_history.status = 1 and p_work_order_circulation_history.create_time between :start_time and :end_time\ngroup by p_work_order_circulation_history.processor, p_work_order_circulation_history.processor_id\norder by cost_duration desc\n\t\t\n\t\n\nRoot\n根节点标签是sqlMap节点查找\n第一级节点名是实体类名，如 ， 第二级节点是   当 使用repository.Select('sqlid') 时，仓储查找节点下的子节点, 并使用该节点的content作为 sql 语句执行数据库操作。Sql特性\n:参数名 对应实体类的属性字段名。\n{Skip},{Count}对应 IORMSelectRepo 接口的Take方法参数，用于分页处处理，如orm.Repository.Select('sqlid').Take(skipval, countval)。\n{sql代码块名}可在代码中用Replace('sql代码块名', 'sql代码')替换。\n"
        }
      ]
    },
    {
      "title": "Sql 操作",
      "content": "",
      "url": "\\docs\\dbcontext-db.html",
      "children": [
        {
          "title": "关于 Sql 操作",
          "url": "\\docs\\dbcontext-db.html#关于-sql-操作",
          "content": "关于 Sql 操作MVCXE 框架提供非常灵活的 sql 操作方法，且性能不输于 FireDAC。"
        },
        {
          "title": "Sql操作对象",
          "url": "\\docs\\dbcontext-db.html#sql操作对象",
          "content": "Sql操作对象配置好数据库上下文 orm 后，使用 属性 DB 获取Sql操作对象 TORMDB 的实例。var\torm: IORM;\n\tdb: TORMDB;\nbegin\n\torm := BuildORM;\n\tdb := orm.DB;\nend;\n"
        },
        {
          "title": "Sql操作使用",
          "url": "\\docs\\dbcontext-db.html#sql操作使用",
          "content": "Sql操作使用TORMDB定义了几个常用方法。TORMDB = classpublic\n    procedure StartTransaction(const AIsolation: Integer = 2);\n    procedure Commit;\n    procedure Rollback;\n    function Query(const ASql: string): IORMDBQuery; overload;\n    function Query(const ASql: string): IORMDBQuery; overload;\n    function Query(const ASql: string; const Args: array of const)\n    : IORMDBQuery; overload;\n    function Query(const ASql: string; const Args: TParams)\n    : IORMDBQuery; overload;\n    function Query(const ASql: string; const Args: TValue)\n    : IORMDBQuery; overload;\n\n    function Execute(const ASql: string): Integer; overload;\n    function Execute(const ASql: string; const Args: TParams): Integer;\n    overload;\n    function Execute(const ASql: string; const Args: TValue): Integer; overload;\n    function Execute(const ASql: string; const Args: array of const)\n    : Integer; overload;\n    function Execute(const ASql: string; const Names, Args: array of const)\n    : Integer; overload;\n\n    function ExecProc(const StoredProcName: string): IORMDBQuery;\n    overload;\n    function ExecProc(const SchemaName: string; const StoredProcName: string)\n    : IORMDBQuery; overload;\n\n    procedure ExecProc(const StoredProcName: string); overload;\n    procedure ExecProc(const SchemaName: string;\n    const StoredProcName: string); overload;\n    procedure ExecProc(const StoredProcName: string;\n    var Args: TParams); overload;\n    procedure ExecProc(const SchemaName: string; const StoredProcName: string;\n    var Args: TParams); overload;\n    procedure ExecProc(const StoredProcName: string;\n    const Args: TValue); overload;\n    procedure ExecProc(const SchemaName: string; const StoredProcName: string;\n    const Args: TValue); overload;\n\n    function ExecFunc(const FunctionName: string): Variant; overload;\n    function ExecFunc(const SchemaName: string; const FunctionName: string)\n    : Variant; overload;\n    function ExecFunc(const FunctionName: string; var Args: TParams)\n    : Variant; overload;\n    function ExecFunc(const SchemaName: string; const FunctionName: string;\n    var Args: TParams): Variant; overload;\n    function ExecFunc(const FunctionName: string; const Args: TValue)\n    : Variant; overload;\n    function ExecFunc(const SchemaName: string; const FunctionName: string;\n    const Args: TValue): Variant; overload;\nend;"
        }
      ]
    },
    {
      "title": "新增操作",
      "content": "",
      "url": "\\docs\\dbcontext-add.html",
      "children": [
        {
          "title": "SqlMap.xml",
          "url": "\\docs\\dbcontext-add.html#sqlmap.xml",
          "content": "SqlMap.xml\n    \n        \n\t\t  INSERT INTO User (Name, Age) VALUES (:Name,:Age)\n        \n    \n\n"
        },
        {
          "title": "新增一条",
          "url": "\\docs\\dbcontext-add.html#新增一条",
          "content": "新增一条type[Table('User')]\nTUser = record\n    [Key(True)]\n    [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]\n    id: Integer;\n    Name: string;\n    Age : Integer;\n    class function Empty: TSystemAdmin; static;\nend;\nIUserService = interface(IInterface)\n    ['{C6A0BCCF-967B-4189-B723-64F75927561F}']\n    function CreateUser(const User: TUser): Boolean;\n    function CreateUserBySqlMap(const User: TUser): Boolean;\n    function NewUser(const User: TUser): Integer;\n    procedure InsertUser(const User: TUser);\nend;\nTUserService = class(TInterfacedObject, IUserService)\nprivate\n    [IOC('MVCXE.ORM.TORMXE')]\n    orm: IORM;\npublic\n    function CreateUser(const User: TUser): Boolean;\n    function CreateUserBySqlMap(const User: TUser): Boolean;\n    function NewUser(const User: TUser): Integer;\n    procedure InsertUser(const User: TUser);\nend;\n\nimplementation\n\n{ TUser }\n\nclass function TUser.Empty: TUser;\nbegin\n  Result := Default (TUser);\nend;\n\n{ TUserService }\n\nfunction TUserService.CreateUser(const User: TUsers): Boolean;\nbegin\n  Result := orm.Repository.Insert\n    .SetSource(User)\n    .ExecuteAffrows>0;\nend;\n\nfunction TUserService.CreateUserBySqlMap(const User: TUser): Boolean;\nbegin\n  Result := orm.Repository.Insert('CreateUser')\n    .SetSource(User)\n    .ExecuteAffrows>0;\nend;\n\nfunction TUserService.NewUser(const User: TUsers): Integer;\nbegin\n  Result := orm.Repository.Insert(User)\n    .ExecuteAffrows;\nend;\n\nprocedure TUserService.InsertUser(const User: TUser);\nbegin\n  orm.DB.Execute('INSERT INTO User (Name, Age) VALUES (?,?)', [User.Name, User.Age]);\n  orm.DB.Execute('INSERT INTO User (Name, Age) VALUES (:Name,:Age)', TValue.From(User));\nend;\n\nend.\n"
        },
        {
          "title": "新增实体仓储",
          "url": "\\docs\\dbcontext-add.html#新增实体仓储",
          "content": "新增实体仓储IORMInsertRepo = interface(IInterface)    ['{17652C89-B5E4-4BFE-8180-0B8A9739E915}']\n    function SetSource(const Source: T): IORMInsertRepo;\n    function SetValue(const FieldName: string; const FieldValue: TValue)\n    : IORMInsertRepo; overload;\n    function SetValue(const FieldName: string; const FieldValue: TValue;\n    const DataType: TFieldType)\n    : IORMInsertRepo; overload;\n    function IgnoreColumns(const Fields: array of const): IORMInsertRepo;\n    function ExecuteAffrows: Integer;\n    function Replace(const ParamName, ParamValue: string)\n    : IORMInsertRepo;\nend;"
        }
      ]
    },
    {
      "title": "更新操作",
      "content": "",
      "url": "\\docs\\dbcontext-update.html",
      "children": [
        {
          "title": "SqlMap.xml",
          "url": "\\docs\\dbcontext-update.html#sqlmap.xml",
          "content": "SqlMap.xml\n    \n        \n\t\t  Update User Set Name=:Name, Age=:Age Where id=:id\n        \n    \n\n"
        },
        {
          "title": "更新全部列",
          "url": "\\docs\\dbcontext-update.html#更新全部列",
          "content": "更新全部列type[Table('User')]\nTUser = record\n    [Key(True)]\n    [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]\n    id: Integer;\n    Name: string;\n    Age : Integer;\n    class function Empty: TSystemAdmin; static;\nend;\nIUserService = interface(IInterface)\n    ['{C6A0BCCF-967B-4189-B723-64F75927561F}']\n    function UpdateUser(const User: TUser): Boolean;\n    function UpdateUserBySqlMap(const User: TUser): Integer;\n    procedure UpdateUserBySql(const User: TUser);\nend;\nTUserService = class(TInterfacedObject, IUserService)\nprivate\n    [IOC('MVCXE.ORM.TORMXE')]\n    orm: IORM;\npublic\n    function UpdateUser(const User: TUser): Boolean;\n    function UpdateUserBySqlMap(const User: TUser): Integer;\n    procedure UpdateUserBySql(const User: TUser);\nend;\n\nimplementation\n\n{ TUser }\n\nclass function TUser.Empty: TUser;\nbegin\n  Result := Default (TUser);\nend;\n\n{ TUserService }\n\nfunction TUserService.UpdateUser(const User: TUsers): Boolean;\nbegin\n  Result := orm.Repository.Update(User)\n    .ExecuteAffrows>0;\nend;\n\nfunction TUserService.UpdateUserBySqlMap(const User: TUser): Integer;\nbegin\n  Result := orm.Repository.Update('UpdateUser')\n    .SetSource(User)\n    .ExecuteAffrows;\nend;\n\nprocedure TUserService.UpdateUserBySql(const User: TUser);\nbegin\n  orm.DB.Execute('Update User Set Name=?, Age=? Where id=?', [User.Name, User.Age, User.id]);\n  orm.DB.Execute('Update User Set Name=:Name, Age=:Age Where id=:id', TValue.From(User));\nend;\n\nend.\n"
        },
        {
          "title": "更新部分列",
          "url": "\\docs\\dbcontext-update.html#更新部分列",
          "content": "更新部分列function TUserService.UpdateUser(const User: TUsers): Boolean;begin\n  Result := orm.Repository.Update\n    .SetValue('Age', User.Age)\n    .Where('id', User.id)\n    .ExecuteAffrows>0;\nend;\n"
        },
        {
          "title": "排除特定列更新",
          "url": "\\docs\\dbcontext-update.html#排除特定列更新",
          "content": "排除特定列更新function TUserService.UpdateUser(const User: TUsers): Boolean;begin\n  Result := orm.Repository.Update(User)\n    .IgnoreColumns(['Name'])\n    .ExecuteAffrows>0;\nend;\n"
        },
        {
          "title": "更新实体仓储",
          "url": "\\docs\\dbcontext-update.html#更新实体仓储",
          "content": "更新实体仓储IORMUpdateRepo = interface(IInterface)    ['{B111ED22-A3A2-4383-B06E-FC45361B5959}']\n    function SetSource(const Source: T): IORMUpdateRepo;\n    function SetValue(const FieldName: string; const FieldValue: TValue)\n    : IORMUpdateRepo; overload;\n    function SetValue(const FieldName: string; const FieldValue: TValue;\n    const DataType: TFieldType)\n    : IORMUpdateRepo; overload;\n    function IgnoreColumns(const Fields: array of const): IORMUpdateRepo;\n    function Replace(const ParamName, ParamValue: string)\n    : IORMUpdateRepo;\n\n    function Where(const ParamName: string; const ParamValue: TValue)\n    : IORMUpdateRepo; overload;\n    function Where(const ParamName: string; const ParamValue: TValue;\n    const ParamType: TParamType; const DataType: TFieldType)\n    : IORMUpdateRepo; overload;\n    function Where(const ParamName, ParamOperator: string; const ParamValue: TValue)\n    : IORMUpdateRepo; overload;\n    function Where(const ParamName, ParamOperator: string; const ParamValue: TValue;\n    const ParamType: TParamType; const DataType: TFieldType)\n    : IORMUpdateRepo; overload;\n    function Where(const Param: TParam): IORMUpdateRepo; overload;\n    function ExecuteAffrows: Integer;\nend;"
        }
      ]
    },
    {
      "title": "删除操作",
      "content": "",
      "url": "\\docs\\dbcontext-delete.html",
      "children": [
        {
          "title": "SqlMap.xml",
          "url": "\\docs\\dbcontext-delete.html#sqlmap.xml",
          "content": "SqlMap.xml\n    \n        \n\t\t  Delete User Where id=:id\n        \n    \n\n"
        },
        {
          "title": "删除一行",
          "url": "\\docs\\dbcontext-delete.html#删除一行",
          "content": "删除一行type[Table('User')]\nTUser = record\n    [Key(True)]\n    [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]\n    id: Integer;\n    Name: string;\n    Age : Integer;\n    class function Empty: TSystemAdmin; static;\nend;\nIUserService = interface(IInterface)\n    ['{C6A0BCCF-967B-4189-B723-64F75927561F}']\n    function DeleteUser(const User: TUser): Boolean;\n    function DeleteUserBySqlMap(const User: TUser): Integer;\n    procedure DeleteUserBySql(const User: TUser);\nend;\nTUserService = class(TInterfacedObject, IUserService)\nprivate\n    [IOC('MVCXE.ORM.TORMXE')]\n    orm: IORM;\npublic\n    function DeleteUser(const User: TUser): Boolean;\n    function DeleteUserBySqlMap(const User: TUser): Integer;\n    procedure DeleteUserBySql(const User: TUser);\nend;\n\nimplementation\n\n{ TUser }\n\nclass function TUser.Empty: TUser;\nbegin\n  Result := Default (TUser);\nend;\n\n{ TUserService }\n\nfunction TUserService.DeleteUser(const User: TUsers): Boolean;\nbegin\n  Result := orm.Repository.Delete(User)\n    .ExecuteAffrows>0;\nend;\n\nfunction TUserService.UpdateUserBySqlMap(const User: TUser): Integer;\nbegin\n  Result := orm.Repository.Delete('DeleteUser')\n    .SetSource(User)\n    .ExecuteAffrows;\nend;\n\nprocedure TUserService.DeleteUserBySql(const User: TUser);\nbegin\n  orm.DB.Execute('Delete User Where id=?', [User.id]);\n  orm.DB.Execute('Delete User Where id=:id', TValue.From(User));\nend;\n\nend.\n"
        },
        {
          "title": "按条件删除",
          "url": "\\docs\\dbcontext-delete.html#按条件删除",
          "content": "按条件删除function TUserService.DeleteUser(const User: TUsers): Boolean;begin\n  Result := orm.Repository.Delete\n    .Where('id', User.id)\n    .ExecuteAffrows>0;\nend;\n"
        },
        {
          "title": "删除实体仓储",
          "url": "\\docs\\dbcontext-delete.html#删除实体仓储",
          "content": "删除实体仓储IORMDeleteRepo = interface(IInterface)    ['{F5B7DF81-0BBD-4455-BB55-FB1ACAC1F434}']\n    function SetSource(const Source: T): IORMDeleteRepo;\n    function Replace(const ParamName, ParamValue: string)\n    : IORMDeleteRepo;\n    function Where(const ParamName: string; const ParamValue: TValue)\n    : IORMDeleteRepo; overload;\n    function Where(const ParamName: string; const ParamValue: TValue;\n    const DataType: TFieldType)\n    : IORMDeleteRepo; overload;\n    function Where(const Param: TParam): IORMDeleteRepo; overload;\n    function ExecuteAffrows: Integer;\nend;"
        }
      ]
    },
    {
      "title": "查询操作",
      "content": "",
      "url": "\\docs\\dbcontext-query.html",
      "children": [
        {
          "title": "SqlMap.xml",
          "url": "\\docs\\dbcontext-query.html#sqlmap.xml",
          "content": "SqlMap.xml\n    \n        \n\t\t  Select * From User Where id=:id\n        \n        \n\t\t  Select * From User Where Age=:Age\n        \n        \n\t\t  Select * From User Limit {Skip},{Count}\n        \n    \n\n"
        },
        {
          "title": "根据条件查询一条",
          "url": "\\docs\\dbcontext-query.html#根据条件查询一条",
          "content": "根据条件查询一条type[Table('User')]\nTUser = record\n    [Key(True)]\n    [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]\n    id: Integer;\n    Name: string;\n    Age : Integer;\n    class function Empty: TSystemAdmin; static;\nend;\nIUserService = interface(IInterface)\n    ['{C6A0BCCF-967B-4189-B723-64F75927561F}']\n    function FindUser(const Id: Integer): TUser;\n    function FindUserBySqlMap(const Id: Integer): TUser;\n    function FindUserBySql(const Id: Integer): TUser;\nend;\nTUserService = class(TInterfacedObject, IUserService)\nprivate\n    [IOC('MVCXE.ORM.TORMXE')]\n    orm: IORM;\npublic\n    function FindUser(const Id: Integer): TUser;\n    function FindUserBySqlMap(const Id: Integer): TUser;\n    function FindUserBySql(const Id: Integer): TUser;\nend;\n\nimplementation\n\n{ TUser }\n\nclass function TUser.Empty: TUser;\nbegin\n  Result := Default (TUser);\nend;\n\n{ TUserService }\n\nfunction TUserService.FindUser(const Id: Integer): TUser;\nbegin\n  Result := orm.Repository.Select\n    .Where('id', Id)\n    .SingleOrDefault;\nend;\n\nfunction TUserService.FindUserBySqlMap(const Id: Integer): TUser;\nbegin\n  Result := orm.Repository.Select('FindUser')\n    .Where('id', Id)\n    .Single;\nend;\n\nprocedure TUserService.FindUserBySql(const Id: Integer): TUser;\nbegin\n  orm.DB.Query('Select * From User Where id=:id')\n    .AddParam('id', Id)\n    .SingleOrDefault;\nend;\n\nend.\n"
        },
        {
          "title": "查询所有数据",
          "url": "\\docs\\dbcontext-query.html#查询所有数据",
          "content": "查询所有数据function TUserService.AllUser: TArray;begin\n  Result := orm.Repository.Select\n    .ToArray;\nend;\n"
        },
        {
          "title": "根据条件查询所有数据",
          "url": "\\docs\\dbcontext-query.html#根据条件查询所有数据",
          "content": "根据条件查询所有数据function TUserService.UserList(const Age: Integer): TList;begin\n  Result := orm.Repository.Select('UserList')\n    .Where('Age', Age)\n    .ToList;\nend;\n\nfunction TUserService.UserLikeName(const Key: String): TArray;\nbegin\n  Result := orm.DB.Query('Select * From User Where Name like :Key')\n    .AddParam('Key', '%'+Key+'%')\n    .ToArray;\nend;\n"
        },
        {
          "title": "分页查询",
          "url": "\\docs\\dbcontext-query.html#分页查询",
          "content": "分页查询function TUserService.Users(const page, pagesize: Integer): TArray;begin\n  Result := orm.Repository.Select\n    .Take((page-1)*pagesize, pagesize)\n    .ToArray;\nend;\n\nfunction TUserService.Users(const page, pagesize: Integer): TArray;\nbegin\n  Result := orm.Repository.Select('UserPage')\n    .Take((page-1)*pagesize, pagesize)\n    .ToArray;\nend;\n\nfunction TUserService.Users(const page, pagesize: Integer): TArray;\nbegin\n  Result := orm.DB.Select('Select * From User Limit {Skip},{Count}')\n    .Take((page-1)*pagesize, pagesize)\n    .ToArray;\nend;\n"
        },
        {
          "title": "查询记录数",
          "url": "\\docs\\dbcontext-query.html#查询记录数",
          "content": "查询记录数function TUserService.UserCount: Integer;var\n  c: Integer;\nbegin\n  orm.Repository.Select\n    .Count(c);\n  Result := c;\nend;\n"
        },
        {
          "title": "查询单个字段值",
          "url": "\\docs\\dbcontext-query.html#查询单个字段值",
          "content": "查询单个字段值function TUserService.UserName(const Id: Integer): String;begin\n  Result := orm.DB.Query('Select Name From User Where Id=:id', [Id])\n    .ToString;\nend;\n"
        },
        {
          "title": "查询实体仓储",
          "url": "\\docs\\dbcontext-query.html#查询实体仓储",
          "content": "查询实体仓储IORMSelectRepo = interface(IInterface)    ['{0AA94D59-D17B-436B-B470-0A86C7217B33}']\n    function ToArray: TArray;\n    function ToList: TList;\n    function SingleOrDefault: T;\n    function Single: T;\n    function OrderBy(const FieldNames: string; const Order: string=''): IORMSelectRepo;\n    function Include(const Join: string; const OnFeildName: string): IORMSelectRepo;\n    function Take(const Count: Integer): IORMSelectRepo; overload;\n    function Take(const Skip, Count: Integer): IORMSelectRepo; overload;\n    function Count(var RecordCount: Integer): IORMSelectRepo;\n    function Replace(const ParamName, ParamValue: string)\n    : IORMSelectRepo;\n\n    function Where(const WhereStr: string)\n    : IORMSelectRepo; overload;\n    function Where(const ParamName: string; const ParamValue: TValue)\n    : IORMSelectRepo; overload;\n    function Where(const ParamName: string; const ParamValue: TValue;\n    const DataType: TFieldType)\n    : IORMSelectRepo; overload;\n    function Where(const ParamName, ParamOperator: string; const ParamValue: TValue)\n    : IORMSelectRepo; overload;\n    function Where(const ParamName, ParamOperator: string; const ParamValue: TValue;\n    const ParamType: TParamType; const DataType: TFieldType)\n    : IORMSelectRepo; overload;\n    function Where(const Param: TParam): IORMSelectRepo; overload;\nend;\n"
        },
        {
          "title": "Sql查询返回",
          "url": "\\docs\\dbcontext-query.html#sql查询返回",
          "content": "Sql查询返回IORMDBQuery = interface(IInterface)    ['{D9F9185B-4974-4C2D-8040-7BFC45A61775}']\n    function GetParams: TParams;\n    property Params: TParams read GetParams;\n    function ToArray: TArray;\n    function ToList: TList;\n    function SingleOrDefault: T;\n    function Single: T;\n    function ToScalar: Variant;\n    function ToInteger: Integer;\n    function ToString: string;\n    function Take(const Count: Integer): IORMDBQuery; overload;\n    function Take(const Skip, Count: Integer): IORMDBQuery; overload;\n    function AddParam(const ParamName: string; const ParamValue: TValue)\n    : IORMDBQuery; overload;\n    function AddParam(const ParamName: string; const ParamValue: TValue;\n    const ParamType: TParamType; const DataType: TFieldType)\n    : IORMDBQuery; overload;\n    function AddParam(const Param: TParam): IORMDBQuery; overload;\n    function AddParam(const Params: TParams): IORMDBQuery; overload;\n    function AddParam(const Params: array of const): IORMDBQuery; overload;\n    function Join(const Name: string; const SplitOn: string): IORMDBQuery;\n    function Groupby(const Names: string): IORMDBQuery;\nend;\n\nIORMDBQuery = interface(IInterface)\n    ['{ECAAE0AE-621F-493A-8F5E-D1B66960B9C8}']\n    function Row: TFieldList;\n    procedure NextRecordSet;\n    procedure Next;\n    function Eof: Boolean;\n    function ToScalar: Variant;\n    function ToInteger: Integer;\n    function ToString: string;\nend;"
        }
      ]
    }
  ]
}