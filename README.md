brick
=====
[wiki](https://github.com/julienedies/brick/wiki)

[home](https://julienedies.github.io/brick/public/index/index.html)

[todo example](https://julienedies.github.io/brick/public/example/todo/index.html)

### 设计与实现

brick是一个轻量级前端开发框架，基于jQuery和lodash(or underscore)。主要用于提升前端页面开发效率及复杂功能页面js代码的组织性和维护性。

其设计及实现主要借鉴并且反映了angular的前端开发思想及解决方案。

其主要思想包含两点：

##### 1). 对代码类型进行划分，隔离。
 
因为前端开发通常同时涉及html、css、js，通过对代码类型进行划分，以提高代码复用性及维护性。
通常分为以下几种类型的代码：
*    controller（控制器）类型代码，主要用于衔接dom操作及service调用。
*    service（服务）类型代码：主要用于封装纯js操作类型代码，会比较接近于mvc里m的概念。复用程度高。
*    directive（指令）类型代码，通过自定义dom属性的方式为所属dom元素绑定行为。主要用于封装操作dom的代码，譬如一个典型的标签页功能。复用程度高。

##### 2). 尽量解耦js行为与css样式。
 
虽然已经存在众多的UI组件，但是其使用便捷性及移植性并不好。
譬如虽然jQuery提供了jQuery UI，但实际项目开发中，很少有人会直接使用jQuery UI的样式，很多时间精力花费在样式的修改上。
考虑到这点，通过指令的形式（自定义html属性）提供基本的js行为，用户可以随意定义模板及样式；

### 使用
##### 传统web页面
```
<link href="dist/brick.css">
<script src="dist/brick.js"></script>
```
##### electron环境
```
npm i @julienedies/brick
let brick = require('@julienedies/brick')
brick.bootstrap()
```
### 开发环境

brick使用webpack作为类库构建工具; 使用[fis](https://github.com/fex-team/fis)做为主页项目构建工具。

### 环境搭建：
1.  本机安装nodejs;
2.  命令行执行以下命令
```
git clone https://github.com/Julienedies/brick.git
cd brick
npm i fis -g // install global
npm i 
```
### 开发相关命令:
```
// 类库开发
npm run dev
// 类库部署
npm run pro
// 主页项目开发
npm run dev:page
// 主页项目部署
npm run pro:page
```

