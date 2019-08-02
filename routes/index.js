var express = require('express');
var router = express.Router();
var con = require('../dbcon')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/savedbm', function (req, res) {


  let sql = `insert into dbmwarden (user_id,depression_percentage,day,month,year,time_stamp,date) values(?,?,?,?,?,?,?)`;
  con.query(sql,[req.body.user_id,req.body.percentage,req.body.day,req.body.month,req.body.year,req.body.time_stamp,req.body.date], (err, result) => {
    // console.log(result);
    res.json({ "message":"1" })
  })




});
router.post('/dailyreport', function (req, res) {


 

  let sql = `select avg(depression_percentage) as avg_percentage, date
  from dbmwarden
  where user_id=?
  group by date
  limit 30`;
  con.query(sql, [req.body.user_id],(err, result) => {
    // console.log(result);
    res.json({ "report": result })
  })





});
router.post('/monthlyreport', function (req, res) {


 

  let sql = `select avg(depression_percentage) as avg_percentage,month
  from dbmwarden
  where user_id=?
  group by month
  limit 12`;
  con.query(sql, [req.body.user_id],(err, result) => {
    // console.log(result);
    res.json({ "report": result })
  })





});

router.post('/yearlyreport', function (req, res) {


 

  let sql = `select avg(depression_percentage) as avg_percentage,year
  from dbmwarden
  where user_id=?
  group by year`;
  con.query(sql, [req.body.user_id],(err, result) => {
    // console.log(result);
    res.json({ "report": result })
  })





});

module.exports = router;
