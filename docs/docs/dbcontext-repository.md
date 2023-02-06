# 仓储模式

## 什么是仓储
在领域层和数据映射层的中介,使用类似集合的接口来存取领域对象，实际上，仓储被用于领域对象在数据库上的操作（实体 Entity 和值对象 Value types）。一般来说,我们针对不同的实体(或聚合根 Aggregate Root)会创建相对应的仓储。

简单来说，仓储就是数据存取操作的载体，但不限定于数据库。

## 仓储使用

> 注入 IORM

	type
	  IUserService = interface(IInterface)
		['{921EF59C-FA47-49C3-A667-4653828D56FB}']
		function GetUser(const email: string): TUsers; overload;
		function UserExists(const email, Nickname: string): Boolean;
		function CreateUser(const User: TUsers): Boolean;
		function GetUser(const Id: Integer): TUsers; overload;
		function GetMyMessage(const UserId: Integer): TArray<TMessages>; overload;
	  end;

	  TUserService = class(TInterfacedObject, IUserService)
	  private
		[IOC('MVCXE.ORM.TORMXE')]
		orm: IORM;
	  public
		function GetUser(const email: string): TUsers; overload;
		function UserExists(const email, Nickname: string): Boolean;
		function CreateUser(const User: TUsers): Boolean;
		function GetUser(const Id: Integer): TUsers; overload;
		function GetMyMessage(const UserId: Integer): TArray<TMessages>; overload;
	  end;

	implementation

	{ TUserService }

	function TUserService.CreateUser(const User: TUsers): Boolean;
	begin
	  Result := orm.Repository.Insert<TUsers>
		.SetSource(User)
		.ExecuteAffrows>0;
	end;

	function TUserService.GetUser(const email: string): TUsers;
	begin
	  Result := orm.Repository.Select<TUsers>
		.Where('Email', email)
		.Single;
	end;

	function TUserService.GetMyMessage(const UserId: Integer): TArray<TMessages>;
	begin
	  Result := orm.Repository.Select<TMessages>
		.Include('FormUser','Id')
		.Where('ToId', UserId)
		.OrderBy('CreateTime', 'DESC')
		.ToArray;
	  orm.DB.Execute('UPDATE messages SET IsRead = 1 WHERE ToId=?',[UserId]);
	end;

	function TUserService.GetUser(const Id: Integer): TUsers;
	begin
	  Result := orm.Repository.Select<TUsers>
		.Where('Id', Id)
		.SingleOrDefault;
	end;

	function TUserService.UserExists(const email, Nickname: string): Boolean;
	begin
	  Result := orm.DB.Query('SELECT COUNT(*) FROM users WHERE Email=? OR Nickname=?',[email, Nickname]).ToInteger > 0;
	end;

	end.