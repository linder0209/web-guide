'use strict';

var examples = require('./examples/examples');
var webGuide = require('./web-guide');
var webGuideManage = require('./web-guide-manage');

/**
 * 页面相关路由抽象实现，即访问页面的url
 * 该实现把所有路由的接口都封装到该文件中
 * @example
 app.use('/', index);
 app.use('/example-grid', grid);

 * @module routes
 * @author Linder linder0209@126.com
 * @createdDate 2015-5-28
 * */

module.exports = function (app) {
  app.use('/guide', webGuide);
  app.use('/manage', webGuideManage);
  app.use('/examples', examples);
};