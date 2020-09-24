var express = require('express');
const { names } = require('debug');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//appointment page
router.get('/appointment', function(req, res, next) {

  // use userappointment.ejs
  res.render('appointment', { title: 'User appointment'});
});

//medicalrecord page
router.get('/medicalrecord', function(req, res, next) {
  /*
  router.get是從index.ejs 接收資料 href:medicalrecord
  */

  // use usermedicalrecord.ejs
  /*
  res.render傳入medicalrecord.ejs的網頁位址
  */
  res.render('medicalrecord', { title: 'User medicalrecord'});
});

// home page
router.get('/appointmentrecord', function(req, res, next) {

  var db = req.con;
  var data = "";

  db.query('SELECT * FROM petappointment', function(err, rows) {
      if (err) {
          console.log(err);
      }
      var data = rows;

      // use index.ejs
      res.render('appointmentrecord', { title: 'Account Information', data: data});
  });

});


// add post
router.post('/appointment', function(req, res, next) {

  var db = req.con;

  var sql = {
      hospital: req.body.hospital,
      day: req.body.appointmentday,
      time:req.body.appointmenttime,
      classification:req.body.classification,
      petsclass:req.body.petsclass,
      otherpets:req.body.otherpets,
      petsgender:req.body.petsgender,
      names:req.body.names,
      phonenumber:req.body.phonenumber,
      something:req.body.something
  };

  //console.log(sql);
  var qur = db.query('INSERT INTO petappointment SET ?', sql, function(err, rows) {
      if (err) {
          console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});


module.exports = router;
