var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');
const async = require('async');

var MongoClient = mongodb.MongoClient;
var CONN_DB_STR = 'mongodb://localhost:27017/user';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '豆瓣' , username : req.session.username});
});
router.get('/registor', function(req, res, next) {
  res.render('registor', {});
});
router.get('/login', function(req, res, next) {
  res.render('login', {});
});
router.get('/logout', function(req, res, next) {
	req.session.username = undefined;
	res.redirect('/');
})
router.get('/comment', function(req, res, next) {
	var pageNo = req.query['pageNo'] || 1;
	var pageSize = 5;
	var totalPage = 0;
	var count = 0;

	function findData(db){
		var conn = db.collection('comment');
		async.series([
			function(callback){
				conn.find().toArray(function(err, results){
					count = results.length;
					totalPage = Math.ceil(count / 5);

					pageNo = pageNo >= totalPage ? totalPage : pageNo;
					pageNo = pageNo < 1 ? 1 : pageNo;
					callback(null, "");
				})
			},
			function(callback){
				conn.find({}).sort({_id: -1}).skip((pageNo - 1) * 5).limit(pageSize).toArray(function(err, results){
					callback(null, results);
				})
			}
		],function(err, results){
			res.render('comment',{
				resData: results[1],
				count: count,
				totalPage: totalPage,
				pageNo: pageNo
			})
		})
	}
	MongoClient.connect(CONN_DB_STR, function(err, db){
		findData(db);
	})

})
module.exports = router;
