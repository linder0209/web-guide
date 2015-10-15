'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var DataPage = require('../utils/DataPage');
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
    return list;
  }
  items.forEach(function (item) {
    list.push({
      id: item.id,
      name: item.name,
      total: item.total,
      alias: joinStr(level, ' —') + item.name
    });
    traverse(item.child, list, level++);
  });
}

function findItemById(items, id) {
  var ids = id.split('-');
  var _items = items;
  ids.forEach(function (id) {
    for (var i = 0, len = _items.length;i<len;i++) {
      if(_items[i].id === id){
        _items = _items[i].child;
        break;
      }
    }
  });
  return _items;
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
        var items = JSON.parse(data);
        traverse(items, list, 0);

        res.send({
          success: true,
          items: list
        });
      }
    });
  },

  saveCatalogue: function (req, res) {
    var catalogue = req.body;
    fs.readFile('./server/catalogue.json', 'utf8', function (err, data) {
      if (err) {
        res.send({
          success: false
        });
      } else {
        var id = catalogue.id;
        if (id) {//修改

        } else {
          var parentId = catalogue.parentId;
          var items = JSON.parse(data || '[]');

        }
        var list = [];
        var items = JSON.parse(data);
        traverse(items, list, 0);

        res.send({
          success: true,
          items: list
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
