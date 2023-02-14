# XML 序列化

## 什么是 XML
XML（Extensible Markup Language），中文是可扩展标记语言，是标准通用标记语言的子集。它是一种标记语言，用于标记电子文档，使其结构化。

XML可以用来标记数据，定义数据类型，并允许用户定义自己的标记语言。对于人和机器来说，这是一种友好的数据传输方式。它提供了一种独立于应用程序或供应商的描述和交换结构化数据的统一方法，非常适合万维网传输。它是互联网环境下跨平台、内容依赖的技术，也是当今处理分布式结构化信息的有效工具。

在Web开发中，XML，是一种数据格式，在与后端或其它系统的数据交互中有较为广泛的应用。

## 关于序列化库
目前在`Delphi`提供了XML序列化操作库：Xml.XMLDoc

`MVCXE`框架为了解决Xml.XMLDoc序列化操作不友好的问题，在Xml.XMLDoc的基础上包装成XmlSerializer类，并提供类方法进行XML序列化操作

    XmlSerializer = class
    public
        class procedure Deserialize<T>(const AXml: string; var R: T); overload;
        class function Serialize<T>(const R: T): string;
        class function Deserialize<T>(const AXml: string): T; overload;
    end;

## 如何使用

        uses MVCXE.xml;

### 序列化对象

    type
      TMyNode = class
      published
        property Id: Integer;
        [XmlAttribute('@NODE_NAME')]
        property Name : string;
        [XmlAttribute('@NODE_TEXT')]
        property Content : string;
      end;
      TRootElement = class
      published
        [XmlElement('MyNode')]
        property MyNode: TMyNode;
      end;
      TMyObj = class
      published
        [XmlElement('RootElement')]
        property RootElement: TMyNode;
      end;
      

    function GetText: string;
    var
        node: TMyNode;
        root: TRootElement;
        obj: TMyObj;
    begin
        node := TMyNode.Create;
        node.Id := 1;
        node.Content := 'MVCXE';
        root := TRootElement.Create;
        root.MyNode := node;
        obj := TMyObj.Create;
        obj.RootElement := root;
        Result := XmlSerializer.Serialize<TMyObj>(obj);
    end;

### 反序列化字符串

    function GetObject: TMyObj;
    var
        json: string;
    begin
        json := '<?xml version="1.0" encoding="UTF-8"?><RootElement><MyNode Id="1">MVCXE</MyNode></RootElement>';
        Result := XmlSerializer.Deserialize<TMyObj>(json);
    end;

### 定义为节点
使用`[XmlElement('节点名')]`注解，如果为节点名为*号，表示匹配任何节点，一般为数组时用。

### 定义为属性
使用`[XmlAttribute('属性名')]`注解，属性名有两个特例：@NODE_NAME表示获取节点名，@NODE_TEXT表示获取节点的内容

### 定义为CDATA值
使用`[XmlCDATA]`注解

## 范例
我们要从sqlMap.xml中读取某个表节点的配置信息，我们需要为这个xml结构定对应的类结构，这样他们之间才可以正确序列化和反序列化

    <TPosts>
            <select id="toppost">
                SELECT A.*, 
                B.Id _TUsers_Id, B.Email _TUsers_Email, B.Nickname _TUsers_Nickname, B.Title _TUsers_Title, 
                B.Gender _TUsers_Gender, B.HeadPortrait _TUsers_HeadPortrait, B.IsVip _TUsers_IsVip, B.VipLevel _TUsers_VipLevel 
                FROM posts A
                LEFT JOIN users B ON B.Id = A.UserId
                WHERE A.IsTop=0 
                ORDER BY A.UpdateTime DESC
                LIMIT {Count}
            </select>
            <select id="last_posts">
                SELECT A.*
                FROM posts A
                WHERE A.UserId=:UserId 
                ORDER BY A.CreateTime DESC
                LIMIT {Count}
            </select>
    </TPosts>

**对应的类**

    TSqlMapSelectCountEntity = record
        [XmlAttribute('@NODE_TEXT')]
        Sql: string;
    end;

    TSqlMapSelectEntity = record
        Id: string;
        [XmlAttribute('@NODE_TEXT')]
        Sql: string;
        Skip: string;
        Take: string;
        Count: TSqlMapSelectCountEntity;
        Entity: TORMEntity;
        class function Empty: TSqlMapSelectEntity; static;
    end;

    TSqlMapUpdateEntity = record
        Id: string;
        [XmlAttribute('@NODE_TEXT')]
        Sql: string;
        Entity: TORMEntity;
        class function Empty: TSqlMapUpdateEntity; static;
    end;

    TSqlMapDeleteEntity = record
        Id: string;
        [XmlAttribute('@NODE_TEXT')]
        Sql: string;
        Entity: TORMEntity;
        class function Empty: TSqlMapDeleteEntity; static;
    end;

    TSqlMapInsertEntity = record
        Id: string;
        [XmlAttribute('@NODE_TEXT')]
        Sql: string;
        Entity: TORMEntity;
        class function Empty: TSqlMapInsertEntity; static;
    end;

    TSqlMapEntity = record
        [XmlElement('select')]
        select: TArray<TSqlMapSelectEntity>;
        [XmlElement('update')]
        update: TArray<TSqlMapUpdateEntity>;
        [XmlElement('delete')]
        delete: TArray<TSqlMapDeleteEntity>;
        [XmlElement('insert')]
        insert: TArray<TSqlMapInsertEntity>;
    end;


> 反序列

    SqlMapEntity := XmlSerializer.Deserialize<TSqlMapEntity>(Xml);  