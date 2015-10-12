'use strict';

var express = require('express');
var router = express.Router();

var component = {
  index: function (req, res) {
    res.render('component/index', {title: '组件库管理'});
  },
  componentType: function (req, res) {
    res.locals.componentType = req.params.componentType;
    res.render('component/index', { title: '组件库' });
  }
};

router.get('/', component.index);
//router.get('/:componentType', component.componentType);


module.exports = router;
