'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('examples/examples');
});


/**
 * 例子路由
 * @module examples
 * @author Linder linder0209@126.com
 * @createdDate 2015-5-28
 * */
module.exports = router;
