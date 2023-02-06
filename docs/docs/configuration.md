# 配置

## 什么是配置
简单来说，配置将系统应用可动态调配的选项放在统一地方管理，通过不同的配置让系统做出动态调整。

在 MVCXE 应用程序启动时默认加载 启动项目 下的 `appsettings.json` 作为应用配置。同时还支持不同的运行环境加载对应的配置文件，如：

- Development：加载 appsettings.Development.json
- Staging：加载 appsettings.Staging.json
- {Environment}：appsettings.{Environment}.json

## 配置的使用
假设我们需要在系统运行时获取系统名称、版本号及版权信息，这些信息可能随时变化而且需要在多个地方使用。这时就需要将这些信息配置起来。具体步骤如下：

### 在appsettings.json加入配置信息

	{
	  "AppInfo": {
		"Name": "MVCXE",
		"Version": "1.0.0",
		"Company": "Roc"
	  }
	}

*某些 linux 系统不支持读取带 注释 的 json 文件，直接读取将会报错。需要将 json 内的注释全部 删除 才能正常读取。*
	
### 读取 appsettings.json 信息
在 MVCXE 框架中，提供了两种读取方式：

> 依赖注入 IConfigurationManager 对象读取

	uses
	  MVCXE;
	type
	  [Route('api/Default')]
	  TDefaultWebapi = class(TWebApi)
	  private
		[IOC('MVCXE.ConfigurationManager.TConfigurationManager')]
		configuration: IConfigurationManager;
	  public
		[HttpGet]
		function GET([IOC('MVCXE.ConfigurationManager.TConfigurationManager')] _configuration: IConfigurationManager): string;
	  end;
	implementation
	function TDefaultWebapi.GET([IOC('MVCXE.ConfigurationManager.TConfigurationManager')] _configuration: IConfigurationManager): string;
	begin
	  Result := '名称：'+configuration.Configuration['AppInfo:Name']+'，'+
				'版本：'+configuration.Configuration['AppInfo:Version']+'，'+
				'公司：'+configuration.Configuration['AppInfo:Company:Name']+'"'+
				'名称：'+_configuration.Configuration['AppInfo:Name']+'，'+
				'版本：'+_configuration.Configuration['AppInfo:Version']+'，'+
				'公司：'+_configuration.Configuration['AppInfo:Company:Name']+'"';
	end;

> 通过 App.Configuration[path] 读取

	uses
	  MVCXE;
	type
	  [Route('api/Default')]
	  TDefaultWebapi = class(TWebApi)
	  public
		[HttpGet]
		function GET: string;
	  end;
	implementation
	function TDefaultWebapi.GET: string;
	begin
	  Result := '名称：'+App.Configuration['AppInfo:Name']+'，'+
				'版本：'+App.Configuration['AppInfo:Version']+'，'+
				'公司：'+App.Configuration['AppInfo:Company:Name']+'"';
	end;

### 如何选择读取方式
- 在可依赖注入类中，依赖注入 IConfigurationManager 读取
- 在静态类/非依赖注入类中，选择 App.Configuration[path] 读取

## 路径符 查找节点
在 MVCXE 中，配置采用 `:` 分隔符来读取分层配置数据。如上述例子中的 `AppInfo:Name`。如有更多层级数据则只需要通过 `:` 进入下一层节点即可。

假设我们有以下配置信息：

	{
	  "AppInfo": {
		"Name": "MVCXE",
		"Version": "1.0.0",
		"Company": {
		  "Name": "Roc",
		  "Address": {
			"City": "中国",
			"Province": "广东省",
			"Detail": "广州市"
		  }
		}
	  }
	}

> 读取第二层

	appName:= App.Configuration['AppInfo:Name]; // => MVCXE

> 读取第三层

	companyName:= App.Configuration['AppInfo:Company:Name]; // => Roc
	
> 读取第四层

	addressDetail:= App.Configuration['AppInfo:Company:Address:Detail]; // => 广州市
	
> 读取第N层

	nTier:= App.Configuration['AppInfo:Tier2:Tier3:Tier4...Tiern1:Tiern3...];

> 查找数组节点

有些时候我们需要或者数组特定的某些，可以通过 `App.Configuration["array:0"]` 获取，`0` 是索引数字。

## 自定义配置文件
大多情况下，我们的配置只需要在`appsettings.json`中配置即可，但一些特殊情况下，我们希望某些组件或功能拥有独立的配置，这个时候就需要用到自定义配置如：

> 创建配置文件`emailsetting.json`

	{
	  "outlook": {
		"smtp": {
		  "server": "smtp.office365.com",
		  "port": "587",
		  "ssl": "STARTTLS"
		},
		"pop": {
		  "server": "outlook.office365.com",
		  "port": "995",
		  "ssl": "TLS"
		}
	  }
	}

_MVCXE 框架会在启动时自动扫描每一个项目层根目录下的 *.json 文件加入配置中，所以无需手工配置。_

> 读取`emailsetting.json`配置

	serverName:= App.Configuration['outlook:smtp:server]; // => smtp.office365.com
	port:= _configuration['outlook:smtp:port']; // => 587

## 不同环境读取
在实际应用开发中，我们可能会根据不同的环境加载不同的配置文件，如 数据库连接字符串。

这时我们只需要遵循特定命名规范 `{name}.{Environment}.json` 即可。如：

- appsettings.Development.json
- appsettings.Staging.json
- appsettings.Production.json
- emailsetting.Development.json
- emailsetting.Staging.json
- emailsetting.Production.json

这时，MVCXE 会在应用启动时自动加载不同环境的配置文件。

## 配置的优缺点
> 优点

- 能够在系统运行时快速读取
- 无需额外配置

> 缺点

- 存在重复读取
- 通过硬编码字符串读取，容易出错
- 不能设置默认值
- 不能在运行环境中动态配置
- 不能验证配置有效性
- 不支持更改通知
















