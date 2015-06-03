'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.locals.home = true;
  res.render('main', { title: 'Web Guild 首页' });
});

/**
 * 首页路由
 * @module main
 * @author Linder linder0209@126.com
 * @createdDate 2015-6-2
 * */
module.exports = router;