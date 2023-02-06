# 数据库上下文

## 什么是数据库上下文
简单来说，数据库上下文是负责和数据库交互的对象，提供程序对数据库存取提供了大量的方法。

## 创建默认数据库上下文
> 注入IORM

	type
	  TMyService = class
	  private
		[IOC('MVCXE.ORM.TORMXE')]
		orm: IORM;
	  end;

> 使用全局方法创建IORM对象

**function BuildORM: IORM; overload;**

    var
        orm: IORM;
    begin
        orm := BuildORM;
    end;

## 创建其他数据库上下文

**function BuildORM(const AConnectionName, AConnectionString: string): IORM; overload;**

    var
        orm: IORM;
    begin
        orm := BuildORM('myconnection','DriverID=MySQL;Server=127.0.0.1;Database=fly;User_Name=root;Password=root;CharacterSet=utf8;Pooled=True;');
    end;

## 各类数据库连接字符串配置示例
- `SQLite`: `DriverID=SQLite;Database=<path to SQLite database>;`
- `MySQL`: `DriverID=MySQL;Server=127.0.0.1;Database=fly;User_Name=root;Password=root;CharacterSet=utf8;Pooled=True;`
- `Oracle`: `DriverID=Ora;Database=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=orcl)));User_Name=orcl;Password=orcl;CharacterSet=utf8;Pooled=True;`
- `SQLServer`: `DriverID=MSSQL;Server=127.0.0.1;Database=ferry;User_Name=sa;Password=sa;CharacterSet=utf8;Pooled=True;`