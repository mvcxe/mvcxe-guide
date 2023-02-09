# 依赖注入/控制反转

## 依赖注入
所谓依赖注入，是指程序运行过程中，如果需要调用另一个对象协助时，无须在代码中创建被调用者，而是依赖于外部的注入。

通俗来讲，就是把有依赖关系的类放到容器中，然后在我们需要这些类时，容器自动解析出这些类的实例。

依赖注入最大的好处是实现类的解耦，利于程序拓展、单元测试、自动化模拟测试等。

依赖注入的英文为：`Dependency Injection`，简称`DI`

## 控制反转
控制反转只是一个概念，也就是将创建对象实例的控制权（原本是程序员）从代码控制权剥离到`IOC 容器`中控制。

控制反转的英文为：`Inversion of Control`，简称`IOC`

## IOC/DI 优缺点
传统的代码，每个对象负责管理与自己需要依赖的对象，导致如果需要切换依赖对象的实现类时，需要修改多处地方。同时，过度耦合也使得对象难以进行单元测试。

> 优点

- 依赖注入把对象的创造交给外部去管理,很好的解决了代码紧耦合（tight couple）的问题，是一种让代码实现松耦合（loose couple）的机制
- 松耦合让代码更具灵活性，能更好地应对需求变动，以及方便单元测试

> 缺点

- 目前主流的`IOC/DI`基本采用反射的方式来实现依赖注入，在一定程度会影响性能

## 依赖注入的三种方式
### 构造方法注入

> 优点

- 在构造方法中体现出对其他类的依赖，一眼就能看出这个类需要依赖哪些类才能工作
- 脱离了 IOC 框架，这个类仍然可以工作
- 一旦对象初始化成功了，这个对象的状态肯定是正确的

> 缺点

- 构造函数会有很多参数
- 有些类是需要默认构造函数的，比如 MVC 框架的 Controller 类，一旦使用构造函数注入，就无法使用默认构造函数
- 这个类里面的有些方法并不需要用到这些依赖

> 代码示例

    type
      TPostController = class(BaseController)
      private
        PostService: IPostService;
        CategorieService: ICategorieService;
      public
        constructor Create([IOC('Fly.Service.Post.TPostService')]_PostService: IPostService; [IOC('Fly.Service.Categorie.TCategorieService')]_CategorieService: ICategorieService);
      end;
    implementation
    constructor TPostController.Create([IOC('Fly.Service.Post.TPostService')]_PostService: IPostService; [IOC('Fly.Service.Categorie.TCategorieService')]_CategorieService: ICategorieService);
    begin
        PostService := _PostService;
        CategorieService := _CategorieService;
    end;

### 属性方式注入
目前`属性方式注入`是依赖注入推荐使用方式。

> 优点

- 在对象的整个生命周期内，可以随时动态的改变依赖
- 非常灵活

> 缺点

- 对象在创建后，被设置依赖对象之前这段时间状态是不对的
- 不直观，无法清晰地表示哪些属性是必须的

> 代码示例

	type
	  TMyService = class
	  private
		[IOC('MVCXE.ORM.TORMXE')]
		orm: IORM;
	  end;

### 方法参数注入
方法参数注入的意思是在创建对象后，通过自动调用某个方法来注入依赖。

> 优点：

- 比较灵活

> 缺点：

- 新加入依赖时会破坏原有的方法签名，如果这个方法已经被其他很多模块用到就很麻烦
- 与构造方法注入一样，会有很多参数

> 代码示例

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

## 依赖接口
> 被注入的对象必需为接口类型，因为接口实例不需要主动释放。

> IOC的参数是实现了被注入接口的类全写，格式：`单元名.类名`

> IOC可以是无参数，但需要在launchSettings.json里对应的package做配置

	type
	  TPostController = class(BaseController)
	  private
		[IOC]
		PostService: IPostService;
	  end;

> launchSettings.json

    {
    "packages": {
        "ExternalPackages": [{
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
        }]
    }
    }

## 手动创建有注入动作的对象
如果用默认的.Create方法创建对象，类中注入动作不会生效，需要使用RttiCreate来创建对象。

    function TPosts.Category: string;
    var
      Cache: ICache;
      Categories: TArray<TPostcategories>;
      i: Integer;
    begin
      Cache := RttiCreate('MVCXE.MemoryCache.TMemoryCache').AsType<ICache>;
      Categories := Cache.Get('Categories').AsType<TArray<TPostcategories>>;
      for i := 0 to High(Categories) do
      begin
        if FPostCategoryId = Categories[i].Id then
        begin
          Result := Categories[i].CategoryName;
        Exit;
        end;
      end;
    end;
