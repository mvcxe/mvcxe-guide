# 一分钟上手

## 先欣赏两段常见代码
> MVC

	type
	  THomeController = class(TController)
	  private
	    [IOC]
	    PostService: IPostService;
	  public
	    function Index: string;
	  end;
	implementation
	function THomeController.Index: string;
	begin
	  ViewBag.Add('TopPosts', PostService.GetTopPosts(5));
	  Result := View;
	end;

> Webapi

	type
	  [Route('user/profile')]
	  TUserWebApi = class(TWebApi)
	  private
	    [IOC('Your.Service.UserService')]
	    UserService: IUserService;
	  public
	    [Authorize('Your.Authorization.YourAuthorization', 'your_role_str')]
	    function GET: TUser;
	  end;
	implementation
	function TUserProfileWebApi.GET: TUser;
	begin
	  Result.code := 200;
	  Result.data := current_user;
	  Result.dept := SysService.DeptById(current_user.dept_id);
	  SetLength(Result.postIds, 1);
	  Result.postIds[0] := current_user.post_id;
	  Result.posts := SysService.Posts;
	  SetLength(Result.roleIds, 1);
	  Result.roleIds[0] := current_user.role_id;
	  Result.roles := SysService.Roles;
	  Result.msg := '';
	end;
	
## 创建工程
> 解压MVCXE软件压缩包，用Delphi IDE打开工程组mvcxe.groupproj，编译运行Project:Webborker.Console.exe

- 在控制台窗口中输入create回车，创建工程

![create](../images/create.png)

- 输入工程名，例MyApp

![ProjectName](../images/ProjectName.png)

- 选择工程模板，选1是只有WebApi，选3是只有Mvc，选2是混合
- 输入SpaceName，例:`MyCompany.MyApp`，默认用工程名作为SpaceName

![SpaceName](../images/SpaceName.png)

- 生成的工程在DefaultProjectsDirectory下，用Delphi IDE打开工程MyApp.groupproj并编译全部工程

![OpenProject](../images/OpenProject.png)

- 运行Webborker.Console.exe,程序会自动打开浏览器，并访问默认的地址

![DemoHome](../images/demo_home.png)

- 手动切换地址/swagger/index.html访问Swagger查看现有的WebApi

![DemoSwagger](../images/demo_swagger.png)

## 添加到源码管理器git或svn，就可以进行Delphi Web开发的神奇之旅。