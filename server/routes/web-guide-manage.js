'use strict';

var express = require('express');
var router = express.Router();

var webGuideManage = {
  index: function (req, res) {
    res.render('manage/web-guide-manage', {title: 'Web Guild 管理'});
  },

  getGuide: function (req, res) {
    var type = req.params.type;
    var content = '';
    res.send({
      success: true,
      content: content
    });
  },

  save: function (req, res) {
    var data = req.body;
    res.send({
      success: true
    });
  }
};

router.get('/', webGuideManage.index);
router.get('/:type', webGuideManage.getGuide);
router.post('/', webGuideManage.save);

/**
 * Web Guild 管理路由
 * @module docs-manage.js
 * @author Linder linder0209@126.com
 * @createdDate 2015-5-28
 * */
module.exports = router;