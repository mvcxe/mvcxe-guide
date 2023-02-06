---
banner:
  name: 'MVCXE | 中国首个DELPHI MVC WEB框架'
  desc: '让Delphi Web开发更简单，更通用，更流行。'
  btns: 
    - { name: '开 始', href: './docs/index.html', primary: true }
    - { name: 'Gitee >', href: 'https://gitee.com/mvcxe/mvcxe-guide' }
  caption: '当前版本: v3.0 rc1'
features: 
  - { name: '为WEB开发而生', desc: '编译为高性能二进制Web服务器和BPL库，内置强大出色的HTML模板引擎，可快速构建界面出色、体验优秀的页面和应用。' }
  - { name: '模块化，轻量级，高性能', desc: '先进的 MVC 分层理念，具有低耦合性、高重用性、可维护性和可适用性，利于软件工程化管理，大幅度提升你的开发效率。' }
  - { name: '像诗一样优美，像钢一样强壮', desc: '基于Delphi 10+，没有历史包袱，极速上手，继承TController/TWebApi即可用，减少代码量，使开发者更专注于业务和服务端!' }
  - { name: '来自于强大的Pascal语言', desc: '纯Pascal原生开发，打造一个简单易用的MVC框架。您的痛点，MVCXE已阅已历；MVCXE的惊喜，您且慢慢享受。' }

footer:
  copyRight:
    name: 'MVCXE.COM'
    href: 'https://www.mvcxe.com/'
  links:
    范例:
      - { name: 'Fly社区', href: 'https://www.mvcxe.com/' }
      - { name: 'Delphi Admin脚手架', href: 'https://www.mvcxe.com/' }
      - { name: 'Ferry后端Api', href: 'https://www.mvcxe.com/' }
      - { name: '会议室预约', href: 'https://www.mvcxe.com/' }
      - { name: 'Blog', href: 'https://www.mvcxe.com/' }
      - { name: 'BBS', href: 'https://www.mvcxe.com/' }
    交流:
      - { name: 'Gitee', href: 'https://gitee.com/mvcxe/mvcxe-guide' }
      - { name: 'QQ群:324415936', href: 'https://jq.qq.com/?_wv=1027&k=BF3tLeir' }

---

<Homepage banner={banner} features={features} />
<Footer distPath={props.page.distPath} copyRight={props.footer.copyRight} links={props.footer.links} />