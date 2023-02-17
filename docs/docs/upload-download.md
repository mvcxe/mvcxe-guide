# 文件上传下载

## 文件下载

    uses MVCXE.HTTPApp;
    type
    TMyController = class(TController)
    public
        [HttpGet]
        function Export: TStream;
        [HttpGet]
        function Download: ansistring;
    end;
    implementation
    function TMyController.Export: TStream;
    begin
      Response.ContentType := 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      Response.AddHeader('Content-Disposition', 'attachment;Filename=Goods_'+FormatDateTime('yyyyMMddHHmmss', Now)+'.xlsx');
      Result := TFileStream.Create('sample.xlsx', fmOpenRead, fmShareDenyNone);
    end;
    function TMyController.Download: ansistring;
    var
      fs: TFileStream;
    begin
      Response.ContentType := 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      Response.AddHeader('Content-Disposition', 'attachment;Filename=Goods_'+FormatDateTime('yyyyMMddHHmmss', Now)+'.xlsx');
      fs := TFileStream.Create('sample.xlsx', fmOpenRead, fmShareDenyNone);
      SetLength(Result, FContentStream.Size);
      fs.Position := 0;
      fs.Read(Pointer(Result)^, fs.Size);
    end;


### 关于前端获取文件名

    Response.AddHeader('Content-Disposition', '"attachment; filename={文件名}');
    Response.AddHeader('Access-Control-Expose-Headers', 'Content-Disposition');


## 文件上传

    type
      TUploadResult = record
        msg: string;
        status: Integer;
        url: string;
      end;
      TApiController = class(TWebApi)
      public
        [HttpPost]
        function Upload([AliasName('file')]const AFile: HttpPostedFile): TUploadResult;
      end;
    implementation
    function TApiController.Upload([AliasName('file')]const AFile: HttpPostedFile): TUploadResult;
    var
      ext: string;
      path: string;
      filePath: string;
      fileName: string;
      fs: TFileStream;
    begin
      Response.ContentType := 'application/json';
      if not IsLogin then
      begin
        Result.status := 1;
        Result.msg := '请先登录.';
        Exit;
      end;
      if AFile.FileName = '' then
      begin
        Result.status := 1;
        Result.msg := '没有上传内容.';
        Exit;
      end;
      ext := ExtractFileExt(AFile.FileName);
      if not (SameText(ext,'.jpg') or SameText(ext,'.png') or SameText(ext,'.gif')) then
      begin
        Result.status := 1;
        Result.msg := '只能上传图片.';
        Exit;
      end;
      path := '/Uploads/PostImages/' + YearOf(Now).ToString + '/' + MonthOf(Now).ToString;
      filePath := Server.MapPath(path);
      ForceDirectories(filePath);
      fileName := FormatDateTime('yyyyMMddhhmmss', Now)+'_'+AFile.FileName;
      fs := TFileStream.Create(filePath+'\'+fileName, fmCreate);
      try
        fs.Write(Pointer(AFile.Data)^, AFile.Size);
      finally
        fs.Free;
      end;
      Result.status := 0;
      Result.msg := '上传成功';
      Result.url := RouteData['Root']+path+'/'+fileName;
    end;

### 前端

    <form id="app-form" class="layui-form layuimini-form">
            <div class="layui-form-item">
                <label class="layui-form-label required">文件信息</label>
                <div class="layui-input-block layuimini-upload">
                    <input name="head_img" class="layui-input layui-col-xs6" lay-verify="required" lay-reqtext="请上传文件" placeholder="请上传文件" value="">
                    <div class="layuimini-upload-btn">
                        <span><a class="layui-btn" data-upload="head_img" data-upload-number="one" data-upload-exts="png|jpg|ico|jpeg"><i class="fa fa-upload"></i> 上传文件</a></span>
                        <span><a class="layui-btn layui-btn-normal"><i class="fa fa-list"></i> 选择文件</a></span>
                    </div>
                </div>
            </div>
    </form>

### 关于使用AXIOS上传文件,方法获取到参数FILES.COUNT=0
axios请求配置

    let formData = new FormData();
    formData.append("files", this.file); //files需与方法里的参数files名称一样
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios.post(this.uploadURL, formData, config).then((res) => {//需引入axios
      console.log(res);
    });
