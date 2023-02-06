# 入门简要

## 安装对应数据库包
MVCXE的数据库操作实例底层是FireDAC，所以发布时需要附带相关bpl。

> 基础库

MVCXE.ORM.bpl/dbrtl280.bpl/FireDAC280.bpl/FireDACCommon280.bpl/FireDACCommonDriver280.bpl/FireDACCommonOdbc280.bpl/FireDACSqliteDriver280.bpl

> SQLServer

FireDACMSSQLDriver280.bpl和SQLNativeClient

> MySQL

FireDACMySQLDriver280.bpl和libmysql.dll

> Oracle

FireDACOracleDriver280.bpl和OracleInstantClient

## 配置连接字符串
appsettings.json 中配置

	{
	  "AppSettings": {
		"CONNECTION_NAME": "MvcXEMySQL"
	  },
	  "ConnectionString": {
		"MvcXEMySQL": "DriverID=MySQL;Server=127.0.0.1;Database=fly;User_Name=root;Password=root;CharacterSet=utf8;Pooled=True;",
		"MvcXEOracle": "DriverID=Ora;Database=(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=orcl)));User_Name=orcl;Password=orcl;CharacterSet=utf8;Pooled=True;",
		"MvcXESQLServer": "DriverID=MSSQL;Server=127.0.0.1;Database=ferry;User_Name=sa;Password=sa;CharacterSet=utf8;Pooled=True;"
	  }
	}

## 引入MVCXE.ORM单元

	uses MVCXE.ORM;
