#Web Guide 前端开发指南

该项目是一个Web前端开发指南系统，主要供开发学习使用。点击[这里](http://linder0209.github.io/web-guide/)查看相关指南

##目的和目标
* 快速开发系统
* 优化系统性能
* 方便系统维护
* 深入研究学习各种前端技术

##相关技术
* 项目管理：[Grunt](http://gruntjs.com/) [Bower](http://bower.io/) [Yeoman](http://yeoman.io/)
* 书写代码辅助工具： [emment](http://docs.emmet.io/)（快速书写html代码，前身是 zen coding）
* 制定通用、简单的html 、css 和 javascript 规范，可以参考[这里](http://codeguide.bootcss.com/)
* CSS：基于[Bootstrap](http://getbootstrap.com/)运用 (Less)[http://lesscss.org/] 快速开发构建css，掌握常用的css3，并且能用css3工具快速生成code
* Javascript：基于[Node.js](https://nodejs.org/)能熟练构建项目,  [Angular](http://angularjs.org/), [jQuery](http://jquery.com/)
* 检测Javascript代码工具：[JSHint](http://jshint.com/)，可以发现代码错误、查找代码潜在问题以及不规范的写法。
* 性能优化技术


##项目安装、打包、运行，测试等

### 项目运行
前提是安装了最新版的 [Node.js](https://nodejs.org/)（\>0.10.x）

```
npm install -g bower
npm install -g grunt-cli
npm install
bower install
grunt serve
```
### 单元测试
```
grunt test
```

### 编译打包
```
grunt build
```
### 生成文档
```
grunt docs
```
## 意见和建议以及bug

如果你有好的意见和建议，可以点击[这里](https://github.com/linder0209/web-guide/issues)发表你的看法，
当然你也可以在[这里](https://github.com/linder0209/web-guide/issues)提交bug。

## License

请看 [LICENSE 文件](https://github.com/linder0209/web-guide/blob/master/LICENSE.md)
