# 高级查询操作

## 关联数据模型

> Base

    type
    TMyDB = class
    published
        [Key(True)]
        [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]
        property Id: Integer;
    end;

> Person

    [Table('Person')]
    TPerson = class(TMyDB)
    published
        property Name: string;
        property Age : Integer;
        property Address: string;
        property PersonDetail: TPersonDetail;
        property Childrens: TArray<TChildren>;
    end;

> PersonDetail

    [Table('PersonDetail')]
    TPersonDetail = class(TMyDB)
    published
        property PhoneNumber: string;
        property QQ: string;
        property PersonId : Integer;
    end;

> Children

    [Table('Children')]
    TChildren = class(TMyDB)
    published
        property Name: string;
        property Gender : Integer;
        property PersonId : Integer;
    end;

> Post

    [Table('Post')]
    TPost = class(TMyDB)
    published
        property Title: string;
        property PersonId : Integer;
        property UpdateTime: TDateTime;
    end;

## 一对一查询

> 增加属性是`[NotMapped]`和`[Navigate]`变量，Navigate的参数是Key字段对应的property变量的引用写法字符串，`'关联类名.关联Key字段名'`，如Post表是用PersonId字段来记录与Persion表的一对一关系，所以参数就是'TPost.PersonId'

    TPost = class(TMyDB)
        [NotMapped]
        [Navigate('TPost.PersonId')]
        Person: TPerson;
    end;

> 使用Include方法引入一对一查询，参数是带有`[Navigate]`属性的`变量名`，`关联类`的Key字段名

    function TPostService.TopPosts(const Count: Integer): TArray<TPost>;
    begin
      Result := orm.Repository.Select<TPost>
        .Include('Person','Id')
        .Take(Count)
        .ToArray;
    end;

> 使用SqlMap进行一对一查询，从表的各字段需要As成`_带有[Navigate]属性的变量名_`，如Person表的Name字段要As成_Person_Name

	<?xml version="1.0" encoding="UTF-8"?>
	<sqlMap>
	    <TUser>
            <select id="TopPosts">
			  Select A.*, B.Id _Person_Id, B.Name _Person_Name, B.Age _Person_Age, B.Address _Person_Address From Post A Left Join Person B On B.Id=A.PersonId Limit {Count}
            </select>
	    </TUser>
	</sqlMap>

    function TPostService.TopPostsBySqlMap(const Count: Integer): TArray<TPost>;
    begin
      Result := orm.Repository.Select<TPost>('TopPosts')
        .Take(Count)
        .ToArray;
    end;

## 对多查询

    TPerson = class(TMyDB)
    private
        _PersonDetail: TPersonDetail;
        _Childrens: TArray<TChildren>;

        function GetPersonDetail: TPersonDetail;
        function GetChildrens: TArray<TChildren>;
    published
        [NotMapped]
        property PersonDetail: TPersonDetail read GetPersonDetail;
        [NotMapped]
        property Childrens: TArray<TChildren> read GetChildrens;
    end;

    implementation

    { TPerson }

    function TPerson.GetPersonDetail: TPersonDetail;
    var
      orm: IORM;
    begin
      if _PersonDetail = nil Then
      begin
        orm := BuildORM;
        _PersonDetail := orm.Repository.Select<TPersonDetail>
          .Where('PersonId', Id)
          .SingleOrDefault;
      end;
      Result := _PersonDetail;
    end;

    function TPerson.GetChildrens: TArray<TChildren>;
    var
      orm: IORM;
    begin
      if _Childrens = nil Then
      begin
        orm := BuildORM;
        _Childrens := orm.Repository.Select<TChildren>
          .Where('PersonId', Id)
          .ToArray;
      end;
      Result := _Childrens;
    end;

## 查询排序

> 正序

    function TPostService.TopPosts(const Count: Integer): TArray<TPost>;
    begin
      Result := orm.Repository.Select<TPost>
        .OrderBy('Id')
        //或.OrderBy('Id','Asc')
        .Take(Count)
        .ToArray;
    end;

> 倒序

    function TPostService.TopPosts(const Count: Integer): TArray<TPost>;
    begin
      Result := orm.Repository.Select<TPost>
        .OrderBy('Id','Desc')
        .Take(Count)
        .ToArray;
    end;

> 混合

    function TPostService.TopPosts(const Count: Integer): TArray<TPost>;
    begin
      Result := orm.Repository.Select<TPost>
        .OrderBy('Age', 'Asc')
        .OrderBy('Id','Desc')
        .Take(Count)
        .ToArray;
    end;

## 其它高级用法请使用Sql和Pascal的函数实现