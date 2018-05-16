# codereview流程：

发布生产环境，合并代码到master时候，需要走merge request流程

## Create merge request

小组成员A在推送自己分支到服务器之后，可以在gitlab项目仓库点击 Create merge request 按钮发起MR请求。

![Alt code review](img/p6.png)

在 New Merge Request的表单界面中，需要简要填写分支中提交代码的作用说明。
Assignee可以是有发布master权限的同事，优先as给熟悉当前项目代码的，有闲余时间的。
Milestone及label可以在立项排期时候，与开发小组成员确商好，也可以为空。

![Alt code review](img/p7.png)

小组成员B再收到Merge Requests之后，会在gitlab收到消息提示。可在Merge Requests列表之后，点开MR清单查看详情。

![Alt code review](img/p8.png)

在详情之中，能看到当前GIT节点的CI状态，提交时间，以及code diff。在code diff之中每一行代码都可以添加评论。

![Alt code review](img/p9.png)

在code review后，小组成员B可以点击Merge按钮，把代码合并到master，完成整个code review流程。

![Alt code review](img/p10.png)