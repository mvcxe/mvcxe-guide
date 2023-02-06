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
          "title": "仓储使用",
          "url": "\\docs\\dbcontext-repository.html#仓储使用",
          "content": "仓储使用注入 IORM\ntype  IUserService = interface(IInterface)\n\t['{921EF59C-FA47-49C3-A667-4653828D56FB}']\n\tfunction GetUser(const email: string): TUsers; overload;\n\tfunction UserExists(const email, Nickname: string): Boolean;\n\tfunction CreateUser(const User: TUsers): Boolean;\n\tfunction GetUser(const Id: Integer): TUsers; overload;\n\tfunction GetMyMessage(const UserId: Integer): TArray; overload;\n  end;\n\n  TUserService = class(TInterfacedObject, IUserService)\n  private\n\t[IOC('MVCXE.ORM.TORMXE')]\n\torm: IORM;\n  public\n\tfunction GetUser(const email: string): TUsers; overload;\n\tfunction UserExists(const email, Nickname: string): Boolean;\n\tfunction CreateUser(const User: TUsers): Boolean;\n\tfunction GetUser(const Id: Integer): TUsers; overload;\n\tfunction GetMyMessage(const UserId: Integer): TArray; overload;\n  end;\n\nimplementation\n\n{ TUserService }\n\nfunction TUserService.CreateUser(const User: TUsers): Boolean;\nbegin\n  Result := orm.Repository.Insert\n\t.SetSource(User)\n\t.ExecuteAffrows>0;\nend;\n\nfunction TUserService.GetUser(const email: string): TUsers;\nbegin\n  Result := orm.Repository.Select\n\t.Where('Email', email)\n\t.Single;\nend;\n\nfunction TUserService.GetMyMessage(const UserId: Integer): TArray;\nbegin\n  Result := orm.Repository.Select\n\t.Include('FormUser','Id')\n\t.Where('ToId', UserId)\n\t.OrderBy('CreateTime', 'DESC')\n\t.ToArray;\n  orm.DB.Execute('UPDATE messages SET IsRead = 1 WHERE ToId=?',[UserId]);\nend;\n\nfunction TUserService.GetUser(const Id: Integer): TUsers;\nbegin\n  Result := orm.Repository.Select\n\t.Where('Id', Id)\n\t.SingleOrDefault;\nend;\n\nfunction TUserService.UserExists(const email, Nickname: string): Boolean;\nbegin\n  Result := orm.DB.Query('SELECT COUNT(*) FROM users WHERE Email=? OR Nickname=?',[email, Nickname]).ToInteger > 0;\nend;\n\nend."
        }
      ]
    }
  ]
}