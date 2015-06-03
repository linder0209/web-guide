'use strict';

var express = require('express');
var router = express.Router();

var examples = require('./examples/examples');
var main = require('./main');
var webGuide = require('./web-guide');
var webGuideManage = require('./web-guide-manage');


router.get('/', function (req, res) {
  res.render('web-guide', { title: 'Web Guild 首页' });
});
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
  app.use('/', main);
  app.use('/guide', webGuide);
  app.use('/manage', webGuideManage);
  app.use('/examples', examples);
};