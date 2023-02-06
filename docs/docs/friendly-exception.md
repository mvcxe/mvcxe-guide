# 友好异常处理

## 什么是异常
异常一般是指运行期（此处特指`TException`类）会发生的导致程序意外中止的问题，是一种对问题的描述后的封装对象。

在过去开发中，通常异常由系统运行时出错抛出，但现在的开发过程中，我们应在程序开发中合理的抛出异常，比如更新一条不存在的实体，或查询一个不存在的数据等等。

## 处理异常方式
- 不处理，直接中断程序执行（不推荐）
- 通过 try catch finally 处理（不推荐）
- 全局统一处理，并记录异常信息（推荐）
- 异常注解方式处理，支持本地化 （推荐）

## 什么是友好异常处理
> 非友好异常处理

在了解友好异常处理之前可以看看非友好异常处理：

- 对终端用户抛出 500状态码 堆栈信息
- 大量的 try catch 代码，污染正常业务逻辑
- 没有规范化的异常状态码和异常消息管理
- 没有异常日志收集记录
- 不支持异常消息本地化处理
- 不支持异常策略，失败后程序立即终止
- 不支持分布式事务 CAP
- 不支持异常传播
- 返回的异常格式杂乱

> 友好异常处理

- 对终端用户提示友好
- 对后端开发人员提供详细的异常堆栈
- 不干扰正常业务逻辑代码，如 没有 try catch 代码
- 支持异常状态码多方设置
- 支持异常消息本地化
- 异常信息统一配置管理
- 支持异常策略，如重试
- 支持异常日志收集记录
- 支持 CAP 分布式事务关联
- 支持内部异常外部传播
- 支持返回统一的异常格式数据

## 友好异常处理使用示例
MVCXE 框架提供了非常灵活的友好异常处理方式。

> 引入友好异常单元

	uses MVCXE.Exception;

> 两个例子

简单抛个异常

	type
	  TMyWebApi = class(TWebApi)
	  public
		function Get(id: Integer): string;
	  end;
	implementation
	function TMyWebApi.Get(id: Integer): string;
	begin
	  if id < 3 then
      begin
        raise Oops.Oh('%d 不能小于3', [id]);
      end;
	
      Result := id;
	end;

抛出特定类型异常

	type
	  TMyWebApi = class(TWebApi)
	  public
		function Get(id: Integer): string;
	  end;
	implementation
	function TMyWebApi.Get(id: Integer): string;
	begin
	  if id < 3 then
      begin
        raise Oops.Oh('%d 不能小于3', TypeInfo(TMyException), [id]);
      end;
	
      Result := id;
	end;

## 关于 Oops.Oh
通过上面的例子可以看出，Oops.Oh(errorMessage) 可以结合 raise 抛出异常。对于熟悉C#的人员来说，raise 后面只能 TException 实例。Oops.Oh(...) 方法返回正是 TException 实例。

> 为什么起这个名字？

这个名字来源于一个英语句子：Oh, Oops!，意思是 噢（哎），出错了！，所以就有了 Oops.Oh。

> Oops.Oh 重载方法

	type
	  Oops = class
	  public
		class function Oh(const errorMessage: string;
		  const args: array of const): Exception; overload;
		class function Oh(const errorCode: Integer;
		  const args: array of const): Exception; overload;
		class function Oh(const errorMessage: string; exceptionType: PTypeInfo;
		  const args: array of const): Exception; overload;
		class function Oh(const errorCode: Integer; exceptionType: PTypeInfo;
		  const args: array of const): Exception; overload;
		class function Bah(const errorMessage: string;
		  const args: array of const): Exception; overload;
		class function Bah(const errorCode: Integer;
		  const args: array of const): Exception; overload;
	  end;

## 最佳实践
在`MVCXE`框架中，提供了非常灵活且规范化的友好异常处理方式，通过这个方式可以方便管理异常状态码、异常信息及异常本地化。

> appsetting.json 中配置异常信息类型

	{
	  "ErrorCodeMessageSettings": {
		"Definitions": [
		  [5000, "%s 不能小于 %s", "1", "0"],
		  [5001, "我叫 %s 名字", "MVCXE"],
		  [5002, "Oops! 出错了"]
		]
	  }
	}

Definitions 类型为二维数组，二维数组中的每一个数组第一个参数为 ErrorCode 也就是错误码，第二个参数为 ErrorMessage 消息内容，剩余参数作为 ErrorMessage 的格式化参数。

> 使用示例

	type
	  TMyWebApi = class(TWebApi)
	  public
		function Get(id: Integer): string;
	  end;
	implementation
	function TMyWebApi.Get(id: Integer): string;
	begin
	  if id < 3 then
      begin
        raise Oops.Oh(500, [IntToStr(id), '3']);
      end;
	
      Result := id;
	end;

> 更多例子

	raise Oops.Oh(1000);
	raise Oops.Oh("哈哈哈哈");
	raise Oops.Oh(errorCode: "x1001");
	raise Oops.Oh(1000, TypeInfo(TMyException));
	raise Oops.Bah("用户名或密码错误"); // 抛出业务异常，状态码为 400
	raise Oops.Bah(1000);
	
## OnException 使用
在控制器类中添加OnException方法，当控制器类中的动作抛出异常会触发OnException

	type
	  TMyWebApi = class(TWebApi)
	  public
		function Get(id: Integer): string;
		function OnException(const e: Exception): string;
	  end;
	implementation
	function TMyWebApi.Get(id: Integer): string;
	begin
	  if id < 3 then
      begin
        raise Oops.Oh(500, [IntToStr(id), '3']);
      end;
	
      Result := id;
	end;
	
	function TIndexController.OnException(const e: Exception): string;
	begin
	  Result := e.Message;
	end;
	
## MVC错误页
如果在views目录中有模板文件{HttpStatusCode}.htm，当MVC的控制器抛出异常，系统会根据对应的HttpStatusCode加载对应的模板，错误信息注入变量{message}
