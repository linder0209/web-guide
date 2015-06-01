'use strict';

var express = require('express');
var router = express.Router();

var webGuide = {
  index: function (req, res) {
    res.render('web-guide', { title: 'Web Guild 首页' });
  },
  guideType: function (req, res) {
    res.locals.guideType = req.params.guideType;
    res.render('guide/web-guide', { title: 'Web Guild' });
  }
};

router.get('/', webGuide.index);

router.get('/:guideType', webGuide.guideType);

/**
 * 首页路由
 * @module docs
 * @author Linder linder0209@126.com
 * @createdDate 2015-5-28
 * */
module.exports = router;