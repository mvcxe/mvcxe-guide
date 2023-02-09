# 存储过程操作

## 关于存储过程
引用百度百科：

> 存储过程（Stored Procedure）是在大型数据库系统中，一组为了完成特定功能的 SQL 语句集，它存储在数据库中，一次编译后永久有效，用户通过指定存储过程的名字并给出参数（如果该存储过程带有参数）来执行它。
> 
> 存储过程是数据库中的一个重要对象。在数据量特别庞大的情况下利用存储过程能达到倍速的效率提升。

简单来说，存储过程就是关系型数据库中（Sqlite 除外）中编写逻辑的函数/方法，通过这种方式，可以将 sql 编译缓存起来，大大提高存储过程的执行效率。

这里不讨论存储过程的优缺点。

## 支持存储过程的数据库
|SqlServer	|Sqlite	|InMemoryDatabase	|MySql	|PostgreSQL	|Oracle	|Firebird	|
|:---------:|:-----:|:-----------------:|:-----:|:---------:|:-----:|:---------:|
|✔	|	|	|✔	|✔	|✔	|✔	|

## 存储过程使用
TORMDB定义了几个常用方法。

    TORMDB = class
    public
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

    end;

## 范例
> 建立用于分页的存储过程sp_viewPage

    -- ----------------------------
    -- Procedure structure for sp_viewPage
    -- ----------------------------
    DROP PROCEDURE IF EXISTS `sp_viewPage`;
    delimiter ;;
    CREATE PROCEDURE `sp_viewPage`(IN _fields VARCHAR(1000),
    IN _tables VARCHAR(1000),
    IN _where VARCHAR(2000),
    IN _orderby VARCHAR(200),
    IN _pageindex INT,
    IN _pageSize INT,
    OUT _totalcount INT,
    OUT _pagecount INT)
    BEGIN
    #140529-xxj-分页存储过程
    #计算起始行号
    SET @startRow = _pageSize * (_pageIndex - 1);
    SET @pageSize = _pageSize;
    SET @rowindex = 0; #行号

    #合并字符串
    SET @strsql = CONCAT(
    #'select sql_calc_found_rows @rowindex:=@rowindex+1 as rownumber,' #记录行号
    'select sql_calc_found_rows '
    ,_fields
    ,' from '
    ,_tables
    ,IF(IFNULL(_where, '')='','',CONCAT(' where ', _where))
    ,IF(IFNULL(_orderby, '')='','',CONCAT(' order by ', _orderby))
    ,' limit '
    ,@startRow
    ,','
    ,@pageSize
    );

    PREPARE strsql FROM @strsql;#定义预处理语句
    EXECUTE strsql; #执行预处理语句
    DEALLOCATE PREPARE strsql; #删除定义
    #通过 sql_calc_found_rows 记录没有使用 limit 语句的记录，使用 found_rows() 获取行数
    SET _totalcount = FOUND_ROWS();

    #计算总页数
    IF (_totalcount <= _pageSize) THEN
    SET _pagecount = 1;
    ELSE IF (_totalcount % _pageSize > 0) THEN
    SET _pagecount = _totalcount DIV _pageSize + 1;
    ELSE
    SET _pagecount = _totalcount DIV _pageSize;
    END IF;
    END IF;

    END
    ;;
    delimiter ;

> 关联的实体

    const
      tb_systemlog = 'xe_system_log';

    type
      [Table(tb_systemlog)]
      TSystemLog = record
        [Key(True)]
        [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]
        id: Integer;
        admin_id: Integer;
        url: string;
        method: string;
        title: string;
        content: string;
        ip: string;
        useragent: string;
        [CustomJsonNode('UnixTimeToStr', 'yyyy-MM-dd HH:mm:ss')]
        create_time: Int64;
        [NotMapped]
        admin_username: string;
      end;

> 注入IORM实例orm, 使用`orm.DB.ExecProc`执行存储过程

    function TSystemAdminService.SystemLogs(const page, limit: Integer; var count: Integer): TArray<TSystemLog>;
    var
        Params: TParams;
        p: IORMDBQuery<TSystemLog>;
    begin
        Params := TParams.Create(nil);
        try
            with Params.AddParameter do
            begin
                Name := '_fields';
                ParamType := ptInput;
                DataType := ftString;
                Value := 'A.*, B.username as admin_username';
            end;
            with Params.AddParameter do
            begin
                Name := '_tables';
                ParamType := ptInput;
                DataType := ftString;
                Value := tb_systemlog+' A Left Join '+tb_systemadmin+' B On B.id=A.admin_id';
            end;
            with Params.AddParameter do
            begin
                Name := '_where';
                ParamType := ptInput;
                DataType := ftString;
                Value := '1=1';
            end;
            with Params.AddParameter do
            begin
                Name := '_orderby';
                ParamType := ptInput;
                DataType := ftString;
                Value := 'A.create_time DESC';
            end;
            with Params.AddParameter do
            begin
                Name := '_pageindex';
                ParamType := ptInput;
                DataType := ftInteger;
                Value := page;
            end;
            with Params.AddParameter do
            begin
                Name := '_pageSize';
                ParamType := ptInput;
                DataType := ftInteger;
                Value := limit;
            end;
            with Params.AddParameter do
            begin
                Name := '_totalcount';
                ParamType := ptOutput;
                DataType := ftInteger;
            end;
            with Params.AddParameter do
            begin
                Name := '_pagecount';
                ParamType := ptOutput;
                DataType := ftInteger;
            end;
            p := orm.DB.ExecProc<TSystemLog>('sp_viewPage')
                .AddParam(Params);
        finally
            Params.Free;
        end;
        Result := p.ToArray;
        count := StrToIntDef(VarToStr(p.Params.ParamByName('_totalcount').Value),0);
    end;