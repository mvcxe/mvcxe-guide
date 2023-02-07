# 删除操作

## SqlMap.xml

	<?xml version="1.0" encoding="UTF-8"?>
	<sqlMap>
	    <TUser>
            <delete id="DeleteUser">
			  Delete User Where id=:id
            </delete>
	    </TUser>
	</sqlMap>

## 删除一行

    type
    [Table('User')]
    TUser = record
        [Key(True)]
        [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]
        id: Integer;
        Name: string;
        Age : Integer;
        class function Empty: TSystemAdmin; static;
    end;
    IUserService = interface(IInterface)
        ['{C6A0BCCF-967B-4189-B723-64F75927561F}']
        function DeleteUser(const User: TUser): Boolean;
        function DeleteUserBySqlMap(const User: TUser): Integer;
        procedure DeleteUserBySql(const User: TUser);
    end;
    TUserService = class(TInterfacedObject, IUserService)
    private
        [IOC('MVCXE.ORM.TORMXE')]
        orm: IORM;
    public
        function DeleteUser(const User: TUser): Boolean;
        function DeleteUserBySqlMap(const User: TUser): Integer;
        procedure DeleteUserBySql(const User: TUser);
    end;

    implementation

    { TUser }

    class function TUser.Empty: TUser;
    begin
      Result := Default (TUser);
    end;

    { TUserService }

    function TUserService.DeleteUser(const User: TUsers): Boolean;
    begin
      Result := orm.Repository.Delete<TUsers>(User)
        .ExecuteAffrows>0;
    end;

    function TUserService.UpdateUserBySqlMap(const User: TUser): Integer;
    begin
      Result := orm.Repository.Delete<TUsers>('DeleteUser')
        .SetSource(User)
        .ExecuteAffrows;
    end;

    procedure TUserService.DeleteUserBySql(const User: TUser);
    begin
      orm.DB.Execute('Delete User Where id=?', [User.id]);
      orm.DB.Execute('Delete User Where id=:id', TValue.From<TUser>(User));
    end;

    end.

## 按条件删除

    function TUserService.DeleteUser(const User: TUsers): Boolean;
    begin
      Result := orm.Repository.Delete<TUsers>
        .Where('id', User.id)
        .ExecuteAffrows>0;
    end;


## 删除实体仓储

    IORMDeleteRepo<T> = interface(IInterface)
        ['{F5B7DF81-0BBD-4455-BB55-FB1ACAC1F434}']
        function SetSource(const Source: T): IORMDeleteRepo<T>;
        function Replace(const ParamName, ParamValue: string)
        : IORMDeleteRepo<T>;
        function Where(const ParamName: string; const ParamValue: TValue)
        : IORMDeleteRepo<T>; overload;
        function Where(const ParamName: string; const ParamValue: TValue;
        const DataType: TFieldType)
        : IORMDeleteRepo<T>; overload;
        function Where(const Param: TParam): IORMDeleteRepo<T>; overload;
        function ExecuteAffrows: Integer;
    end;