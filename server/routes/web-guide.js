'use strict';

var express = require('express');
var router = express.Router();

var webGuide = {
  index: function (req, res) {
    res.render('web-guide', { title: 'Web Guild 首页' });
  }
};

router.get('/', webGuide.index);

/**
 * 首页路由
 * @module docs
 * @author Linder linder0209@126.com
 * @createdDate 2015-5-28
 * */
module.exports = router;