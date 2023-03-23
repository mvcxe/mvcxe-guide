# 独立WebServer部署

## MVCXE当前提供了三个独立WebServer应用程序

### Webborker.Console 
Delphi自带的WEB服务应用程序，基于Webborker架构，非常稳定，推荐用于开发调试，如果要进行独立应用程序部署也是很好的选择。

### HttpSys.PnServer
基于[https://github.com/pony5551/PnHttpSysServer](https://github.com/pony5551/PnHttpSysServer)开发，只做了很少的修改和MVCXE适配，底层用的HttpSys技术，在Windows平台有很好的性能，如果要进行生产环境部署，已提供该WebServer程序全部源码，请自行审阅测试。

### Node.Pas
基于[https://github.com/vovach777/node.pas](https://github.com/vovach777/node.pas)开发，只做了很少的修改和MVCXE适配，底层用的LibUV库，跨平台，有很强的并发性能，如果要进行生产环境部署，已提供该WebServer程序的全部源码，请自行审阅测试。

## Windows服务
如果要开机就运行，最好修改为Windows Service服务程序，这样部署管理会更方便。