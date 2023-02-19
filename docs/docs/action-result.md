# 统一返回

## 什么是统一返回
有时候我们需要在返回的内容里面统一加减一些内容，就需要用到OnActionResult。
在Controller或WebApi中定义函数OnActionResult，它有一个TValue类型参数，返回类型可自定义。

## 如何使用

    type
      TRestResult = record
        statusCode: Integer;
        data: TValue;
        succeeded: Boolean;
        errors: string;
        extras: string;
        timestamp: Int64;
      end;
      TMyRec = record
        name: string;
        age: Integer;
      end;
      TMyWebApi = class(TWebApi)
      public
        function GET: TMyRec;
        function OnActionResult(const context: TValue): TRestResult;
      end;
    implementation
    function TMyWebApi.GET: TMyRec;
    begin
      Result.name := 'mvcxe';
      Result.age := 6;
    end;

    function TMyWebApi.OnActionResult(const context: TValue): TRestResult;
    begin
      if string(context.TypeInfo.Name).IndexOf('TBahException')<>-1 then
      begin
        Result.statusCode := context.AsType<TBahException>.StatusCode;
        Result.data := '';
        Result.succeeded := False;
        Result.errors := context.AsType<TBahException>.Message;
        Result.extras := '';
        Result.timestamp := DateTimeToUnix(Now, True);
      end
      else if string(context.TypeInfo.Name).IndexOf('Exception')<>-1 then
      begin
        Result.statusCode := 500;
        Result.data := '';
        Result.succeeded := False;
        Result.errors := context.AsType<Exception>.Message;
        Result.extras := '';
        Result.timestamp := DateTimeToUnix(Now, True);
      end
      else
      begin
        Result.statusCode := 0;
        Result.data := context;
        Result.succeeded := True;
        Result.errors := '';
        Result.extras := '';
        Result.timestamp := DateTimeToUnix(Now, True);
      end;
    end;

## 可以将含OnActionResult定义为基类，所在继承该基类的Controller和WebApi也会统一由基类的OnActionResult返回内容

    TRestWebApi = class(TWebApi)
    Protected
        function OnActionResult(const context: TValue): TRestResult;
    end;
    TMyWebApi = class(TRestWebApi)
    public
        function GET: TMyRec;
    end;