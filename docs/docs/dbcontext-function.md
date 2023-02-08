# 函数操作

## 关于函数操作
引用百度百科：

> 数据库函数是指当需要分析数据清单中的数值是否符合特定条件时，使用数据库工作表函数。

简单来说，数据库函数就是用于子计算的函数。其计算的结果可以用于构建 sql 语句。

## 支持标量函数的数据库
|SqlServer	|Sqlite	|InMemoryDatabase	|MySql	|PostgreSQL	|Oracle	|Firebird	|
|:---------:|:-----:|:-----------------:|:-----:|:---------:|:-----:|:---------:|
|✔	|✔	|	|✔	|✔	|✔	|	|

## 函数使用
TORMDB定义了几个常用方法。

    TORMDB = class
    public
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

## 范例
> 建立用于发贴扣减积分的函数，返回扣减后的积分

    -- ----------------------------
    -- Function structure for func_DecIntegral
    -- ----------------------------
    DROP FUNCTION IF EXISTS `func_DecIntegral`;
    delimiter ;;
    CREATE FUNCTION `func_DecIntegral`(_UserId INT,
    _Integral INT)
    RETURNS int(11)
    BEGIN
        SET @Integral = _Integral;
        SET @UserId = _UserId;
        SET @var_i = 0;
        UPDATE users SET Integral=Integral-@Integral WHERE Id=@UserId;
        SELECT Integral INTO @var_i FROM users WHERE Id=@UserId;
        
        RETURN @var_i;
    END
    ;;
    delimiter ;

> 注入IORM实例orm, 使用`orm.DB.ExecFunc`执行存储过程

    function TPostService.DecIntegral(const UserId, Reward: Integer): Integer;
    var
        Params: TParams;
    begin
        Params := TParams.Create(nil);
        try
            with Params.AddParameter do
            begin
                Name := '_UserId';
                ParamType := ptInput;
                DataType := ftInteger;
                Value := UserId;
            end;
            with Params.AddParameter do
            begin
                Name := '_Integral';
                ParamType := ptInput;
                DataType := ftInteger;
                Value := Reward;
            end;
            Result := orm.DB.ExecFunc('func_DecIntegral', Params);
            if Result < 0 then
                raise Exception.Create('分数不够');
        finally
            Params.Free;
        end;
    end;