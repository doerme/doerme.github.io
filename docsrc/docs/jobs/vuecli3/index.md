# vuecli3 笔记

## webpack配置

vuecli中，webpack配置主要是在 vue.config.js 文件上进行的

使用 vue-cli-service 暴露了 inspect 命令用于审查解析好的 webpack 配置
```
vue inspect > output.config 
```
命令输出当前项目的webpack配置

### configureWebpack 简单配置 
```
// vue.config.js
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}
```

### chainWebpack 允许我们更细粒度的控制其内部配置 

修改 Loader 选项

```
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}
```

添加一个新的 Loader

```
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
  }
}
```
替换一个规则里的 Loader
```
// vue.config.js
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('vue-svg-loader')
        .loader('vue-svg-loader')
  }
}
```

修改插件选项

```
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [/* 传递给 html-webpack-plugin's 构造函数的新参数 */]
      })
  }
}
```

[参考文档](https://cli.vuejs.org/zh/config/#vue-config-js){:target="_blank"}
