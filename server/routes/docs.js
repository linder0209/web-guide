'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('docs', { title: 'Web Guild 首页' });
});

/**
 * 首页路由
 * @module docs
 * @author Linder linder0209@126.com
 * @createdDate 2015-5-28
 * */
module.exports = router;