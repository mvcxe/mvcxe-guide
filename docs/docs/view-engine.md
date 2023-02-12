# 视图引擎

## 关于视图引擎
视图引擎负责根据视图模板创建 HTML。视图通常是 HTML 和编程语言的某种混合。支持变量定义、方法调用及逻辑编写。

在`MVCXE`框架中，底层集成了Pascal语言编写的高效视图引擎组件`TPLXE`, 并提供更加灵活方便的语法糖。

## 视图引擎作用

- 灵活的模板语法
- 根据不同的数据编译模板产生不同的输出
- 实现强大的插件化机制
- 实现全站页面静态化
- 可以用作邮件模板、短信模板、优惠券信息模板等

## 基础使用
### 注册服务
使用之前需在`Webborker`服务中注册MVC：

        app.UseMvc;

## 使用方式
构造函数注入 IViewEngine
using Furion.DynamicApiController;
using Furion.ViewEngine;

namespace Furion.Application
{
    public class ViewEngineService : IDynamicApiController
    {
        private readonly IViewEngine _viewEngine;
        public ViewEngineService(IViewEngine viewEngine)
        {
            _viewEngine = viewEngine;
            var result = _viewEngine.RunCompile("Hello @Model.Name", new { Name = "Furion" });
        }
    }
}


字符串方式
var result = "Hello @Model.Name".RunCompile(new { Name = "Furion" });

17.3.3 弱类型模板
var result = _viewEngine.RunCompile("Hello @Model.Name", new { Name = "Furion" });


结果：

Hello Furion

支持异步 RunCompileAsync

17.3.4 强类型模板
类型定义
namespace YourProject;  // Furion 4.8.4.16+ 支持无命名空间写法

public class TestModel
{
    public string Name { get; set; }
    public int[] Items { get; set; }
}

使用强类型
var result = _viewEngine.RunCompile(@"
Hello @Model.Name
@foreach(var item in Model.Items)
{
    <p>@item</p>
}
", new TestModel
{
    Name = "Furion",
    Items = new[] { 3, 1, 2 }
});

结果：

Hello Furion
<p>3</p>
<p>1</p>
<p>2</p>

支持异步 RunCompileAsync

17.3.5 高性能模板缓存 🥇
由于模板编译需要消耗大量的性能，所以建议使用带 FromCached 结尾的 RunCompileFromCached 替代。调用该方法后会自动将模板编译成 .dll 以便下次使用。减少第二次之后使用模板的性能损耗。

如，强类型模板：

var result = _viewEngine.RunCompileFromCached(@"
Hello @Model.Name
@foreach(var item in Model.Items)
{
    <p>@item</p>
}
", new TestModel
{
    Name = "Furion",
    Items = new[] { 3, 1, 2 }
});

结果：

Hello Furion
<p>3</p>
<p>1</p>
<p>2</p>

调用 RunCompileFromCached 方法之后将会使用 MD5 加密模板并生成 MD5字符串的 .dll 存放在网站根目录下的 templates 目录中。只要模板内容不变，数据发生改变也不会重新编译模板。这样大大的提高了首次之后的性能。

如，传入新的数据：

var result = _viewEngine.RunCompileFromCached(@"
Hello @Model.Name
@foreach(var item in Model.Items)
{
    <p>@item</p>
}
", new TestModel
{
    Name = "Furion",
    Items = new[] { 5,6,7,8 }
});

结果：

Hello Furion
<p>5</p>
<p>6</p>
<p>7</p>
<p>8</p>

模板不再重新编译，只是重新替换数据。

17.4 高级用法
高级用法支持将特定程序集、特定命名空间、特定类型引入到模板中使用。

17.4.1 添加程序集
比如这里添加 System.IO 程序集：

var result = _viewEngine.RunCompileFromCached(@"<div>@System.IO.Path.Combine(""Furion"", ""ViewEngine"")</div>", builderAction: builder =>
            {
                builder.AddAssemblyReferenceByName("System.IO");
            });


