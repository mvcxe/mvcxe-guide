# 模块化开发

模块化配置必须在`launchSettings.json`下配置才有效，原因是启动的时候`launchSettings.json`已经加载，自定义配置文件还未加载。

## 关于模块化开发
模块化是代码的组成的一种方式，模块化系统就像乐高玩具一样，一块一块零散积木堆积起一个精彩的世界。每种积木的形状各不相同，功能各不相同，积木与积木直接互相依赖，互相支撑。

### 模块化开发好处
模块化开发能够将不同的功能组装在一起，实现功能的累加，诸多功能组装在一起，最终形成项目。

## 模块分类
应用程序模块：通常这类模块是完整的应用程序，可以独立运行，有自己的实体、服务、API 及 UI 组件等。
框架级模块：这类通常是解决某个业务功能进行开发的模块，比如上传文件、分布式缓存、数据验证等。

## 如何进行模块化开发
`MVCXE`框架设计之初就是模块化的，启用`MVCXE`模块化支持非常简单。

### 启用模块化支持
`launchSettings.json`

    {
    "packages": {
        "EnabledPackageScan": true, // 启用模块化程序集扫描, 自动扫描当前目录所有扩展名是.bpl的模块，按日期由旧到新加载。如果false只加载在ExternalPackages列出来的模块。
        "IgnorePackageFiles": ["MVCXE.Core","inet","rtl","vcl","xmlrtl","IndyCore","IndyProtocols","IndySystem","dbrtl"],//这些模块系统会自动加载，列出来防止重复加载偶发错误的情况。
        "ExternalPackages": [{
        "Name": "FireDACCommon"//系统的bpl或第三方的bpl，可以不写扩展名和版本号
        },{
        "Name": "FireDACCommonDriver"
        },{
        "Name": "FireDAC"
        },{
        "Name": "FireDACSqliteDriver"
        },{
        "Name": "FireDACCommonOdbc"
        },{
        "Name": "FireDACMSSQLDriver"
        },{
        "Name": "FireDACMySQLDriver"
        },{
        "Name": "FireDACOracleDriver"
        },{
        "Name": "MVCXE.Web"//mvcxe的模块bpl
        },{
        "Name": "MVCXE.LoggerPro"
        },{
        "Name": "MVCXE.Cache"
        },{
        "Name": "MVCXE.ORM"
        },{
        "Name": "MVCXE.TPL"
        },{
        "Name": "MVCXE.Quartz"
        },{
        "Name": "MVCXE.Captcha"
        },{
        "Name": "Fly.BLL"//你写的模块bpl
        },{
        "Name": "Fly.Web",
        "IOC": [
            {
                "interface": "IPostService",
                "implement": "Fly.Service.Post.TPostService"
            },
            {
                "interface": "ICategorieService",
                "implement": "Fly.Service.Categorie.TCategorieService"
            }
        ]
        },{
        "Name": "DelphiAdmin.Backend.BLL"
        },{
        "Name": "DelphiAdmin.Backend",
        "Area": "backend",
        "RoutePrefix": "backend"
        },{
        "Name": "DelphiAdmin.Backend.Api",
        "Area": "backend",
        "RoutePrefix": "backend/api"
        },{
        "Name": "DelphiAdmin.Backend.Mall",
        "Area": "mall",
        "RoutePrefix": "backend/mall"
        },{
        "Name": "ferry.bll"
        },{
        "Name": "ferry.api",
        "Area": "ferry",
        "RoutePrefix": "api",
        "IOC": [
            {
                "interface": "ISysService",
                "implement": "Service.Sys.Impl.TSysService"
            }
        ]
        }]
    }
    }

## 模块化开发注意事项
- 尽可能保证每个模块都有独立的路由地址格式：/RoutePrefix/路由地址，这样才能保证不会和现有的系统出现冲突。
- 开发模块化是尽可能设计为完全独立的引用，如果需要包含不同的配置和视图视图应设置独立的Area，有html/cs/javascript的话应放于wwwroot里独立的Area目录里。
- 模块化开发如果需要引用其它模块，该被引用的模块应先加载。
- 模块不能循环引用，A模块引用B模块则B模块不能引用A模块
- 模块如果要引用其它.dll文件，dll应与模块bpl同级目录

## 举例

### 经典MVC
- Controller控制器写在一个模块bpl中，如MyApp.Web.bpl
- 业务逻辑代码写在一个模块bpl中，如MyApp.Service.bpl
- 数据实体及关系写一个模块bpl中，如MyApp.Model.bpl
- MyApp.Web引用MyApp.Service和MyApp.Model，MyApp.Service引用MyApp.Model

### 经典WebAPI
- 动态WebApi写在一个模块bpl中，如MyApp.Application.bpl
- 业务逻辑代码写在一个模块bpl中，如MyApp.Service.bpl
- 数据实体及关系写一个模块bpl中，如MyApp.Model.bpl
- MyApp.Application引用MyApp.Service和MyApp.Model，MyApp.Service引用MyApp.Model
- 当WebApi有新版本时，可以创建MyApp.Application.V2，没有变化的Api直接继承或引用，删除没用的Api，增加新的，设置新的RoutePrefix_V2，MyApp.Application.V2引用MyApp.Application,MyApp.Service和MyApp.Model

### 混合模式
- Controller控制器写在一个模块bpl中，如MyApp.Web.bpl
- 动态WebApi写在一个模块bpl中，如MyApp.Application.bpl
- 业务逻辑代码写在一个模块bpl中，如MyApp.Service.bpl
- 数据实体及关系写一个模块bpl中，如MyApp.Model.bpl
- MyApp.Web引用MyApp.Service和MyApp.Model，MyApp.Service引用MyApp.Model
- MyApp.Application引用MyApp.Service和MyApp.Model，MyApp.Service引用MyApp.Model

## 常见问题
- 修改了代码，需要编译对应的bpl，直接编译运行Webborker.Console是不会自动编译相关的bpl的
- 被引用的代码修改了，引用该代码的bpl也要重新编译，如MyApp.Model的一个实体类改了，编译MyApp.Model.bpl后，要继续编译受修改代码影响的其它bpl，如MyApp.Web或MyApp.Service

