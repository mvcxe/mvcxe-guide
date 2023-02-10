# 缓存

## 什么是缓存
缓存可以减少生成内容所需的工作，从而显著提高应用程序的性能和可伸缩性。 **缓存适用于不经常更改的数据，因为生成成本很高。** 通过缓存，可比从数据源返回数据的副本速度快得多。 应该对应用进行编写和测试，使其不要永远依赖于缓存的数据。

## 缓存类型
- 内存缓存：顾名思义，就是缓存在应用部署所在服务器的内存中
- 分布式缓存：分布式缓存是由多个应用服务器共享的缓存
- 响应缓存：缓存服务器端 Not Modified 的数据

## ICache接口
`MVCXE` 框架提供了ICache接口来使用缓存

    ICache = interface
        ['{1CACE348-8D9E-47B1-9656-913C3603A2EA}']
        function ContainsKey(const Key: string): Boolean;
        function Get(const Key: string): TValue;
        function ValueAsObject(const Key: string): TObject;
        function ValueAsString(const Key: string): string;
        function ValueAsInteger(const Key: string): Integer;
        function ValueAsInt64(const Key: string): Int64;
        function ValueAsBool(const Key: string): Boolean;
        function ValueAsFloat(const Key: string): Extended;
        procedure Put(const Key: string; const Value: TValue;
          const Expires: TDateTime); overload;
        procedure Put(const Key: string; const Value: string;
          const Expires: TDateTime); overload;
        procedure Put(const Key: string; const Value: Integer;
          const Expires: TDateTime); overload;
        procedure Put(const Key: string; const Value: Int64;
          const Expires: TDateTime); overload;
        procedure Put(const Key: string; const Value: Boolean;
          const Expires: TDateTime); overload;
        procedure Put(const Key: string; const Value: Extended;
          const Expires: TDateTime); overload;
        procedure Remove(const Key: string);
        procedure Clear;
    end;


## 内存缓存使用
内存缓存是最常用的缓存方式，具有存取快，效率高特点。

内存缓存通过注入`[IOC('MVCXE.MemoryCache.TMemoryCache')] ICache`方式注入即可。

> 基本使用

    type
      ICategorieService = interface(IInterface)
        ['{D3F3E71A-28AB-4EFE-9D60-5DDA7D78AD20}']
        function List: TArray<TPostcategories>;
      end;
      TCategorieService = class(TInterfacedObject, ICategorieService)
      private
        [IOC('MVCXE.MemoryCache.TMemoryCache')]
        Cache: ICache;
      public
        function List: TArray<TPostcategories>;
      end;

    implementation

    uses
      MVCXE.ORM;

    { TCategorieService }

    function TCategorieService.List: TArray<TPostcategories>;
    var
      Categories: TArray<TPostcategories>;
      orm: IORM;
    begin
      if Cache.ContainsKey('Categories') then
      begin
        Result := Cache.Get('Categories').AsType<TArray<TPostcategories>>;
      end
      else
      begin
        orm := BuildORM;
        Categories := orm.Repository.Select<TPostcategories>.ToArray;
        Cache.Put('Categories', TValue.From<TArray<TPostcategories>>(Categories), Now+1);
        Result := Categories;
      end;
    end;

    end.

## 分布式缓存
分布式缓存是由多个应用服务器共享的缓存，通常作为外部服务在访问它的应用服务器上维护。 分布式缓存可以提高`MVCXE`应用程序的性能和可伸缩性，尤其是在应用程序由云服务或服务器场托管时。

与其他缓存方案相比，分布式缓存具有多项优势，其中缓存的数据存储在单个应用服务器上。

当分布式缓存数据时，数据将：

- (一致性) 跨多个 服务器的请求
- 存活在服务器重启和应用部署之间
- 不使用本地内存

分布式缓存配置是特定于实现的。 本文介绍如何配置`Redis`分布式缓存。

> 在`appsetting.json`中配置Redis服务器连接参数，可以同时有多台Redis服务器

    {
      "Redis": {
            "Ip": ["127.0.0.1"],
            "Port": [6379],
            "Password": "",
            "Db": "0"
      }
    }

> 通过注入`[IOC('MVCXE.RedisCache.TRedisCache')] ICache`方式注入即可与内存缓存一样的方式使用。

## 自定义你的缓存实现
可以参考MVCXE.Cache.bpl中的代码，开发如：`SqlServer`等缓存方式。