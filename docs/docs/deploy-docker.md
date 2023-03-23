# Docker 环境部署

## 安装Docker Desktop
安装方法请参考官方文档[https://docs.docker.com/desktop/](https://docs.docker.com/desktop/)，安装后选择`switch to windows container`，

国内使用DockerHub很慢，推荐使用国内的DockerHub镜像源[https://juejin.cn/post/7165806699461378085](https://juejin.cn/post/7165806699461378085)

## Windows Server Core Image 
因为Delphi编译出来的程序X32或X64都要用到kernel32.dll

所以只能使用servercore[https://hub.docker.com/_/microsoft-windows-servercore](https://hub.docker.com/_/microsoft-windows-servercore)，体积高达4G+

只推荐研究学习使用，等以后MVCXE Linux版本推出，Docker才会有比较好的体验

## Dockerfile
在工程目录创建Dockerfile，以下内容供参考

        FROM mcr.microsoft.com/windows/servercore:20H2-amd64

        WORKDIR /myapp

        COPY output .

        CMD ["Webborker.Console.exe"]

然后CMD到工程目录，执行`docker build -t myapp .`，漫长的下载后，就可以在DockerDesktop的UI中看到你的Image了

## 运行

        docker run -d -p 8011:8080 myapp

浏览http://localhost:8011/Home/Index看看你的程序是否跑起来了。