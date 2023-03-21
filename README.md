# MVCXE文档

MVCXE是中国首个DELPHI MVC WEB框架，让Delphi Web开发更简单，更通用，更流行。

这里是MVCXE的文档，使用[ydoc](https://github.com/YMFE/ydoc)编译。

## 编写/修改文档的方法

### 安装ydoc
```
npm install -g ydoc
```

### 编译文档
```
ydoc build
```

## 浏览访问文档
_site目录是编译后的文档根目录，浏览器打开index.html。

* [关于MVCXE](./docs/docs/index.md)
* [介绍](./docs/docs/intro.md#)

### 开始使用

* [一分钟上手](./docs/docs/installation.md)

### Web服务
* [应用启动 Startup](./docs/docs/appstartup.md)
* [配置](./docs/docs/configuration.md)
* [选项](./docs/docs/options.md)

### Web应用开发
* [动态 WebAPI](./docs/docs/dynamic-api-controller.md)
* [HttpContext](./docs/docs/httpcontext.md)
* [会话和状态管理](./docs/docs/sesssion-state.md)
* [缓存](./docs/docs/cache.md)
* [安全鉴权](./docs/docs/auth-control.md)
* [CORS 跨域](./docs/docs/cors.md)
* [视图引擎](./docs/docs/view-engine.md)
* [统一返回](./docs/docs/action-result.md)
* [日志记录](./docs/docs/logging.md)
* [JSON 序列化](./docs/docs/json-serialization.md)
* [XML 序列化](./docs/docs/xml-serialization.md)
* [分布式 ID 生成](./docs/docs/idgenerator.md)
* [文件上传下载](./docs/docs/upload-download.md)

### 对象容器模块
* [依赖注入/控制反转](./docs/docs/dependency-injection.md)
* [对象数据映射](./docs/docs/object-mapper.md)
* [模块化开发](./docs/docs/module-dev.md)

### 规范化接口文档
* [Swagger](./docs/docs/specification-document.md)

### 异常与审计处理
* [友好异常处理](./docs/docs/friendly-exception.md)

### 数据库操作指南
* [入门简要](./docs/docs/dbcontext-start.md)
* [数据库上下文](./docs/docs/dbcontext.md)
* [数据库实体](./docs/docs/entity.md)
* [仓储模式](./docs/docs/dbcontext-repository.md)
* [Sql操作模式](./docs/docs/dbcontext-db.md)
* [新增操作](./docs/docs/dbcontext-add.md)
* [更新操作](./docs/docs/dbcontext-update.md)
* [删除操作](./docs/docs/dbcontext-delete.md)
* [查询操作](./docs/docs/dbcontext-query.md)
* [高级查询操作](./docs/docs/dbcontext-hight-query.md)
* [存储过程操作](./docs/docs/dbcontext-proc.md)
* [函数操作](./docs/docs/dbcontext-function.md)
* [事务](./docs/docs/tran.md)

### 定时任务 (Schedule)
* [调度作业](./docs/docs/job.md)
* [Cron 表达式](./docs/docs/cron.md)

### 微服务
* [RPC (Hprose)](./docs/docs/hprose.md)

### 客户端应用
* [发邮件](./docs/docs/email.md)

### 托管/部署/发布
* [在 IIS 部署](./docs/docs/deploy-iis.md)
* [在 Apache 部署](./docs/docs/deploy-apache.md)