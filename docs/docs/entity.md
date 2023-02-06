# 数据库实体

## 什么是数据库实体
在面向对象开发思想中，最重要尤为对象二字，在`Delphi`开发过去，操作数据库往往采用`DataTable`和`DataSet`来接收数据库返回结果集，而操作数据库也离不开手写`sql`语句。

在过去面向过程和应用不发达的时代，这些操作确实好使。然后随着中国互联网网民的激增，电子化时代的到来，各行各业对应用需求也达到了前所未有的量级。

所以，在过去手写`sql`的时代各种问题显露无疑：

- 程序员能力参差不齐，写出的`sql`性能自然也天差地别
- `sql`属于字符串硬编程，后期维护难上加难
- 许多单表甚至多表结构一致，出现大量重复`sql`代码
- `sql`本身在不同的数据库提供器中写法有差，后续迁移头痛不已
- 当然，`sql`是时代的产物，我们也离不开`sql`，但对于大多数程序员和项目来说，`sql`未必能够带给他们多大的效益。

所以，`ORM`就诞生了，所谓的`ORM`就是对象关系映射，英文：`Object Relational Mapping`，简单点说，`ORM`根据特有的`POCO 贫血模型` 规则生成`sql`语句。大大避免了重复`sql`和`sql`能力参差不齐等问题。（当然`ORM`作者`sql`能力也会影响最终性能）

上面所说的`POCO 贫血模型`正是我们本章节的 数据库实体。

简单来说，数据库实体就是数据库表的类表现，通过一定的规则使这个类能够一一对应表结构。通常这样的类也称为：`POCO 贫血模型`，也就是只有定义，没有行为。

## 如何定义实体
`MVCXE`框架建议实体类放在专用的bpl中，Controller和WebAPI的bpl引用数据库实体类bpl。
实体类可以是Pascal一个普通类，也可以将公用的字段写成父类，子类可以继承这些字段。

## 实体类示范

    uses
    System.SysUtils, System.Classes, MVCXE.ORM;

    type
    [Table('users')]
    TUsers = class
    private
        FIntegral: Integer;
        FEmail: string;
        FSign: string;
        FNickname: string;
        FGender: Integer;
        FTitle: string;
        FId: Integer;
        FEmailConfirmToken: string;
        FIsVip: Boolean;
        FIsDisabled: Boolean;
        FCreateTime: TDateTime;
        FVipLevel: Integer;
        FHeadPortrait: string;
        FPassword: string;
        FEmailIsUpdate: Boolean;
        FCity: string;
        FEmailConfirmed: Boolean;
        FIsAdmin: Boolean;
        procedure SetCity(const Value: string);
        procedure SetCreateTime(const Value: TDateTime);
        procedure SetEmail(const Value: string);
        procedure SetEmailConfirmed(const Value: Boolean);
        procedure SetEmailConfirmToken(const Value: string);
        procedure SetEmailIsUpdate(const Value: Boolean);
        procedure SetGender(const Value: Integer);
        procedure SetHeadPortrait(const Value: string);
        procedure SetId(const Value: Integer);
        procedure SetIntegral(const Value: Integer);
        procedure SetIsAdmin(const Value: Boolean);
        procedure SetIsDisabled(const Value: Boolean);
        procedure SetIsVip(const Value: Boolean);
        procedure SetNickname(const Value: string);
        procedure SetPassword(const Value: string);
        procedure SetSign(const Value: string);
        procedure SetTitle(const Value: string);
        procedure SetVipLevel(const Value: Integer);
    published
        [Key(True)]
        [DatabaseGenerated(TDatabaseGeneratedOption.Identity)]
        property Id: Integer read FId write SetId;
        property Email: string read FEmail write SetEmail;
        property EmailConfirmed: Boolean read FEmailConfirmed write SetEmailConfirmed;
        property Password: string read FPassword write SetPassword;
        property Nickname: string read FNickname write SetNickname;
        property Title: string read FTitle write SetTitle;
        property Gender: Integer read FGender write SetGender;
        property City: string read FCity write SetCity;
        property Sign: string read FSign write SetSign;
        property HeadPortrait: string read FHeadPortrait write SetHeadPortrait;
        property Integral: Integer read FIntegral write SetIntegral;
        property IsVip: Boolean read FIsVip write SetIsVip;
        property VipLevel: Integer read FVipLevel write SetVipLevel;
        property CreateTime: TDateTime read FCreateTime write SetCreateTime;
        property IsDisabled: Boolean read FIsDisabled write SetIsDisabled;
        property EmailIsUpdate: Boolean read FEmailIsUpdate write SetEmailIsUpdate;
        property EmailConfirmToken: string read FEmailConfirmToken write SetEmailConfirmToken;
        property IsAdmin: Boolean read FIsAdmin write SetIsAdmin;
    public
    end;

## 数据库实体配置
> 配置数据库表名

可以通过在实体类型贴 `[Table('表名')]` 配置。

> 配置列名

有时候我们需要手动设置列名，这时候只需要在属性上面贴 `[Column('列名')]` 即可。

> 配置列属性

可以用 `[Required]`设置必需有值，用 `[StringLength(len)]` 配置字符串长度，用 `[MaxLength(len)]` 配置类型长度 用 `[NotMapped]` 设置跳过该列。

> 配置Key
可以通过在实体类型贴 `[Key(True)]` 配置。如果是自增类型要加上 `[DatabaseGenerated(TDatabaseGeneratedOption.Identity)]` 配置。
