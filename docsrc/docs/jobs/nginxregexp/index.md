## 全局变量

$args ： 这个变量等于请求行中的参数，同$query_string
$content_length ： 请求头中的Content-length字段
$content_type ： 请求头中的Content-Type字段
$document_root ： 当前请求在root指令中指定的值
$host ： 请求主机头字段，否则为服务器名称
$http_user_agent ： 客户端agent信息
$http_cookie ： 客户端cookie信息
$limit_rate ： 这个变量可以限制连接速率
$request_method ： 客户端请求的动作，通常为GET或POST
$remote_addr ： 客户端的IP地址
$remote_port ： 客户端的端口
$remote_user ： 已经经过Auth Basic Module验证的用户名
$request_filename ： 当前请求的文件路径，由root或alias指令与URI请求生成
$scheme ： HTTP方法（如http，https）
$server_protocol ： 请求使用的协议，通常是HTTP/1.0或HTTP/1.1
$server_addr ： 服务器地址，在完成一次系统调用后可以确定这个值
$server_name ： 服务器名称
$server_port ： 请求到达服务器的端口号
$request_uri ： 包含请求参数的原始URI，不包含主机名，如/foo/bar.php?arg=baz
$uri ： 不带请求参数的当前URI，$uri不包含主机名，如/foo/bar.html
$document_uri ： 与$uri相同

### 假设请求为http://www.qq.com:8080/a/b/c.php，则

$host：www.qq.com
$server_port：8080
$request_uri：http://www.qq.com:8080/a/b/c.php
$document_uri：/a/b/c.php
$document_root：/var/www/html
$request_filename：/var/www/html/a/b/c.php

## 主机名（server_name）匹配

从上到下的优先级为从高到低

明确的server_name名称，如www.qq.com
前缀通配符，如*.qq.com或. qq.com
后缀通配符，如www.qq.*
正则表达式，如~[a-z]+\.qq\.com

## Try_files规则
try_files $uri $uri/ /index.php
假设请求为http://www.qq.com/test，则$uri为test

查找/$root/test文件
查找/$root/test/目录
发起/index.php的内部“子请求”

## location正则表达式书写示例

### 1. 等号(=)

表示完全匹配规则才执行操作

```
location = /index {
  [ configuration A ]
}
```

URL为 http://{domain_name}/index 时，才会执行配置中操作。

## 2. 波浪号（~）

表示执行正则匹配，但区分大小写

```
location ~ /page/\d{1,2} {
    [ configuration B ]
}
```
URL 为 http://{domain_name}/page/1 匹配结尾数字为1-99时，配置生效。

## 3.波浪号与星号（~*）

表示执行正则匹配，但不 区分大小写

```
location ~* /\.(jpg|jpeg|gif) {
    [ configuration C ]
}
```
匹配所有url以jpg、jpeg、gif结尾时，配置生效。

## 4.脱字符与波浪号（^~）

表示普通字符匹配，前缀匹配有效，配置生效

```
location ^~ /images/ {
    [ cofigurations D ]
}
```

URL 为 http://{domain_name}/images/1.gif 时，配置生效。

## 5.@

定义一个location，用于处理内部重定向

```
location @error {
    proxy_pass http://error;
}

error_page 404 @error;
```

## 各字符有效优先级

```
= > ^~ > ~/~*
```
当(~/~*)中有多个正则匹配时，选择正则表达式最长的配置执行。

## Rewrite规则

rewrite ^/images/(.*).(png|jpg|gif)$ /images?name=$1.$4 last;

上面的rewrite规则会将文件名改写到参数中

last : 相当于Apache的[L]标记，表示完成rewrite
break : 停止执行当前虚拟主机的后续rewrite指令集
redirect : 返回302临时重定向，地址栏会显示跳转后的地址
permanent : 返回301永久重定向，地址栏会显示跳转后的地址

## 负载均衡
例子如下
```
upstream backend1 {
    server backend1.qq.com weight=5;
    server 127.0.0.1:8080 max_fails=3 fail_timeout=30s;
    server unix:/tmp/backend3 backup;
}

upstream backend2 {
    ip_hash;
    server backend1.qq.com;
    server backend2.qq.com;
    server backend3.qq.com down;
    server backend4.qq.com;
}

server {
    location / {
        proxy_pass http://backend1;
    }

    location /api {
        proxy_pass http://backend2;
    }
}
```

实例  laravel框架Nginx配置的例子
```
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    # 设定网站根目录
    root /var/www/laravel/public;
    # 网站默认首页
    index index.php index.html index.htm;

    # 服务器名称，server_domain_or_IP 请替换为自己设置的名称或者 IP 地址
    server_name server_domain_or_IP;

    # 修改为 Laravel 转发规则，否则PHP无法获取$_GET信息，提示404错误
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP 支持
    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/var/run/php5-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```