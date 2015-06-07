'use strict';

var express = require('express');
var router = express.Router();

var resources = {
  index: function (req, res) {
    res.locals.resources = true;
    res.render('guide/resources', { title: '学习资源' });
  }
};

router.get('/', resources.index);

/**
 * 首页路由
 * @module resources
 * @author Linder linder0209@126.com
 * @createdDate 2015-6-7
 * */
module.exports = router;