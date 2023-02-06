# 仓储模式

## 什么是仓储
在领域层和数据映射层的中介,使用类似集合的接口来存取领域对象，实际上，仓储被用于领域对象在数据库上的操作（实体 Entity 和值对象 Value types）。一般来说,我们针对不同的实体(或聚合根 Aggregate Root)会创建相对应的仓储。

简单来说，仓储就是数据存取操作的载体，但不限定于数据库。

## 内置仓储
配置好数据库上下文 `orm` 后，使用 属性 `Repository` 获取仓储对象 `TORMRepository` 的实例。

	var
		orm: IORM;
		repository: TORMRepository;
	begin
		orm := BuildORM;
		repository := orm.Repository;
	end;

## 仓储使用
TORMRepository定义了几个常用方法。

	TORMRepository = class
	public
		procedure StartTransaction(const AIsolation: Integer = 2);
		procedure Commit;
		procedure Rollback;
		function Select<T>: IORMSelectRepo<T>; overload;
		function Select<T>(const ASqlMap: string): IORMSelectRepo<T>; overload;

		function Update<T>: IORMUpdateRepo<T>; overload;
		function Update<T>(const ASqlMap: string): IORMUpdateRepo<T>; overload;
		function Update<T>(const Entity: T): IORMUpdateRepo<T>; overload;

		function Delete<T>: IORMDeleteRepo<T>; overload;
		function Delete<T>(const ASqlMap: string): IORMDeleteRepo<T>; overload;
		function Delete<T>(const Entity: T): IORMDeleteRepo<T>; overload;

		function Insert<T>: IORMInsertRepo<T>; overload;
		function Insert<T>(const ASqlMap: string): IORMInsertRepo<T>; overload;
		function Insert<T>(const Entity: T): IORMInsertRepo<T>; overload;
	end;

## SqlMap
仓储的查询/更新/新增/删除操作，如果传入的是数据库实体，`MVCXE.ORM` 会按sql标准生成sql语句，用于执行，但有的时候，我们需要使用一些特殊的sql语句语法来进行数据库操作，那么我们可以使用SqlMap。

