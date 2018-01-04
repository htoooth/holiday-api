'use strict';
var router = require('express').Router();
var AV = require('leanengine');
var moment = require('moment');
const _ = require('lodash');

var holiday = require('./holiday-service');

router.get('/', function(req, res, next) {
  const date = req.body.date || moment().format('YYYY-MM-DD');
  const [year, month, day] = date.split('-');

  if (!_.isNumber(year) || !_.isNumber(month) || !_.isNumber(day)) {
    return res.json({
      code: 401,
      message: '参数错误'
    })
  }

  holiday.query(+year, +month, +day).then(({error, result}) => {
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
