'use strict';

var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = 'D:/gitworkspace/web-guide/app/docs/';//先写死，后期再改

var webGuideManage = {
  index: function (req, res) {
    res.render('manage/web-guide-manage', {title: 'Web Guild 管理'});
  },

  getGuide: function (req, res) {
    var type = req.params.type;
    var filePath = path + type + '.html';

    fs.exists(filePath, function (exists) {
      if(exists){
        fs.readFile(filePath, 'utf-8', function (err, content) {
          if (err) {
            res.send({
              success: false,
              errorMessage: err.message
            });
          } else {
            res.send({
              success: true,
              content: content
            });
          }
        });
      }else{
        res.send({
          success: true,
          content: ''
        });
      }
    });
  },

  save: function (req, res) {
    var data = req.body;
    var type = data.type;
    var filePath = path + type + '.html';
    fs.writeFile(filePath, data.content, function (err) {
      res.send({
        success: !err
      });
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