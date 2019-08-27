# vue-brainstorm
Vant 示例工程，基于 vue-cli 3 搭建。

## 目录

### base

vue-brainstorm 工程示范了如何用 vant 搭建几个简单的电商页面，包含如下功能：
- 基于 vant 搭建
- 基于 vue-router 的单页面应用
- 组件按需引入
- 视图异步加载
- 路由安全卫士
- vuex状态管理
- 跨域问题
- 不同环境启动，打包，构建，部署

## 开发命令

``` bash
# 安装依赖
# 注意：请切换到对应的子目录下安装
cd vue-brainstorm
npm install

# 本地开发
# 通过 localhost:8080 访问页面
# 开发环境
npm run dev  
# 测试环境
npm run test
# 生产环境
npm run prod

# 开发环境构建
npm run build:dev
# 测试环境构建
npm run build:test
# 生产环境构建
npm run build:prod

# 代码格式校验
npm run lint
```
