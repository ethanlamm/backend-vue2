build 
    ----index.js webpack配置文件【很少修改这个文件】
mock 
    ----mock数据的文件夹【模拟一些假的数据mockjs实现的】
node_modules 
    ------项目依赖的模块
public 
    ------ico图标,静态页面，publick文件夹里面经常放置一些静态资源，而且在项目打包的时候webpack不会编译这个文件夹，原封不动的打包到dist文件夹里面
src 
    -----程序员源代码的地方 
    ------api文件夹:涉及请求相关的 
    ------assets文件夹：里面放置一些静态资源（一般共享的），放在aseets文件夹里面静态资源，在webpack打包的时候，会进行编译 
    ------components文件夹：一般放置非路由组件获取全局组件 
    ------icons这个文件夹的里面放置了一些svg矢量图 
    ------layout文件夹：他里面放置一些组件与混入 
    ------router文件夹：与路由相关的 
    ------store文件夹：一定是与vuex先关的 
    ------style文件夹：与样式相关的 
    ------utils文件夹
           ----request.js是axios二次封装文件
           ----auth.js封装token相关函数
           ----validate.js表单验证
    ------views文件夹：里面放置的是路由组件

App.vue:根组件

main.js：入口文件

permission.js:与导航守卫先关

settings：项目配置项文件

webpackage配置文件：
    .env.development：开发环境
        VUE_APP_BASE_API = '/dev-api'
        ==> 通过 process.env.VUE_APP_BASE_API 获取
        ==> utils/request.js：baseURL: process.env.VUE_APP_BASE_API
        ==> vue.config.js：走代理 ==> 
            proxy: {
                "/dev-api": {
                    target: "http://gmall-h5-api.atguigu.cn",
                    pathRewrite: { "^/dev-api": "" }
                }
    },
    .env.producation: 生产环境
    .env.staging：测试环境

.eslintignore：忽略eslint校验配置文件

.eslintrc.js：eslint配置文件

.gitignore：git忽略文件

.jsconfig.js：src别名配置文件

vue.config.js：相当于webpackage配置文件