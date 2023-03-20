# 发电子邮件

## 关于电子邮件
电子邮件是一种用电子手段提供信息交换的通信方式，是互联网应用最广的服务。通过网络的电子邮件系统，用户可以以非常低廉的价格（不管发送到哪里，都只需负担网费）、非常快速的方式（几秒钟之内可以发送到世界上任何指定的目的地），与世界上任何一个角落的网络用户联系。

## ISendMail接口
`MVCXE` 框架提供了ISendMail接口来发邮件

    uses MVCXE.SendMail;
    ISendMail = interface
        ['{1D92CAAC-8C34-4A9E-AAE5-C03F8A8C6C3B}']
        procedure SendMail(const ToList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;
        procedure SendMail(const ToList, CCList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;
        procedure SendMail(const ToList, CCList, BCCList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;

        procedure SendHtmlEmail(const ToList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;
        procedure SendHtmlEmail(const ToList, CCList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;
        procedure SendHtmlEmail(const ToList, CCList, BCCList, Subject, Body: string; const AttachmentList: TStrings=nil); overload;
    end;


## 配置SMTP服务
appsettings.json 中配置

	{
	  "AppSettings": {
		"MAIL.SENDERNAME": "MvcXE",
		"MAIL.SENDEREMAIL": "MvcXE@gmail.com",
		"SMTP.HOST": "mail.google.com",
		"SMTP.USER": "",
		"SMTP.PASS": "",
		"SMTP.PORT": "25",
		"SMTP.TLS": "False"
	  }
	}

## 电子邮件使用

通过注入`[IOC('MVCXE.Mail.TSendMail')] ISendMail`方式注入即可。

> 基本使用

    type
        TAccountController = class(BaseController)
        private
            [IOC('MVCXE.Mail.TSendMail')]
            mail: ISendMail;
        public
            function new(const form: TRegForm): TAccountFormResult;
        end;

    implementation

    function TAccountController.new(const form: TRegForm): TAccountFormResult;
    var
        User: TUsers;
        HashMD5: THashMD5;
        s: string;
        Membership: TIdentity;
    begin
        Response.ContentType := 'application/json';
        Result.success := False;
        s := accessor.HttpContext.Session.Get<string>('ValidationCode');
        if not SameText(form.vercode, s) then
        begin
            Result.msg := '验证码不正确.';
            Exit;
        end;
        if not SameText(form.pass, form.repass) then
        begin
            Result.msg := '两次密码不相同.';
            Exit;
        end;
        if UserService.UserExists(form.email, form.username) then
        begin
            Result.msg := '邮箱地址已存在.';
            Exit;
        end;
        User := TUsers.Create;
        HashMD5 := THashMD5.Create;
        s := HashMD5.GetHashString(form.pass);
        with User do
        begin
            Email := TNetEncoding.HTML.Encode(form.email);
            EmailConfirmed := True;
            Password := s;
            Nickname := TNetEncoding.HTML.Encode(form.username);
            Title := '';
            Gender := 1;
            City := '';
            Sign := '';
            HeadPortrait := '/res/images/avatar/default.png';
            Integral := 200;
            IsVip := False;
            VipLevel := 0;
            CreateTime := Now;
            IsDisabled := False;
            EmailIsUpdate := True;
            EmailConfirmToken := '';
            IsAdmin := False;
        end;
        UserService.CreateUser(User);
        mail.SendMail(form.email,'注册成功','注册成功');
        Result.msg := '注册成功.';
        Result.success := True;
    end;

    end.