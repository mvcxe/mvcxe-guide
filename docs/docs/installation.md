# 先欣赏两段常见代码
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
	
# 创建工程
先将Dcp目录的文件Copy到Delphi 11的Dcp公共目录，如：C:\Users\Public\Documents\Embarcadero\Studio\22.0\Dcp<br/>
在Delphi IDE中打开mvcxe.groupproj，运行Project:Webborker.Console<br/>
在控制台窗口中选择1，创建工程<br/>