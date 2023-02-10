# 对象数据映射(开发中)

## 对象映射
简单来说，就是将一个对象的数据根据特定规则批量映射到另一个对象中，减少手工操作和降低人为出错率。如将 DTO 对象映射到 Entity 实体中，反之亦然。

## 先看例子
在过去，我们需要将一个对象的值转换到另一个对象中，我们需要这样做，如：

    var
      entity: TEntity;
      dto: TDto;
    begin
      entity := TEntity.Create;
      dto := TDto.Create;
      dto.Id := entity.Id;
      dto.Name := entity.Name;
      dto.Age := entity.Age;
      dto.Address := entity.Address;
      dto.FullName := entity.FirstName + entity.LastName;
      dto.IdCard := entity.IdCard.Replace('1234', '****'');
    end;

上面的例子似乎没有任何问题，但是如果很多地方需要这样的赋值操作、或者相同的赋值操作在多个地方使用，又或者一个类中含有非常多的属性或自定义赋值操作。那么这样的操作效率极低，容易出错，且代码非常臃肿和冗余。

所以，实现自动映射赋值和支持特殊配置的需求就有了。

## Mapster 使用
现在，我们可以通过依赖注入IMapper的方法改造上面的例子：

    type
    TUserService = class(TInterfacedObject, IUserService)
    private
        [IOC]
        mapper: IMapper;
    public
        function CopyUser(const entity: TUser): TDto;
    end;

    implementation

    { TUserService }

    function TUserService.CopyUser(const entity: TUser): TDto;
    begin
      Result := mapper.Adapt<TDto>.Map(entity);
    end;

仅仅一行代码就可以实现 entity -> dto 的转换，如果涉及到赋值的复制操作，如 dto.FullName 和 dto.IdCard，我们只需要自定义映射规则类即可。

## 自定义映射规则


