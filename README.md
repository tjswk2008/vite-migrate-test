*  该模板适合ie9以上的浏览器
*  需要先全局安装@vue/cli
*  整体分为本地开发环境，预上线环境（192.168.150.116）以及正式环境，预上线环境与正式环境配置基本一致，只是api的地址不同
*  命令解释：

```javascript
yarn start         // 本地开发
yarn pre       // 生成预上线环境代码到pre目录
yarn build	  // 生成正式代码到dist目录
```
*  入口文件放在src/main.js, 配置在vue.config.js
*  接口代理，开发环境方便调试('vue.config.js'), 修改devServer的proxy配置

```javascript
  devServer: {
    proxy: {
      '/surveyapi/*': {
        target: 'http://gapi.dev.xxx.com/',
        changeOrigin: 'true'
      }
    },
  }
```

*  静态资源路径，修改vue.config.js

```javascript
// 示例：在域名根目录的配置为'/',否则配置为代码放置的目录路径
const publicPathMap = {
  pre: '/admin/',
  production: '/survey/admin/',
  development: '/'
};
```

*  分环境的接口域名配置

使用VUE_APP_ENV变量来判断(各环境分别配置在.env.pre, .env.production, .env.development)

```javascript
url = import.meta.env.VUE_APP_ENV !== 'production' ? 'http://y.web.xxx.com/act' : 'http://y.xxx.com/act'
```