结果：

<div>Furion\\ViewEngine</div>

另外，Furion 提供多种方式加载程序集：

builder.AddAssemblyReferenceByName("System.Security"); // 通过名称
builder.AddAssemblyReference(typeof(System.IO.File)); // 通过类型
builder.AddAssemblyReference(Assembly.Load("source")); // 通过元数据引用

17.4.2 添加命名空间
var result = _viewEngine.RunCompileFromCached(@"<div>@Path.Combine(""Furion"", ""ViewEngine"")</div>", builderAction: builder =>
            {
                builder.AddUsing("System.IO");
                builder.AddAssemblyReferenceByName("System.IO");
            });


结果：

<div>Furion\\ViewEngine</div>

也支持加入多个 using：

builder.AddUsing("System.IO");
builder.AddUsing("Furion");

17.4.3 定义模板方法
var result = _viewEngine.RunCompileFromCached(@"
<area>
    @{ RecursionTest(3); }
</area>

@{
  void RecursionTest(int level)
  {
    if (level <= 0)
    {
        return;
    }

    <div>LEVEL: @level</div>
    @{ RecursionTest(level - 1); }
  }
}
");

结果：

<area>
<div>LEVEL: 3</div>
<div>LEVEL: 2</div>
<div>LEVEL: 1</div>
</area>

17.4.4 调用类方法
定义 CustomModel 类并继承 ViewEngineModel 基类

public class CustomModel : ViewEngineModel
{
    public int A { get; set; }
    public string B { get; set; }
    public string Decorator(object value)
    {
        return "-=" + value + "=-";
    }
}

在模板中调用 Decorator(value) 方法：

var content = @"Hello @A, @B, @Decorator(123)";

var template = _viewEngine.Compile<CustomModel>(content);

var result = template.Run(instance =>
{
    instance.A = 10;
    instance.B = "Alex";
});

结果：

Hello 10, Alex, -=123=-

17.5 IViewEngine 接口
IViewEngine 提供了简单方便的 RunCompile 方法，也提供了最原始化的 Compile 和 Run 方法。

通过原始的 Compile 和 Run 方法可以实现很多复杂的逻辑和自定义指令集。

/// <summary>
/// 编译模板
/// </summary>
/// <param name="content"></param>
/// <param name="builderAction"></param>
/// <returns></returns>
IViewEngineTemplate Compile(string content, Action<IViewEngineOptionsBuilder> builderAction = null);
/// <summary>
/// 编译模板
/// </summary>
/// <param name="content"></param>
/// <param name="builderAction"></param>
/// <returns></returns>
Task<IViewEngineTemplate> CompileAsync(string content, Action<IViewEngineOptionsBuilder> builderAction = null);
/// <summary>
/// 编译模板
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="content"></param>
/// <param name="builderAction"></param>
/// <returns></returns>
IViewEngineTemplate<T> Compile<T>(string content, Action<IViewEngineOptionsBuilder> builderAction = null)
    where T : IViewEngineModel;
/// <summary>
/// 编译模板
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="content"></param>
/// <param name="builderAction"></param>
/// <returns></returns>
Task<IViewEngineTemplate<T>> CompileAsync<T>(string content, Action<IViewEngineOptionsBuilder> builderAction = null)
    where T : IViewEngineModel;


17.6 字符串模板替换引擎
Furion 除了内置视图引擎之外，还支持以下几种模板替换，如：

// 提供数据模板方式
var str = "我叫{name}".Render(new Dictionary{ {"name", "Furion"} });
var str = "我叫{Name}".Render(new { Name = "Furion" });
var str = "我叫{Detail.Name}".Render(new { Detail = new { Name = "Furoin" } });

// 从配置读取方式
var str = "我叫#(Furion:Address)".Render();


{
  "Furion": {
    "Address": "https://www.furion.icu"
  }
}

17.7 反馈与建议