# CORS 跨域

## 什么是跨域
简单来说，当一个请求 url 的协议、域名、端口三者之间任意一个与当前页面 url 不同即为跨域。那为什么会出现跨域问题呢？

出于浏览器的同源策略限制。同源策略（Sameoriginpolicy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说 Web 是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。同源策略会阻止一个域的 javascript 脚本和另外一个域的内容进行交互。所谓同源（即指在同一个域）就是两个页面具有相同的协议（protocol），主机（host）和端口号（port）

## 有跨域行为示例

|当前页面 url               |被请求页面 url                      |是否跨域|原因                         |
|:-------------------------:|:---------------------------------:|:-----:|:---------------------------:|
|http://www.mvcxe.com/	    |http://www.mvcxe.com/index.html	|否	    |同源（协议、域名、端口号相同） |
|http://www.mvcxe.com/	    |https://www.mvcxe.com/index.html	|跨域	|协议不同（http/https）         |
|http://www.mvcxe.com/	    |http://www.baidu.com/	            |跨域	|主域名不同（mvcxe/baidu）   |
|http://www.mvcxe.com/	    |http://blog.mvcxe.com/	            |跨域	|子域名不同（www/blog）         |
|http://www.mvcxe.com:8080/ |http://www.mvcxe.com:7001/	        |跨域	|端口号不同（8080/7001）        |

## 什么是 CORS
跨源资源共享 (CORS) ：

- 是一种 W3C 标准，可让服务器放宽相同的源策略。
- 不是一项安全功能，CORS 放宽 security。 API 不能通过允许 CORS 来更安全。 有关详细信息，请参阅 CORS 工作原理。
- 允许服务器明确允许一些跨源请求，同时拒绝其他请求。
- 比早期的技术（如 JSONP）更安全且更灵活。

## 如何使用

> 创建一个基类，需要跨越支持的WebApi继承这个基类

        type
          FerryBaseWebApi = class(TWebApi)
          private
          protected
          public
            constructor Create;
            function OPTIONS: string;
          end;
        implementation

        { FerryBaseWebApi }

        constructor FerryBaseWebApi.Create;
        begin
          inherited;
          Response.AddHeader('Access-Control-Allow-Origin', '*');
        end;

        function FerryBaseWebApi.OPTIONS: string;
        begin
          Response.ContentType := 'application/json';
          Response.AddHeader('Access-Control-Allow-Headers', 'authorization, origin, content-type, accept');
          Response.AddHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
          Response.AddHeader('Allow', 'HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS');
          Response.AddHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, value');
          Response.StatusCode := 204;
          Result := '{}';
        end;
