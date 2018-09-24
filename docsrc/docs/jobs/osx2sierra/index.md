## 前言
13年的air用久了，18年中秋节前夕终于下狠心换上了18年的pro。然后打算抹掉air的数据重装系统。

## 重装air
重启电脑，下次启动时候command+option+r 抹掉数据，重装系统

| 快捷键 | 作用 |
|:------|:---------|
| command + r | 安装您Mac上安装过的最新macOS，但不会升级到更高但版本 |
| option + command + r | 升级到与您的Mac兼容的最新macOS |
| shift + option + command + r | 安装Mac附带的macOS或最接近的可用版本 |

过程必须保持网络高可用，不然会遇到无数坑，网上也有不少相关的帖子，在这里就不展开讲述了。

## 升级系统
重装完系统后，问题来了： 系统是 OSX version 10.8.5。
在 app store 查看updates tab时候，是会提示没有任何更新可用。于是我就直接搜索 macOS High Sierra。然后点击获取。这时候会弹出appleid登录窗口。
现在appleid都是开了双重验证的，可惜OSX 10.8.5 是没有双重验证密码输入框的。
重点：其他设备现实的双重严重密码要填在appleid密码之后。

成功之后，你会看到一个提示，10.8.5要升级到10.11，问题是app store已经没开放10.11下载了，并且10.8.5的safari系统是调不起app store的。
重点：取消appleid绑定的支付账号，才可以直接更新到最新系统
重点：有家庭账号必须先取消共享，不然取消不了appleid绑定到支付账号

绑定取消之后，就可以直接在10.8.5app store直接搜索 macOS High Sierra 通过密码后接双重认证密码，去直接更新了。