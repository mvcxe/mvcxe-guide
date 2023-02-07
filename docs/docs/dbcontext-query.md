# 查询操作

## SqlMap.xml

	<?xml version="1.0" encoding="UTF-8"?>
	<sqlMap>
	    <TUser>
            <select id="FindUser">
			  Select * From User Where id=:id
            </select>
            <select id="UserList">
			  Select * From User Where Age=:Age
            </select>
            <select id="UserPage">
			  Select * From User Limit {Skip},{Count}
            </select>
	    </TUser>
	</sqlMap>

## 根据条件查询一条

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
        function FindUser(const Id: Integer): TUser;
        function FindUserBySqlMap(const Id: Integer): TUser;
        function FindUserBySql(const Id: Integer): TUser;
    end;
    TUserService = class(TInterfacedObject, IUserService)
    private
        [IOC('MVCXE.ORM.TORMXE')]
        orm: IORM;
    public
        function FindUser(const Id: Integer): TUser;
        function FindUserBySqlMap(const Id: Integer): TUser;
        function FindUserBySql(const Id: Integer): TUser;
    end;

    implementation

    { TUser }

    class function TUser.Empty: TUser;
    begin
      Result := Default (TUser);
    end;

    { TUserService }

    function TUserService.FindUser(const Id: Integer): TUser;
    begin
      Result := orm.Repository.Select<TUsers>
        .Where('id', Id)
        .SingleOrDefault;
    end;

    function TUserService.FindUserBySqlMap(const Id: Integer): TUser;
    begin
      Result := orm.Repository.Select<TUsers>('FindUser')
        .Where('id', Id)
        .Single;
    end;

    procedure TUserService.FindUserBySql(const Id: Integer): TUser;
    begin
      orm.DB.Query<TUser>('Select * From User Where id=:id')
        .AddParam('id', Id)
        .SingleOrDefault;
    end;

    end.

## 查询所有数据

    function TUserService.AllUser: TArray<TUsers>;
    begin
      Result := orm.Repository.Select<TUsers>
        .ToArray;
    end;

## 根据条件查询所有数据

    function TUserService.UserList(const Age: Integer): TList<TUsers>;
    begin
      Result := orm.Repository.Select<TUsers>('UserList')
        .Where('Age', Age)
        .ToList;
    end;

    function TUserService.UserLikeName(const Key: String): TArray<TUsers>;
    begin
      Result := orm.DB.Query<TUsers>('Select * From User Where Name like :Key')
        .AddParam('Key', '%'+Key+'%')
        .ToArray;
    end;


## 分页查询

    function TUserService.Users(const page, pagesize: Integer): TArray<TUsers>;
    begin
      Result := orm.Repository.Select<TUsers>
        .Take((page-1)*pagesize, pagesize)
        .ToArray;
    end;

    function TUserService.Users(const page, pagesize: Integer): TArray<TUsers>;
    begin
      Result := orm.Repository.Select<TUsers>('UserPage')
        .Take((page-1)*pagesize, pagesize)
        .ToArray;
    end;

    function TUserService.Users(const page, pagesize: Integer): TArray<TUsers>;
    begin
      Result := orm.DB.Select<TUsers>('Select * From User Limit {Skip},{Count}')
        .Take((page-1)*pagesize, pagesize)
        .ToArray;
    end;


## 查询记录数

    function TUserService.UserCount: Integer;
    var
      c: Integer;
    begin
      orm.Repository.Select<TUsers>
        .Count(c);
      Result := c;
    end;

## 查询单个字段值

    function TUserService.UserName(const Id: Integer): String;
    begin
      Result := orm.DB.Query('Select Name From User Where Id=:id', [Id])
        .ToString;
    end;

## 查询实体仓储

    IORMSelectRepo<T> = interface(IInterface)
        ['{0AA94D59-D17B-436B-B470-0A86C7217B33}']
        function ToArray: TArray<T>;
        function ToList: TList<T>;
        function SingleOrDefault: T;
        function Single: T;
        function OrderBy(const FieldNames: string; const Order: string=''): IORMSelectRepo<T>;
        function Include(const Join: string; const OnFeildName: string): IORMSelectRepo<T>;
        function Take(const Count: Integer): IORMSelectRepo<T>; overload;
        function Take(const Skip, Count: Integer): IORMSelectRepo<T>; overload;
        function Count(var RecordCount: Integer): IORMSelectRepo<T>;
        function Replace(const ParamName, ParamValue: string)
        : IORMSelectRepo<T>;

        function Where(const WhereStr: string)
        : IORMSelectRepo<T>; overload;
        function Where(const ParamName: string; const ParamValue: TValue)
        : IORMSelectRepo<T>; overload;
        function Where(const ParamName: string; const ParamValue: TValue;
        const DataType: TFieldType)
        : IORMSelectRepo<T>; overload;
        function Where(const ParamName, ParamOperator: string; const ParamValue: TValue)
        : IORMSelectRepo<T>; overload;
        function Where(const ParamName, ParamOperator: string; const ParamValue: TValue;
        const ParamType: TParamType; const DataType: TFieldType)
        : IORMSelectRepo<T>; overload;
        function Where(const Param: TParam): IORMSelectRepo<T>; overload;
    end;

## Sql查询返回

    IORMDBQuery<T> = interface(IInterface)
        ['{D9F9185B-4974-4C2D-8040-7BFC45A61775}']
        function GetParams: TParams;
        property Params: TParams read GetParams;
        function ToArray: TArray<T>;
        function ToList: TList<T>;
        function SingleOrDefault: T;
        function Single: T;
        function ToScalar: Variant;
        function ToInteger: Integer;
        function ToString: string;
        function Take(const Count: Integer): IORMDBQuery<T>; overload;
        function Take(const Skip, Count: Integer): IORMDBQuery<T>; overload;
        function AddParam(const ParamName: string; const ParamValue: TValue)
        : IORMDBQuery<T>; overload;
        function AddParam(const ParamName: string; const ParamValue: TValue;
        const ParamType: TParamType; const DataType: TFieldType)
        : IORMDBQuery<T>; overload;
        function AddParam(const Param: TParam): IORMDBQuery<T>; overload;
        function AddParam(const Params: TParams): IORMDBQuery<T>; overload;
        function AddParam(const Params: array of const): IORMDBQuery<T>; overload;
        function Join(const Name: string; const SplitOn: string): IORMDBQuery<T>;
        function Groupby(const Names: string): IORMDBQuery<T>;
    end;

    IORMDBQuery = interface(IInterface)
        ['{ECAAE0AE-621F-493A-8F5E-D1B66960B9C8}']
        function Row: TFieldList;
        procedure NextRecordSet;
        procedure Next;
        function Eof: Boolean;
        function ToScalar: Variant;
        function ToInteger: Integer;
        function ToString: string;
    end;