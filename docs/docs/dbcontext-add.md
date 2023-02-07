# 新增操作

## SqlMap.xml

	<?xml version="1.0" encoding="UTF-8"?>
	<sqlMap>
	    <TUser>
            <insert id="CreateUser">
			  INSERT INTO User (Name, Age) VALUES (:Name,:Age)
            </insert>
	    </TUser>
	</sqlMap>

## 新增一条

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
        function CreateUser(const User: TUser): Boolean;
        function CreateUserBySqlMap(const User: TUser): Boolean;
        function NewUser(const User: TUser): Integer;
        procedure InsertUser(const User: TUser);
    end;
    TUserService = class(TInterfacedObject, IUserService)
    private
        [IOC('MVCXE.ORM.TORMXE')]
        orm: IORM;
    public
        function CreateUser(const User: TUser): Boolean;
        function CreateUserBySqlMap(const User: TUser): Boolean;
        function NewUser(const User: TUser): Integer;
        procedure InsertUser(const User: TUser);
    end;

    implementation

    { TUser }

    class function TUser.Empty: TUser;
    begin
      Result := Default (TUser);
    end;

    { TUserService }

    function TUserService.CreateUser(const User: TUsers): Boolean;
    begin
      Result := orm.Repository.Insert<TUsers>
        .SetSource(User)
        .ExecuteAffrows>0;
    end;

    function TUserService.CreateUserBySqlMap(const User: TUser): Boolean;
    begin
      Result := orm.Repository.Insert<TUsers>('CreateUser')
        .SetSource(User)
        .ExecuteAffrows>0;
    end;

    function TUserService.NewUser(const User: TUsers): Integer;
    begin
      Result := orm.Repository.Insert<TUsers>(User)
        .ExecuteAffrows;
    end;

    procedure TUserService.InsertUser(const User: TUser);
    begin
      orm.DB.Execute('INSERT INTO User (Name, Age) VALUES (?,?)', [User.Name, User.Age]);
      orm.DB.Execute('INSERT INTO User (Name, Age) VALUES (:Name,:Age)', TValue.From<TUser>(User));
    end;

    end.

## 新增实体仓储

    IORMInsertRepo<T> = interface(IInterface)
        ['{17652C89-B5E4-4BFE-8180-0B8A9739E915}']
        function SetSource(const Source: T): IORMInsertRepo<T>;
        function SetValue(const FieldName: string; const FieldValue: TValue)
        : IORMInsertRepo<T>; overload;
        function SetValue(const FieldName: string; const FieldValue: TValue;
        const DataType: TFieldType)
        : IORMInsertRepo<T>; overload;
        function IgnoreColumns(const Fields: array of const): IORMInsertRepo<T>;
        function ExecuteAffrows: Integer;
        function Replace(const ParamName, ParamValue: string)
        : IORMInsertRepo<T>;
    end;