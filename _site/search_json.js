window.ydoc_plugin_search_json = {
  "文档": [
    {
      "title": "MVCXE环境要求支持平台",
      "content": "中国首个DELPHI MVC WEB框架Delphi 10\nDelphi 11\n运行环境\nWindows\nLinux(计划中)\n数据库\nSqlServer\nSqlite\nMySQL\nOracle\nPgSQL\n应用部署\nIIS\nApache\nHttpSys\nLibUv\nIndy\nNginx(计划中)\n",
      "url": "\\docs\\index.html",
      "children": []
    },
    {
      "title": "一分钟上手",
      "content": "",
      "url": "\\docs\\installation.html",
      "children": [
        {
          "title": "先欣赏两段常见代码",
          "url": "\\docs\\installation.html#先欣赏两段常见代码",
          "content": "先欣赏两段常见代码MVC\ntype  THomeController = class(TController)\n  private\n    [IOC]\n    PostService: IPostService;\n  public\n    function Index: string;\n  end;\nimplementation\nfunction THomeController.Index: string;\nbegin\n  ViewBag.Add('TopPosts', PostService.GetTopPosts(5));\n  Result := View;\nend;\nWebapi\ntype  [Route('user/profile')]\n  TUserWebApi = class(TWebApi)\n  private\n    [IOC('Your.Service.UserService')]\n    UserService: IUserService;\n  public\n    [Authorize('Your.Authorization.YourAuthorization', 'your_role_str')]\n    function GET: TUser;\n  end;\nimplementation\nfunction TUserProfileWebApi.GET: TUser;\nbegin\n  Result.code := 200;\n  Result.data := current_user;\n  Result.dept := SysService.DeptById(current_user.dept_id);\n  SetLength(Result.postIds, 1);\n  Result.postIds[0] := current_user.post_id;\n  Result.posts := SysService.Posts;\n  SetLength(Result.roleIds, 1);\n  Result.roleIds[0] := current_user.role_id;\n  Result.roles := SysService.Roles;\n  Result.msg := '';\nend;\n"
        },
        {
          "title": "创建工程",
          "url": "\\docs\\installation.html#创建工程",
          "content": "创建工程在Delphi IDE中打开工程组mvcxe3_install.groupproj，并编译运行InstallTools\n"
        },
        {
          "title": "点击\"Install MVCXE Dcp\"安装MVCXE所需要的编译单元文件",
          "url": "\\docs\\installation.html#创建工程-点击\"install-mvcxe-dcp\"安装mvcxe所需要的编译单元文件",
          "content": "点击\"Install MVCXE Dcp\"安装MVCXE所需要的编译单元文件"
        },
        {
          "title": "点击\"Create MVCXE Project\"",
          "url": "\\docs\\installation.html#创建工程-点击\"create-mvcxe-project\"",
          "content": "点击\"Create MVCXE Project\"按你的需求填好：工程名，命名空间等信息，然后点“Create”创建一个MVCXE工程。\nWeb服务器选项\nWebborker.Console是用Indy实现的WebServer，默认必选。\nISAPI是ISAPI模块(Apache安装方法参考源码里的注释,IIS安装方法参考网上教程，另需要将output目录下非wwwroot目录的文件剪贴到wwwroot里的App_Data目录内)\nApache是Apache DSO模块(安装方法参考源码里的注释)\nPnServer是用Http.Sys实现的WebServer（有些系统需要管理员权限运行）\nNode.Pas是用LibUV实现的WebServer\n工程模板选项\nMVCXE.Template.Api创建的是WebApi工程,只输出Api,不输出网页内容,自带Swagger。\nMVCXE.Template.Mvc创建的是Mvc工程，可以使用模板生成网页内容。\nMVCXE.Template.App创建的是WebApi/Mvc混合工程，包括Api也有网页内容。\nMVCXE.Template.Fly创建的是范例：Fly社区。\nMVCXE.Template.DelphiAdmin创建的是范例：后台管理脚手架。\nMVCXE.Template.Ferry创建的是范例：开源项目Ferry的后端Delphi实现。\n"
        },
        {
          "title": "打开创建好的工程",
          "url": "\\docs\\installation.html#创建工程-打开创建好的工程",
          "content": "打开创建好的工程目录结构\noutput是编译输出目录，也就是Web站点最终发布目录\nserver是Web服务器程序源码目录\nProjectName(Test1)是MVCXE程序目录\nProjectName\\Controller存放MVC的控制器工程\nProjectName\\Webapi存放存WebApi工程\nProjectName\\BLL存放数据逻辑层的工程\noutput\\views存放模板文件\nFly/DelphiAdmin/Ferry需要数据库配合才能跑起来\n在mysql中新建立三个数据库(字符集用utf8),使用db目录下的fly_mysql.sql还原数据库fly,da_mysql.sql还原数据库da，ferry_mysql.sql还原数据库ferry\n\n并修改output\\appsettion.json中ConnectionString内的数据库连接信息。\n\n用模板创建的工程，默认使用8080端口，可launchSettings.json里修改。\nFly社区：http://localhost:8080/，管理员帐号admin，密码123456\nDelphiAdmin后台管理脚手架：http://localhost:8080/backend/，管理员帐号admin，密码123456\nFerry后台Api：http://localhost:8080/swagger/index.html\nFerry前端安装可参考：https://www.fdevops.com/docs/ferry-tutorial-document/install\n"
        },
        {
          "title": "编译并运行Webborker.Console.exe",
          "url": "\\docs\\installation.html#创建工程-编译并运行webborker.console.exe",
          "content": "编译并运行Webborker.Console.exe程序会自动打开浏览器，并访问默认的地址\n访问Swagger查看现有的WebApi\nhttp://localhost:8080/swagger/index.html"
        },
        {
          "title": "现在你可以进行Delphi Web开发的神奇之旅了",
          "url": "\\docs\\installation.html#现在你可以进行delphi-web开发的神奇之旅了",
          "content": "现在你可以进行Delphi Web开发的神奇之旅了"
        }
      ]
    },
    {
      "title": "序言名字的由来框架特点框架依赖性能",
      "content": "聪明的程序员用Delphi，Web开发Delphi程序员不应缺席。该框架第一版开发时Delphi的版本号是XE，于是就起名为MVCXE基于Delphi 10/11平台，没有历史包袱\nBPL模块化，极少依赖\n极速上手，继承TController/TWebApi即可用\n代码无侵入性，100% 兼容原生写法\n强大的模板功能，快速开发丰富的页面\n真编译，极速加载\n为了追求极速入门，极致性能，尽可能的不使用或减少第三方依赖。目前 MVCXE 仅集成了Logpro日志控件。MVCXE是编译型，比解析型语言效率更高。",
      "url": "\\docs\\intro.html",
      "children": []
    },
    {
      "title": "Startup",
      "content": "MVCXE框架是基于Webborker开发，一般情况下生成工程后直接关注Controller/Webapi等业务代码即可。这里描述一下MVCXE框架是怎样加载工作的，用户可更全面了解MVCXE框架。",
      "url": "\\docs\\appstartup.html",
      "children": [
        {
          "title": "Webborker程序加载MVCXE框架条件",
          "url": "\\docs\\appstartup.html#webborker程序加载mvcxe框架条件",
          "content": "Webborker程序加载MVCXE框架条件在工程属性中勾选Link with runtime packages，引用server\\include\\ApplicationBuilder.pas。全局方法function launchSettings: TLaunchSetting;功能是加载MVCXE，只要在WebModuleCreate事件触发前调用即可，如：initialization  launchSettings;\n"
        },
        {
          "title": "用Rtti创建Startup类的对象",
          "url": "\\docs\\appstartup.html#用rtti创建startup类的对象",
          "content": "用Rtti创建Startup类的对象创建IApplicationBuilder接口的实例appTWebModule1 = class(TWebModule)  procedure WebModule1DefaultHandlerAction(Sender: TObject;\n\tRequest: TWebRequest; Response: TWebResponse; var Handled: Boolean);\n  procedure WebModuleCreate(Sender: TObject);\n  procedure WebModuleDestroy(Sender: TObject);\nprivate\n  app: IWebborkerBuilder;\nend;\nprocedure TWebModule1.WebModuleCreate(Sender: TObject);\nvar\n instanceType: TRttiInstanceType;\nbegin\n instanceType := TRttiContext.Create.FindType\n   ('MVCXE.Builder.Webborker.Startup').AsInstance;\n app := instanceType.GetMethod('Create').Invoke(instanceType.MetaclassType, [])\n   .AsType;\nend;\n"
        },
        {
          "title": "拦截应用请求",
          "url": "\\docs\\appstartup.html#拦截应用请求",
          "content": "拦截应用请求调用IApplicationBuilder接口的实现方法Actionprocedure TWebModule1.WebModule1DefaultHandlerAction(Sender: TObject; Request: TWebRequest; Response: TWebResponse; var Handled: Boolean);\nbegin\n Handled := app.Action(Request, Response);\nend;\n"
        },
        {
          "title": "特殊场景配置",
          "url": "\\docs\\appstartup.html#特殊场景配置",
          "content": "特殊场景配置当有下列情况，需要在WebModuleCreate中加入相关的处理代码\n用于区分不同的运行环境\n  app.UseEnvironment('Development');\n  app.UseEnvironment('Staging');\n  app.UseEnvironment('{Environment}');\n\n\n\n当在IIS/Apache部署用到querystring传递rewrite路径才需要使用，一般情况不需要使用\n  app.UseRewrite('urlrewrite');\n\n\n\n响应静态文件请求(IIS/Apache/Nginx部署不需要使用)，纯Webapi模式不需使用\n  app.UseStaticFiles;\n\n\n\n有Session时使用,Webapi开发不建议使用\n  app.UseSession('MVCXE.Session.Inproc.TInprocSession');\n\n\n\n自定义Swagger信息(info是一个结构体)\n  app.UseSwagger(info);\n\n\n\nMVC模式需要使用，只写Webapi不需要\n  app.UseMvc;\n\n"
        }
      ]
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
          "content": "路由地址默认约定MVCXE 框架的路由格式(默认转换为小写路由地址)是：前缀/模块名/动作方法名/参数前缀\n如果在launchSettings.json设置了该动态WebAPI所在bpl的RoutePrefix，以该设定为前缀否则没有前缀模块名\n模块名取值是控制器类名类名为T{?}Controller或T{?}WebApi的{?}部分，如果设置了控制类的属性[Route('{自定义模块名}')]则用自定义模块名动作方法名\n动作方法名取值控制器类public的函数或方法名，默认去除以 Post/Add/Create/Insert/Submit，GetAll/GetList/Get/Find/Fetch/Query/Search，Put/Update，Delete/Remove/Clear，Patch 开头的字符串。如果设置了函数或方法的属性[Route('{自定义动作方法名}')]则用自定义动作方法名参数\n如果有参数这部份，以/分割为多个参数，按顺序传入动作方法对应的函数参数中"
        }
      ]
    },
    {
      "title": "HttpContext",
      "content": "",
      "url": "\\docs\\httpcontext.html",
      "children": [
        {
          "title": "Request",
          "url": "\\docs\\httpcontext.html#request",
          "content": "Request注入IHttpContextAccessor，里面定义了HttpContext.Request对象。TMVCXERequest = classpublished\n\tproperty PathInfo: string;\n\tproperty FileName: string;\n\tproperty ControllerName: string;\n\tproperty ActionName: string;\n\tproperty Method: string;\n\tproperty Body: string;\n\tproperty Host: string;\n\tproperty RemoteIP: string;\n\tproperty RemoteHost: string;\n\tproperty RemoteAddr: string;\n\tproperty ProtocolVersion: string;\n\tproperty URL: string;\n\tproperty Query: string;\n\tproperty From: string;\n\tproperty Referer: string;\n\tproperty UserAgent: string;\n\tproperty ServerPort: Integer;\n\tproperty RawPathInfo: string;\n\tproperty DerivedFrom: string;\n\tproperty SubDir: string;\npublic\n\tParams: TDictionary;\n\tHeaders: TDictionary;\n\tCookies: TDictionary;\nend;\n"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\httpcontext.html#request-如何使用",
          "content": "如何使用uses MVCXE.HttpContext, MVCXE.HTTPApp;type\n  TMyWebApi = class(TWebApi)\n  protected\n    [IOC('MVCXE.HttpContext.THttpContextAccessor')]\n    accessor: IHttpContextAccessor;\n  public\n    function GET: string;\n  end;\nimplementation\nfunction TMyWebApi.GET: string;\nbegin\n  Result := 'Hello '+accessor.HttpContext.Request.URL;\nend;\n"
        },
        {
          "title": "获取IP地址",
          "url": "\\docs\\httpcontext.html#request-获取ip地址",
          "content": "获取IP地址function getIpAddress: string;begin\n  if accessor.HttpContext.Request.Headers.ContainsKey('HTTP_X_FORWARDED_FOR') then\n\tResult := accessor.HttpContext.Request.Headers['HTTP_X_FORWARDED_FOR']\n  else\n\tResult := accessor.HttpContext.Request.RemoteIP;\nend;\n"
        },
        {
          "title": "Response对象",
          "url": "\\docs\\httpcontext.html#response对象",
          "content": "Response对象在TController或TWebApi定义了Response对象，可以自定义Http返回内容。TMVCXEResponse = classpublished\n\tproperty ContentType: string;\n\tproperty Content: string;\n\tproperty StatusCode: Integer;\n\tproperty ContentEncoding: string;\n\tproperty IsRawData: Boolean;\n\tproperty ContentStream: TStream;\n\tproperty Location: string;\n\tproperty Server: string;\n\tproperty RedirectURI: string;\n\tproperty RawData: AnsiString;\npublic\n\tprocedure Abort;\n\tprocedure Write(AContent: string); overload;\n\tprocedure Write(AContent: AnsiString); overload;\n\tprocedure Redirect(URI: string);\n\tprocedure AddCookie(Name, Value: string; Expires: TDateTime = 0;\n\tDomain: string = ''; Path: string = '/'; Secure: Boolean = False;\n\tHttpOnly: Boolean = False);\n\tprocedure AddHeader(Name, Value: string);\nend;\n"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\httpcontext.html#response对象-如何使用",
          "content": "如何使用uses MVCXE.HTTPApp;type\n  TMyController = class(TController)\n  public\n    function Export: TMemoryStream;\n  end;\nimplementation\nfunction TMyController.Export: TMemoryStream;\nbegin\n  Response.ContentType := 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';\n  Response.AddHeader('Content-Disposition', 'attachment;Filename=Goods_'+FormatDateTime('yyyyMMddHHmmss', Now)+'.xlsx');\n  Result := TMemoryStream.Create;\nend;\n"
        },
        {
          "title": "Redirect",
          "url": "\\docs\\httpcontext.html#response对象-redirect",
          "content": "Redirectfunction TPostController.Add: string;begin\n  if not IsLogin then\n  begin\n\tResponse.Redirect(RouteData['Root']+'/account/login');\n\tResponse.Abort;\n\tExit;\n  end\n  else\n  begin\n\tResponse.Location := RouteData['Root']+'/';\n\tResponse.Abort;\n  end;\nend;"
        }
      ]
    },
    {
      "title": "会话和状态管理",
      "content": "",
      "url": "\\docs\\sesssion-state.html",
      "children": [
        {
          "title": "关于会话和状态管理",
          "url": "\\docs\\sesssion-state.html#关于会话和状态管理",
          "content": "关于会话和状态管理HTTP 是无状态的协议。 默认情况下，HTTP 请求是不保留用户值的独立消息。但是我们可以通过以下几种方式保留请求用户数据：Cookie：通常存储在客户端的数据，请求时带回服务端\nSession：存储在服务端的数据（可以在存储在内存、进程等介质中）\nQuery Strings：通过 Http 请求地址参数共享\nHttp Header：通过 Http 请求头参数共享\nCache：服务端缓存，包括内存缓存、分布式内存缓存、IO 缓存、序列化缓存以及数据库缓存\n"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\sesssion-state.html#如何使用",
          "content": "如何使用"
        },
        {
          "title": "Cookie 使用",
          "url": "\\docs\\sesssion-state.html#如何使用-cookie-使用",
          "content": "Cookie 使用读取Cookies\nCookies类型是：TDictionaryuses MVCXE.HttpContext;type\n  TMyWebApi = class(TWebApi)\n  protected\n    [IOC('MVCXE.HttpContext.THttpContextAccessor')]\n    accessor: IHttpContextAccessor;\n  public\n    function GET: string;\n  end;\nimplementation\nfunction TMyWebApi.GET: string;\nbegin\n    if accessor.HttpContext.Request.Cookies.ContainsKey('CookieKey') then\n        Result := 'Hello '+accessor.HttpContext.Request.Cookies['CookieKey'];\nend;\n设置Cookies\n在WebApi/Controller中，定义了Response对象，使用Response的AddCookie设置Cookiesprocedure AddCookie(Name, Value: string; Expires: TDateTime = 0;    Domain: string = ''; Path: string = '/'; Secure: Boolean = False;\n    HttpOnly: Boolean = False);\n例type  TMyWebApi = class(TWebApi)\n  protected\n  public\n    function GET: string;\n  end;\nimplementation\nfunction TMyWebApi.GET: string;\nbegin\n    Response.AddCookie('CookieKey', 'CookieValue');\n    Response.AddCookie('CookieKey1', 'CookieValue', Now+1);\n    Response.AddCookie('CookieKey1', 'CookieValue', 0, 'mvcxe.com', '/');\nend;\n\n删除Cookies\n  Response.AddCookie('CookieKey', '');\n\n\n"
        },
        {
          "title": "Session 使用",
          "url": "\\docs\\sesssion-state.html#如何使用-session-使用",
          "content": "Session 使用在使用 Session 之前，必须注册Session服务，当前实现了Inproc的服务，以后会增加数据库，redis等的实现。app.UseSession('MVCXE.Session.Inproc.TInprocSession');注入IHttpContextAccessor使用HttpContext里定义的Session属性获取Session对象。\n读取 Session\n  uses MVCXE.HttpContext;\n  type\n  TMyController = class(TController)\n  protected\n      [IOC('MVCXE.HttpContext.THttpContextAccessor')]\n      accessor: IHttpContextAccessor;\n  public\n      function Home: string;\n  end;\n  implementation\n  function TMyController.Home: string;\n  begin\n  if accessor.HttpContext.Session.Contains('UserId') then\n      ViewBag.Add('UserId', accessor.HttpContext.Session.Get('UserId'));\n  ViewBag.Add('UserName', accessor.HttpContext.Session.Get('UserName'));\n  Result := View;\n  end;\n\n\n\n设置 Session\n  function TMyController.Home: string;\n  begin\n    accessor.HttpContext.Session.Put('UserId', 1);\n    accessor.HttpContext.Session.Put('UserName', 'MVCXE');\n    Result := View;\n  end;\n\n\n\n删除 Session\n  function TMyController.Home: string;\n  begin\n  accessor.HttpContext.Session.Remove('UserId');\n  accessor.HttpContext.Session.Clear;\n  Result := View;\n  end;\n\n\n"
        },
        {
          "title": "Query Strings 使用",
          "url": "\\docs\\sesssion-state.html#query-strings-使用",
          "content": "Query Strings 使用uses MVCXE.HttpContext;type\n  TMyWebApi = class(TWebApi)\n  protected\n    [IOC('MVCXE.HttpContext.THttpContextAccessor')]\n    accessor: IHttpContextAccessor;\n  public\n    function GET: string;\n  end;\nimplementation\nfunction TMyWebApi.GET: string;\nbegin\n    if accessor.HttpContext.Request.Params.ContainsKey('QueryKey') then\n        Result := 'Hello '+accessor.HttpContext.Request.Params['QueryKey'];\nend;\n"
        },
        {
          "title": "Http Header 使用",
          "url": "\\docs\\sesssion-state.html#http-header-使用",
          "content": "Http Header 使用\n读取 Header\nuses MVCXE.HttpContext;\ntype\n  TMyWebApi = class(TWebApi)\n  protected\n    [IOC('MVCXE.HttpContext.THttpContextAccessor')]\n    accessor: IHttpContextAccessor;\n  public\n    function GET: string;\n  end;\nimplementation\nfunction TMyWebApi.GET: string;\nbegin\n    if accessor.HttpContext.Request.Params.ContainsKey('Authorization') then\n        Result := 'Hello '+accessor.HttpContext.Request.Headers['Authorization'];\nend;\n\n\n\n设置 Header\n  function TMyWebApi.GET: string;\n  begin\n    Response.AddHeader('Authorization', 'Breaer {Token}');\n    Result := View;\n  end;\n\n\n"
        },
        {
          "title": "Cache 方式",
          "url": "\\docs\\sesssion-state.html#http-header-使用-cache-方式",
          "content": "Cache 方式参见 分布式缓存 文档"
        }
      ]
    },
    {
      "title": "缓存",
      "content": "",
      "url": "\\docs\\cache.html",
      "children": [
        {
          "title": "什么是缓存",
          "url": "\\docs\\cache.html#什么是缓存",
          "content": "什么是缓存缓存可以减少生成内容所需的工作，从而显著提高应用程序的性能和可伸缩性。 缓存适用于不经常更改的数据，因为生成成本很高。 通过缓存，可比从数据源返回数据的副本速度快得多。 应该对应用进行编写和测试，使其不要永远依赖于缓存的数据。"
        },
        {
          "title": "缓存类型",
          "url": "\\docs\\cache.html#缓存类型",
          "content": "缓存类型内存缓存：顾名思义，就是缓存在应用部署所在服务器的内存中\n分布式缓存：分布式缓存是由多个应用服务器共享的缓存\n响应缓存：缓存服务器端 Not Modified 的数据\n"
        },
        {
          "title": "ICache接口",
          "url": "\\docs\\cache.html#icache接口",
          "content": "ICache接口MVCXE 框架提供了ICache接口来使用缓存ICache = interface    ['{1CACE348-8D9E-47B1-9656-913C3603A2EA}']\n    function ContainsKey(const Key: string): Boolean;\n    function Get(const Key: string): TValue;\n    function ValueAsObject(const Key: string): TObject;\n    function ValueAsString(const Key: string): string;\n    function ValueAsInteger(const Key: string): Integer;\n    function ValueAsInt64(const Key: string): Int64;\n    function ValueAsBool(const Key: string): Boolean;\n    function ValueAsFloat(const Key: string): Extended;\n    procedure Put(const Key: string; const Value: TValue;\n      const Expires: TDateTime); overload;\n    procedure Put(const Key: string; const Value: string;\n      const Expires: TDateTime); overload;\n    procedure Put(const Key: string; const Value: Integer;\n      const Expires: TDateTime); overload;\n    procedure Put(const Key: string; const Value: Int64;\n      const Expires: TDateTime); overload;\n    procedure Put(const Key: string; const Value: Boolean;\n      const Expires: TDateTime); overload;\n    procedure Put(const Key: string; const Value: Extended;\n      const Expires: TDateTime); overload;\n    procedure Remove(const Key: string);\n    procedure Clear;\nend;\n"
        },
        {
          "title": "内存缓存使用",
          "url": "\\docs\\cache.html#内存缓存使用",
          "content": "内存缓存使用内存缓存是最常用的缓存方式，具有存取快，效率高特点。内存缓存通过注入[IOC('MVCXE.MemoryCache.TMemoryCache')] ICache方式注入即可。基本使用\ntype  ICategorieService = interface(IInterface)\n    ['{D3F3E71A-28AB-4EFE-9D60-5DDA7D78AD20}']\n    function List: TArray;\n  end;\n  TCategorieService = class(TInterfacedObject, ICategorieService)\n  private\n    [IOC('MVCXE.MemoryCache.TMemoryCache')]\n    Cache: ICache;\n  public\n    function List: TArray;\n  end;\n\nimplementation\n\nuses\n  MVCXE.ORM;\n\n{ TCategorieService }\n\nfunction TCategorieService.List: TArray;\nvar\n  Categories: TArray;\n  orm: IORM;\nbegin\n  if Cache.ContainsKey('Categories') then\n  begin\n    Result := Cache.Get('Categories').AsType>;\n  end\n  else\n  begin\n    orm := BuildORM;\n    Categories := orm.Repository.Select.ToArray;\n    Cache.Put('Categories', TValue.From>(Categories), Now+1);\n    Result := Categories;\n  end;\nend;\n\nend.\n"
        },
        {
          "title": "分布式缓存",
          "url": "\\docs\\cache.html#分布式缓存",
          "content": "分布式缓存分布式缓存是由多个应用服务器共享的缓存，通常作为外部服务在访问它的应用服务器上维护。 分布式缓存可以提高MVCXE应用程序的性能和可伸缩性，尤其是在应用程序由云服务或服务器场托管时。与其他缓存方案相比，分布式缓存具有多项优势，其中缓存的数据存储在单个应用服务器上。当分布式缓存数据时，数据将：(一致性) 跨多个 服务器的请求\n存活在服务器重启和应用部署之间\n不使用本地内存\n分布式缓存配置是特定于实现的。 本文介绍如何配置Redis分布式缓存。在appsetting.json中配置Redis服务器连接参数，可以同时有多台Redis服务器\n{  \"Redis\": {\n        \"Ip\": [\"127.0.0.1\"],\n        \"Port\": [6379],\n        \"Password\": \"\",\n        \"Db\": \"0\"\n  }\n}\n通过注入[IOC('MVCXE.RedisCache.TRedisCache')] ICache方式注入即可与内存缓存一样的方式使用。\n"
        },
        {
          "title": "自定义你的缓存实现",
          "url": "\\docs\\cache.html#自定义你的缓存实现",
          "content": "自定义你的缓存实现可以参考MVCXE.Cache.bpl中的代码，开发如：SqlServer等缓存方式。"
        }
      ]
    },
    {
      "title": "安全鉴权",
      "content": "",
      "url": "\\docs\\auth-control.html",
      "children": [
        {
          "title": "什么是鉴权",
          "url": "\\docs\\auth-control.html#什么是鉴权",
          "content": "什么是鉴权鉴权实际上就是一种身份认证。由用户提供凭据，然后将其与存储在操作系统、数据库、应用或资源中的凭据进行比较。 在授权过程中，如果凭据匹配，则用户身份验证成功，可执行已向其授权的操作。 授权指判断允许用户执行的操作的过程。 也可以将身份验证理解为进入空间（例如服务器、数据库、应用或资源）的一种方式，而授权是用户可以对该空间（服务器、数据库或应用）内的哪些对象执行哪些操作。常见的鉴权方式HTTP Basic Authentication\n这是 HTTP 协议实现的基本认证方式，我们在浏览网页时，从浏览器正上方弹出的对话框要求我们输入账号密码，正是使用了这种认证方式Session + Cookie\n利用服务器端的 session（会话）和浏览器端的 cookie 来实现前后端的认证，由于 http 请求时是无状态的，服务器正常情况下是不知道当前请求之前有没有来过，这个时候我们如果要记录状态，就需要在服务器端创建一个会话(session),将同一个客户端的请求都维护在各自的会话中，每当请求到达服务器端的时候，先去查一下该客户端有没有在服务器端创建 session，如果有则已经认证成功了，否则就没有认证。Token\n客户端在首次登录以后，服务端再次接收 HTTP 请求的时候，就只认 Token 了，请求只要每次把 Token 带上就行了，服务器端会拦截所有的请求，然后校验 Token 的合法性，合法就放行，不合法就返回 401（鉴权失败）Token验证比较灵活，适用于大部分场景。常用的 Token 鉴权方式的解决方案是 JWT，JWT 是通过对带有相关用户信息的进行加密，加密的方式比较灵活，可以根据需求具体设计。OAuth\nOAuth（开放授权）是一个开放标准，允许用户授权第三方网站访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方网站或分享他们数据的所有内容，为了保护用户数据的安全和隐私，第三方网站访问用户数据前都需要显式的向用户征求授权。我们常见的提供 OAuth 认证服务的厂商有支付宝、QQ 和微信。OAuth 协议又有 1.0 和 2.0 两个版本。相比较 1.0 版，2.0 版整个授权验证流程更简单更安全，也是目前最主要的用户身份验证和授权方式。"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\auth-control.html#如何使用",
          "content": "如何使用uses  MVCXE.Authorization;\n默认的身份结构包括名字字符串，是否已认证通过，角色字符串，认证类型。\nTIdentity = record    Name: string;\n    IsAuthenticated: Boolean;\n    Roles: string;\n    AuthenticationType: string;\nend;\n注入IHttpContextAccessor使用HttpContext里定义的User方法获取包含TIdentity的接口IPrincipal\nIPrincipal = interface  ['{952A2782-CE55-41C0-A155-35080914FEAA}']\n  function GetIdentity: TIdentity;\n  procedure SetIdentity(Value: TIdentity);\n  property Identity: TIdentity read GetIdentity write SetIdentity;\n  function IsInRole(const role: string): Boolean;\n  procedure UpdateFormsAuthenticationTicket(Response: TMVCXEResponse; const Expires: TDateTime);\n  procedure RemoveFormsAuthenticationTicket(Response: TMVCXEResponse);\nend;\n\nTHttpContext = class\npublic\n  function User: IPrincipal; overload;\nend;\n例子, 我们将登陆信息存储在TIdentity.Name中，格式是：用户名$用户id$用户Email$是否登陆\ntype  BaseController = class(TController)\n  private\n  protected\n    [IOC('MVCXE.HttpContext.THttpContextAccessor')]\n    accessor: IHttpContextAccessor;\n    function IsLogin: Boolean;\n    function CurrentAccount: String;\n    function CurrentUserId: Integer;\n    function EmailConfirmed: Boolean;\n    function IsAdmin: Boolean;\n  public\n  end;\n\nimplementation\n\nuses\n  Fly.Authorization;\n\n{ BaseController }\n\nfunction BaseController.CurrentAccount: String;\nvar\n  name: string;\nbegin\n  if not IsLogin then\n    Result := nil\n  else\n  begin\n    name := accessor.HttpContext.User.Identity.name;\n    Result := name.Split(['$'])[0];\n  end;\nend;\n\nfunction BaseController.CurrentUserId: Integer;\nvar\n  name: string;\nbegin\n  if not IsLogin then\n    Result := -1\n  else\n  begin\n    name := accessor.HttpContext.User.Identity.name;\n    Result := StrToInt(name.Split(['$'])[1]);\n  end;\nend;\n\nfunction BaseController.EmailConfirmed: Boolean;\nvar\n  name: string;\nbegin\n  if not IsLogin then\n    Result := False\n  else\n  begin\n    name := accessor.HttpContext.User.Identity.name;\n    Result := StrToBool(name.Split(['$'])[2]);\n  end;\nend;\n\nfunction BaseController.IsAdmin: Boolean;\nbegin\n  Result := accessor.HttpContext.User.IsInRole('admin');\nend;\n\nfunction BaseController.IsLogin: Boolean;\nbegin\n  Result := accessor.HttpContext.User.Identity.IsAuthenticated;\nend;\n登陆代码\nfunction TAccountController.check(const email, pass, vercode: string)  : TAccountFormResult;\nvar\n  User: TUsers;\n  HashMD5: THashMD5;\n  s: string;\n  Membership: TIdentity;\nbegin\n  Response.ContentType := 'application/json';\n  Result.success := False;\n  s := accessor.HttpContext.Session.Get('ValidationCode');\n  if not SameText(vercode, s) then\n  begin\n    Result.msg := '验证码不正确.';\n    Exit;\n  end;\n  User := UserService.GetUser(email);\n  if User = nil then\n  begin\n    Result.msg := '找不到用户.';\n    Exit;\n  end;\n  HashMD5 := THashMD5.Create;\n  s := HashMD5.GetHashString(pass);\n  if not SameText(User.Password, s) then\n  begin\n    Result.msg := '密码不正确.';\n    Exit;\n  end;\n  Membership.Name := User.Email + '$' + IntToStr(User.Id) + '$' + BoolToStr(User.EmailConfirmed) + '$' + BoolToStr(User.IsAdmin);\n  Membership.IsAuthenticated := True;\n  if User.IsAdmin then\n    Membership.Roles := 'admin,';\n  accessor.HttpContext.User.Identity := Membership;\n  accessor.HttpContext.User.UpdateFormsAuthenticationTicket(Response, Now+30);\n\n  Result.msg := '登陆成功.';\n  User.Password := '';\n  Result.user := User;\n  Result.success := True;\nend;\n"
        },
        {
          "title": "自定身份验证类",
          "url": "\\docs\\auth-control.html#自定身份验证类",
          "content": "自定身份验证类自定我们的身份验证类TMyPrincipal\nuses  System.Classes, System.SysUtils, MVCXE.HTTPApp, MVCXE.HttpContext,\n  Fly.Model.Users;\n\ntype\n  TMyPrincipal = class(BasePrincipal)\n  const SecretKey = 'Fly.Authorization';\n  const CookieKey = 'Fly.Authorization';\n  private\n    FAuthorization: string;\n    FIdentity: TUsers;\n    procedure TrySetUserInfo;\n    function FormsAuthenticationTicket: string;\n  public\n    function Identity: TUsers;\n    function IsInRole(const role: string): Boolean;\n    procedure SignIn(const User: TUsers);\n    procedure UpdateFormsAuthenticationTicket(Response: TMVCXEResponse; const Expires: TDateTime);\n    procedure RemoveFormsAuthenticationTicket(Response: TMVCXEResponse);\n  end;\nTMyPrincipal中Identity是获取身份的方法，它一般返回用户表的实体类，也可以自定义，其它辅助方法可以自由添加。\nuses  MVCXE.JWT;\n\n{ TMyPrincipal }\n\nfunction TMyPrincipal.FormsAuthenticationTicket: string;\nvar\n  JwtBearer: TJwtBearer;\nbegin\n  JwtBearer := TJwtBearer.Create;\n  JwtBearer.SecretKey := SecretKey;\n  JwtBearer.Algorithm := TJWTAlgorithm.HS256;\n  JwtBearer.Subject := 'Fly Authentication Ticket';\n  JwtBearer.Audience := 'Fly';\n  JwtBearer.AddClaim('MemberShip', Identity);\n  Result := JwtBearer.Token;\nend;\n\nprocedure TMyPrincipal.TrySetUserInfo;\nvar\n  JwtBearer: TJwtBearer;\nbegin\n  //演示用cookie来记录登陆状态，也可以用session\n  if HttpContext.Request.Cookies.ContainsKey(CookieKey) then\n    FAuthorization := HttpContext.Request.Cookies[CookieKey];\n  if FAuthorization'' then\n  begin\n    try\n      JwtBearer := TJwtBearer.Create(FAuthorization,SecretKey);\n      FIdentity := JwtBearer.GetClaim('MemberShip');\n    except\n    end;\n    if Assigned(JwtBearer) then\n      FreeAndNil(JwtBearer);\n  end;\nend;\n\nprocedure TMyPrincipal.UpdateFormsAuthenticationTicket(Response: TMVCXEResponse;\n  const Expires: TDateTime);\nbegin\n  Response.AddCookie(CookieKey, FormsAuthenticationTicket, Expires);\nend;\n\nprocedure TMyPrincipal.RemoveFormsAuthenticationTicket(\n  Response: TMVCXEResponse);\nbegin\n  Response.AddCookie(CookieKey, '', 0);\nend;\n\nfunction TMyPrincipal.Identity: TUsers;\nbegin\n  if not Assigned(FIdentity) then\n  begin\n    TrySetUserInfo;\n  end;\n  Result := FIdentity;\nend;\n\nfunction TMyPrincipal.IsInRole(const role: string): Boolean;\nbegin\n  Result := False;\n  if Not Assigned(FIdentity) then\n    FIdentity := Identity;\n  if Assigned(FIdentity) and (FIdentity.Id>0) then\n  begin\n    if role='admin' then\n      Result := FIdentity.IsAdmin;\n  end;\nend;\n\nprocedure TMyPrincipal.SignIn(const User: TUsers);\nbegin\n  FIdentity := User;\nend;\n上面的例子，使用cookie记录了一个身份信息的JWT token字符串，如果不使用cookie也可以用Session记录，也可以用HttpHeader的Authorization来记录。\n使用accessor.HttpContext.User获取我们自定的身份验证类TMyPrincipal\nfunction TAccountController.check(const email, pass, vercode: string)  : TAccountFormResult;\nvar\n  User: TUsers;\n  HashMD5: THashMD5;\n  s: string;\nbegin\n  Response.ContentType := 'application/json';\n  Result.success := False;\n  s := accessor.HttpContext.Session.Get('ValidationCode');\n  if not SameText(vercode, s) then\n  begin\n    Result.msg := '验证码不正确.';\n    Exit;\n  end;\n  User := UserService.GetUser(email);\n  if User = nil then\n  begin\n    Result.msg := '找不到用户.';\n    Exit;\n  end;\n  HashMD5 := THashMD5.Create;\n  s := HashMD5.GetHashString(pass);\n  if not SameText(User.Password, s) then\n  begin\n    Result.msg := '密码不正确.';\n    Exit;\n  end;\n\n  with accessor.HttpContext.User do\n  begin\n    SignIn(User);\n    UpdateFormsAuthenticationTicket(Response, Now+30);\n  end;\n\n  Result.msg := '登陆成功.';\n  User.Password := '';\n  Result.user := User;\n  Result.success := True;\nend;\n"
        },
        {
          "title": "WebApi验证",
          "url": "\\docs\\auth-control.html#webapi验证",
          "content": "WebApi验证创建我们的验证类\ntype  TFerryAuthorization = class(TAuthorization)\n  private\n    [IOC('MVCXE.HttpContext.THttpContextAccessor')]\n    accessor: IHttpContextAccessor;\n  published\n  public\n    procedure OnAuthorization; override;\n  end;\nimplementation\n{ TFerryAuthorization }\n\nprocedure TFerryAuthorization.OnAuthorization;\nbegin\n  inherited;\n  isAuth := True;\n  if AuthorizeParam = 'dashboard' then\n  begin\n    if not accessor.HttpContext.User.IsAuthenticated then\n    begin\n      isAuth := False;\n      Response.Content := '{\"code\":401,\"msg\":\"cookie token is empty\"}';\n    end;\n  end\n  else if AuthorizeParam = 'index' then\n  begin\n    if not accessor.HttpContext.User.IsAuthenticated then\n    begin\n      isAuth := False;\n      Response.StatusCode := 403;\n      Exit;\n    end;\n  end\n  else if AuthorizeParam = 'admin' then\n  begin\n    if not accessor.HttpContext.User.IsAuthenticated then\n    begin\n      isAuth := False;\n      Response.StatusCode := 403;\n      Exit;\n    end;\n  end;\nend;\n在WebApi中用[Authorize]标记该Api或某方法使用我们定义的验证类，当访问这些Api的时候，MVCXE框架会先触发我们定义的验证类的OnAuthorization，如果验证不通过，返回Response的StatusCode并结束这次处理。\ntype  TsysUserWebApi = class(BackendBaseWebApi)\n  private\n    [IOC]\n    SysService: ISysService;\n  public\n    constructor Create;\n    [Authorize('Ferry.Authorization.TFerryAuthorization', 'dashboard')]\n    function GET: TSysUserResult;\n    [Authorize('Ferry.Authorization.TFerryAuthorization', 'dashboard')]\n    function POST([FormBody]user: TSysUser): TSysUserResult;\n  end;\nimplementation\nfunction TsysUserWebApi.GET: TSysUserResult;\nbegin\n  Result.code := 200;\n  Result.data.posts := SysService.Posts;\n  Result.data.roles := SysService.Roles;\n  Result.msg := '';\nend;\n\nfunction TsysUserWebApi.POST(user: TSysUser): TSysUserResult;\nbegin\n  Result.code := 200;\n  if SysService.UserByName(user.username).user_id>0 then\n  begin\n    Result.code := -1;\n    Result.msg := '账户已存在！';\n    Exit;\n  end;\n  user.create_by := IntToStr(current_user.user_id);\n  user.update_by := IntToStr(current_user.user_id);\n  user.create_time := Now;\n  user.password := THashMD5.GetHashString(user.password);\n  try\n  if SysService.SaveUser(user)<1 then\n  begin\n    Result.code := -1;\n    Result.msg := '保存失败！';\n    Exit;\n  end;\n  except\n    on e:Exception do\n    begin\n      Result.code := -1;\n      Result.msg := '保存失败！'+e.Message;\n      Exit;\n    end;\n  end;\n  Result.msg := '保存成功！';\nend;"
        }
      ]
    },
    {
      "title": "CORS 跨域",
      "content": "",
      "url": "\\docs\\cors.html",
      "children": [
        {
          "title": "什么是跨域",
          "url": "\\docs\\cors.html#什么是跨域",
          "content": "什么是跨域简单来说，当一个请求 url 的协议、域名、端口三者之间任意一个与当前页面 url 不同即为跨域。那为什么会出现跨域问题呢？出于浏览器的同源策略限制。同源策略（Sameoriginpolicy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说 Web 是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。同源策略会阻止一个域的 javascript 脚本和另外一个域的内容进行交互。所谓同源（即指在同一个域）就是两个页面具有相同的协议（protocol），主机（host）和端口号（port）"
        },
        {
          "title": "有跨域行为示例",
          "url": "\\docs\\cors.html#有跨域行为示例",
          "content": "有跨域行为示例\n\n当前页面 url\n被请求页面 url\n是否跨域\n原因\n\n\n\n\nhttp://www.mvcxe.com/\nhttp://www.mvcxe.com/index.html\n否\n同源（协议、域名、端口号相同）\n\n\nhttp://www.mvcxe.com/\nhttps://www.mvcxe.com/index.html\n跨域\n协议不同（http/https）\n\n\nhttp://www.mvcxe.com/\nhttp://www.baidu.com/\n跨域\n主域名不同（mvcxe/baidu）\n\n\nhttp://www.mvcxe.com/\nhttp://blog.mvcxe.com/\n跨域\n子域名不同（www/blog）\n\n\nhttp://www.mvcxe.com:8080/\nhttp://www.mvcxe.com:7001/\n跨域\n端口号不同（8080/7001）\n\n\n"
        },
        {
          "title": "什么是 CORS",
          "url": "\\docs\\cors.html#什么是-cors",
          "content": "什么是 CORS跨源资源共享 (CORS) ：是一种 W3C 标准，可让服务器放宽相同的源策略。\n不是一项安全功能，CORS 放宽 security。 API 不能通过允许 CORS 来更安全。 有关详细信息，请参阅 CORS 工作原理。\n允许服务器明确允许一些跨源请求，同时拒绝其他请求。\n比早期的技术（如 JSONP）更安全且更灵活。\n"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\cors.html#如何使用",
          "content": "如何使用创建一个基类，需要跨越支持的WebApi继承这个基类\n    type      FerryBaseWebApi = class(TWebApi)\n      private\n      protected\n      public\n        constructor Create;\n        function OPTIONS: string;\n      end;\n    implementation\n\n    { FerryBaseWebApi }\n\n    constructor FerryBaseWebApi.Create;\n    begin\n      inherited;\n      Response.AddHeader('Access-Control-Allow-Origin', '*');\n    end;\n\n    function FerryBaseWebApi.OPTIONS: string;\n    begin\n      Response.ContentType := 'application/json';\n      Response.AddHeader('Access-Control-Allow-Headers', 'authorization, origin, content-type, accept');\n      Response.AddHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');\n      Response.AddHeader('Allow', 'HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS');\n      Response.AddHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, value');\n      Response.StatusCode := 204;\n      Result := '{}';\n    end;\n"
        }
      ]
    },
    {
      "title": "视图引擎",
      "content": "",
      "url": "\\docs\\view-engine.html",
      "children": [
        {
          "title": "关于视图引擎",
          "url": "\\docs\\view-engine.html#关于视图引擎",
          "content": "关于视图引擎视图引擎负责根据视图模板创建 HTML。视图通常是 HTML 和编程语言的某种混合。支持变量定义、方法调用及逻辑编写。在MVCXE框架中，底层集成了Pascal语言编写的高效视图引擎组件TPLXE, 并提供更加灵活方便的语法糖。"
        },
        {
          "title": "视图引擎作用",
          "url": "\\docs\\view-engine.html#视图引擎作用",
          "content": "视图引擎作用灵活的模板语法\n根据不同的数据编译模板产生不同的输出\n实现强大的插件化机制\n实现全站页面静态化\n可以用作邮件模板、短信模板、优惠券信息模板等\n"
        },
        {
          "title": "基础使用",
          "url": "\\docs\\view-engine.html#基础使用",
          "content": "基础使用"
        },
        {
          "title": "注册服务",
          "url": "\\docs\\view-engine.html#基础使用-注册服务",
          "content": "注册服务使用之前需在Webborker服务中注册MVC：    app.UseMvc;"
        },
        {
          "title": "在Controller中使用",
          "url": "\\docs\\view-engine.html#在controller中使用",
          "content": "在Controller中使用type  TMvcController = class(TController)\n  public\n    function Index: string;\n  end;\nimplementation\nfunction TMvcController.Index: string;\nbegin\n  Result := View;\nend;\nView方法会自动查找默认的模板文件解析后返回内容。"
        },
        {
          "title": "默认的模板文件存放规则",
          "url": "\\docs\\view-engine.html#在controller中使用-默认的模板文件存放规则",
          "content": "默认的模板文件存放规则默认存放目录：.\\views\\[ControllerName]\n如果在launchSettings.json中配置了bpl的Area值，存放目录为:.\\areas\\[AreaName]\\views\\[ControllerName]\n默认模板文件名：[ActionName].htm\n上面的例子，模板文件是：.\\views\\Mvc\\Index.htm\nView可以传入参数模板文件名，如Result := View('Mvc\\Index.htm')，相对路径于.\\views\\或.\\areas\\[AreaName]\\views\\\n"
        },
        {
          "title": "Layout",
          "url": "\\docs\\view-engine.html#在controller中使用-layout",
          "content": "Layout如果模板中没有指定Layout，且存在相对路径于.\\views\\或.\\areas\\[AreaName]\\views\\下有Shared\\_Layout.htm文件，会先解析Layout模板，然后将Action模板解析得到的内容替换到Layout模板中的{RenderBody}标签中。默认Layout文件不存在就不使用Layout\n使用{^ 'Shared\\DocLayout.htm'}指定模板\n使用{^ 'null'}指定不使用模板\nLayout模板中用{RenderJS}引用Action模板同名.js文件，例如上面例子，{RenderBody}是.\\views\\Mvc\\Index.htm解析的内容，{RenderJS}是.\\views\\Mvc\\Index.js解析的内容\n"
        },
        {
          "title": "HttpStatusCode模板",
          "url": "\\docs\\view-engine.html#在controller中使用-httpstatuscode模板",
          "content": "HttpStatusCode模板如果控制器发生错误，被系统捕获，MVCXE框架会根据Response.StatusCode查找模板，相对路径于.\\views\\或.\\areas\\[AreaName]\\views\\下的[HttpStatusCode].htm文件，当前只处理403/404/500"
        },
        {
          "title": "向模板注入内容",
          "url": "\\docs\\view-engine.html#向模板注入内容",
          "content": "向模板注入内容用模板很大的需求就是动态显示内容，这些内容是由代码中产生的常量、变量、对象按照一定的规则生成Html代码，所以，我们需要向模板注入运行中产生的常量、变量、对象。\n在Action方法函数中，用ViewBag.Add('[模板中用的变量名]', 应用中的变量名);\n  type\n    TUserController = class(BaseController)\n    public\n          function index([IOC('Fly.Service.Post.TPostService')]PostService: IPostService; CurrentPage: Integer): string;\n    end;\n  implementation\n  function TUserController.index([IOC('Fly.Service.Post.TPostService')]PostService: IPostService; CurrentPage: Integer): string;\n  var\n    posts: TArray;\n    TotalCount, PageCount: Integer;\n  begin\n    if not IsLogin then\n    begin\n          Response.StatusCode := 404;\n          Response.Abort;\n          Exit;\n    end;\n    if CurrentPage = 0 then\n          CurrentPage := 1;\n    posts := PostService.GetMyPosts(CurrentUserId, CurrentPage, PageSize, TotalCount, PageCount);\n    ViewBag.Add('Posts', posts);\n    ViewBag.Add('TotalCount', TotalCount);\n    ViewBag.Add('CurrentPage', CurrentPage);\n    ViewBag.Add('PageCount', PageCount);\n    ViewBag.Add('IsLogin', IsLogin);\n    ViewBag.Add('CurrentAccount', CurrentAccount);\n    ViewBag.Add('Action', RouteData['Action']);\n    Result := View;\n  end;\n\n\n\n在模板中用{var [模板中用的变量名]:[变量类型]}自定义。\n  {var abc:string}\n  {var i1:Integer}\n  {var tool:uTestService.TTools}\n  {var op:MVCXE.OperatorHelper.TOperatorHelper}\n  {var cache:MVCXE.MemoryCache.TMemoryCache}\n\n\n\n在模板中赋值用{let [模板中用的变量名]=[变量值]}\n  {var tool:uTestService.TTools}\n  {var op:MVCXE.OperatorHelper.TOperatorHelper}\n  {var abc:string}\n  {let abc=$op.Concat($tool.exec(),'abcdefg')}\n  {var i1:Integer}\n  {var i2:Integer}\n  {let i1=10}\n  {let i2=20}\n\n\n"
        },
        {
          "title": "输出内容",
          "url": "\\docs\\view-engine.html#输出内容",
          "content": "输出内容"
        },
        {
          "title": "输出值",
          "url": "\\docs\\view-engine.html#输出内容-输出值",
          "content": "输出值语法：{= $简单变量} 或 {= $对象变量.属性} 或 {= $对象变量.方法(参数)}\n描述：将服务器端的变量值或对象属性值在页面中输出\n    //输出Delphi代码在MVC Controller中注入的字符串变量    {= $username}\n    //输出Delphi代码在MVC Controller中注入对象的属性\n    {= $view.age}\n    //输出在模板中声明的对象实例里的函数结果\n    {= $tool.exec()}\n    //声明一个字符串变量\n    {var abc:string}\n    //字符串相加\n    {let abc=$op.Concat($tool.exec(),'abcdefg')}\n    //输出字符串的值\n    {= $abc}\n    //声明整型变量\n    {var i1:Integer}\n    {var i2:Integer}\n    //为整型变量赋值\n    {let i1=10}\n    {let i2=20}\n    //输出两个整数相加的结果\n    {= $op.IntPlus($i1,$i2)}\n"
        },
        {
          "title": "输出带模板语法字符串解析后的值",
          "url": "\\docs\\view-engine.html#输出内容-输出带模板语法字符串解析后的值",
          "content": "输出带模板语法字符串解析后的值语法：{& $简单变量(字符串类型)} 或 {& $对象变量.属性(字符串类型)} 或 {& $对象变量.方法(参数)(返回字符串类型)}\n描述：将服务器端的变量值或对象属性值(这值是字符串类型，里面包含有模板语法)解析后在页面中输出\n    ViewBag.Add('content', '{if ($IsLogin)}Logout{end}');\n    //如果登陆了输出Logout，如果没有登陆为空\n    {& $content}\n"
        },
        {
          "title": "输出字符串HtmlEncode后的值",
          "url": "\\docs\\view-engine.html#输出内容-输出字符串htmlencode后的值",
          "content": "输出字符串HtmlEncode后的值语法：{# $简单变量(字符串类型)} 或 {# $对象变量.属性(字符串类型)} 或 {# $对象变量.方法(参数)(返回字符串类型)}\n描述：将服务器端的变量值或对象属性值(这值是字符串类型，里面包含有模板语法)解析后在页面中输出\n    ViewBag.Add('content', 'Home');\n    //输出字符串Home，而不是链接Home\n    {# $content}\n"
        },
        {
          "title": "输出Url，",
          "url": "\\docs\\view-engine.html#输出内容-输出url，",
          "content": "输出Url，语法：{~ '/urlpath'} 或 {~ $简单变量} 或 {~ $对象变量.属性} 或 {~ $对象变量.方法(参数)}\n描述：输出的url可自动加上[RootPath]\n    var    loginpage: string;\n    begin\n    loginpage = '/account/login';\n    ViewBag.Add('loginpage', loginpage);\n    end;\n\n    Login\n    Login\n"
        },
        {
          "title": "流程控制语句",
          "url": "\\docs\\view-engine.html#流程控制语句",
          "content": "流程控制语句"
        },
        {
          "title": "循环",
          "url": "\\docs\\view-engine.html#流程控制语句-循环",
          "content": "循环语法：\n    {for (循环变量 in $循环对象.属性)}      循环区块的内容\n    {end}\n描述：按服务器端的数组类型变量顺序循环一遍\n循环值:$循环变量.index表示当前循环序号，由0开始。\n支持{break}\n$循环变量.value表示循环值，可以是一个简单变量，也可以是一个对象\n    posts := PostService.GetMyPosts(CurrentUserId, CurrentPage, PageSize, TotalCount, PageCount);    ViewBag.Add('Posts', posts);\n\n     \n    {for (Post in $Posts)}\n        \n            \n              \n            \n            \n              分享\n              {= $op.HtmlEncode($Post.Value.Title)}\n            \n        \n    {end}\n    \n"
        },
        {
          "title": "条件判断",
          "url": "\\docs\\view-engine.html#流程控制语句-条件判断",
          "content": "条件判断语法：\n    {if (条件表达式)}      条件表达式为真时输出这块内容\n    {else}\n      条件表达式为假时输出这块内容\n    {end}\n描述：条件表达式支持=  = \n    {if ($IsLogin)}    \n            {if ($op.Logical_or($CurrentAccount.IsAdmin, ($Post.UserId = $CurrentAccount.Id)))}\n            删除\n            {end}\n            {if ($CurrentAccount.IsAdmin)}\n                    {if ($Post.IsTop = False)}\n                            置顶\n                    {else}\t\t\t\n                            取消置顶\n                    {end}\n                    {if ($Post.IsBoutique = False)}\n                            加精\n                    {else}\n                            取消加精\n                    {end}\n            {end}\n    \n    {end}\n"
        },
        {
          "title": "代码块",
          "url": "\\docs\\view-engine.html#代码块",
          "content": "代码块"
        },
        {
          "title": "Section",
          "url": "\\docs\\view-engine.html#代码块-section",
          "content": "Section定义Section代码块\n    {@SectionName}      该Section代码块的内容\n    {end}\n引用Section代码块\n    {= @SectionName}描述：将某些多次用到的公用代码编写成代码块，在循环或条件判断中使用可以让模板代码简洁直观\n    {@TestSection}      刚刚\n    {end}\n     \n    {for (Post in $Posts)}\n        \n            \n              \n            \n            \n              分享\n              {= $op.HtmlEncode($Post.Value.Title)}\n            \n            \n              \n                    {= $Post.Value.User.Nickname}\n                    {if ($Post.Value.User.IsVip = True)}\n                            \n                            VIP{= $Post.Value.User.VipLevel}\n                    {end}\n              \n              {= @TestSection}\n            \n        \n    {end}\n    \n"
        },
        {
          "title": "嵌入子模板",
          "url": "\\docs\\view-engine.html#代码块-嵌入子模板",
          "content": "嵌入子模板语法：{! '子模板' }\n描述：子模板在.\\views\\或.\\areas\\[AreaName]\\views\\下按路径文件名匹配\n          \n            {! 'Config\\site.htm' }\n      \n      \n            {! 'Config\\logo.htm' }\n      \n      \n            {! 'Config\\upload.htm' }\n      \n    \n"
        },
        {
          "title": "强制不解析",
          "url": "\\docs\\view-engine.html#代码块-强制不解析",
          "content": "强制不解析语法：{}\n描述：内容原样输出，忽略上面的模板控制代码\n"
        }
      ]
    },
    {
      "title": "统一返回",
      "content": "",
      "url": "\\docs\\action-result.html",
      "children": [
        {
          "title": "什么是统一返回",
          "url": "\\docs\\action-result.html#什么是统一返回",
          "content": "什么是统一返回有时候我们需要在返回的内容里面统一加减一些内容，就需要用到OnActionResult。在Controller或WebApi中定义函数OnActionResult，它有一个TValue类型参数，返回类型可自定义。"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\action-result.html#如何使用",
          "content": "如何使用type  TRestResult = record\n    statusCode: Integer;\n    data: TValue;\n    succeeded: Boolean;\n    errors: string;\n    extras: string;\n    timestamp: Int64;\n  end;\n  TMyRec = record\n    name: string;\n    age: Integer;\n  end;\n  TMyWebApi = class(TWebApi)\n  public\n    function GET: TMyRec;\n    function OnActionResult(const context: TValue): TRestResult;\n  end;\nimplementation\nfunction TMyWebApi.GET: TMyRec;\nbegin\n  Result.name := 'mvcxe';\n  Result.age := 6;\nend;\n\nfunction TMyWebApi.OnActionResult(const context: TValue): TRestResult;\nbegin\n  if string(context.TypeInfo.Name).IndexOf('TBahException')-1 then\n  begin\n    Result.statusCode := context.AsType.StatusCode;\n    Result.data := '';\n    Result.succeeded := False;\n    Result.errors := context.AsType.Message;\n    Result.extras := '';\n    Result.timestamp := DateTimeToUnix(Now, True);\n  end\n  else if string(context.TypeInfo.Name).IndexOf('Exception')-1 then\n  begin\n    Result.statusCode := 500;\n    Result.data := '';\n    Result.succeeded := False;\n    Result.errors := context.AsType.Message;\n    Result.extras := '';\n    Result.timestamp := DateTimeToUnix(Now, True);\n  end\n  else\n  begin\n    Result.statusCode := 0;\n    Result.data := context;\n    Result.succeeded := True;\n    Result.errors := '';\n    Result.extras := '';\n    Result.timestamp := DateTimeToUnix(Now, True);\n  end;\nend;\n"
        },
        {
          "title": "可以将含OnActionResult定义为基类，所有继承该基类的Controller和WebApi也会统一由基类的OnActionResult返回内容",
          "url": "\\docs\\action-result.html#可以将含onactionresult定义为基类，所有继承该基类的controller和webapi也会统一由基类的onactionresult返回内容",
          "content": "可以将含OnActionResult定义为基类，所有继承该基类的Controller和WebApi也会统一由基类的OnActionResult返回内容TRestWebApi = class(TWebApi)Protected\n    function OnActionResult(const context: TValue): TRestResult;\nend;\nTMyWebApi = class(TRestWebApi)\npublic\n    function GET: TMyRec;\nend;"
        }
      ]
    },
    {
      "title": "日志记录",
      "content": "",
      "url": "\\docs\\logging.html",
      "children": [
        {
          "title": "关于日志",
          "url": "\\docs\\logging.html#关于日志",
          "content": "关于日志通常日志指的是系统日志和程序日志。系统日志 是记录系统中硬件、软件和系统问题的信息，同时还可以监视系统中发生的事件。用户可以通过它来检查错误发生的原因，或者寻找受到攻击时攻击者留下的痕迹。系统日志包括系统日志、应用程序日志和安全日志。程序日志 是程序运行中产生的日志，通常由框架运行时或开发者提供的日志。包括请求日志，异常日志、审计日志、行为日志等。"
        },
        {
          "title": "日志作用",
          "url": "\\docs\\logging.html#日志作用",
          "content": "日志作用在项目开发中，都不可避免的使用到日志。没有日志虽然不会影响项目的正确运行，但是没有日志的项目可以说是不完整的。日志在调试，错误或者异常定位，数据分析中的作用是不言而喻的。调试\n在项目调试时，查看栈信息可以方便地知道当前程序的运行状态，输出的日志便于记录程序在之前的运行结果。错误定位\n不要以为项目能正确跑起来就可以高枕无忧，项目在运行一段时候后，可能由于数据问题，网络问题，内存问题等出现异常。这时日志可以帮助开发或者运维人员快速定位错误位置，提出解决方案。数据分析\n大数据的兴起，使得大量的日志分析成为可能，ELK 也让日志分析门槛降低了很多。日志中蕴含了大量的用户数据，包括点击行为，兴趣偏好等，用户画像对于公司下一步的战略方向有一定指引作用。"
        },
        {
          "title": "日志级别",
          "url": "\\docs\\logging.html#日志级别",
          "content": "日志级别日志级别可以有效的对日志信息进行归类，方便准确的查看特定日志内容。通常日志类别有以下级别：\n\n级别\n值\n方法\n描述\n\n\n\n\nTrace（跟踪）\n0\nTrace\n包含最详细的消息。 这些消息可能包含敏感的应用数据。 这些消息默认情况下处于禁用状态，并且不应在生产中启用。\n\n\nDebug（调试）\n1\nDebug\n用于调试和开发。 由于量大，请在生产中小心使用。\n\n\nInformation（信息）\n2\nInfo\n跟踪应用的常规流。 可能具有长期值。\n\n\nWarning（警告）\n3\nWarn\n对于异常事件或意外事件。 通常包括不会导致应用失败的错误或情况。\n\n\nError（错误）\n4\nError\n表示无法处理的错误和异常。 这些消息表示当前操作或请求失败，而不是整个应用失败。\n\n\nCritical（严重）\n5\nFatal\n需要立即关注的失败。 例如数据丢失、磁盘空间不足。\n\n\n"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\logging.html#如何使用",
          "content": "如何使用在MVCXE框架中，已经内置了日志组件，提供了两种日志对象创建方式。"
        },
        {
          "title": "注入ILog方式",
          "url": "\\docs\\logging.html#如何使用-注入ilog方式",
          "content": "注入ILog方式使用非常简单，uses MVCXE.Log;，然后通过ILog对象进行注入，如：type  TIndexController = class(TController)\n  private\n    [IOC('MVCXE.Logger.TLoggerPro')]\n    logger: ILog;\n  public\n    function Index: string;\n  end;\nimplementation\nfunction TIndexController.Index: string;\nbegin\n  logger.Info('View Index Page.');\nend;\n"
        },
        {
          "title": "使用BuildLoggerPro(TagName)获取ILog对象",
          "url": "\\docs\\logging.html#如何使用-使用buildloggerprotagname获取ilog对象",
          "content": "使用BuildLoggerPro(TagName)获取ILog对象function TIndexController.Index: string;var\n  logger: ILog;  \nbegin\n  logger := BuildLoggerPro('TIndexController');\n  logger.Info('View Index Page.');\nend;\n"
        },
        {
          "title": "ILog",
          "url": "\\docs\\logging.html#ilog",
          "content": "ILogILog = interface    ['{53F4555E-FFB0-4806-BDFE-33D62ECB7F99}']\n    procedure Trace(const aMessage: string); overload;\n    procedure Trace(const aMessage: string;\n    const aParams: array of const); overload;\n\n    procedure Debug(const aMessage: string); overload;\n    procedure Debug(const aMessage: string;\n    const aParams: array of const); overload;\n\n    procedure Info(const aMessage: string); overload;\n    procedure Info(const aMessage: string;\n    const aParams: array of const); overload;\n\n    procedure Warn(const aMessage: string); overload;\n    procedure Warn(const aMessage: string;\n    const aParams: array of const); overload;\n\n    procedure Error(const aException: Exception); overload;\n    procedure Error(const aMessage: string;\n    const aException: Exception); overload;\n    procedure Error(const aMessage: string; const aParams: array of const;\n    const aException: Exception); overload;\n    procedure Error(const aMessage: string); overload;\n    procedure Error(const aMessage: string;\n    const aParams: array of const); overload;\n\n    procedure Fatal(const aMessage: string); overload;\n    procedure Fatal(const aMessage: string;\n    const aParams: array of const); overload;\nend;\n"
        },
        {
          "title": "配置日志输出介质",
          "url": "\\docs\\logging.html#配置日志输出介质",
          "content": "配置日志输出介质在appsetting.json中配置，根节点是logxe{    \"logxe\": {\n        \"autoReload\": \"\",\n        \"throwExceptions\": \"\",\n        \"internalLogLevel\": \"\",\n        \"internalLogFile\": \"\",\n        \"variable\": [],\n        \"target\": [{\n            \"name\": \"console\",\n            \"type\": \"ColoredConsole\",\n            \"layout\": \"%0:s [TID %1:-8d][%2:-10s] %3:s [%4:s]\"\n            },{\n            \"name\": \"logfile\",\n            \"type\": \"File\",\n            \"layout\": \"%0:s [TID %1:10u][%2:-8s] %3:s [%4:s]\",\n            \"maxFileCount\": 5,\n            \"maxFileSize\": 1000,\n            \"logsFolder\": \"\",\n            \"logFileName\": \"logs\\\\%s.%2.2d.%s_info.log\"\n        }],\n        \"rule\": [{\n            \"name\": \"*\",\n            \"minlevel\": \"Trace\",\n            \"writeTo\": \"console\"\n            },{\n            \"name\": \"*\",\n            \"minlevel\": \"Info\",\n            \"writeTo\": \"logfile\"\n        }]\t\n    }\n}\n"
        },
        {
          "title": "输出到控制台",
          "url": "\\docs\\logging.html#配置日志输出介质-输出到控制台",
          "content": "输出到控制台logxe\\target[n]\\type = ColoredConsole"
        },
        {
          "title": "输出到文件",
          "url": "\\docs\\logging.html#配置日志输出介质-输出到文件",
          "content": "输出到文件logxe\\target[n]\\type = File"
        },
        {
          "title": "输出过滤",
          "url": "\\docs\\logging.html#配置日志输出介质-输出过滤",
          "content": "输出过滤logxe\\rule[n]\\minlevel = Trace|Info|Warn|Error|Fatal当LogLevel符合minlevel的条件，就会writeTo对应的target中"
        },
        {
          "title": "现在使用Logpro日志控件为底层，以后可能会重写Log引擎。",
          "url": "\\docs\\logging.html#现在使用logpro日志控件为底层，以后可能会重写log引擎。",
          "content": "现在使用Logpro日志控件为底层，以后可能会重写Log引擎。"
        }
      ]
    },
    {
      "title": "JSON 序列化",
      "content": "",
      "url": "\\docs\\json-serialization.html",
      "children": [
        {
          "title": "什么是 JSON",
          "url": "\\docs\\json-serialization.html#什么是-json",
          "content": "什么是 JSONJSON (JavaScript Object Notation, JS 对象标记) 是一种轻量级的数据交换格式。它基于 ECMAScript (w3c 制定的 js 规范)的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。简单来说，JSON，是一种数据格式，在与后端的数据交互中有较为广泛的应用。"
        },
        {
          "title": "关于序列化库",
          "url": "\\docs\\json-serialization.html#关于序列化库",
          "content": "关于序列化库目前在Delphi提供了JSON序列化操作库：System.JsonMVCXE框架为了解决System.Json序列化操作不友好的问题，在System.Json的基础上包装成JsonSerializer类，并提供类方法进行JSON序列化操作JsonSerializer = classpublic\n    class procedure Deserialize(const AJson: string; var R: T); overload;\n    class function Serialize(const R: T): string;\n    class function Deserialize(const AJson: string): T; overload;\nend;\n"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\json-serialization.html#如何使用",
          "content": "如何使用    uses MVCXE.Json;"
        },
        {
          "title": "序列化对象",
          "url": "\\docs\\json-serialization.html#如何使用-序列化对象",
          "content": "序列化对象type  TMyObj = class\n  published\n    property Id: Integer;\n    property Name : string;\n  end;\n\nfunction GetText: string;\nvar\n    obj: TMyObj;\nbegin\n    obj := TMyObj.Create;\n    obj.Id := 1;\n    obj.Name := 'MVCXE';\n    Result := JsonSerializer.Serialize(obj);\nend;\n"
        },
        {
          "title": "反序列化字符串",
          "url": "\\docs\\json-serialization.html#如何使用-反序列化字符串",
          "content": "反序列化字符串function GetObject: TMyObj;var\n    json: string;\nbegin\n    json := '{\"Id\":1,\"Name\":\"MVCXE\"}';\n    Result := JsonSerializer.Deserialize(json);\nend;\n"
        },
        {
          "title": "自定义序列化属性名",
          "url": "\\docs\\json-serialization.html#如何使用-自定义序列化属性名",
          "content": "自定义序列化属性名使用[AliasName('AliasNameString')]注解\ntype  TMyObj = class\n  published\n    property Id: Integer;\n    [AliasName('MyName')]\n    property Name : string;\n  end;\nTMyObj序列化后的字符串是{\"Id\":value,\"MyName\":value}"
        },
        {
          "title": "时间格式化",
          "url": "\\docs\\json-serialization.html#如何使用-时间格式化",
          "content": "时间格式化使用[UTC]注解\ntype  TMyObj = class\n  published\n    property Id: Integer;\n    property Name : string;\n    [UTC]\n    property birthday: TDateTime;\n  end;\nTMyObj序列化后birthday的值是UTC时间"
        },
        {
          "title": "自定义输入输出格式",
          "url": "\\docs\\json-serialization.html#如何使用-自定义输入输出格式",
          "content": "自定义输入输出格式使用[CustomJsonNode(function name, function paramstr)]注解\ntype  TMyObj = class\n  published\n    property Id: Integer;\n    property Name : string;\n    [CustomJsonNode('DateTimeToStr', 'yyyy-MM-dd\"T\"HH:mm:ss')]\n    property birthday: TDateTime;\n    [CustomJsonNode('UnixTimeToStr', 'yyyy-MM-dd HH:mm:ss')]\n    property createtime: Int64;\n    [CustomJsonNode('StrToJson', '')]\n    property content: TJsonValue\n  end;\n当前实现了：DateTimeToStr、UnixTimeToStr、StrToJson三个自定义输入输出格式"
        },
        {
          "title": "空值不输出",
          "url": "\\docs\\json-serialization.html#如何使用-空值不输出",
          "content": "空值不输出使用[nullable]注解\n"
        },
        {
          "title": "DataTable、DataSet 等序列化问题",
          "url": "\\docs\\json-serialization.html#如何使用-datatable、dataset-等序列化问题",
          "content": "DataTable、DataSet 等序列化问题不支持复杂类型，如 DataTable、DataSet 等类型"
        },
        {
          "title": "范例",
          "url": "\\docs\\json-serialization.html#范例",
          "content": "范例我们要从appsettiong.json中读取log的配置信息，我们需要为这个json结构定对应的类结构，这样他们之间才可以正确序列化和反序列化{    \"logxe\": {\n        \"autoReload\": \"\",\n        \"throwExceptions\": \"\",\n        \"internalLogLevel\": \"\",\n        \"internalLogFile\": \"\",\n        \"variable\": [],\n        \"target\": [{\n            \"name\": \"console\",\n            \"type\": \"ColoredConsole\",\n            \"layout\": \"%0:s [TID %1:-8d][%2:-10s] %3:s [%4:s]\"\n            },{\n            \"name\": \"logfile\",\n            \"type\": \"File\",\n            \"layout\": \"%0:s [TID %1:10u][%2:-8s] %3:s [%4:s]\",\n            \"maxFileCount\": 5,\n            \"maxFileSize\": 1000,\n            \"logsFolder\": \"\",\n            \"logFileName\": \"logs\\\\%s.%2.2d.%s_info.log\"\n        }],\n        \"rule\": [{\n            \"name\": \"*\",\n            \"minlevel\": \"Trace\",\n            \"writeTo\": \"console\"\n            },{\n            \"name\": \"*\",\n            \"minlevel\": \"Info\",\n            \"writeTo\": \"logfile\"\n        }]\t\n    }\n}\n对应的类TMVCXEConfigLogerRef = classpublished\n    property ref: string;\nend;\n\nTMVCXEConfigLogParam = class\npublished\n    property Value: string;\nend;\n\nTMVCXEConfigLoger = class\npublished\n    property name: string;\n    property level: TMVCXEConfigLogParam;\n    [AliasName('appender-ref')]\n    property appenders: TArray;\nend;\n\nTMVCXEConfigLogAppenderFilter = class\npublished\n    [AliasName('type')]\n    property _type: string;\n    [AliasName('levelToMatch')]\n    property MatchLevels: TArray;\nend;\n\nTMVCXEConfigLogAppenderLayout = class\npublished\n    [AliasName('type')]\n    property _type: string;\n    property conversionPattern: TMVCXEConfigLogParam;\nend;\n\nTMVCXEConfigLogAppender = class\npublished\n    property name: string;\n    [AliasName('type')]\n    property _type: string;\n    [AliasName('filter')]\n    property filters: TArrays;\n    property layout: TMVCXEConfigLogAppenderLayout;\n    [AliasName('file')]\n    property _file: TMVCXEConfigLogParam;\n    property maximumFileSize: TMVCXEConfigLogParam;\n    property staticLogFileName: TMVCXEConfigLogParam;\n    property datePattern: TMVCXEConfigLogParam;\n    property maxSizeRollBackups: TMVCXEConfigLogParam;\nend;\n\nTMVCXEConfigLog = class\npublished\n    property writer: string;\n    property debug: string;\n    property root: TMVCXEConfigLoger;\n    [AliasName('logger')]\n    property loggers: TArray;\n    [AliasName('appender')]\n    property appenders: TArray;\nend;\n\nTLoggerProConfigTargetHighlightRow = class\npublished\n    property condition: string;\n    property foregroundColor: string;\nend;\n\nTLoggerProConfigTarget = class\npublished\n    [AliasName('type')]\n    property _type: string;\n    property name: string;\n    property layout: string;\n\n    property maxFileCount: string;\n    property maxFileSize: string;\n    property logsFolder: string;\n    property logFileName: string;\n\n    property fileName: string;\n    property keepFileOpen: string;\n    property useDefaultRowHighlightingRules: string;\n    [AliasName('highlight-row')]\n    property highlight_row: TArray;\nend;\n\nTLoggerProConfigRule = class\npublished\n    property name: string;\n    property minlevel: string;\n    property maxlevel: string;\n    property writeTo: string;\n    property targetIndex: Integer;\nend;\n\nTLoggerProConfigVariable = class\npublished\n    property name: string;\n    property Value: string;\nend;\n\nTLoggerProConfig = class\npublished\n    property autoReload: string;\n    property throwExceptions: string;\n    property internalLogLevel: string;\n    property internalLogFile: string;\n    [AliasName('variable')]\n    property variable: TArray;\n    [AliasName('target')]\n    property targets: TArray;\n    [AliasName('rule')]\n    property rules: TArray;\nend;\n反序列\nJsonSerializer.Deserialize(ConfigurationManager.Configuration.GetValue('logxe').ToJSON)   "
        }
      ]
    },
    {
      "title": "XML 序列化",
      "content": "",
      "url": "\\docs\\xml-serialization.html",
      "children": [
        {
          "title": "什么是 XML",
          "url": "\\docs\\xml-serialization.html#什么是-xml",
          "content": "什么是 XMLXML（Extensible Markup Language），中文是可扩展标记语言，是标准通用标记语言的子集。它是一种标记语言，用于标记电子文档，使其结构化。XML可以用来标记数据，定义数据类型，并允许用户定义自己的标记语言。对于人和机器来说，这是一种友好的数据传输方式。它提供了一种独立于应用程序或供应商的描述和交换结构化数据的统一方法，非常适合万维网传输。它是互联网环境下跨平台、内容依赖的技术，也是当今处理分布式结构化信息的有效工具。在Web开发中，XML，是一种数据格式，在与后端或其它系统的数据交互中有较为广泛的应用。"
        },
        {
          "title": "关于序列化库",
          "url": "\\docs\\xml-serialization.html#关于序列化库",
          "content": "关于序列化库目前在Delphi提供了XML序列化操作库：Xml.XMLDocMVCXE框架为了解决Xml.XMLDoc序列化操作不友好的问题，在Xml.XMLDoc的基础上包装成XmlSerializer类，并提供类方法进行XML序列化操作XmlSerializer = classpublic\n    class procedure Deserialize(const AXml: string; var R: T); overload;\n    class function Serialize(const R: T): string;\n    class function Deserialize(const AXml: string): T; overload;\nend;\n"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\xml-serialization.html#如何使用",
          "content": "如何使用    uses MVCXE.xml;"
        },
        {
          "title": "序列化对象",
          "url": "\\docs\\xml-serialization.html#如何使用-序列化对象",
          "content": "序列化对象type  TMyNode = class\n  published\n    property Id: Integer;\n    [XmlAttribute('@NODE_NAME')]\n    property Name : string;\n    [XmlAttribute('@NODE_TEXT')]\n    property Content : string;\n  end;\n  TRootElement = class\n  published\n    [XmlElement('MyNode')]\n    property MyNode: TMyNode;\n  end;\n  TMyObj = class\n  published\n    [XmlElement('RootElement')]\n    property RootElement: TMyNode;\n  end;\n  \n\nfunction GetText: string;\nvar\n    node: TMyNode;\n    root: TRootElement;\n    obj: TMyObj;\nbegin\n    node := TMyNode.Create;\n    node.Id := 1;\n    node.Content := 'MVCXE';\n    root := TRootElement.Create;\n    root.MyNode := node;\n    obj := TMyObj.Create;\n    obj.RootElement := root;\n    Result := XmlSerializer.Serialize(obj);\nend;\n"
        },
        {
          "title": "反序列化字符串",
          "url": "\\docs\\xml-serialization.html#如何使用-反序列化字符串",
          "content": "反序列化字符串function GetObject: TMyObj;var\n    json: string;\nbegin\n    json := 'MVCXE';\n    Result := XmlSerializer.Deserialize(json);\nend;\n"
        },
        {
          "title": "定义为节点",
          "url": "\\docs\\xml-serialization.html#如何使用-定义为节点",
          "content": "定义为节点使用[XmlElement('节点名')]注解，如果为节点名为*号，表示匹配任何节点，一般为数组时用。"
        },
        {
          "title": "定义为属性",
          "url": "\\docs\\xml-serialization.html#如何使用-定义为属性",
          "content": "定义为属性使用[XmlAttribute('属性名')]注解，属性名有两个特例：@NODE_NAME表示获取节点名，@NODE_TEXT表示获取节点的内容"
        },
        {
          "title": "定义为CDATA值",
          "url": "\\docs\\xml-serialization.html#如何使用-定义为cdata值",
          "content": "定义为CDATA值使用[XmlCDATA]注解"
        },
        {
          "title": "范例",
          "url": "\\docs\\xml-serialization.html#范例",
          "content": "范例我们要从sqlMap.xml中读取某个表节点的配置信息，我们需要为这个xml结构定对应的类结构，这样他们之间才可以正确序列化和反序列化        \n            SELECT A.*, \n            B.Id _TUsers_Id, B.Email _TUsers_Email, B.Nickname _TUsers_Nickname, B.Title _TUsers_Title, \n            B.Gender _TUsers_Gender, B.HeadPortrait _TUsers_HeadPortrait, B.IsVip _TUsers_IsVip, B.VipLevel _TUsers_VipLevel \n            FROM posts A\n            LEFT JOIN users B ON B.Id = A.UserId\n            WHERE A.IsTop=0 \n            ORDER BY A.UpdateTime DESC\n            LIMIT {Count}\n        \n        \n            SELECT A.*\n            FROM posts A\n            WHERE A.UserId=:UserId \n            ORDER BY A.CreateTime DESC\n            LIMIT {Count}\n        \n\n对应的类TSqlMapSelectCountEntity = record    [XmlAttribute('@NODE_TEXT')]\n    Sql: string;\nend;\n\nTSqlMapSelectEntity = record\n    Id: string;\n    [XmlAttribute('@NODE_TEXT')]\n    Sql: string;\n    Skip: string;\n    Take: string;\n    Count: TSqlMapSelectCountEntity;\n    Entity: TORMEntity;\n    class function Empty: TSqlMapSelectEntity; static;\nend;\n\nTSqlMapUpdateEntity = record\n    Id: string;\n    [XmlAttribute('@NODE_TEXT')]\n    Sql: string;\n    Entity: TORMEntity;\n    class function Empty: TSqlMapUpdateEntity; static;\nend;\n\nTSqlMapDeleteEntity = record\n    Id: string;\n    [XmlAttribute('@NODE_TEXT')]\n    Sql: string;\n    Entity: TORMEntity;\n    class function Empty: TSqlMapDeleteEntity; static;\nend;\n\nTSqlMapInsertEntity = record\n    Id: string;\n    [XmlAttribute('@NODE_TEXT')]\n    Sql: string;\n    Entity: TORMEntity;\n    class function Empty: TSqlMapInsertEntity; static;\nend;\n\nTSqlMapEntity = record\n    [XmlElement('select')]\n    select: TArray;\n    [XmlElement('update')]\n    update: TArray;\n    [XmlElement('delete')]\n    delete: TArray;\n    [XmlElement('insert')]\n    insert: TArray;\nend;\n反序列\nSqlMapEntity := XmlSerializer.Deserialize(Xml);  "
        }
      ]
    },
    {
      "title": "分布式 ID 生成",
      "content": "",
      "url": "\\docs\\idgenerator.html",
      "children": [
        {
          "title": "为什么需要分布式 ID",
          "url": "\\docs\\idgenerator.html#为什么需要分布式-id",
          "content": "为什么需要分布式 ID全局唯一性: 不能出现重复的 ID 号, 既然是唯一标识, 这是最基本的要求。趋势递增: 在 MySQL InnoDB 引擎中使用的是聚集索引, 由于多数 RDBMS 使用 B-tree 的数据结构来存储索引数据, 在主键的选择上面我们应该尽量使用有序的主键保证写入性能。单调递增: 保证下一个 ID 一定大于上一个 ID, 例如事务版本号, IM 增量消息, 排序等特殊需求。信息安全: 如果 ID 是连续的, 恶意用户的扒取工作就非常容易做了, 直接按照顺序下载指定 URL 即可; 如果是订单号就更危险了, 竞对可以直接知道我们一天的单量。 所以在一些应用场景下, 会需要 ID 无规则, 不规则。"
        },
        {
          "title": "分布式 ID 有哪些",
          "url": "\\docs\\idgenerator.html#分布式-id-有哪些",
          "content": "分布式 ID 有哪些常见的分布式 ID 有 连续 GUID、短 ID、雪花算法 ID。"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\idgenerator.html#如何使用",
          "content": "如何使用"
        },
        {
          "title": "连续 GUID 方式",
          "url": "\\docs\\idgenerator.html#如何使用-连续-guid-方式",
          "content": "连续 GUID 方式Guid 是混乱无序的，想要一种产生顺序 Guid 的算法来保证数据库的高效运行。(计划中)"
        },
        {
          "title": "短 ID",
          "url": "\\docs\\idgenerator.html#短-id",
          "content": "短 ID短 ID 按道理不应该放在分布式 ID 生成这个章节，它的作用用途常用于并发不强的内部系统中，比如 任务ID，Issue 编号 等等。(会大改)uses MVCXE.CAPTCHA;type\nTAccountController = class(BaseController)\nprivate\n    [IOC('MVCXE.Captcha.XE.TCaptchaXE')]\n    Captcha: ICaptcha;\npublic\n    function CaptchaCode: string;\nend;\nimplementation\nfunction TAccountController.CaptchaCode: string;\nbegin\n  Captcha.Generate;\n  Result := Captcha.Code;\nend;\n"
        },
        {
          "title": "雪花算法 ID",
          "url": "\\docs\\idgenerator.html#短-id-雪花算法-id",
          "content": "雪花算法 ID雪花算法：使用一个 64 bit 的 long 型的数字作为全局唯一 ID。在分布式系统中的应用十分广泛，且 ID 引入了时间戳，基本上保持自增的。(会大改)uses MVCXE.IdWorker;function GenerateSnowflakeId: Int64;\n"
        }
      ]
    },
    {
      "title": "文件上传下载",
      "content": "",
      "url": "\\docs\\upload-download.html",
      "children": [
        {
          "title": "文件下载",
          "url": "\\docs\\upload-download.html#文件下载",
          "content": "文件下载uses MVCXE.HTTPApp;type\nTMyController = class(TController)\npublic\n    [HttpGet]\n    function Export: TStream;\n    [HttpGet]\n    function Download: ansistring;\nend;\nimplementation\nfunction TMyController.Export: TStream;\nbegin\n  Response.ContentType := 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';\n  Response.AddHeader('Content-Disposition', 'attachment;Filename=Goods_'+FormatDateTime('yyyyMMddHHmmss', Now)+'.xlsx');\n  Result := TFileStream.Create('sample.xlsx', fmOpenRead, fmShareDenyNone);\nend;\nfunction TMyController.Download: ansistring;\nvar\n  fs: TFileStream;\nbegin\n  Response.ContentType := 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';\n  Response.AddHeader('Content-Disposition', 'attachment;Filename=Goods_'+FormatDateTime('yyyyMMddHHmmss', Now)+'.xlsx');\n  fs := TFileStream.Create('sample.xlsx', fmOpenRead, fmShareDenyNone);\n  SetLength(Result, FContentStream.Size);\n  fs.Position := 0;\n  fs.Read(Pointer(Result)^, fs.Size);\nend;\n"
        },
        {
          "title": "关于前端获取文件名",
          "url": "\\docs\\upload-download.html#文件下载-关于前端获取文件名",
          "content": "关于前端获取文件名Response.AddHeader('Content-Disposition', '\"attachment; filename={文件名}');Response.AddHeader('Access-Control-Expose-Headers', 'Content-Disposition');\n"
        },
        {
          "title": "文件上传",
          "url": "\\docs\\upload-download.html#文件上传",
          "content": "文件上传type  TUploadResult = record\n    msg: string;\n    status: Integer;\n    url: string;\n  end;\n  TApiController = class(TWebApi)\n  public\n    [HttpPost]\n    function Upload([AliasName('file')]const AFile: HttpPostedFile): TUploadResult;\n  end;\nimplementation\nfunction TApiController.Upload([AliasName('file')]const AFile: HttpPostedFile): TUploadResult;\nvar\n  ext: string;\n  path: string;\n  filePath: string;\n  fileName: string;\n  fs: TFileStream;\nbegin\n  Response.ContentType := 'application/json';\n  if not IsLogin then\n  begin\n    Result.status := 1;\n    Result.msg := '请先登录.';\n    Exit;\n  end;\n  if AFile.FileName = '' then\n  begin\n    Result.status := 1;\n    Result.msg := '没有上传内容.';\n    Exit;\n  end;\n  ext := ExtractFileExt(AFile.FileName);\n  if not (SameText(ext,'.jpg') or SameText(ext,'.png') or SameText(ext,'.gif')) then\n  begin\n    Result.status := 1;\n    Result.msg := '只能上传图片.';\n    Exit;\n  end;\n  path := '/Uploads/PostImages/' + YearOf(Now).ToString + '/' + MonthOf(Now).ToString;\n  filePath := Server.MapPath(path);\n  ForceDirectories(filePath);\n  fileName := FormatDateTime('yyyyMMddhhmmss', Now)+'_'+AFile.FileName;\n  fs := TFileStream.Create(filePath+'\\'+fileName, fmCreate);\n  try\n    fs.Write(Pointer(AFile.Data)^, AFile.Size);\n  finally\n    fs.Free;\n  end;\n  Result.status := 0;\n  Result.msg := '上传成功';\n  Result.url := RouteData['Root']+path+'/'+fileName;\nend;\n"
        },
        {
          "title": "前端",
          "url": "\\docs\\upload-download.html#文件上传-前端",
          "content": "前端        \n            文件信息\n            \n                \n                \n                     上传文件\n                     选择文件\n                \n            \n        \n\n"
        },
        {
          "title": "关于使用AXIOS上传文件,方法获取到参数FILES.COUNT=0",
          "url": "\\docs\\upload-download.html#文件上传-关于使用axios上传文件,方法获取到参数files.count=0",
          "content": "关于使用AXIOS上传文件,方法获取到参数FILES.COUNT=0axios请求配置let formData = new FormData();formData.append(\"files\", this.file); //files需与方法里的参数files名称一样\nlet config = {\n  headers: {\n    \"Content-Type\": \"multipart/form-data\",\n  },\n};\naxios.post(this.uploadURL, formData, config).then((res) => {//需引入axios\n  console.log(res);\n});\n"
        }
      ]
    },
    {
      "title": "依赖注入/控制反转",
      "content": "",
      "url": "\\docs\\dependency-injection.html",
      "children": [
        {
          "title": "依赖注入",
          "url": "\\docs\\dependency-injection.html#依赖注入",
          "content": "依赖注入所谓依赖注入，是指程序运行过程中，如果需要调用另一个对象协助时，无须在代码中创建被调用者，而是依赖于外部的注入。通俗来讲，就是把有依赖关系的类放到容器中，然后在我们需要这些类时，容器自动解析出这些类的实例。依赖注入最大的好处是实现类的解耦，利于程序拓展、单元测试、自动化模拟测试等。依赖注入的英文为：Dependency Injection，简称DI"
        },
        {
          "title": "控制反转",
          "url": "\\docs\\dependency-injection.html#控制反转",
          "content": "控制反转控制反转只是一个概念，也就是将创建对象实例的控制权（原本是程序员）从代码控制权剥离到IOC 容器中控制。控制反转的英文为：Inversion of Control，简称IOC"
        },
        {
          "title": "IOC/DI 优缺点",
          "url": "\\docs\\dependency-injection.html#iocdi-优缺点",
          "content": "IOC/DI 优缺点传统的代码，每个对象负责管理与自己需要依赖的对象，导致如果需要切换依赖对象的实现类时，需要修改多处地方。同时，过度耦合也使得对象难以进行单元测试。优点\n依赖注入把对象的创造交给外部去管理,很好的解决了代码紧耦合（tight couple）的问题，是一种让代码实现松耦合（loose couple）的机制\n松耦合让代码更具灵活性，能更好地应对需求变动，以及方便单元测试\n缺点\n目前主流的IOC/DI基本采用反射的方式来实现依赖注入，在一定程度会影响性能\n"
        },
        {
          "title": "依赖注入的三种方式",
          "url": "\\docs\\dependency-injection.html#依赖注入的三种方式",
          "content": "依赖注入的三种方式"
        },
        {
          "title": "构造方法注入",
          "url": "\\docs\\dependency-injection.html#依赖注入的三种方式-构造方法注入",
          "content": "构造方法注入优点\n在构造方法中体现出对其他类的依赖，一眼就能看出这个类需要依赖哪些类才能工作\n脱离了 IOC 框架，这个类仍然可以工作\n一旦对象初始化成功了，这个对象的状态肯定是正确的\n缺点\n构造函数会有很多参数\n有些类是需要默认构造函数的，比如 MVC 框架的 Controller 类，一旦使用构造函数注入，就无法使用默认构造函数\n这个类里面的有些方法并不需要用到这些依赖\n代码示例\ntype  TPostController = class(BaseController)\n  private\n    PostService: IPostService;\n    CategorieService: ICategorieService;\n  public\n    constructor Create([IOC('Fly.Service.Post.TPostService')]_PostService: IPostService; [IOC('Fly.Service.Categorie.TCategorieService')]_CategorieService: ICategorieService);\n  end;\nimplementation\nconstructor TPostController.Create([IOC('Fly.Service.Post.TPostService')]_PostService: IPostService; [IOC('Fly.Service.Categorie.TCategorieService')]_CategorieService: ICategorieService);\nbegin\n    PostService := _PostService;\n    CategorieService := _CategorieService;\nend;\n"
        },
        {
          "title": "属性方式注入",
          "url": "\\docs\\dependency-injection.html#依赖注入的三种方式-属性方式注入",
          "content": "属性方式注入目前属性方式注入是依赖注入推荐使用方式。优点\n在对象的整个生命周期内，可以随时动态的改变依赖\n非常灵活\n缺点\n对象在创建后，被设置依赖对象之前这段时间状态是不对的\n不直观，无法清晰地表示哪些属性是必须的\n代码示例\ntype  TMyService = class\n  private\n\t[IOC('MVCXE.ORM.TORMXE')]\n\torm: IORM;\n  end;\n"
        },
        {
          "title": "方法参数注入",
          "url": "\\docs\\dependency-injection.html#依赖注入的三种方式-方法参数注入",
          "content": "方法参数注入方法参数注入的意思是在创建对象后，通过自动调用某个方法来注入依赖。优点：\n比较灵活\n缺点：\n新加入依赖时会破坏原有的方法签名，如果这个方法已经被其他很多模块用到就很麻烦\n与构造方法注入一样，会有很多参数\n代码示例\ntype  TUserController = class(BaseController)\n  public\n    function index([IOC('Fly.Service.Post.TPostService')]PostService: IPostService; CurrentPage: Integer): string;\n  end;\nimplementation\nfunction TUserController.index([IOC('Fly.Service.Post.TPostService')]PostService: IPostService; CurrentPage: Integer): string;\nvar\n  posts: TArray;\n  TotalCount, PageCount: Integer;\nbegin\n  if not IsLogin then\n  begin\n    Response.StatusCode := 404;\n    Response.Abort;\n    Exit;\n  end;\n  if CurrentPage = 0 then\n    CurrentPage := 1;\n  posts := PostService.GetMyPosts(CurrentUserId, CurrentPage, PageSize, TotalCount, PageCount);\n  ViewBag.Add('Posts', posts);\n  ViewBag.Add('TotalCount', TotalCount);\n  ViewBag.Add('CurrentPage', CurrentPage);\n  ViewBag.Add('PageCount', PageCount);\n  ViewBag.Add('IsLogin', IsLogin);\n  ViewBag.Add('CurrentAccount', CurrentAccount);\n  ViewBag.Add('Action', RouteData['Action']);\n  Result := View;\nend;\n"
        },
        {
          "title": "依赖接口",
          "url": "\\docs\\dependency-injection.html#依赖接口",
          "content": "依赖接口被注入的对象必需为接口类型，因为接口实例不需要主动释放。\nIOC的参数是实现了被注入接口的类全写，格式：单元名.类名\nIOC可以是无参数，但需要在launchSettings.json里对应的package做配置\ntype  TPostController = class(BaseController)\n  private\n\t[IOC]\n\tPostService: IPostService;\n  end;\nlaunchSettings.json\n{\"packages\": {\n    \"ExternalPackages\": [{\n    \"Name\": \"Fly.Web\",\n    \"IOC\": [\n        {\n            \"interface\": \"IPostService\",\n            \"implement\": \"Fly.Service.Post.TPostService\"\n        },\n        {\n            \"interface\": \"ICategorieService\",\n            \"implement\": \"Fly.Service.Categorie.TCategorieService\"\n        }\n    ]\n    }]\n}\n}\n"
        },
        {
          "title": "手动创建有注入动作的对象",
          "url": "\\docs\\dependency-injection.html#手动创建有注入动作的对象",
          "content": "手动创建有注入动作的对象如果用默认的.Create方法创建对象，类中注入动作不会生效，需要使用RttiCreate来创建对象。function TPosts.Category: string;var\n  Cache: ICache;\n  Categories: TArray;\n  i: Integer;\nbegin\n  Cache := RttiCreate('MVCXE.MemoryCache.TMemoryCache').AsType;\n  Categories := Cache.Get('Categories').AsType>;\n  for i := 0 to High(Categories) do\n  begin\n    if FPostCategoryId = Categories[i].Id then\n    begin\n      Result := Categories[i].CategoryName;\n    Exit;\n    end;\n  end;\nend;\n"
        }
      ]
    },
    {
      "title": "对象数据映射(开发中)",
      "content": "",
      "url": "\\docs\\object-mapper.html",
      "children": [
        {
          "title": "对象映射",
          "url": "\\docs\\object-mapper.html#对象映射",
          "content": "对象映射简单来说，就是将一个对象的数据根据特定规则批量映射到另一个对象中，减少手工操作和降低人为出错率。如将 DTO 对象映射到 Entity 实体中，反之亦然。"
        },
        {
          "title": "先看例子",
          "url": "\\docs\\object-mapper.html#先看例子",
          "content": "先看例子在过去，我们需要将一个对象的值转换到另一个对象中，我们需要这样做，如：var  entity: TEntity;\n  dto: TDto;\nbegin\n  entity := TEntity.Create;\n  dto := TDto.Create;\n  dto.Id := entity.Id;\n  dto.Name := entity.Name;\n  dto.Age := entity.Age;\n  dto.Address := entity.Address;\n  dto.FullName := entity.FirstName + entity.LastName;\n  dto.IdCard := entity.IdCard.Replace('1234', '****'');\nend;\n上面的例子似乎没有任何问题，但是如果很多地方需要这样的赋值操作、或者相同的赋值操作在多个地方使用，又或者一个类中含有非常多的属性或自定义赋值操作。那么这样的操作效率极低，容易出错，且代码非常臃肿和冗余。所以，实现自动映射赋值和支持特殊配置的需求就有了。"
        },
        {
          "title": "Mapster 使用",
          "url": "\\docs\\object-mapper.html#mapster-使用",
          "content": "Mapster 使用现在，我们可以通过依赖注入IMapper的方法改造上面的例子：typeTUserService = class(TInterfacedObject, IUserService)\nprivate\n    [IOC]\n    mapper: IMapper;\npublic\n    function CopyUser(const entity: TUser): TDto;\nend;\n\nimplementation\n\n{ TUserService }\n\nfunction TUserService.CopyUser(const entity: TUser): TDto;\nbegin\n  Result := mapper.Adapt.Map(entity);\nend;\n仅仅一行代码就可以实现 entity -> dto 的转换，如果涉及到赋值的复制操作，如 dto.FullName 和 dto.IdCard，我们只需要自定义映射规则类即可。"
        },
        {
          "title": "自定义映射规则",
          "url": "\\docs\\object-mapper.html#自定义映射规则",
          "content": "自定义映射规则"
        }
      ]
    },
    {
      "title": "模块化开发",
      "content": "模块化配置必须在launchSettings.json下配置才有效，原因是启动的时候launchSettings.json已经加载，自定义配置文件还未加载。",
      "url": "\\docs\\module-dev.html",
      "children": [
        {
          "title": "关于模块化开发",
          "url": "\\docs\\module-dev.html#关于模块化开发",
          "content": "关于模块化开发模块化是代码的组成的一种方式，模块化系统就像乐高玩具一样，一块一块零散积木堆积起一个精彩的世界。每种积木的形状各不相同，功能各不相同，积木与积木直接互相依赖，互相支撑。"
        },
        {
          "title": "模块化开发好处",
          "url": "\\docs\\module-dev.html#关于模块化开发-模块化开发好处",
          "content": "模块化开发好处模块化开发能够将不同的功能组装在一起，实现功能的累加，诸多功能组装在一起，最终形成项目。"
        },
        {
          "title": "模块分类",
          "url": "\\docs\\module-dev.html#模块分类",
          "content": "模块分类应用程序模块：通常这类模块是完整的应用程序，可以独立运行，有自己的实体、服务、API 及 UI 组件等。框架级模块：这类通常是解决某个业务功能进行开发的模块，比如上传文件、分布式缓存、数据验证等。"
        },
        {
          "title": "如何进行模块化开发",
          "url": "\\docs\\module-dev.html#如何进行模块化开发",
          "content": "如何进行模块化开发MVCXE框架设计之初就是模块化的，启用MVCXE模块化支持非常简单。"
        },
        {
          "title": "启用模块化支持",
          "url": "\\docs\\module-dev.html#如何进行模块化开发-启用模块化支持",
          "content": "启用模块化支持launchSettings.json{\"packages\": {\n    \"EnabledPackageScan\": true, // 启用模块化程序集扫描, 自动扫描当前目录所有扩展名是.bpl的模块，按日期由旧到新加载。如果false只加载在ExternalPackages列出来的模块。\n    \"IgnorePackageFiles\": [\"MVCXE.Core\",\"inet\",\"rtl\",\"vcl\",\"xmlrtl\",\"IndyCore\",\"IndyProtocols\",\"IndySystem\",\"dbrtl\"],//这些模块系统会自动加载，列出来防止重复加载偶发错误的情况。\n    \"ExternalPackages\": [{\n    \"Name\": \"FireDACCommon\"//系统的bpl或第三方的bpl，可以不写扩展名和版本号\n    },{\n    \"Name\": \"FireDACCommonDriver\"\n    },{\n    \"Name\": \"FireDAC\"\n    },{\n    \"Name\": \"FireDACSqliteDriver\"\n    },{\n    \"Name\": \"FireDACCommonOdbc\"\n    },{\n    \"Name\": \"FireDACMSSQLDriver\"\n    },{\n    \"Name\": \"FireDACMySQLDriver\"\n    },{\n    \"Name\": \"FireDACOracleDriver\"\n    },{\n    \"Name\": \"MVCXE.Web\"//mvcxe的模块bpl\n    },{\n    \"Name\": \"MVCXE.LoggerPro\"\n    },{\n    \"Name\": \"MVCXE.Cache\"\n    },{\n    \"Name\": \"MVCXE.ORM\"\n    },{\n    \"Name\": \"MVCXE.TPL\"\n    },{\n    \"Name\": \"MVCXE.Quartz\"\n    },{\n    \"Name\": \"MVCXE.Captcha\"\n    },{\n    \"Name\": \"Fly.BLL\"//你写的模块bpl\n    },{\n    \"Name\": \"Fly.Web\",\n    \"IOC\": [\n        {\n            \"interface\": \"IPostService\",\n            \"implement\": \"Fly.Service.Post.TPostService\"\n        },\n        {\n            \"interface\": \"ICategorieService\",\n            \"implement\": \"Fly.Service.Categorie.TCategorieService\"\n        }\n    ]\n    },{\n    \"Name\": \"DelphiAdmin.Backend.BLL\"\n    },{\n    \"Name\": \"DelphiAdmin.Backend\",\n    \"Area\": \"backend\",\n    \"RoutePrefix\": \"backend\"\n    },{\n    \"Name\": \"DelphiAdmin.Backend.Api\",\n    \"Area\": \"backend\",\n    \"RoutePrefix\": \"backend/api\"\n    },{\n    \"Name\": \"DelphiAdmin.Backend.Mall\",\n    \"Area\": \"mall\",\n    \"RoutePrefix\": \"backend/mall\"\n    },{\n    \"Name\": \"ferry.bll\"\n    },{\n    \"Name\": \"ferry.api\",\n    \"Area\": \"ferry\",\n    \"RoutePrefix\": \"api\",\n    \"IOC\": [\n        {\n            \"interface\": \"ISysService\",\n            \"implement\": \"Service.Sys.Impl.TSysService\"\n        }\n    ]\n    }]\n}\n}\n"
        },
        {
          "title": "模块化开发注意事项",
          "url": "\\docs\\module-dev.html#模块化开发注意事项",
          "content": "模块化开发注意事项尽可能保证每个模块都有独立的路由地址格式：/RoutePrefix/路由地址，这样才能保证不会和现有的系统出现冲突。\n开发模块化是尽可能设计为完全独立的引用，如果需要包含不同的配置和视图视图应设置独立的Area，有html/cs/javascript的话应放于wwwroot里独立的Area目录里。\n模块化开发如果需要引用其它模块，该被引用的模块应先加载。\n模块不能循环引用，A模块引用B模块则B模块不能引用A模块\n模块如果要引用其它.dll文件，dll应与模块bpl同级目录\n"
        },
        {
          "title": "举例",
          "url": "\\docs\\module-dev.html#举例",
          "content": "举例"
        },
        {
          "title": "经典MVC",
          "url": "\\docs\\module-dev.html#举例-经典mvc",
          "content": "经典MVCController控制器写在一个模块bpl中，如MyApp.Web.bpl\n业务逻辑代码写在一个模块bpl中，如MyApp.Service.bpl\n数据实体及关系写一个模块bpl中，如MyApp.Model.bpl\nMyApp.Web引用MyApp.Service和MyApp.Model，MyApp.Service引用MyApp.Model\n"
        },
        {
          "title": "经典WebAPI",
          "url": "\\docs\\module-dev.html#举例-经典webapi",
          "content": "经典WebAPI动态WebApi写在一个模块bpl中，如MyApp.Application.bpl\n业务逻辑代码写在一个模块bpl中，如MyApp.Service.bpl\n数据实体及关系写一个模块bpl中，如MyApp.Model.bpl\nMyApp.Application引用MyApp.Service和MyApp.Model，MyApp.Service引用MyApp.Model\n当WebApi有新版本时，可以创建MyApp.Application.V2，没有变化的Api直接继承或引用，删除没用的Api，增加新的，设置新的RoutePrefix_V2，MyApp.Application.V2引用MyApp.Application,MyApp.Service和MyApp.Model\n"
        },
        {
          "title": "混合模式",
          "url": "\\docs\\module-dev.html#举例-混合模式",
          "content": "混合模式Controller控制器写在一个模块bpl中，如MyApp.Web.bpl\n动态WebApi写在一个模块bpl中，如MyApp.Application.bpl\n业务逻辑代码写在一个模块bpl中，如MyApp.Service.bpl\n数据实体及关系写一个模块bpl中，如MyApp.Model.bpl\nMyApp.Web引用MyApp.Service和MyApp.Model，MyApp.Service引用MyApp.Model\nMyApp.Application引用MyApp.Service和MyApp.Model，MyApp.Service引用MyApp.Model\n"
        },
        {
          "title": "常见问题",
          "url": "\\docs\\module-dev.html#常见问题",
          "content": "常见问题修改了代码，需要编译对应的bpl，直接编译运行Webborker.Console是不会自动编译相关的bpl的\n被引用的代码修改了，引用该代码的bpl也要重新编译，如MyApp.Model的一个实体类改了，编译MyApp.Model.bpl后，要继续编译受修改代码影响的其它bpl，如MyApp.Web或MyApp.Service\n"
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
          "content": "分页查询function TUserService.Users(const page, pagesize: Integer): TArray;begin\n  Result := orm.Repository.Select\n    .Take((page-1)*pagesize, pagesize)\n    .ToArray;\nend;\n\nfunction TUserService.Users(const page, pagesize: Integer): TArray;\nbegin\n  Result := orm.Repository.Select('UserPage')\n    .Take((page-1)*pagesize, pagesize)\n    .ToArray;\nend;\n\nfunction TUserService.Users(const page, pagesize: Integer): TArray;\nbegin\n  Result := orm.DB.Query('Select * From User Limit {Skip},{Count}')\n    .Take((page-1)*pagesize, pagesize)\n    .ToArray;\nend;\n"
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
    },
    {
      "title": "高级查询操作",
      "content": "",
      "url": "\\docs\\dbcontext-hight-query.html",
      "children": [
        {
          "title": "关联数据模型",
          "url": "\\docs\\dbcontext-hight-query.html#关联数据模型",
          "content": "关联数据模型Base\ntypeTMyDB = class\npublished\n    [Key(True)]\n    [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]\n    property Id: Integer;\nend;\nPerson\n[Table('Person')]TPerson = class(TMyDB)\npublished\n    property Name: string;\n    property Age : Integer;\n    property Address: string;\n    property PersonDetail: TPersonDetail;\n    property Childrens: TArray;\nend;\nPersonDetail\n[Table('PersonDetail')]TPersonDetail = class(TMyDB)\npublished\n    property PhoneNumber: string;\n    property QQ: string;\n    property PersonId : Integer;\nend;\nChildren\n[Table('Children')]TChildren = class(TMyDB)\npublished\n    property Name: string;\n    property Gender : Integer;\n    property PersonId : Integer;\nend;\nPost\n[Table('Post')]TPost = class(TMyDB)\npublished\n    property Title: string;\n    property PersonId : Integer;\n    property UpdateTime: TDateTime;\nend;\n"
        },
        {
          "title": "一对一查询",
          "url": "\\docs\\dbcontext-hight-query.html#一对一查询",
          "content": "一对一查询增加属性是[NotMapped]和[Navigate]变量，Navigate的参数是Key字段对应的property变量的引用写法字符串，'关联类名.关联Key字段名'，如Post表是用PersonId字段来记录与Persion表的一对一关系，所以参数就是'TPost.PersonId'\nTPost = class(TMyDB)    [NotMapped]\n    [Navigate('TPost.PersonId')]\n    Person: TPerson;\nend;\n使用Include方法引入一对一查询，参数是带有[Navigate]属性的变量名，关联类的Key字段名\nfunction TPostService.TopPosts(const Count: Integer): TArray;begin\n  Result := orm.Repository.Select\n    .Include('Person','Id')\n    .Take(Count)\n    .ToArray;\nend;\n使用SqlMap进行一对一查询，从表的各字段需要As成_带有[Navigate]属性的变量名_，如Person表的Name字段要As成_Person_Name\n\n    \n        \n\t\t  Select A.*, B.Id _Person_Id, B.Name _Person_Name, B.Age _Person_Age, B.Address _Person_Address From Post A Left Join Person B On B.Id=A.PersonId Limit {Count}\n        \n    \n\n\nfunction TPostService.TopPostsBySqlMap(const Count: Integer): TArray;\nbegin\n  Result := orm.Repository.Select('TopPosts')\n    .Take(Count)\n    .ToArray;\nend;\n"
        },
        {
          "title": "对多查询",
          "url": "\\docs\\dbcontext-hight-query.html#对多查询",
          "content": "对多查询TPerson = class(TMyDB)private\n    _PersonDetail: TPersonDetail;\n    _Childrens: TArray;\n\n    function GetPersonDetail: TPersonDetail;\n    function GetChildrens: TArray;\npublished\n    [NotMapped]\n    property PersonDetail: TPersonDetail read GetPersonDetail;\n    [NotMapped]\n    property Childrens: TArray read GetChildrens;\nend;\n\nimplementation\n\n{ TPerson }\n\nfunction TPerson.GetPersonDetail: TPersonDetail;\nvar\n  orm: IORM;\nbegin\n  if _PersonDetail = nil Then\n  begin\n    orm := BuildORM;\n    _PersonDetail := orm.Repository.Select\n      .Where('PersonId', Id)\n      .SingleOrDefault;\n  end;\n  Result := _PersonDetail;\nend;\n\nfunction TPerson.GetChildrens: TArray;\nvar\n  orm: IORM;\nbegin\n  if _Childrens = nil Then\n  begin\n    orm := BuildORM;\n    _Childrens := orm.Repository.Select\n      .Where('PersonId', Id)\n      .ToArray;\n  end;\n  Result := _Childrens;\nend;\n"
        },
        {
          "title": "查询排序",
          "url": "\\docs\\dbcontext-hight-query.html#查询排序",
          "content": "查询排序正序\nfunction TPostService.TopPosts(const Count: Integer): TArray;begin\n  Result := orm.Repository.Select\n    .OrderBy('Id')\n    //或.OrderBy('Id','Asc')\n    .Take(Count)\n    .ToArray;\nend;\n倒序\nfunction TPostService.TopPosts(const Count: Integer): TArray;begin\n  Result := orm.Repository.Select\n    .OrderBy('Id','Desc')\n    .Take(Count)\n    .ToArray;\nend;\n混合\nfunction TPostService.TopPosts(const Count: Integer): TArray;begin\n  Result := orm.Repository.Select\n    .OrderBy('Age', 'Asc')\n    .OrderBy('Id','Desc')\n    .Take(Count)\n    .ToArray;\nend;\n"
        },
        {
          "title": "其它高级用法请使用Sql和Pascal的函数实现",
          "url": "\\docs\\dbcontext-hight-query.html#其它高级用法请使用sql和pascal的函数实现",
          "content": "其它高级用法请使用Sql和Pascal的函数实现"
        }
      ]
    },
    {
      "title": "存储过程操作",
      "content": "",
      "url": "\\docs\\dbcontext-proc.html",
      "children": [
        {
          "title": "关于存储过程",
          "url": "\\docs\\dbcontext-proc.html#关于存储过程",
          "content": "关于存储过程引用百度百科：存储过程（Stored Procedure）是在大型数据库系统中，一组为了完成特定功能的 SQL 语句集，它存储在数据库中，一次编译后永久有效，用户通过指定存储过程的名字并给出参数（如果该存储过程带有参数）来执行它。\n存储过程是数据库中的一个重要对象。在数据量特别庞大的情况下利用存储过程能达到倍速的效率提升。\n简单来说，存储过程就是关系型数据库中（Sqlite 除外）中编写逻辑的函数/方法，通过这种方式，可以将 sql 编译缓存起来，大大提高存储过程的执行效率。这里不讨论存储过程的优缺点。"
        },
        {
          "title": "支持存储过程的数据库",
          "url": "\\docs\\dbcontext-proc.html#支持存储过程的数据库",
          "content": "支持存储过程的数据库\n\nSqlServer\nSqlite\nInMemoryDatabase\nMySql\nPostgreSQL\nOracle\nFirebird\n\n\n\n\n✔\n\n\n✔\n✔\n✔\n✔\n\n\n"
        },
        {
          "title": "存储过程使用",
          "url": "\\docs\\dbcontext-proc.html#存储过程使用",
          "content": "存储过程使用TORMDB定义了几个常用方法。TORMDB = classpublic\n    function ExecProc(const StoredProcName: string): IORMDBQuery;\n    overload;\n    function ExecProc(const SchemaName: string; const StoredProcName: string)\n    : IORMDBQuery; overload;\n\n    procedure ExecProc(const StoredProcName: string); overload;\n    procedure ExecProc(const SchemaName: string;\n    const StoredProcName: string); overload;\n    procedure ExecProc(const StoredProcName: string;\n    var Args: TParams); overload;\n    procedure ExecProc(const SchemaName: string; const StoredProcName: string;\n    var Args: TParams); overload;\n    procedure ExecProc(const StoredProcName: string;\n    const Args: TValue); overload;\n    procedure ExecProc(const SchemaName: string; const StoredProcName: string;\n    const Args: TValue); overload;\n\nend;\n"
        },
        {
          "title": "范例",
          "url": "\\docs\\dbcontext-proc.html#范例",
          "content": "范例建立用于分页的存储过程sp_viewPage\n-- ------------------------------ Procedure structure for sp_viewPage\n-- ----------------------------\nDROP PROCEDURE IF EXISTS `sp_viewPage`;\ndelimiter ;;\nCREATE PROCEDURE `sp_viewPage`(IN _fields VARCHAR(1000),\nIN _tables VARCHAR(1000),\nIN _where VARCHAR(2000),\nIN _orderby VARCHAR(200),\nIN _pageindex INT,\nIN _pageSize INT,\nOUT _totalcount INT,\nOUT _pagecount INT)\nBEGIN\n#140529-xxj-分页存储过程\n#计算起始行号\nSET @startRow = _pageSize * (_pageIndex - 1);\nSET @pageSize = _pageSize;\nSET @rowindex = 0; #行号\n\n#合并字符串\nSET @strsql = CONCAT(\n#'select sql_calc_found_rows @rowindex:=@rowindex+1 as rownumber,' #记录行号\n'select sql_calc_found_rows '\n,_fields\n,' from '\n,_tables\n,IF(IFNULL(_where, '')='','',CONCAT(' where ', _where))\n,IF(IFNULL(_orderby, '')='','',CONCAT(' order by ', _orderby))\n,' limit '\n,@startRow\n,','\n,@pageSize\n);\n\nPREPARE strsql FROM @strsql;#定义预处理语句\nEXECUTE strsql; #执行预处理语句\nDEALLOCATE PREPARE strsql; #删除定义\n#通过 sql_calc_found_rows 记录没有使用 limit 语句的记录，使用 found_rows() 获取行数\nSET _totalcount = FOUND_ROWS();\n\n#计算总页数\nIF (_totalcount  0) THEN\nSET _pagecount = _totalcount DIV _pageSize + 1;\nELSE\nSET _pagecount = _totalcount DIV _pageSize;\nEND IF;\nEND IF;\n\nEND\n;;\ndelimiter ;\n关联的实体\nconst  tb_systemlog = 'xe_system_log';\n\ntype\n  [Table(tb_systemlog)]\n  TSystemLog = record\n    [Key(True)]\n    [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]\n    id: Integer;\n    admin_id: Integer;\n    url: string;\n    method: string;\n    title: string;\n    content: string;\n    ip: string;\n    useragent: string;\n    [CustomJsonNode('UnixTimeToStr', 'yyyy-MM-dd HH:mm:ss')]\n    create_time: Int64;\n    [NotMapped]\n    admin_username: string;\n  end;\n注入IORM实例orm, 使用orm.DB.ExecProc执行存储过程\nfunction TSystemAdminService.SystemLogs(const page, limit: Integer; var count: Integer): TArray;var\n    Params: TParams;\n    p: IORMDBQuery;\nbegin\n    Params := TParams.Create(nil);\n    try\n        with Params.AddParameter do\n        begin\n            Name := '_fields';\n            ParamType := ptInput;\n            DataType := ftString;\n            Value := 'A.*, B.username as admin_username';\n        end;\n        with Params.AddParameter do\n        begin\n            Name := '_tables';\n            ParamType := ptInput;\n            DataType := ftString;\n            Value := tb_systemlog+' A Left Join '+tb_systemadmin+' B On B.id=A.admin_id';\n        end;\n        with Params.AddParameter do\n        begin\n            Name := '_where';\n            ParamType := ptInput;\n            DataType := ftString;\n            Value := '1=1';\n        end;\n        with Params.AddParameter do\n        begin\n            Name := '_orderby';\n            ParamType := ptInput;\n            DataType := ftString;\n            Value := 'A.create_time DESC';\n        end;\n        with Params.AddParameter do\n        begin\n            Name := '_pageindex';\n            ParamType := ptInput;\n            DataType := ftInteger;\n            Value := page;\n        end;\n        with Params.AddParameter do\n        begin\n            Name := '_pageSize';\n            ParamType := ptInput;\n            DataType := ftInteger;\n            Value := limit;\n        end;\n        with Params.AddParameter do\n        begin\n            Name := '_totalcount';\n            ParamType := ptOutput;\n            DataType := ftInteger;\n        end;\n        with Params.AddParameter do\n        begin\n            Name := '_pagecount';\n            ParamType := ptOutput;\n            DataType := ftInteger;\n        end;\n        p := orm.DB.ExecProc('sp_viewPage')\n            .AddParam(Params);\n    finally\n        Params.Free;\n    end;\n    Result := p.ToArray;\n    count := StrToIntDef(VarToStr(p.Params.ParamByName('_totalcount').Value),0);\nend;"
        }
      ]
    },
    {
      "title": "函数操作",
      "content": "",
      "url": "\\docs\\dbcontext-function.html",
      "children": [
        {
          "title": "关于函数操作",
          "url": "\\docs\\dbcontext-function.html#关于函数操作",
          "content": "关于函数操作引用百度百科：数据库函数是指当需要分析数据清单中的数值是否符合特定条件时，使用数据库工作表函数。\n简单来说，数据库函数就是用于子计算的函数。其计算的结果可以用于构建 sql 语句。"
        },
        {
          "title": "支持标量函数的数据库",
          "url": "\\docs\\dbcontext-function.html#支持标量函数的数据库",
          "content": "支持标量函数的数据库\n\nSqlServer\nSqlite\nInMemoryDatabase\nMySql\nPostgreSQL\nOracle\nFirebird\n\n\n\n\n✔\n✔\n\n✔\n✔\n✔\n\n\n\n"
        },
        {
          "title": "函数使用",
          "url": "\\docs\\dbcontext-function.html#函数使用",
          "content": "函数使用TORMDB定义了几个常用方法。TORMDB = classpublic\n    function ExecFunc(const FunctionName: string): Variant; overload;\n    function ExecFunc(const SchemaName: string; const FunctionName: string)\n    : Variant; overload;\n    function ExecFunc(const FunctionName: string; var Args: TParams)\n    : Variant; overload;\n    function ExecFunc(const SchemaName: string; const FunctionName: string;\n    var Args: TParams): Variant; overload;\n    function ExecFunc(const FunctionName: string; const Args: TValue)\n    : Variant; overload;\n    function ExecFunc(const SchemaName: string; const FunctionName: string;\n    const Args: TValue): Variant; overload;\nend;\n"
        },
        {
          "title": "范例",
          "url": "\\docs\\dbcontext-function.html#范例",
          "content": "范例建立用于发贴扣减积分的函数，返回扣减后的积分\n-- ------------------------------ Function structure for func_DecIntegral\n-- ----------------------------\nDROP FUNCTION IF EXISTS `func_DecIntegral`;\ndelimiter ;;\nCREATE FUNCTION `func_DecIntegral`(_UserId INT,\n_Integral INT)\nRETURNS int(11)\nBEGIN\n    SET @Integral = _Integral;\n    SET @UserId = _UserId;\n    SET @var_i = 0;\n    UPDATE users SET Integral=Integral-@Integral WHERE Id=@UserId;\n    SELECT Integral INTO @var_i FROM users WHERE Id=@UserId;\n    \n    RETURN @var_i;\nEND\n;;\ndelimiter ;\n注入IORM实例orm, 使用orm.DB.ExecFunc执行存储过程\nfunction TPostService.DecIntegral(const UserId, Reward: Integer): Integer;var\n    Params: TParams;\nbegin\n    Params := TParams.Create(nil);\n    try\n        with Params.AddParameter do\n        begin\n            Name := '_UserId';\n            ParamType := ptInput;\n            DataType := ftInteger;\n            Value := UserId;\n        end;\n        with Params.AddParameter do\n        begin\n            Name := '_Integral';\n            ParamType := ptInput;\n            DataType := ftInteger;\n            Value := Reward;\n        end;\n        Result := orm.DB.ExecFunc('func_DecIntegral', Params);\n        if Result < 0 then\n            raise Exception.Create('分数不够');\n    finally\n        Params.Free;\n    end;\nend;"
        }
      ]
    },
    {
      "title": "事务",
      "content": "",
      "url": "\\docs\\tran.html",
      "children": [
        {
          "title": "关于事务",
          "url": "\\docs\\tran.html#关于事务",
          "content": "关于事务事务指作为单个逻辑工作单元执行的一系列操作，要么完全地执行，要么完全地不执行。简单的说，事务就是并发控制的单位，是用户定义的一个操作序列。 而一个逻辑工作单元要成为事务，就必须满足 ACID 属性。A：原子性（Atomicity）：事务中的操作要么都不做，要么就全做\nC：一致性（Consistency）：事务执行的结果必须是从数据库从一个一致性状态转换到另一个一致性状态\nI：隔离性（Isolation）：一个事务的执行不能被其他事务干扰\nD：持久性（Durability）：一个事务一旦提交，它对数据库中数据的改变就应该是永久性的\n"
        },
        {
          "title": "如何使用",
          "url": "\\docs\\tran.html#如何使用",
          "content": "如何使用TORMRepository包含了事务调用方法\nTORMRepository = classpublic\n\tprocedure StartTransaction(const AIsolation: Integer = 2);\n\tprocedure Commit;\n\tprocedure Rollback;\nend;\nTORMDB包含了事务了调用方法\nTORMDB = classpublic\n    procedure StartTransaction(const AIsolation: Integer = 2);\n    procedure Commit;\n    procedure Rollback;\nend;\nStartTransaction的事务类型,默认xiReadCommitted\n0:xiUnspecified\n1:xiDirtyRead\n2:xiReadCommitted\n3:xiRepeatableRead\n4:xiSnapshot\n5:xiSerializible\n"
        },
        {
          "title": "范例",
          "url": "\\docs\\tran.html#范例",
          "content": "范例procedure TPostService.DeletePost(const Id: Integer);begin\n  orm.StartTransaction;\n  try\n    orm.DB.Execute('DELETE FROM likes WHERE CommentId in (SELECT Id FROM comments WHERE PostId=?)',[Id]);\n    orm.DB.Execute('DELETE FROM comments WHERE PostId=?',[Id]);\n    orm.DB.Execute('DELETE FROM posts WHERE Id='+IntToStr(Id));\n    orm.Commit;\n  except\n    on e: Exception do\n    begin\n      orm.Rollback;\n    end;\n  end;\nend;\n\nfunction TPostService.ReplyPost(const comment: TComments): Integer;\nbegin\n  Result := 0;\n\n  orm.StartTransaction;\n  try\n    Result := orm.Repository.Insert\n        .SetSource(comment)\n        .ExecuteAffrows;\n    orm.DB.Execute('UPDATE posts SET CommentCount=CommentCount+1 WHERE Id=?',[comment.PostId]);\n    orm.Commit;\n  except\n    on ex: Exception do\n    begin\n      orm.Rollback;\n      raise ex;\n    end;\n  end;\nend;"
        }
      ]
    },
    {
      "title": "调度作业",
      "content": "",
      "url": "\\docs\\job.html",
      "children": [
        {
          "title": "关于调度作业",
          "url": "\\docs\\job.html#关于调度作业",
          "content": "关于调度作业调度作业又称定时任务，顾名思义，定时任务就是在特定的时间或符合某种时间规律自动触发并执行任务。"
        },
        {
          "title": "使用场景",
          "url": "\\docs\\job.html#关于调度作业-使用场景",
          "content": "使用场景定时任务的应用场景非常广，几乎是每一个软件系统必备功能：叫你起床的闹钟\n日历日程提醒\n生日纪念日提醒\n定时备份数据库\n定时清理垃圾数据\n定时发送营销信息，邮件\n定时上线产品，比如预售产品，双十一活动\n定时发送优惠券\n定时发布，实现 Devops 功能，如 Jenkins\n定时爬虫抓数据\n定时导出报表，历史统计，考勤统计\n...\n"
        },
        {
          "title": "快速入门",
          "url": "\\docs\\job.html#关于调度作业-快速入门",
          "content": "快速入门定义作业处理类 TMyJob：\nuses MVCXE.Quartz;type\n  TMyJob = class(TInterfacedObject,IJob)\n  public\n    procedure Execute;\n  end;\nimplementation\n{ TMyJob }\nprocedure TMyJob.Execute;\nbegin\n  WriteLn('--------'+DateTimeToStr(Now)+'---------');\nend;\n在appsetting.json中设定任务执行计划\n{    \"schedule\": {\n        \"job\": [{\n            \"name\": \"UpdateInventoryJob\",\n            \"group\": \"Update\",\n            \"description\": \"定时更新\",\n            \"job-type\": \"uJob.TMyJob\",\n            \"durable\": true,\n            \"recover\": true\n        }],\n        \"trigger\": [{\n            \"cron\": [{\n                \"name\": \"UpdateInventoryTrigger\",\n                \"group\": \"Update\",\n                \"job-name\": \"UpdateInventoryJob\",\n                \"job-group\": \"Update\",\n                \"start-time\": \"2017-12-01 00:00:00\",\n                \"start-runonce\": true,\n                \"cron-expression\": \"* 0/1 * * * ?\"\n            }]\n        },{\n            \"simple\": [{\n                \"name\": \"UpdateInventoryTrigger\",\n                \"group\": \"Update\",\n                \"job-name\": \"UpdateInventoryJob\",\n                \"job-group\": \"Update\",\n                \"start-time\": \"2017-12-01 00:00:00\",\n                \"start-runonce\": true,\n                \"repeat-count\": 10,\n                \"repeat-interval\": 1000\n            }]\n        }]\t\n    }\n}\nschedule\\job是jobs列表，可定义多个job\nschedule\\job[n]\\job-type是作业处理类的引用全写，UnitName.ClassName\nschedule\\job[n]\\name和schedule\\job\\group用于trigger中匹配\nschedule\\job[n]\\recover是作业是否等待上一次完成再继续，true不等待，false等待\nschedule\\trigger是触发器列表，可定义多个触发器\nschedule\\trigger[n]\\cron是cron表达式触发器列表，可定义多个cron触发器\nschedule\\trigger[n]\\cron[n]\\job-name和schedule\\trigger[n]\\cron[n]\\job-group用于匹配job\nschedule\\trigger[n]\\cron[n]\\start-time是job可触发的开始时间\nschedule\\trigger[n]\\cron[n]\\start-runoncejob是否只触发一次\nschedule\\trigger[n]\\cron[n]\\cron-expression是cron表达式\nschedule\\trigger[n]\\simple是按时间间隔触发器\nschedule\\trigger[n]\\simple[n]\\job-name和schedule\\trigger[n]\\simple[n]\\job-group用于匹配job\nschedule\\trigger[n]\\simple[n]\\start-time是job可触发的开始时间\nschedule\\trigger[n]\\simple[n]\\start-runoncejob是否只触发一次\nschedule\\trigger[n]\\simple[n]\\repeat-count是job总共可触发次数，小于等于0表示不限制\nschedule\\trigger[n]\\simple[n]\\repeat-interval每间隔多少毫秒触发一次\n"
        }
      ]
    },
    {
      "title": "Cron 表达式默认情况下，Cron 表达式不支持 秒 和 年 的。",
      "content": "",
      "url": "\\docs\\cron.html",
      "children": [
        {
          "title": "关于 Cron 表达式",
          "url": "\\docs\\cron.html#关于-cron-表达式",
          "content": "关于 Cron 表达式Cron 表达式是一个字符串，字符串以 5 或 6 个空格隔开，分为 6 或 7 个域，每一个域代表一个含义，Cron 表达式通常是作为实现定时任务的基石。"
        },
        {
          "title": "Cron 各字段说明",
          "url": "\\docs\\cron.html#cron-各字段说明",
          "content": "Cron 各字段说明\n\n字段\n允许值\n允许特别符号\n格式化\n\n\n\n\n秒\n0-59\n* , - /\nCronStringFormat.WithSeconds 或 CronStringFormat.WithSecondsAndYears\n\n\n分钟\n0-59\n* , - /\nALL\n\n\n小时\n0-23\n* , - /\nALL\n\n\n天\n1-31\n* , - / ? L W\nALL\n\n\n月份\n1-12 or JAN-DEC\n* , - /\nALL\n\n\n星期\n0-6 or SUN-SAT\n* , - / ? L #\nALL\n\n\n年份\n0001–9999\n* , - /\nCronStringFormat.WithYears 或 CronStringFormat.WithSecondsAndYears\n\n\n*：表示匹配该域的任意值，假如在 分钟 域使用 *，即表示每分钟都会触发事件。\n?：只能用在 天 和 星期 两个域。它也匹配域的任意值，但实际不会。因为 天 和 星期 会相互影响。例如想在 每月的20日 触发调度，不管 20 日到底是星期几，则只能使用如下写法：13 13 15 20 * ?, 其中最后一位只能用 ?，而不能使用 *，如果使用 * 表示不管星期几都会触发，实际上并不是这样。\n-：表示范围，例如在 分钟 域使用 5-20，表示从 5分 到20分钟 每分钟触发一次。\n/：表示起始时间开始触发，然后每隔固定时间触发一次，例如在 分钟 域使用 5/20，则意味着 5分钟 触发一次，而 25，45 等分别触发一次。\n,：表示列出枚举值。例如：在 分钟 域使用 5,20，则意味着在 第5 和 第20分钟 分别触发一次。\nL：表示最后，只能出现在 星期 和 月份 域，如果在 星期 域使用 5L，意味着在 最后的一个星期四 触发。\nW：表示有效工作日(周一到周五),只能出现在 天 域，系统将在离指定日期的最近的有效工作日触发事件。例如：在 天 使用 5W，如果 5日是星期六，则将在最近的工作日：星期五，即 4日 触发。如果 5日是星期天，则在6日(周一)触发；如果 5日在星期一到星期五中的一天，则就在 5日 触发。另外一点，W 的最近寻找不会跨过月份。\nLW：这两个字符可以连用，表示在某个月最后一个工作日，即最后一个非周六周末的日期。\n#：用于确定每个月第几个星期几，只能出现在 星期 域。例如在 4#2，表示某月的第二个星期三。\n"
        },
        {
          "title": "在线生成 Cron 表达式",
          "url": "\\docs\\cron.html#在线生成-cron-表达式",
          "content": "在线生成 Cron 表达式对于大多数开发者来说，编写 Cron 表达式是有难度的，所以推荐使用在线 Cron 表达式生成器。https://cron.qqe2.com/"
        }
      ]
    },
    {
      "title": "微服务",
      "content": "",
      "url": "\\docs\\hprose.html",
      "children": [
        {
          "title": "关于微服务",
          "url": "\\docs\\hprose.html#关于微服务",
          "content": "关于微服务微服务是一种开发软件的架构和组织方法，微服务架构是相对于整体式架构来说的。整体式架构，所有进程紧密耦合，并可作为单项服务运行。这意味着，如果应用程序的一个进程遇到需求峰值，则必须扩展整个架构。随着代码库的增长，添加或改进整体式应用程序的功能变得更加复杂。这种复杂性限制了试验的可行性，并使实施新概念变得困难。整体式架构增加了应用程序可用性的风险，因为许多依赖且紧密耦合的进程会扩大单个进程故障的影响。使用微服务架构，将应用程序构建为独立的组件，并将每个应用程序进程作为一项服务运行。这些服务使用轻量级 API 通过明确定义的接口进行通信。这些服务是围绕业务功能构建的，每项服务执行一项功能。由于它们是独立运行的，因此可以针对各项服务进行更新、部署和扩展，以满足对应用程序特定功能的需求。  开发框架专注于服务治理、监控、链路追踪其中微服务开发框架，专注于服务治理、监控、链路追踪。"
        },
        {
          "title": "RPC",
          "url": "\\docs\\hprose.html#rpc",
          "content": "RPC微服务组件间的互通一般依托于RPC，MVCXE框架当前实现了Hprose RPC协议。"
        },
        {
          "title": "关于Hprose",
          "url": "\\docs\\hprose.html#关于hprose",
          "content": "关于HproseHprose (High Performance Remote Object Service Engine) 是一个MIT开源许可的新型轻量级跨语言跨平台的面向对象的高性能远程动态通讯中间件。它支持众多语言，例如nodeJs, C++, .NET, Java, Delphi, Objective-C, ActionScript, JavaScript, ASP, PHP, Python, Ruby, Perl 等语言，通过 Hprose 可以在这些语言之间实现方便且高效的互通。 Hprose 易学易用，且功能强大，您只需很短时间的学习，就可以用它方便地构建出跨语言跨平台分布式的电信级应用系统。"
        },
        {
          "title": "Hprose官网",
          "url": "\\docs\\hprose.html#关于hprose-hprose官网",
          "content": "Hprose官网https://hprose.com/"
        },
        {
          "title": "Hprose特性",
          "url": "\\docs\\hprose.html#关于hprose-hprose特性",
          "content": "Hprose特性松散耦合的服务发布\n大部分远程调用技术所发布的服务都需要单独编写，常见的服务编写方式有以下几种：用中间语言编写接口，然后生成服务器端构架代码，然后在构架代码中填写服务代码。例如：Corba、Ice 都是采用这种中间语言方式。通过继承某个远程对象类来实现服务类。例如：.NET Remoting。通过先编写远程调用接口，再实现远程调用接口来实现服务类。例如：.NET Remoting，RMI。通过语言的某种特性来标示服务方法。例如：WCF。以上这些方式都紧密耦合方式。由于这些方式都有条件限制，你不可能将一个已有的本地函数、方法、对象或类直接发布为远程服务。 而 Hprose 所发布的服务不需要单独编写，一个已有的本地函数、方法、对象或类可以通过 Hprose 直接发布为远程服务，而不需要对它们进行任何改动，甚至连某些语言内置的函数和方法都可以直接发布为服务。因此这不但方便了新的服务编写，而且对已有系统的改造也变的非常方便。同步调用和异步调用\nHprose 既支持同步调用，也支持异步调用。其同步调用方式与调用本地方法的形式几乎完全一致。异步调用方式采用回调形式来处理结果，用法相当简单直观。其用法与其它远程调用技术相比，既容易掌握，也容易使用。异常处理\nHprose 不论是在服务器端还是在客户端都具有完善的异常处理机制。在服务器端，默认情况下，服务器端发生的异常将会被包装后发送到客户端，在服务器端不做错误日志记录，这有效的提高了服务器端的处理效率。但如果需要记录错误日志，只要在服务器端挂载一个错误处理事件，即可用任何您喜欢的方式来记录错误日志，有效的提高了服务器端处理错误日志的灵活性。服务器端还可以设置为 debug 模式，这种模式下，服务器端发生异常后，会将详细的错误信息包装后发送给客户端，在服务开发阶段非常有用。在客户端，当进行同步调用时，服务器端发生的异常（或客户端在调用时发生的网络异常）会在客户端直接抛出，通过各种语言内置的异常捕获方式就可以捕获并处理异常。当进行异步调用时，为保证线程安全，默认情况下异常不会被抛出，而是被静静的忽略，当你希望处理它们时，只需要为客户端挂载一个错误处理事件，就可以处理异步调用时发生的所有异常了。多线程与线程安全\n不论是 Hprose 服务器端还是客户端，都是线程安全的。因此你可以在多线程环境下安全的使用它们，而不必为每个线程创建一个对象副本。性能与稳定性\nHprose 采用高效通用的序列化格式和算法，不论是序列化后的数据量还是序列化反序列化所花费的时间都远远小于其它远程调用所使用的序列化方式，因此在远程调用中与其它方式相比，完成同样功能的调用，Hprose占用更少的带宽和时间。另外在网络传输中，Hprose采用流式传输，避免了二次编码带来的效率损耗，同时有效的节省了内存和CPU的占用。同样一台服务器在同样的带宽下，使用 Hprose 发布服务相对于其它方式来说，可以承载更大的用户量，比其它方式更加高效稳定。类型映射\nHprose 序列化格式中虽然包含有完备的类型信息和到各种语言的类型映射。但它与其它远程调用不同的是，它还支持弱类型映射机制，一种 Hprose 类型可以映射为某语言中的多个类型，多种 Hprose 类型也可以映射为某语言中的一种类型。有了这种弱类型映射机制，强类型语言与弱类型语言之间的互通变得更加方便，甚至连强类型语言之间的互通都可以享受到弱类型带来的便利。Hprose 与其它远程调用的另一点不同是，它具有很强的动态特征。例如：它支持调用期的类型绑定。它支持可变长参数的调用。它支持引用参数传递的调用。它支持可变类型参数的调用。它支持可变类型结果的调用。它支持对不存在的方法进行调用。这些特性不仅对于动态语言来说相当有用，即便是对于静态语言来说，它同样可以享受到这些动态性带来的便利。安全与身份认证\nHprose 支持通过使用 https 方式实现安全的服务发布与调用。而且 Hprose 还提供了专用于身份认证的事件机制，您只需要挂载自己需要的身份认证事件，就可以在服务被调用之前进行身份验证。负载均衡\nHprose 目前基于 HTTP 传输的实现支持众多种类的 Web 服务器。任何在 Web 上可以使用的负载均衡手段，您都可以直接用于 Hprose 的服务发布中。另外，您还可以灵活的运用 Hprose 本身来实现各种复杂情况下的负载均衡。事务\n事务是面向数据的，而 Hprose 是面向动作的。因此 Hprose 与事务之间没有直接的联系。但是如果你需要在某种语言所发布的服务当中操作数据并需要事务处理时，你可以使用那种语言支持的方式来实现事务操作。"
        },
        {
          "title": "创建Hprose服务",
          "url": "\\docs\\hprose.html#创建hprose服务",
          "content": "创建Hprose服务uses MVCXE, MVCXE.Hprose;type\n  [Route('')]\n  TMyFirstHprose = class(THprose)\n  public\n    function hello(const world: string): string;\n  end;\nimplementation\n{ TMyFirstHprose }\nfunction TMyFirstHprose.hello(const world: string): string;\nbegin\n  //CustomHeader('a','b');\n  //CustomHeader('cc','dd');\n  Result := world;\n  //raise Exception.Create('Error Message');\nend;\n"
        },
        {
          "title": "Hprose路由",
          "url": "\\docs\\hprose.html#hprose路由",
          "content": "Hprose路由Hprose的路由格式(默认转换为小写路由地址)是：前缀/模块名前缀\n如果在launchSettings.json设置了该Hprose服务所在bpl的RoutePrefix，以该设定为前缀否则没有前缀模块名\n模块名取值是控制器类名类名为T{?}Hprose的{?}部分，如果设置了控制类的属性[Route('{自定义模块名}')]则用自定义模块名"
        },
        {
          "title": "调用Hprose服务",
          "url": "\\docs\\hprose.html#调用hprose服务",
          "content": "调用Hprose服务uses MVCXE.HproseClient;\nfunction CallHprose: string;\nvar\n  HproseClient: IHproseClient;\nbegin\n  HproseClient := THproseClient.Create('http://localhost:8080/Hprose');\n  Result := HproseClient.Call('hello',['MVCXE']).AsType;\n  Result := HproseClient.Invoke('hello',['MVCXE']);\nend;\n"
        },
        {
          "title": "IHproseClient",
          "url": "\\docs\\hprose.html#调用hprose服务-ihproseclient",
          "content": "IHproseClientIHproseClient = interface['{A8F5114F-9995-40FB-B346-F3507AABC8B2}']\n    function GetCustomHeader: TDictionary;\n    property Header: TDictionary read GetCustomHeader;\n    function Call(const AName: string): THproseInvoke; overload;\n    function Call(const AName: string; const Args: array of const)\n    : THproseInvoke; overload;\n    procedure CustomHeader(const name: string; const Value: string);\nend;\n"
        },
        {
          "title": "静态类HproseClient",
          "url": "\\docs\\hprose.html#调用hprose服务-静态类hproseclient",
          "content": "静态类HproseClientfunction CallHprose: string;begin\n  Result := HproseClient.New('http://localhost:8080/Hprose').Call('hello',['MVCXE']).AsType;\nend;\n"
        },
        {
          "title": "Hprose序列化与反序列化",
          "url": "\\docs\\hprose.html#hprose序列化与反序列化",
          "content": "Hprose序列化与反序列化与Json和Xml序列化使用方法类似。uses MVCXE.Hprose;type\n  HproseSerializer = class\n  public\n    class function Serialize(const R: T): string; overload;\n    class function Serialize(const V: TValue): string; overload;\n    class function Deserialize(const AContent: string): T; overload;\n  end;"
        }
      ]
    },
    {
      "title": "发电子邮件",
      "content": "",
      "url": "\\docs\\email.html",
      "children": [
        {
          "title": "关于电子邮件",
          "url": "\\docs\\email.html#关于电子邮件",
          "content": "关于电子邮件电子邮件是一种用电子手段提供信息交换的通信方式，是互联网应用最广的服务。通过网络的电子邮件系统，用户可以以非常低廉的价格（不管发送到哪里，都只需负担网费）、非常快速的方式（几秒钟之内可以发送到世界上任何指定的目的地），与世界上任何一个角落的网络用户联系。"
        },
        {
          "title": "ISendMail接口",
          "url": "\\docs\\email.html#isendmail接口",
          "content": "ISendMail接口MVCXE 框架提供了ISendMail接口来发邮件uses MVCXE.SendMail;ISendMail = interface\n    ['{1D92CAAC-8C34-4A9E-AAE5-C03F8A8C6C3B}']\n    procedure SendMail(const ToList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;\n    procedure SendMail(const ToList, CCList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;\n    procedure SendMail(const ToList, CCList, BCCList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;\n\n    procedure SendHtmlEmail(const ToList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;\n    procedure SendHtmlEmail(const ToList, CCList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;\n    procedure SendHtmlEmail(const ToList, CCList, BCCList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;\nend;\n"
        },
        {
          "title": "配置SMTP服务",
          "url": "\\docs\\email.html#配置smtp服务",
          "content": "配置SMTP服务appsettings.json 中配置{  \"AppSettings\": {\n\t\"MAIL.SENDERNAME\": \"MvcXE\",\n\t\"MAIL.SENDEREMAIL\": \"MvcXE@gmail.com\",\n\t\"SMTP.HOST\": \"mail.google.com\",\n\t\"SMTP.USER\": \"\",\n\t\"SMTP.PASS\": \"\",\n\t\"SMTP.PORT\": \"25\",\n\t\"SMTP.TLS\": \"False\"\n  }\n}\n"
        },
        {
          "title": "电子邮件使用",
          "url": "\\docs\\email.html#电子邮件使用",
          "content": "电子邮件使用通过注入[IOC('MVCXE.Mail.TSendMail')] ISendMail方式注入即可。基本使用\ntype    TAccountController = class(BaseController)\n    private\n        [IOC('MVCXE.Mail.TSendMail')]\n        mail: ISendMail;\n    public\n        function new(const form: TRegForm): TAccountFormResult;\n    end;\n\nimplementation\n\nfunction TAccountController.new(const form: TRegForm): TAccountFormResult;\nvar\n    User: TUsers;\n    HashMD5: THashMD5;\n    s: string;\n    Membership: TIdentity;\nbegin\n    Response.ContentType := 'application/json';\n    Result.success := False;\n    s := accessor.HttpContext.Session.Get('ValidationCode');\n    if not SameText(form.vercode, s) then\n    begin\n        Result.msg := '验证码不正确.';\n        Exit;\n    end;\n    if not SameText(form.pass, form.repass) then\n    begin\n        Result.msg := '两次密码不相同.';\n        Exit;\n    end;\n    if UserService.UserExists(form.email, form.username) then\n    begin\n        Result.msg := '邮箱地址已存在.';\n        Exit;\n    end;\n    User := TUsers.Create;\n    HashMD5 := THashMD5.Create;\n    s := HashMD5.GetHashString(form.pass);\n    with User do\n    begin\n        Email := TNetEncoding.HTML.Encode(form.email);\n        EmailConfirmed := True;\n        Password := s;\n        Nickname := TNetEncoding.HTML.Encode(form.username);\n        Title := '';\n        Gender := 1;\n        City := '';\n        Sign := '';\n        HeadPortrait := '/res/images/avatar/default.png';\n        Integral := 200;\n        IsVip := False;\n        VipLevel := 0;\n        CreateTime := Now;\n        IsDisabled := False;\n        EmailIsUpdate := True;\n        EmailConfirmToken := '';\n        IsAdmin := False;\n    end;\n    UserService.CreateUser(User);\n    mail.SendMail(form.email,'注册成功','注册成功');\n    Result.msg := '注册成功.';\n    Result.success := True;\nend;\n\nend."
        }
      ]
    },
    {
      "title": "在 IIS 部署",
      "content": "",
      "url": "\\docs\\deploy-iis.html",
      "children": [
        {
          "title": "开启CGI和ISAPI扩展",
          "url": "\\docs\\deploy-iis.html#开启cgi和isapi扩展",
          "content": "开启CGI和ISAPI扩展\nMVCXE提供了Webborker.ISAP服务程序，要加载该程序需要开启IIS的CGI和ISAPI扩展\n\n否则你需要在控制面板->启动或关闭Windows功能，安装CGI和ISAPI扩展\n\n\n\n打开ISAPI限制\n\n\n\n\n"
        },
        {
          "title": "开启URL Rewrite模块",
          "url": "\\docs\\deploy-iis.html#开启url-rewrite模块",
          "content": "开启URL Rewrite模块否则你需要到iis.net网站下载URL Rewrite Module 2.1也可以安装Application Request Routing（如果要实现站外重写需要安装这个模块）"
        },
        {
          "title": "添加新网站",
          "url": "\\docs\\deploy-iis.html#添加新网站",
          "content": "添加新网站配置网站信息\n\n配置应用程序池\n\n设置为 非托管\n\n配置应用高级选项\n\n32位MVCXE应用程序池要启用32位应用程序\n\n"
        },
        {
          "title": "设置文件系统权限",
          "url": "\\docs\\deploy-iis.html#设置文件系统权限",
          "content": "设置文件系统权限wwwroot目录需要设置用户IUSR/IIS_IUSRS读取权限\nisap_webborker.dll需要设置用户IUSR/IIS_IUSRS读取执行权限\nwwwroot\\App_Data\\Log和wwwroot\\App_Data目录需要设置用户IUSR/IIS_IUSRS读取执行权限\n你的程序需要上传文件的目录（如wwwroot\\uploads）需要设置用户IUSR/IIS_IUSRS读写（不能执行）权限\n\n"
        },
        {
          "title": "设置MVCXE程序目录结构",
          "url": "\\docs\\deploy-iis.html#设置mvcxe程序目录结构",
          "content": "设置MVCXE程序目录结构正常情况下MVCXE的网站目录如下：├── output│   ├── bds bpl files\n│   ├── mvcxe bpl files\n│   ├── mvcxe server exe/dll files\n│   ├── other dll files\n│   ├── areas\n│   │   ├── area1\n│   │   ├── area2\n│   │   └── area3\n│   ├── views\n│   │   ├── view1\n│   │   ├── view1\n│   │   └── Shared\n│   ├── wwwroot\n│   │   ├── App_data\n│   │   ├── files\n│   │   ├── folders\n│   │   ├── isapi_webborker.dll\n│   │   └── web.config\n│   ├── appsettings.json\n│   ├── launchSettings.json\n│   ├── sqlMap.xml\n但因为IIS特性，我们需要设置wwwwroot目录为网站根目，iis是不允许执行根目录外的程序，所以需要将mvcxe程序放于较安全的App_data目录中，你需要将output目录下除了wwwroot外的所以文件/目录拷贝到wwwroot\\App_data下，如下：├── wwwroot│   ├── html files\n│   ├── folders\n│   ├── isapi_webborker.dll\n│   ├── App_data\n│   │   ├── areas\n│   │   │   ├── area1\n│   │   │   ├── area2\n│   │   │   └── area3\n│   │   ├── views\n│   │   │   ├── view1\n│   │   │   ├── view1\n│   │   │   └── Shared\n│   │   ├── bds bpl files\n│   │   ├── mvcxe bpl files\n│   │   ├── other dll files\n│   │   ├── appsettings.json\n│   │   ├── launchSettings.json\n│   │   └── sqlMap.xml\n│   ├── web.config\n"
        },
        {
          "title": "一些额外需要注意的地方",
          "url": "\\docs\\deploy-iis.html#一些额外需要注意的地方",
          "content": "一些额外需要注意的地方\n因为安全特性，launchSettings.json中EnabledPackageScan需要设置为false,同时你要加载的bpl都需要写在ExternalPackages中\n  {\n  \"packages\": {\n      \"EnabledPackageScan\": false,\n      \"IgnorePackageFiles\": [\"MVCXE.Core\",\"inet\",\"rtl\",\"vcl\",\"xmlrtl\",\"IndyCore\",\"IndyProtocols\",\"IndySystem\",\"CustomIPTransport\",\"IndyIPCommon\",\"IndyIPServer\",\"dbrtl\"],\n      \"ExternalPackages\": [{\n          \"Name\": \"FireDACCommon\"\n          },{\n          \"Name\": \"FireDACCommonDriver\"\n          },{\n          \"Name\": \"FireDAC\"\n          },{\n          \"Name\": \"FireDACSqliteDriver\"\n          },{\n          \"Name\": \"FireDACCommonOdbc\"\n          },{\n          \"Name\": \"FireDACMSSQLDriver\"\n          },{\n          \"Name\": \"FireDACMySQLDriver\"\n          },{\n          \"Name\": \"FireDACOracleDriver\"\n          },{\n          \"Name\": \"FireDACPgDriver\"\n          },{\n          \"Name\": \"MVCXE.Core\"\n          },{\n          \"Name\": \"MVCXE.Web\"\n          },{\n          \"Name\": \"MVCXE.LoggerPro\"\n          },{\n          \"Name\": \"MVCXE.Cache\"\n          },{\n          \"Name\": \"MVCXE.ORM\"\n          },{\n          \"Name\": \"MVCXE.TPL\"\n          },{\n          \"Name\": \"MVCXE.Quartz\"\n          },{\n          \"Name\": \"MVCXE.Captcha\"\n          },{\n          \"Name\": \"MVCXE.Swagger\"\n          },{\n          \"Name\": \"_NameSpace_BLL\"\n          },{\n          \"Name\": \"_NameSpace_Web\",\n          \"Area\": \"\",\n          \"RoutePrefix\": \"\",\n          \"IOC\": [\n              {\n                  \"interface\": \"IPostService\",\n                  \"implement\": \"_NameSpace_Service.Post.TPostService\"\n              },\n              {\n                  \"interface\": \"ICategorieService\",\n                  \"implement\": \"_NameSpace_Service.Categorie.TCategorieService\"\n              }\n          ]\n          }]\n      }\n  }\n\n\n\n需要在IIS部署运行的程序，代码里向控制台写Debug信息的代码Write/WriteLn会出错，需要你用try/catch处理\n\n\n第三方Dll(如db client dll)一般情况下放在调用它的bpl文件所在目录即可，但有时有的需要放在bpl的宿主程序所在目录，iis在C:\\Windows\\System32\\inetsrv或C:\\Windows\\SysWOW64\\inetsrv，可以多试试不同的位置即可。\n\n"
        },
        {
          "title": "IIS常见问题",
          "url": "\\docs\\deploy-iis.html#iis常见问题",
          "content": "IIS常见问题"
        },
        {
          "title": "状态码，不支持 PUT，DELETE 请求",
          "url": "\\docs\\deploy-iis.html#iis常见问题-状态码，不支持-put，delete-请求",
          "content": "状态码，不支持 PUT，DELETE 请求默认情况下，IIS拒绝 PUT和 DELETE 请求，原因为 IIS 默认注册了一个名为 WebDAVModule 的自定义 HttpModule 导致的。解决该问题，只需要在 web.config 移除即可：        \n    \n        \n    \n    \n    \n微软官方文档：https://docs.microsoft.com/zh-cn/troubleshoot/developer/webapps/iis/health-diagnostic-performance/http-error-405-website"
        },
        {
          "title": "IIS 回收问题和配置",
          "url": "\\docs\\deploy-iis.html#iis常见问题-iis-回收问题和配置",
          "content": "IIS 回收问题和配置通过 IIS 部署MVCXE应用程序，如果启动了系统日志，就会发现经常出现Application is shutting down...的日志，代表 IIS 回收了应用程序池。对于一个长期在线的网站来说，这是非常不合理的，所以我们可以通过以下配置让 IIS 进行长时间不访问便回收的机制。配置步骤如下：打开 IIS 并点击左侧树根节点（计算机名称）并点击右侧的 Configuration Editor（配置编辑器）\n\n在 Section（节）选择 system.applicationHost/applicationPools 并设置 startMode 为 AlwaysRunning，之后点击 Apply 保存。\n\n点击左侧树根节点（计算机名称）下的 Application Pools 并点击最右侧的 Set Appliation Pool Defaults...（设置应用程序池默认配置...）\n\n设置 Idle Time-out (minutes)（闲置超时（分钟）为 0\n\n"
        }
      ]
    },
    {
      "title": "在 Apache 部署",
      "content": "",
      "url": "\\docs\\deploy-apache.html",
      "children": [
        {
          "title": "下载Windows版本的Apache",
          "url": "\\docs\\deploy-apache.html#下载windows版本的apache",
          "content": "下载Windows版本的Apache2.2版本\nhttp://archive.apache.org/dist/httpd/binaries/win32/\n2.4版本\nhttps://downloads.apache.org/httpd/binaries/win32/\n"
        },
        {
          "title": "编辑httpd.conf",
          "url": "\\docs\\deploy-apache.html#编辑httpd.conf",
          "content": "编辑httpd.conf"
        },
        {
          "title": "加载UrlRewrite功能",
          "url": "\\docs\\deploy-apache.html#编辑httpd.conf-加载urlrewrite功能",
          "content": "加载UrlRewrite功能    LoadModule rewrite_module modules/mod_rewrite.so    LoadModule proxy_module modules/mod_proxy.so\n    LoadModule proxy_http_module modules/mod_proxy_http.so\n如果使用SetHandler mod_webbroker-handler来加载你的应用，可以不使用UrlRewrite，但根目录/就不能由mvcxe接管了，launchSettings.json中RoutePrefix需要与之一致。"
        },
        {
          "title": "加载mvcxe module",
          "url": "\\docs\\deploy-apache.html#编辑httpd.conf-加载mvcxe-module",
          "content": "加载mvcxe module\n加载你的mvcxe dso 2.2\n  LoadModule webbroker_module \"{mvcxe_output_path}/mod_webbroker_22.dll\"\n  #访问扩展名为.d的文件即调用\n  AddHandler mod_webbroker_22-handler .d\n  #访问地址/xyz即调用\n  #SetHandler mod_webbroker_22-handler\n\n\n\n加载你的mvcxe dso 2.4\n  LoadModule webbroker_module \"{mvcxe_output_path}/mod_webbroker_24.dll\"\n  #访问扩展名为.d的文件即调用\n  AddHandler mod_webbroker_24-handler .d\n  #访问地址/xyz即调用\n  #SetHandler mod_webbroker_22-handler\n\n\n\n如果不想用dso，用isapi\n  LoadModule isapi_module modules/mod_isapi.so\n  AddHandler isapi-handler .dll\n  ISAPICacheFile {mvcxe_output_path}/wwwroot/isapi_webbroker.dll\n\n\n"
        },
        {
          "title": "设置wwwroot",
          "url": "\\docs\\deploy-apache.html#编辑httpd.conf-设置wwwroot",
          "content": "设置wwwroot    DocumentRoot \"{mvcxe_output_path}/wwwroot\"    \n\n    \n    DirectoryIndex index.d index.html\n    Listen 8080\n"
        },
        {
          "title": "编辑.htaccess",
          "url": "\\docs\\deploy-apache.html#编辑.htaccess",
          "content": "编辑.htaccessmvcxe会在wwwroot下建了一个.htaccess文件，内容是：    Options All -Indexes    #设为On打开UrlRewrite功能\n    RewriteEngine On\n    RewriteBase /\n    #文件存在时不执行Rewrite\n    RewriteCond %{REQUEST_FILENAME} !-f\n    #目录存在时不执行Rewrite\n    #RewriteCond %{REQUEST_FILENAME} !-d\n    #使用DSO用下面这条\n    RewriteRule ^(.*)$ /index.d/$1 [L,P,QSA]\n    #使用ISAPI用下面这条\n    #RewriteRule ^(.*)$ /isapi_webbroker.dll/$1 [L,P,QSA]\n"
        },
        {
          "title": "*.d引导文件",
          "url": "\\docs\\deploy-apache.html#*.d引导文件",
          "content": "*.d引导文件mvcxe会在wwwroot下建了一个空白的index.d文件作为mvcxe dso模块引导文件，如果不使用dso或urlrewrite可以删除"
        },
        {
          "title": "使用isapi还需要注意的事项",
          "url": "\\docs\\deploy-apache.html#使用isapi还需要注意的事项",
          "content": "使用isapi还需要注意的事项参考在 IIS 部署将相关文件移动到App_data后，App_data目录中需要放置一个.htaccess文件，内容中加上Deny from all防止用户非法访问配置文件里的敏感信息"
        },
        {
          "title": "第三方Dll(如db client dll)",
          "url": "\\docs\\deploy-apache.html#第三方dll如db-client-dll",
          "content": "第三方Dll(如db client dll)一般情况下放在调用它的bpl文件所在目录即可，但有时有的需要放在bpl的宿主程序所在目录，apache安装目录\\bin中。"
        }
      ]
    },
    {
      "title": "独立WebServer部署",
      "content": "",
      "url": "\\docs\\deploy-application.html",
      "children": [
        {
          "title": "MVCXE当前提供了三个独立WebServer应用程序",
          "url": "\\docs\\deploy-application.html#mvcxe当前提供了三个独立webserver应用程序",
          "content": "MVCXE当前提供了三个独立WebServer应用程序"
        },
        {
          "title": "Webborker.Console",
          "url": "\\docs\\deploy-application.html#mvcxe当前提供了三个独立webserver应用程序-webborker.console",
          "content": "Webborker.ConsoleDelphi自带的WEB服务应用程序，基于Webborker架构，非常稳定，推荐用于开发调试，如果要进行独立应用程序部署也是很好的选择。"
        },
        {
          "title": "HttpSys.PnServer",
          "url": "\\docs\\deploy-application.html#mvcxe当前提供了三个独立webserver应用程序-httpsys.pnserver",
          "content": "HttpSys.PnServer基于https://github.com/pony5551/PnHttpSysServer开发，只做了很少的修改和MVCXE适配，底层用的HttpSys技术，在Windows平台有很好的性能，如果要进行生产环境部署，已提供该WebServer程序全部源码，请自行审阅测试。"
        },
        {
          "title": "Node.Pas",
          "url": "\\docs\\deploy-application.html#mvcxe当前提供了三个独立webserver应用程序-node.pas",
          "content": "Node.Pas基于https://github.com/vovach777/node.pas开发，只做了很少的修改和MVCXE适配，底层用的LibUV库，跨平台，有很强的并发性能，如果要进行生产环境部署，已提供该WebServer程序的全部源码，请自行审阅测试。"
        },
        {
          "title": "Windows服务",
          "url": "\\docs\\deploy-application.html#windows服务",
          "content": "Windows服务如果要开机就运行，最好修改为Windows Service服务程序，这样部署管理会更方便。"
        }
      ]
    },
    {
      "title": "Docker 环境部署",
      "content": "",
      "url": "\\docs\\deploy-docker.html",
      "children": [
        {
          "title": "安装Docker Desktop",
          "url": "\\docs\\deploy-docker.html#安装docker-desktop",
          "content": "安装Docker Desktop安装方法请参考官方文档https://docs.docker.com/desktop/，安装后选择switch to windows container，国内使用DockerHub很慢，推荐使用国内的DockerHub镜像源https://juejin.cn/post/7165806699461378085"
        },
        {
          "title": "Windows Server Core Image",
          "url": "\\docs\\deploy-docker.html#windows-server-core-image",
          "content": "Windows Server Core Image因为Delphi编译出来的程序X32或X64都要用到kernel32.dll所以只能使用servercorehttps://hub.docker.com/_/microsoft-windows-servercore，体积高达4G+只推荐研究学习使用，等以后MVCXE Linux版本推出，Docker才会有比较好的体验"
        },
        {
          "title": "Dockerfile",
          "url": "\\docs\\deploy-docker.html#dockerfile",
          "content": "Dockerfile在工程目录创建Dockerfile，以下内容供参考    FROM mcr.microsoft.com/windows/servercore:20H2-amd64\n    WORKDIR /myapp\n\n    COPY output .\n\n    CMD [\"Webborker.Console.exe\"]\n然后CMD到工程目录，执行docker build -t myapp .，漫长的下载后，就可以在DockerDesktop的UI中看到你的Image了"
        },
        {
          "title": "运行",
          "url": "\\docs\\deploy-docker.html#运行",
          "content": "运行    docker run -d -p 8011:8080 myapp浏览http://localhost:8011/Home/Index看看你的程序是否跑起来了。"
        }
      ]
    }
  ],
  "授权": [
    {
      "title": "授权",
      "content": "您可以添加微信好友:kylixfans，咨询产品购买、开发服务、技术支持等事宜。 也可以通过邮件联系我们。",
      "url": "\\licence\\index.html",
      "children": [
        {
          "title": "开发许可（Developer License）",
          "url": "\\licence\\index.html#开发许可（developer-license）",
          "content": "开发许可（Developer License）99元人民币\n每个使用MVCXE的开发者需要购买一个developer license\n此授权方式只对开发者数量限制，对发布的产品没有限制。\n"
        },
        {
          "title": "企业许可（Enterprise License）",
          "url": "\\licence\\index.html#企业许可（enterprise-license）",
          "content": "企业许可（Enterprise License）9999元人民币\n许可用户在同一公司范围内供任意数量的开发人员使用本产品。提供全部源码\n提供2人天现场培训服务\n"
        }
      ]
    }
  ]
}