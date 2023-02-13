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

## 在Controller中使用

	type
	  TMvcController = class(TController)
	  public
	    function Index: string;
	  end;
	implementation
	function TMvcController.Index: string;
	begin
	  Result := View;
	end;

View方法会自动查找默认的模板文件解析后返回内容。

### 默认的模板文件存放规则

- 默认存放目录：`.\views\[ControllerName]`
- 如果在`launchSettings.json`中配置了bpl的Area值，存放目录为:`.\areas\[AreaName]\views\[ControllerName]`
- 默认模板文件名：`[ActionName].htm`
- 上面的例子，模板文件是：`.\views\Mvc\Index.htm`
- View可以传入参数模板文件名，如`Result := View('Mvc\Index.htm')`，相对路径于`.\views\或.\areas\[AreaName]\views\`

### Layout
如果模板中没有指定Layout，且存在相对路径于`.\views\或.\areas\[AreaName]\views\`下有`Shared\_Layout.htm`文件，会先解析Layout模板，然后将Action模板解析得到的内容替换到Layout模板中的{RenderBody}标签中。

- 默认Layout文件不存在就不使用Layout
- 使用{^ 'Shared\DocLayout.htm'}指定模板
- 使用{^ 'null'}指定不使用模板
- Layout模板中用{RenderJS}引用Action模板同名.js文件，例如上面例子，{RenderBody}是`.\views\Mvc\Index.htm`解析的内容，{RenderJS}是`.\views\Mvc\Index.js`解析的内容

### HttpStatusCode模板
如果控制器发生错误，被系统捕获，`MVCXE`框架会根据Response.StatusCode查找模板，相对路径于`.\views\或.\areas\[AreaName]\views\`下的`[HttpStatusCode].htm`文件，当前只处理403/404/500

## 向模板注入内容
用模板很大的需求就是动态显示内容，这些内容是由代码中产生的常量、变量、对象按照一定的规则生成Html代码，所以，我们需要向模板注入运行中产生的常量、变量、对象。

- 在Action方法函数中，用ViewBag.Add('[模板中用的变量名]', 应用中的变量名);

        type
          TUserController = class(BaseController)
          public
                function index([IOC('Fly.Service.Post.TPostService')]PostService: IPostService; CurrentPage: Integer): string;
          end;
        implementation
        function TUserController.index([IOC('Fly.Service.Post.TPostService')]PostService: IPostService; CurrentPage: Integer): string;
        var
          posts: TArray<TPosts>;
          TotalCount, PageCount: Integer;
        begin
          if not IsLogin then
          begin
                Response.StatusCode := 404;
                Response.Abort;
                Exit;
          end;
          if CurrentPage = 0 then
                CurrentPage := 1;
          posts := PostService.GetMyPosts(CurrentUserId, CurrentPage, PageSize, TotalCount, PageCount);
          ViewBag.Add('Posts', posts);
          ViewBag.Add('TotalCount', TotalCount);
          ViewBag.Add('CurrentPage', CurrentPage);
          ViewBag.Add('PageCount', PageCount);
          ViewBag.Add('IsLogin', IsLogin);
          ViewBag.Add('CurrentAccount', CurrentAccount);
          ViewBag.Add('Action', RouteData['Action']);
          Result := View;
        end;

- 在模板中用{var [模板中用的变量名]:[变量类型]}自定义。

        {var abc:string}
        {var i1:Integer}
        {var tool:uTestService.TTools}
        {var op:MVCXE.OperatorHelper.TOperatorHelper}
        {var cache:MVCXE.MemoryCache.TMemoryCache}

- 在模板中赋值用{let [模板中用的变量名]=[变量值]}

        {var tool:uTestService.TTools}
        {var op:MVCXE.OperatorHelper.TOperatorHelper}
        {var abc:string}
        {let abc=$op.Concat($tool.exec(),'abcdefg')}
        {var i1:Integer}
        {var i2:Integer}
        {let i1=10}
        {let i2=20}

## 输出内容

### 输出值
> 语法：{= $简单变量} 或 {= $对象变量.属性} 或 {= $对象变量.方法(参数)}<br/>
描述：将服务器端的变量值或对象属性值在页面中输出

        //输出Delphi代码在MVC Controller中注入的字符串变量<br/>
        {= $username}<br/>
        //输出Delphi代码在MVC Controller中注入对象的属性<br/>
        {= $view.age}<br/>
        //输出在模板中声明的对象实例里的函数结果<br/>
        {= $tool.exec()}<br/>
        //声明一个字符串变量<br/>
        {var abc:string}
        //字符串相加<br/>
        {let abc=$op.Concat($tool.exec(),'abcdefg')}
        //输出字符串的值<br/>
        {= $abc}<br/>
        //声明整型变量<br/>
        {var i1:Integer}
        {var i2:Integer}
        //为整型变量赋值<br/>
        {let i1=10}
        {let i2=20}
        //输出两个整数相加的结果<br/>
        {= $op.IntPlus($i1,$i2)}<br/>

### 输出带模板语法字符串解析后的值
> 语法：{& $简单变量(字符串类型)} 或 {& $对象变量.属性(字符串类型)} 或 {& $对象变量.方法(参数)(返回字符串类型)}<br/>
描述：将服务器端的变量值或对象属性值(这值是字符串类型，里面包含有模板语法)解析后在页面中输出

        ViewBag.Add('content', '{if ($IsLogin)}Logout{end}');

        //如果登陆了输出Logout，如果没有登陆为空
        {& $content}

### 输出字符串HtmlEncode后的值
> 语法：{# $简单变量(字符串类型)} 或 {# $对象变量.属性(字符串类型)} 或 {# $对象变量.方法(参数)(返回字符串类型)}<br/>
描述：将服务器端的变量值或对象属性值(这值是字符串类型，里面包含有模板语法)解析后在页面中输出

        ViewBag.Add('content', '<a href="/">Home</a>');

        //输出字符串<a href="/">Home</a>，而不是链接Home
        {# $content}

### 输出Url，
> 语法：{~ '/urlpath'} 或 {~ $简单变量} 或 {~ $对象变量.属性} 或 {~ $对象变量.方法(参数)}<br/>
描述：输出的url可自动加上[RootPath]

        var
        loginpage: string;
        begin
        loginpage = '/account/login';
        ViewBag.Add('loginpage', loginpage);
        end;

        <a href="{~ $loginpage}">Login</a>
        <a href="{~ '/account/login'}">Login</a>

### 循环
> 语法：

        {for (循环变量 in $循环对象.属性)}
          循环区块的内容
        {end}

> 描述：按服务器端的数组类型变量顺序循环一遍<br/>
> 循环值:$循环变量.index表示当前循环序号，由0开始。<br/>
> 支持{break}
> $循环变量.value表示循环值，可以是一个简单变量，也可以是一个对象

        posts := PostService.GetMyPosts(CurrentUserId, CurrentPage, PageSize, TotalCount, PageCount);
        ViewBag.Add('Posts', posts);

        <ul class="fly-list"> 
        {for (Post in $Posts)}
            <li>
                <a href="{~ '/account/user/'}{= $Post.Value.User.Id}" class="fly-avatar">
                  <img src="{~ $Post.Value.User.HeadPortrait}" alt="{= $Post.Value.User.Nickname}">
                </a>
                <h2>
                  <a class="layui-badge">分享</a>
                  <a href="{~ '/post/detail/'}{= $Post.Value.Id}">{= $op.HtmlEncode($Post.Value.Title)}</a>
                </h2>
            </li>
        {end}
        </ul>

### 条件判断
> 语法：

        {if (条件表达式)}
          条件表达式为真时输出这块内容
        {else}
          条件表达式为假时输出这块内容
        {end}

> 描述：条件表达式支持= < > <= >= <>

        {if ($IsLogin)}
        <div class="fly-admin-box" data-id="{= $Post.Id}">
                {if ($op.Logical_or($CurrentAccount.IsAdmin, ($Post.UserId = $CurrentAccount.Id)))}
                <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>
                {end}
                {if ($CurrentAccount.IsAdmin)}
                        {if ($Post.IsTop = False)}
                                <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>
                        {else}			
                                <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="0" style="background-color:#ccc;">取消置顶</span>
                        {end}
                        {if ($Post.IsBoutique = False)}
                                <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
                        {else}
                                <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
                        {end}
                {end}
        </div>
        {end}

## Section代码块
> 定义Section代码块

        {@SectionName}
          该Section代码块的内容
        {end}

> 引用Section代码块

        {= @SectionName}

> 描述：将某些多次用到的公用代码编写成代码块，在循环或条件判断中使用可以让模板代码简洁直观

        {@TestSection}
          <span>刚刚</span>
        {end}
        <ul class="fly-list"> 
        {for (Post in $Posts)}
            <li>
                <a href="{~ '/account/user/'}{= $Post.Value.User.Id}" class="fly-avatar">
                  <img src="{~ $Post.Value.User.HeadPortrait}" alt="{= $Post.Value.User.Nickname}">
                </a>
                <h2>
                  <a class="layui-badge">分享</a>
                  <a href="{~ '/post/detail/'}{= $Post.Value.Id}">{= $op.HtmlEncode($Post.Value.Title)}</a>
                </h2>
                <div class="fly-list-info">
                  <a href="{~ '/account/user/'}{= $Post.Value.User.Id}" link>
                        <cite>{= $Post.Value.User.Nickname}</cite>
                        {if ($Post.Value.User.IsVip = True)}
                                <i class="iconfont icon-renzheng" title="认证信息：{= $Post.Value.User.Title}"></i>
                                <i class="layui-badge fly-badge-vip">VIP{= $Post.Value.User.VipLevel}</i>
                        {end}
                  </a>
                  {= @TestSection}
                </div>
            </li>
        {end}
        </ul>

### 嵌入子模板
> 语法：{! '子模板' }
> 描述：子模板在`.\views\或.\areas\[AreaName]\views\`下按路径文件名匹配

        <div class="layui-tab-content">
          <div class="layui-tab-item layui-show">
                {! 'Config\site.htm' }
          </div>
          <div class="layui-tab-item">
                {! 'Config\logo.htm' }
          </div>
          <div class="layui-tab-item">
                {! 'Config\upload.htm' }
          </div>
        </div>

### 强制不解析
> 语法：{< 这里面的内容会原样输出，忽略上面的模板控制代码 >}<br/>
> 描述：内容原样输出，忽略上面的模板控制代码