'use strict';

var express = require('express');
var router = express.Router();

var examples = require('./examples/examples');
var main = require('./main');
var webGuide = require('./web-guide');
var webGuideManage = require('./web-guide-manage');
var resources = require('./resources');


router.get('/', function (req, res) {
  res.render('web-guide', { title: 'Web Guild ��ҳ' });
});
/**
 * ҳ�����·�ɳ���ʵ�֣�������ҳ���url
 * ��ʵ�ְ�����·�ɵĽӿڶ���װ�����ļ���
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
  app.use('/resources', resources);
  app.use('/examples', examples);
};