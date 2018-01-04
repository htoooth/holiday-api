'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var moment = require('moment');

var holiday = require('./holiday-service');

router.get('/', function(req, res, next) {
  const date = req.body.date || moment().format('YYYY-MM-DD')

  holiday.query(data).then(({error, result}) => {
    if (error) {
      return res.json({
        code: 500,
        message: '服务器错误'
      });
    }

    res.json({
      code: 200,
      data: result,
      message: '查询成功'
    });
  }).catch(next)
});

module.exports = router;
