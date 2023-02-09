# 事务

## 关于事务
事务指作为单个逻辑工作单元执行的一系列操作，要么完全地执行，要么完全地不执行。

简单的说，事务就是并发控制的单位，是用户定义的一个操作序列。 而一个逻辑工作单元要成为事务，就必须满足 ACID 属性。

- A：原子性（Atomicity）：事务中的操作要么都不做，要么就全做
- C：一致性（Consistency）：事务执行的结果必须是从数据库从一个一致性状态转换到另一个一致性状态
- I：隔离性（Isolation）：一个事务的执行不能被其他事务干扰
- D：持久性（Durability）：一个事务一旦提交，它对数据库中数据的改变就应该是永久性的

## 如何使用
> TORMRepository包含了事务调用方法

	TORMRepository = class
	public
		procedure StartTransaction(const AIsolation: Integer = 2);
		procedure Commit;
		procedure Rollback;
    end;

> TORMDB包含了事务了调用方法

    TORMDB = class
    public
        procedure StartTransaction(const AIsolation: Integer = 2);
        procedure Commit;
        procedure Rollback;
    end;

> StartTransaction的事务类型,默认xiReadCommitted

- 0:xiUnspecified
- 1:xiDirtyRead
- 2:xiReadCommitted
- 3:xiRepeatableRead
- 4:xiSnapshot
- 5:xiSerializible



## 范例

    procedure TPostService.DeletePost(const Id: Integer);
    begin
      orm.StartTransaction;
      try
        orm.DB.Execute('DELETE FROM likes WHERE CommentId in (SELECT Id FROM comments WHERE PostId=?)',[Id]);
        orm.DB.Execute('DELETE FROM comments WHERE PostId=?',[Id]);
        orm.DB.Execute('DELETE FROM posts WHERE Id='+IntToStr(Id));
        orm.Commit;
      except
        on e: Exception do
        begin
          orm.Rollback;
        end;
      end;
    end;

    function TPostService.ReplyPost(const comment: TComments): Integer;
    begin
      Result := 0;

      orm.StartTransaction;
      try
        Result := orm.Repository.Insert<TComments>
            .SetSource(comment)
            .ExecuteAffrows;
        orm.DB.Execute('UPDATE posts SET CommentCount=CommentCount+1 WHERE Id=?',[comment.PostId]);
        orm.Commit;
      except
        on ex: Exception do
        begin
          orm.Rollback;
          raise ex;
        end;
      end;
    end;