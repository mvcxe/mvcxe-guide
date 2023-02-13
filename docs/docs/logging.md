# 日志记录

## 关于日志
通常日志指的是系统日志和程序日志。

系统日志 是记录系统中硬件、软件和系统问题的信息，同时还可以监视系统中发生的事件。用户可以通过它来检查错误发生的原因，或者寻找受到攻击时攻击者留下的痕迹。系统日志包括系统日志、应用程序日志和安全日志。

程序日志 是程序运行中产生的日志，通常由框架运行时或开发者提供的日志。包括请求日志，异常日志、审计日志、行为日志等。

## 日志作用
在项目开发中，都不可避免的使用到日志。没有日志虽然不会影响项目的正确运行，但是没有日志的项目可以说是不完整的。日志在调试，错误或者异常定位，数据分析中的作用是不言而喻的。

- 调试

在项目调试时，查看栈信息可以方便地知道当前程序的运行状态，输出的日志便于记录程序在之前的运行结果。

- 错误定位

不要以为项目能正确跑起来就可以高枕无忧，项目在运行一段时候后，可能由于数据问题，网络问题，内存问题等出现异常。这时日志可以帮助开发或者运维人员快速定位错误位置，提出解决方案。

- 数据分析

大数据的兴起，使得大量的日志分析成为可能，ELK 也让日志分析门槛降低了很多。日志中蕴含了大量的用户数据，包括点击行为，兴趣偏好等，用户画像对于公司下一步的战略方向有一定指引作用。

## 日志级别
日志级别可以有效的对日志信息进行归类，方便准确的查看特定日志内容。通常日志类别有以下级别：

|级别	|值	|方法	|描述|
|:---------:|:-----:|:-----------------:|:-----:
|Trace（跟踪）	|0	|Trace	|包含最详细的消息。 这些消息可能包含敏感的应用数据。 这些消息默认情况下处于禁用状态，并且不应在生产中启用。|
|Debug（调试）	|1	|Debug	|用于调试和开发。 由于量大，请在生产中小心使用。|
|Information（信息）	|2	|Info	|跟踪应用的常规流。 可能具有长期值。|
|Warning（警告）	|3	|Warn	|对于异常事件或意外事件。 通常包括不会导致应用失败的错误或情况。|
|Error（错误）	|4	|Error	|表示无法处理的错误和异常。 这些消息表示当前操作或请求失败，而不是整个应用失败。|
|Critical（严重）	|5	|Fatal	|需要立即关注的失败。 例如数据丢失、磁盘空间不足。|

## 如何使用
在`MVCXE`框架中，已经内置了日志组件，提供了两种日志对象创建方式。

### 注入ILog方式
使用非常简单，`uses MVCXE.Log;`，然后通过`ILog`对象进行注入，如：

    type
      TIndexController = class(TController)
      private
        [IOC('MVCXE.Logger.TLoggerPro')]
        logger: ILog;
      public
        function Index: string;
      end;
    implementation
    function TIndexController.Index: string;
    begin
      logger.Info('View Index Page.');
    end;

### 使用BuildLoggerPro(TagName)获取ILog对象

    function TIndexController.Index: string;
    var
      logger: ILog;  
    begin
      logger := BuildLoggerPro('TIndexController');
      logger.Info('View Index Page.');
    end;

## ILog

    ILog = interface
        ['{53F4555E-FFB0-4806-BDFE-33D62ECB7F99}']
        procedure Trace(const aMessage: string); overload;
        procedure Trace(const aMessage: string;
        const aParams: array of const); overload;

        procedure Debug(const aMessage: string); overload;
        procedure Debug(const aMessage: string;
        const aParams: array of const); overload;

        procedure Info(const aMessage: string); overload;
        procedure Info(const aMessage: string;
        const aParams: array of const); overload;

        procedure Warn(const aMessage: string); overload;
        procedure Warn(const aMessage: string;
        const aParams: array of const); overload;

        procedure Error(const aException: Exception); overload;
        procedure Error(const aMessage: string;
        const aException: Exception); overload;
        procedure Error(const aMessage: string; const aParams: array of const;
        const aException: Exception); overload;
        procedure Error(const aMessage: string); overload;
        procedure Error(const aMessage: string;
        const aParams: array of const); overload;

        procedure Fatal(const aMessage: string); overload;
        procedure Fatal(const aMessage: string;
        const aParams: array of const); overload;
    end;

## 配置日志输出介质
在appsetting.json中配置，根节点是`logxe`

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

### 输出到控制台
logxe\target[n]\type = `ColoredConsole`

### 输出到文件
logxe\target[n]\type = `File`

### 输出过滤
logxe\rule[n]\minlevel = `Trace|Info|Warn|Error|Fatal`

当LogLevel符合minlevel的条件，就会writeTo对应的target中

## 现在使用[Logpro](https://github.com/danieleteti/loggerpro)日志控件为底层，以后可能会重写Log引擎。