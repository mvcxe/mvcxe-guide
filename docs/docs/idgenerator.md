# 分布式 ID 生成

## 为什么需要分布式 ID
全局唯一性: 不能出现重复的 ID 号, 既然是唯一标识, 这是最基本的要求。

趋势递增: 在 MySQL InnoDB 引擎中使用的是聚集索引, 由于多数 RDBMS 使用 B-tree 的数据结构来存储索引数据, 在主键的选择上面我们应该尽量使用有序的主键保证写入性能。

单调递增: 保证下一个 ID 一定大于上一个 ID, 例如事务版本号, IM 增量消息, 排序等特殊需求。

信息安全: 如果 ID 是连续的, 恶意用户的扒取工作就非常容易做了, 直接按照顺序下载指定 URL 即可; 如果是订单号就更危险了, 竞对可以直接知道我们一天的单量。 所以在一些应用场景下, 会需要 ID 无规则, 不规则。

## 分布式 ID 有哪些
常见的分布式 ID 有 连续 GUID、短 ID、雪花算法 ID。

## 如何使用
### 连续 GUID 方式
Guid 是混乱无序的，想要一种产生顺序 Guid 的算法来保证数据库的高效运行。
***(计划中)***

## 短 ID
短 ID 按道理不应该放在分布式 ID 生成这个章节，它的作用用途常用于并发不强的内部系统中，比如 任务ID，Issue 编号 等等。

***(会大改)***

    uses MVCXE.CAPTCHA;
    type
    TAccountController = class(BaseController)
    private
        [IOC('MVCXE.Captcha.XE.TCaptchaXE')]
        Captcha: ICaptcha;
    public
        function CaptchaCode: string;
    end;
    implementation
    function TAccountController.CaptchaCode: string;
    begin
      Captcha.Generate;
      Result := Captcha.Code;
    end;


### 雪花算法 ID
雪花算法：使用一个 64 bit 的 long 型的数字作为全局唯一 ID。在分布式系统中的应用十分广泛，且 ID 引入了时间戳，基本上保持自增的。
***(会大改)***

    uses MVCXE.IdWorker;
    function GenerateSnowflakeId: Int64;

