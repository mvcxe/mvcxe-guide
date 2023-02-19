# 调度作业

## 关于调度作业
调度作业又称定时任务，顾名思义，定时任务就是在特定的时间或符合某种时间规律自动触发并执行任务。

### 使用场景
定时任务的应用场景非常广，几乎是每一个软件系统必备功能：

- 叫你起床的闹钟
- 日历日程提醒
- 生日纪念日提醒
- 定时备份数据库
- 定时清理垃圾数据
- 定时发送营销信息，邮件
- 定时上线产品，比如预售产品，双十一活动
- 定时发送优惠券
- 定时发布，实现 Devops 功能，如 Jenkins
- 定时爬虫抓数据
- 定时导出报表，历史统计，考勤统计
- ...

### 快速入门
> 定义作业处理类 TMyJob：

    uses MVCXE.Quartz;
    type
      TMyJob = class(TInterfacedObject,IJob)
      public
        procedure Execute;
      end;
    implementation
    { TMyJob }
    procedure TMyJob.Execute;
    begin
      WriteLn('--------'+DateTimeToStr(Now)+'---------');
    end;

> 在appsetting.json中设定任务执行计划

    {
        "schedule": {
            "job": [{
                "name": "UpdateInventoryJob",
                "group": "Update",
                "description": "定时更新",
                "job-type": "uJob.TMyJob",
                "durable": true,
                "recover": true
            }],
            "trigger": [{
                "cron": [{
                    "name": "UpdateInventoryTrigger",
                    "group": "Update",
                    "job-name": "UpdateInventoryJob",
                    "job-group": "Update",
                    "start-time": "2017-12-01 00:00:00",
                    "start-runonce": true,
                    "cron-expression": "* 0/1 * * * ?"
                }]
            },{
                "simple": [{
                    "name": "UpdateInventoryTrigger",
                    "group": "Update",
                    "job-name": "UpdateInventoryJob",
                    "job-group": "Update",
                    "start-time": "2017-12-01 00:00:00",
                    "start-runonce": true,
                    "repeat-count": 10,
                    "repeat-interval": 1000
                }]
            }]	
        }
    }

- `schedule\job`是jobs列表，可定义多个job
- `schedule\job[n]\job-type`是作业处理类的引用全写，`UnitName.ClassName`
- `schedule\job[n]\name`和`schedule\job\group`用于trigger中匹配
- `schedule\job[n]\recover`是作业是否等待上一次完成再继续，true不等待，false等待
- `schedule\trigger`是触发器列表，可定义多个触发器
- `schedule\trigger[n]\cron`是`cron`表达式触发器列表，可定义多个`cron`触发器
- `schedule\trigger[n]\cron[n]\job-name`和`schedule\trigger[n]\cron[n]\job-group`用于匹配job
- `schedule\trigger[n]\cron[n]\start-time`是job可触发的开始时间
- `schedule\trigger[n]\cron[n]\start-runonce`job是否只触发一次
- `schedule\trigger[n]\cron[n]\cron-expression`是`cron`表达式
- `schedule\trigger[n]\simple`是按时间间隔触发器
- `schedule\trigger[n]\simple[n]\job-name`和`schedule\trigger[n]\simple[n]\job-group`用于匹配job
- `schedule\trigger[n]\simple[n]\start-time`是job可触发的开始时间
- `schedule\trigger[n]\simple[n]\start-runonce`job是否只触发一次
- `schedule\trigger[n]\simple[n]\repeat-count`是job总共可触发次数，小于等于0表示不限制
- `schedule\trigger[n]\simple[n]\repeat-interval`每间隔多少毫秒触发一次

