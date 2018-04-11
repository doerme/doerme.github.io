# 电狐客户端本地开发环境部署

## 安装电狐客户端

```
到共享 \\ruri.girl.moe\dianhu\产品文档\电狐APP-开发版 目录，下载最新的电狐压缩包到本地解压安装
```

## 电狐客户端内嵌web源码

```
svn地址 https://svn.yy.com/repos/src/yytalk/client/branches/
```

## 测试环境切换

```
配置 yq-dianhu.yy.com host

修改完host之后修改退出电狐 

删除 %appdata%/duowan/yt/cache 目录

配置NGINX

确保本地 yq-dianhu.yy.com/main/ 能访问到

再重启电狐
```

## nginx配置示例
```
server {
    listen 80;
    server_name yq-dianhu.yy.com;
	access_log  logs/dianhu_access.log;
	error_log  logs/dianhu_error.log;
	location / {
		root 	H:\\wamp\\yy\\DIANHU\\svn\\client1.42\\dev\\;
		index  index.html index.htm;
	}
	error_page   500 502 503 504  /50x.html;
	location = /50x.html {
		root   html;
	}
}
```