在根目录建立SqlMap.xml文件，在里面定义你的SqlMap。

	<?xml version="1.0" encoding="UTF-8"?>
	<sqlMap>
		<TPosts>
			<select id="toppost">
				SELECT A.*, 
				B.Id _TUsers_Id, B.Email _TUsers_Email, B.Nickname _TUsers_Nickname, B.Title _TUsers_Title, 
				B.Gender _TUsers_Gender, B.HeadPortrait _TUsers_HeadPortrait, B.IsVip _TUsers_IsVip, B.VipLevel _TUsers_VipLevel 
				FROM posts A
				LEFT JOIN users B ON B.Id = A.UserId
				WHERE A.IsTop=0 
				ORDER BY A.UpdateTime DESC
				LIMIT {Count}
			</select>
			<select id="last_posts">
				SELECT A.*
				FROM posts A
				WHERE A.UserId=:UserId 
				ORDER BY A.CreateTime DESC
				LIMIT {Count}
			</select>
		</TPosts>
		<TComments>
			<select id="last_comments">
				SELECT A.*, 
				B.Title PostTitle 
				FROM comments A
				LEFT JOIN posts B ON B.Id = A.PostId
				WHERE A.UserId=:UserId 
				ORDER BY A.CreateTime DESC
				LIMIT {Count}
			</select>
		</TComments>
		<TSysUser>
			<select id="byname">
				SELECT A.*, 
				B.role_name 
				FROM sys_user A
				LEFT JOIN sys_role B ON B.role_id = A.role_id
				WHERE A.username=:username 
			</select>
			<select id="page">
				SELECT A.*, 
				B.role_name 
				FROM sys_user A
				LEFT JOIN sys_role B ON B.role_id = A.role_id
				Limit {Skip},{Count}
				<Count>
					SELECT count(*) 
					FROM sys_user A
				</Count>
			</select>
			<insert id="newuser">
				insert into sys_user 
	(nick_name,phone,role_id,salt,avatar,sex,email,dept_id,post_id,create_by,update_by,remark,status,create_time,username,password)
	values
	(:nick_name,:phone,:role_id,:salt,:avatar,:sex,:email,:dept_id,:post_id,:create_by,:update_by,:remark,:status,:create_time,:username,:password)
			</insert>
			<update id="updateuser">
				update sys_user set
	nick_name=:nick_name,phone=:phone,role_id=:role_id,salt=:salt,avatar=:avatar,sex=:sex,email=:email,dept_id=:dept_id,post_id=:post_id,update_by=:update_by,remark=:remark,status=:status,update_time=:update_time
	where user_id=:user_id
			</update>
		</TSysUser>
		<TSysRole>
			<select id="page">
				SELECT A.*, 
				FROM sys_role A
				Limit {Skip},{Count}
				<Count>
					SELECT count(*) 
					FROM sys_role A
				</Count>
			</select>
		</TSysRole>
		<TDateRangeStatisticsData>
			<select id="dashboard_submit">
		SELECT
			a.click_date,
			ifnull( b.total, 0 ) AS total,
			ifnull( b.overs, 0 ) AS overs,
			ifnull( b.processing, 0 ) AS processing
		FROM
			({DataValue}) a
			LEFT JOIN (
			SELECT
				a1.datetime AS datetime,
				a1.count AS total,
				b1.count AS overs,
				c.count AS processing
			FROM
				(
				SELECT
					date( create_time ) AS datetime,
					count(*) AS count
				FROM
					p_work_order_info
				GROUP BY
				date( create_time )) a1
				LEFT JOIN (
				SELECT
					date( create_time ) AS datetime,
					count(*) AS count
				FROM
					p_work_order_info
				WHERE
					is_end = 1
				GROUP BY
				date( create_time )) b1 ON a1.datetime = b1.datetime
				LEFT JOIN (
				SELECT
					date( create_time ) AS datetime,
					count(*) AS count
				FROM
					p_work_order_info
				WHERE
					is_end = 0
				GROUP BY
				date( create_time )) c ON a1.datetime = c.datetime
			) b ON a.click_date = b.datetime order by a.click_date
			</select>
		</TDateRangeStatisticsData>
		<TWorkOrderRanks>
			<select id="dashboard_rank">
				select p_process_info.name as name, count(p_work_order_info.id) as total from p_work_order_info
	left join p_process_info on p_process_info.id = p_work_order_info.process
	where p_work_order_info.create_time between :start_time and :end_time
	group by p_work_order_info.process
	order by total desc
	limit 10
			</select>
		</TWorkOrderRanks>
		<THandlePersonRank>
			<select id="dashboard_handle">
				select p_work_order_circulation_history.processor_id as user_id, p_work_order_circulation_history.processor as nickname, sys_user.username as username, count(p_work_order_circulation_history.id) as count from p_work_order_circulation_history
	left join sys_user on sys_user.user_id = p_work_order_circulation_history.processor_id and p_work_order_circulation_history.create_time between :start_time and :end_time
	where p_work_order_circulation_history.source like 'receiveTask%' and p_work_order_circulation_history.status = 1
	group by p_work_order_circulation_history.processor, p_work_order_circulation_history.processor_id
	order by count desc
			</select>
		</THandlePersonRank>
		<THandlePeriodRank>
			<select id="dashboard_period">
				select p_work_order_circulation_history.processor_id as user_id, p_work_order_circulation_history.processor as nickname, sys_user.username as username, round(sum(p_work_order_circulation_history.cost_duration), 2) as cost_duration from p_work_order_circulation_history
	left join sys_user on sys_user.user_id = p_work_order_circulation_history.processor_id
	where p_work_order_circulation_history.source like 'receiveTask%' and p_work_order_circulation_history.status = 1 and p_work_order_circulation_history.create_time between :start_time and :end_time
	group by p_work_order_circulation_history.processor, p_work_order_circulation_history.processor_id
	order by cost_duration desc
			</select>
		</THandlePeriodRank>
	</sqlMap>

> Root

根节点标签是sqlMap

> 节点查找

第一级节点名是实体类名，如 `<TPosts></TPosts>`， 第二级节点是`<select></select>` `<update></update>` `<delete></delete>` `<insert></insert>`<br/>
当 使用`repository.Select<TPosts>('sqlid')` 时，仓储查找节点<TPosts>下的子节点`<select id="sqlid">`, 并使用该节点的content作为 `sql` 语句执行数据库操作。

> Sql特性

- `:参数名` 对应实体类的属性字段名。
- `{Skip}`,`{Count}`对应 IORMSelectRepo 接口的`Take`方法参数，用于分页处处理，如orm.Repository.Select<TPosts>('sqlid').Take(skipval, countval)。
- `{sql代码块名}`可在代码中用`Replace('sql代码块名', 'sql代码')`替换。