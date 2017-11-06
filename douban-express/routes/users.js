var express = require('express');
var router = express.Router();
const mongodb = require('mongodb');
const async = require('async');

/* GET users listing. */
var MongoClient = mongodb.MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/user'

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//注册
router.all('/registor', function(req, res){
	var email = req.body['alias'];
	var pwd = req.body['password'];
	var username = req.body['name'];
	var data = [{username: username, password: pwd, email: email}];
	// console.log(data);
	function insertData(db){
		var conn = db.collection("admin");
		conn.insert(data, function(err, results){
			if(err){
				console.log(err);
				return;
			}else{
				req.session.username = username;
				res.redirect("/");
				db.close();
			}
		})
	}
	MongoClient.connect(DB_CONN_STR, function(err, db){
		if(err){
			console.log(err);
			return;
		}else{
			console.log('connect success~');
			insertData(db);
		}
	})
})
//登入
router.all('/login', function(req, res){
	var userID = req.body['account'];
	var pwd = req.body['password'];
	var data = {password: pwd};
	console.log(data);
	function findData(db){
		var conn = db.collection('admin');
		 conn.find(data).toArray(function(err, results){
			if(results.length > 0){
				for(var i = 0; i < results.length; i++){
					if(userID == results[i].username || userID == results[i].email){
						req.session.username = results[i].username;
						res.redirect('/');
					}
				}
			}else{
				res.redirect('/login');
			}
		})
	}
	if(pwd){
		MongoClient.connect(DB_CONN_STR, function(err, db){
			if(err){
				console.log(err);
				return;
			}else{
				findData(db);
			}
		})
	}else{
		res.redirect('/login');
	}
})
//注册验证重名
router.all('/ajax', function(req, res){
	var email = req.query['alias'];
	var username = req.query['name'];
	var data = {username: username, email: email};
	/*console.log(data);*/
	var newData = {};
	for(var key in data){
		if(data[key]){
			newData[key] = data[key];
		}
	}
	/*console.log(newData);*/
	function findData(db){
		var conn = db.collection('admin');
		conn.find(newData).toArray(function(err, results){
			console.log(results);			
			if(results.length > 0){
				res.send('101');
			}else{
				res.send('100');
			}
			db.close();
		})
	}
	MongoClient.connect(DB_CONN_STR, function(err, db){
		if(err){
			console.log(err);
			return;
		}else{
			console.log('connect success~');
			findData(db);
		}
	})
})
//评价
router.all('/talk', function(req, res){
	var title = req.body['title'];
	var val = req.body['content'];
	var username = req.session.username;
	var data = [{username: username, title: title, val: val}];
	function insertData(db){
		var conn = db.collection("comment");
		conn.insert(data, function(err, results){
			if(err){
				console.log(err);
				return;
			}else{
				res.redirect('/comment');
				db.close();
			}
		})
	}
	if(!username){
		res.send('<script>alert("登录超时，请重新登录"); location.href="/login"</script>')
	}else{
		MongoClient.connect(DB_CONN_STR, function(err, db){
			if(err){
				console.log(err);
				return;
			}else{
				console.log('connect success~');
				insertData(db);
			}
		})
	}
})
module.exports = router;
