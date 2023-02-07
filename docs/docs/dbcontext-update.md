# 更新操作

## SqlMap.xml

	<?xml version="1.0" encoding="UTF-8"?>
	<sqlMap>
	    <TUser>
            <update id="UpdateUser">
			  Update User Set Name=:Name, Age=:Age Where id=:id
            </update>
	    </TUser>
	</sqlMap>

## 更新全部列

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
        function UpdateUser(const User: TUser): Boolean;
        function UpdateUserBySqlMap(const User: TUser): Integer;
        procedure UpdateUserBySql(const User: TUser);
    end;
    TUserService = class(TInterfacedObject, IUserService)
    private
        [IOC('MVCXE.ORM.TORMXE')]
        orm: IORM;
    public
        function UpdateUser(const User: TUser): Boolean;
        function UpdateUserBySqlMap(const User: TUser): Integer;
        procedure UpdateUserBySql(const User: TUser);
    end;

    implementation

    { TUser }

    class function TUser.Empty: TUser;
    begin
      Result := Default (TUser);
    end;

    { TUserService }

    function TUserService.UpdateUser(const User: TUsers): Boolean;
    begin
      Result := orm.Repository.Update<TUsers>(User)
        .ExecuteAffrows>0;
    end;

    function TUserService.UpdateUserBySqlMap(const User: TUser): Integer;
    begin
      Result := orm.Repository.Update<TUsers>('UpdateUser')
        .SetSource(User)
        .ExecuteAffrows;
    end;

    procedure TUserService.UpdateUserBySql(const User: TUser);
    begin
      orm.DB.Execute('Update User Set Name=?, Age=? Where id=?', [User.Name, User.Age, User.id]);
      orm.DB.Execute('Update User Set Name=:Name, Age=:Age Where id=:id', TValue.From<TUser>(User));
    end;

    end.

## 更新部分列

    function TUserService.UpdateUser(const User: TUsers): Boolean;
    begin
      Result := orm.Repository.Update<TUsers>
        .SetValue('Age', User.Age)
        .Where('id', User.id)
        .ExecuteAffrows>0;
    end;


## 排除特定列更新

    function TUserService.UpdateUser(const User: TUsers): Boolean;
    begin
      Result := orm.Repository.Update<TUsers>(User)
        .IgnoreColumns(['Name'])
        .ExecuteAffrows>0;
    end;


## 更新实体仓储

    IORMUpdateRepo<T> = interface(IInterface)
        ['{B111ED22-A3A2-4383-B06E-FC45361B5959}']
        function SetSource(const Source: T): IORMUpdateRepo<T>;
        function SetValue(const FieldName: string; const FieldValue: TValue)
        : IORMUpdateRepo<T>; overload;
        function SetValue(const FieldName: string; const FieldValue: TValue;
        const DataType: TFieldType)
        : IORMUpdateRepo<T>; overload;
        function IgnoreColumns(const Fields: array of const): IORMUpdateRepo<T>;
        function Replace(const ParamName, ParamValue: string)
        : IORMUpdateRepo<T>;

        function Where(const ParamName: string; const ParamValue: TValue)
        : IORMUpdateRepo<T>; overload;
        function Where(const ParamName: string; const ParamValue: TValue;
        const ParamType: TParamType; const DataType: TFieldType)
        : IORMUpdateRepo<T>; overload;
        function Where(const ParamName, ParamOperator: string; const ParamValue: TValue)
        : IORMUpdateRepo<T>; overload;
        function Where(const ParamName, ParamOperator: string; const ParamValue: TValue;
        const ParamType: TParamType; const DataType: TFieldType)
        : IORMUpdateRepo<T>; overload;
        function Where(const Param: TParam): IORMUpdateRepo<T>; overload;
        function ExecuteAffrows: Integer;
    end;