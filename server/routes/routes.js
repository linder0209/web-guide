'use strict';

var examples = require('./examples/examples');
var webGuide = require('./web-guide');
var webGuideManage = require('./web-guide-manage');

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
  app.use('/', webGuide);
  app.use('/manage', webGuideManage);
  app.use('/examples', examples);
};