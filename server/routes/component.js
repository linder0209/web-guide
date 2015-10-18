'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var DataPage = require('../utils/DataPage');
var Uuid = require('../utils/Uuid');
var underscore = require('underscore');
var config = require('../config');

function joinStr(count, str) {
  if (count < 1) {
    return '';
  }
  var result = '';
  for (var i = 0; i < count; i++) {
    result += str;
  }
  return result + ' ';
}
//遍历目录节点
function traverse(items, list, level) {
  if (!items || items.length === 0) {
    return;
  }
  items.forEach(function (item) {
    list.push({
      id: item.id,
      name: item.name,
      code: item.code,
      total: item.total,
      alias: joinStr(level, ' —') + item.name
    });
    if (item.child && item.child.length > 0) {
      traverse(item.child, list, level + 1);
    }
  });
}

//根据id找到所在节点
function findItemById(items, id) {
  var map = items.map,
    list = items.list,
    findItem;
  var layer = [id];
  var parentId = map[id].parentId;
  while (parentId) {
    layer.unshift(parentId);
    parentId = map[parentId].parentId;
  }

  layer.forEach(function (item) {
    var len = list.length;
    for (var i = 0; i < len; i++) {
      if (list[i] === item) {
        findItem = list[i];
        list = list[i].child;
        break;
      }
    }
  });
  return findItem;
}

var component = {
  index: function (req, res) {
    res.render('component/index', {title: '组件库管理'});
  },
  pageList: function (req, res) {
    var options = {
      itemsPerPage: req.query.itemsPerPage,
      currentPage: req.query.currentPage
    };
    var dataPage = new DataPage(options);


    dataPage.setItems([{id: 1, title: '333'}, {id: 2, title: '333'}]);
    dataPage.setTotalItems(2);

    res.send({
      success: true,
      dataPage: dataPage
    });
  },

  catalogueList: function (req, res) {
    fs.readFile('./server/catalogue.json', 'utf8', function (err, data) {
      if (err) {
        res.send({
          success: false
        });
      } else {

        var list = [];
        var items = JSON.parse(data || '{"list":[],"map":{}}');
        traverse(items.list, list, 0);

        res.send({
          success: true,
          items: list
        });
      }
    });
  },

  saveCatalogue: function (req, res) {
    var catalogue = req.body;
    fs.readFile('./server/catalogue.json', 'utf-8', function (err, data) {
      if (err) {
        res.send({
          success: false
        });
      } else {
        var items = JSON.parse(data || '{"list":[],"map":{}}');
        var id = catalogue.id;
        if (id) {//修改
          var map = items.map;
          var item = findItemById(items, id);
          underscore.extend(item, catalogue);
          underscore.extend(map[id], catalogue);
        } else {
          var parentId = catalogue.parentId;
          var uuid = Uuid.raw();
          catalogue.id = uuid;
          if (parentId) {
            var parentItem = findItemById(items, parentId);
            parentItem.child = parentItem.child || [];
            parentItem.child.push(catalogue);
          } else {
            items.list.push(catalogue);
          }
          items.map[uuid] = catalogue;
        }

        //重新写入
        fs.open('./server/catalogue.json', 'w', function (err, fd) {
          if (err) {
            fs.close(fd, function (err) {
            });
            res.send({
              success: false
            });
            return;
          } else {
            fs.write(fd, JSON.stringify(items, 4), 0, 'utf-8', function (err, written, string) {
              fs.close(fd, function (err) {
              });
              var list = [];
              traverse(items.list, list, 0);
              res.send({
                success: err === null,
                items: list
              });
            });
          }
        });
      }
    });
  },

  componentType: function (req, res) {
    res.locals.componentType = req.params.componentType;
    res.render('component/index', {title: '组件库'});
  }
};

router.get('/', component.index);
router.get('/pagelist', component.pageList);
router.get('/cataloguelist', component.catalogueList);
router.post('/catalogue', component.saveCatalogue);

//router.get('/:componentType', component.componentType);


module.exports = router;
