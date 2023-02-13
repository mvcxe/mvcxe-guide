# JSON 序列化

## 什么是 JSON
JSON (JavaScript Object Notation, JS 对象标记) 是一种轻量级的数据交换格式。它基于 ECMAScript (w3c 制定的 js 规范)的一个子集，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成，并有效地提升网络传输效率。

简单来说，JSON，是一种数据格式，在与后端的数据交互中有较为广泛的应用。

## 关于序列化库
目前在`Delphi`提供了JSON序列化操作库：System.Json

`MVCXE`框架为了解决System.Json序列化操作不友好的问题，在System.Json的基础上包装成JsonSerializer类，并提供类方法进行JSON序列化操作

    JsonSerializer = class
    public
        class procedure Deserialize<T>(const AJson: string; var R: T); overload;
        class function Serialize<T>(const R: T): string;
        class function Deserialize<T>(const AJson: string): T; overload;
    end;

## 如何使用

### 序列化对象

    type
      TMyObj = class
      published
        property Id: Integer;
        property Name : string;
      end;

    function GetText: string;
    var
        obj: TMyObj;
    begin
        obj := TMyObj.Create;
        obj.Id := 1;
        obj.Name := 'MVCXE';
        Result := JsonSerializer.Serialize<TMyObj>(obj);
    end;

### 反序列化字符串

    function GetObject: TMyObj;
    var
        json: string;
    begin
        json := '{"Id":1,"Name":"MVCXE"}';
        Result := JsonSerializer.Deserialize<TMyObj>(json);
    end;

### 自定义序列化属性名
> 使用`[AliasName('AliasNameString')]`注解

    type
      TMyObj = class
      published
        property Id: Integer;
        [AliasName('MyName')]
        property Name : string;
      end;

TMyObj序列化后的字符串是`{"Id":value,"MyName":value}`

### 时间格式化
> 使用`[UTC]`注解

    type
      TMyObj = class
      published
        property Id: Integer;
        property Name : string;
        [UTC]
        property birthday: TDateTime;
      end;

TMyObj序列化后birthday的值是UTC时间

### 自定义输入输出格式
> 使用`[CustomJsonNode(function name, function paramstr)]`注解

    type
      TMyObj = class
      published
        property Id: Integer;
        property Name : string;
        [CustomJsonNode('DateTimeToStr', 'yyyy-MM-dd"T"HH:mm:ss')]
        property birthday: TDateTime;
        [CustomJsonNode('UnixTimeToStr', 'yyyy-MM-dd HH:mm:ss')]
        property createtime: Int64;
        [CustomJsonNode('StrToJson', '')]
        property content: TJsonValue
      end;

当前实现了：DateTimeToStr、UnixTimeToStr、StrToJson三个自定义输入输出格式

### 空值不输出
> 使用`[nullable]`注解

### DataTable、DataSet 等序列化问题
不支持复杂类型，如 DataTable、DataSet 等类型

## 范例
我们要从appsettiong.json中读取log的配置信息，我们需要为这个json结构定对应的类结构，这样他们之间才可以正确序列化和反序列化

    {
        "logxe": {
            "autoReload": "",
            "throwExceptions": "",
            "internalLogLevel": "",
            "internalLogFile": "",
            "variable": [],
            "target": [{
                "name": "console",
                "type": "ColoredConsole",
                "layout": "%0:s [TID %1:-8d][%2:-10s] %3:s [%4:s]"
                },{
                "name": "logfile",
                "type": "File",
                "layout": "%0:s [TID %1:10u][%2:-8s] %3:s [%4:s]",
                "maxFileCount": 5,
                "maxFileSize": 1000,
                "logsFolder": "",
                "logFileName": "logs\\%s.%2.2d.%s_info.log"
            }],
            "rule": [{
                "name": "*",
                "minlevel": "Trace",
                "writeTo": "console"
                },{
                "name": "*",
                "minlevel": "Info",
                "writeTo": "logfile"
            }]	
        }
    }

**对应的类**

    TMVCXEConfigLogerRef = class
    published
        property ref: string;
    end;

    TMVCXEConfigLogParam = class
    published
        property Value: string;
    end;

    TMVCXEConfigLoger = class
    published
        property name: string;
        property level: TMVCXEConfigLogParam;
        [AliasName('appender-ref')]
        property appenders: TArray<TMVCXEConfigLogerRef>;
    end;

    TMVCXEConfigLogAppenderFilter = class
    published
        [AliasName('type')]
        property _type: string;
        [AliasName('levelToMatch')]
        property MatchLevels: TArray<TMVCXEConfigLogParam>;
    end;

    TMVCXEConfigLogAppenderLayout = class
    published
        [AliasName('type')]
        property _type: string;
        property conversionPattern: TMVCXEConfigLogParam;
    end;

    TMVCXEConfigLogAppender = class
    published
        property name: string;
        [AliasName('type')]
        property _type: string;
        [AliasName('filter')]
        property filters: TArray<TMVCXEConfigLogAppenderFilter>s;
        property layout: TMVCXEConfigLogAppenderLayout;
        [AliasName('file')]
        property _file: TMVCXEConfigLogParam;
        property maximumFileSize: TMVCXEConfigLogParam;
        property staticLogFileName: TMVCXEConfigLogParam;
        property datePattern: TMVCXEConfigLogParam;
        property maxSizeRollBackups: TMVCXEConfigLogParam;
    end;

    TMVCXEConfigLog = class
    published
        property writer: string;
        property debug: string;
        property root: TMVCXEConfigLoger;
        [AliasName('logger')]
        property loggers: TArray<TMVCXEConfigLoger>;
        [AliasName('appender')]
        property appenders: TArray<TMVCXEConfigLogAppender>;
    end;

    TLoggerProConfigTargetHighlightRow = class
    published
        property condition: string;
        property foregroundColor: string;
    end;

    TLoggerProConfigTarget = class
    published
        [AliasName('type')]
        property _type: string;
        property name: string;
        property layout: string;

        property maxFileCount: string;
        property maxFileSize: string;
        property logsFolder: string;
        property logFileName: string;

        property fileName: string;
        property keepFileOpen: string;
        property useDefaultRowHighlightingRules: string;
        [AliasName('highlight-row')]
        property highlight_row: TArray<TLoggerProConfigTargetHighlightRow>;
    end;

    TLoggerProConfigRule = class
    published
        property name: string;
        property minlevel: string;
        property maxlevel: string;
        property writeTo: string;
        property targetIndex: Integer;
    end;

    TLoggerProConfigVariable = class
    published
        property name: string;
        property Value: string;
    end;

    TLoggerProConfig = class
    published
        property autoReload: string;
        property throwExceptions: string;
        property internalLogLevel: string;
        property internalLogFile: string;
        [AliasName('variable')]
        property variable: TArray<TLoggerProConfigVariable>;
        [AliasName('target')]
        property targets: TArray<TLoggerProConfigTarget>;
        [AliasName('rule')]
        property rules: TArray<TLoggerProConfigRule>;
    end;

> 反序列

    JsonSerializer.Deserialize<TLoggerProConfig>(ConfigurationManager.Configuration.GetValue<TJsonValue>('logxe').ToJSON)   