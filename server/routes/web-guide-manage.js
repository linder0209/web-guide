'use strict';

var express = require('express');
var router = express.Router();

var fs = require('fs');

var webGuideManage = {
  index: function (req, res) {
    res.render('manage/web-guide-manage', {title: 'Web Guild 管理'});
  },

  getGuide: function (req, res) {
    var type = req.params.type;
    var index = __dirname.lastIndexOf('server');
    var path = __dirname.substring(0, index) + 'app/docs/guide/';
    var filePath = path + type + '.html';

    fs.exists(filePath, function (exists) {
      if (exists) {
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
      } else {
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
    var index = __dirname.lastIndexOf('server');
    var path = __dirname.substring(0, index) + 'app/docs/guide/';

    //同步保存，也可改成异步
    try{
      //原内容
      fs.writeFileSync(path + type + '.html',data.content);
      //目录
      fs.writeFileSync(path + type + '-catalogue.html',data.catalogueHtml);
      //带目录的内容
      fs.writeFileSync(path + type + '-catalogue-content.html',data.catalogueContent);
      res.send({
        success: true
      });
    }catch(e){
      res.send({
        success: false,
        errorMessage: e.message
      });
    }

    /*
    fs.writeFile(path + type + '.html',data.content,function(err){
      if(err){
        res.send({
          success: false,
          errorMessage: err.message
        });
      }else{
        fs.writeFile(path + type + '-catalogue.html',data.catalogueHtml,function(err){
          if(err){
            res.send({
              success: false,
              errorMessage: err.message
            });
          }else{
            fs.writeFile(path + type + '-catalogue-content.html',data.catalogueContent,function(err){
              if(err){
                res.send({
                  success: false,
                  errorMessage: err.message
                });
              }else{
                res.send({
                  success: true
                });
              }
            });
          }
        });
      }
    });*/
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