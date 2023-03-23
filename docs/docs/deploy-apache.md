# 在 Apache 部署

## 下载Windows版本的Apache
> 2.2版本
[http://archive.apache.org/dist/httpd/binaries/win32/](http://archive.apache.org/dist/httpd/binaries/win32/)

> 2.4版本
[https://downloads.apache.org/httpd/binaries/win32/](https://downloads.apache.org/httpd/binaries/win32/)

## 编辑httpd.conf

### 加载UrlRewrite功能

        LoadModule rewrite_module modules/mod_rewrite.so
        LoadModule proxy_module modules/mod_proxy.so
        LoadModule proxy_http_module modules/mod_proxy_http.so

如果使用`<Location /xyz>SetHandler mod_webbroker-handler</Location>`来加载你的应用，可以不使用UrlRewrite，但根目录/就不能由mvcxe接管了，launchSettings.json中`RoutePrefix`需要与之一致。

### 加载mvcxe module

- 加载你的mvcxe dso 2.4

        LoadModule webbroker_module "{mvcxe_output_path}/mod_webbroker.dll"
        #访问扩展名为.d的文件即调用
        AddHandler mod_webbroker-handler .d
        #访问地址/xyz即调用
        #<Location /xyz>SetHandler mod_webbroker-handler</Location>

- 加载你的mvcxe dso 2.2

        #为了与2.4区分，apache2.2加了版本号_22
        LoadModule webbroker_module "{mvcxe_output_path}/mod_webbroker_22.dll"
        #访问扩展名为.d的文件即调用
        AddHandler mod_webbroker_22-handler .d
        #访问地址/xyz即调用
        #<Location /xyz>SetHandler mod_webbroker_22-handler</Location>

- 如果不想用dso，用isapi

        LoadModule isapi_module modules/mod_isapi.so
        AddHandler isapi-handler .dll
        ISAPICacheFile {mvcxe_output_path}/wwwroot/isapi_webbroker.dll

### 设置wwwroot

        DocumentRoot "{mvcxe_output_path}/wwwroot"
        <Directory "{mvcxe_output_path}/wwwroot">

        </Directory>
        DirectoryIndex index.d index.html
        Listen 8080

## 编辑.htaccess
mvcxe会在wwwroot下建了一个.htaccess文件，内容是：

        Options All -Indexes
        #设为On打开UrlRewrite功能
        RewriteEngine On
        RewriteBase /
        #文件存在时不执行Rewrite
        RewriteCond %{REQUEST_FILENAME} !-f
        #目录存在时不执行Rewrite
        #RewriteCond %{REQUEST_FILENAME} !-d
        #使用DSO用下面这条
        RewriteRule ^(.*)$ /index.d/$1 [L,P,QSA]
        #使用ISAPI用下面这条
        #RewriteRule ^(.*)$ /isapi_webbroker.dll/$1 [L,P,QSA]

## *.d引导文件
mvcxe会在wwwroot下建了一个空白的index.d文件作为mvcxe dso模块引导文件，如果不使用dso或urlrewrite可以删除

## 使用isapi还需要注意的事项
参考[在 IIS 部署](deploy-iis.md)将相关文件移动到App_data后，App_data目录中需要放置一个.htaccess文件，内容中加上`Deny from all`防止用户非法访问配置文件里的敏感信息

## 第三方Dll(如db client dll)
一般情况下放在调用它的bpl文件所在目录即可，但有时有的需要放在bpl的宿主程序所在目录，apache安装目录\bin中。


