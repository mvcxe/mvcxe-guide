# Sql 操作

## 关于 Sql 操作
`MVCXE` 框架提供非常灵活的 `sql` 操作方法，且性能不输于 FireDAC。

## Sql操作对象
配置好数据库上下文 `orm` 后，使用 属性 `DB` 获取Sql操作对象 `TORMDB` 的实例。

	var
		orm: IORM;
		db: TORMDB;
	begin
		orm := BuildORM;
		db := orm.DB;
	end;

## Sql操作使用
TORMDB定义了几个常用方法。

    TORMDB = class
    public
        procedure StartTransaction(const AIsolation: Integer = 2);
        procedure Commit;
        procedure Rollback;
        function Query<T>(const ASql: string): IORMDBQuery<T>; overload;
        function Query(const ASql: string): IORMDBQuery; overload;
        function Query(const ASql: string; const Args: array of const)
        : IORMDBQuery; overload;
        function Query(const ASql: string; const Args: TParams)
        : IORMDBQuery; overload;
        function Query(const ASql: string; const Args: TValue)
        : IORMDBQuery; overload;

        function Execute(const ASql: string): Integer; overload;
        function Execute(const ASql: string; const Args: TParams): Integer;
        overload;
        function Execute(const ASql: string; const Args: TValue): Integer; overload;
        function Execute(const ASql: string; const Args: array of const)
        : Integer; overload;
        function Execute(const ASql: string; const Names, Args: array of const)
        : Integer; overload;

        function ExecProc<T>(const StoredProcName: string): IORMDBQuery<T>;
        overload;
        function ExecProc<T>(const SchemaName: string; const StoredProcName: string)
        : IORMDBQuery<T>; overload;

        procedure ExecProc(const StoredProcName: string); overload;
        procedure ExecProc(const SchemaName: string;
        const StoredProcName: string); overload;
        procedure ExecProc(const StoredProcName: string;
        var Args: TParams); overload;
        procedure ExecProc(const SchemaName: string; const StoredProcName: string;
        var Args: TParams); overload;
        procedure ExecProc(const StoredProcName: string;
        const Args: TValue); overload;
        procedure ExecProc(const SchemaName: string; const StoredProcName: string;
        const Args: TValue); overload;

        function ExecFunc(const FunctionName: string): Variant; overload;
        function ExecFunc(const SchemaName: string; const FunctionName: string)
        : Variant; overload;
        function ExecFunc(const FunctionName: string; var Args: TParams)
        : Variant; overload;
        function ExecFunc(const SchemaName: string; const FunctionName: string;
        var Args: TParams): Variant; overload;
        function ExecFunc(const FunctionName: string; const Args: TValue)
        : Variant; overload;
        function ExecFunc(const SchemaName: string; const FunctionName: string;
        const Args: TValue): Variant; overload;
    end;