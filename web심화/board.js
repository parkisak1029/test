const express = require("express");
const app = express();
const mysql = require('mysql');

app.set("view engine", "ejs");
app.set("views", './views');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '1234',
    database : 'project'
});

db.connect();

app.get('/write', function(req, res, next){
    var userInfo = req.session.userInfo
    res.render('write', {title : "게시판 글쓰기", userInfo:userInfo.name})
});

app.post('/write', function(req, res, next){
    var name = req.body.name;                  
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name, title, content, passwd]; 
    var sql = "insert into board(name, title, content, regdate, modidate, passwd,hit) values(?,?,?,now(),now(),?,0)";  // ? 는 매개변수
    connection.query(sql, datas, function(err,rows){
        if (err) console.error("err : " + err);
        res.redirect('/board/page')
    });
});

app.get('/page', function(req, res, next) { 
        res.redirect('/board/page/1');
});
app.get('/page/:page', function(req, res, next){ 
    var page = req.params.page; 
    var userInfo = req.session.userInfo
    var sql =  "select idx, name, title, date_format(modidate,'%Y-%m-%d') modidate, " +
    "date_format(regdate,'%Y-%m-%d') regdate from board";
    connection.query(sql, function(err, rows){
        if (err) console.error("err : " + err);
        if(userInfo === undefined)
        res.render('page', {title : '글목록', rows:rows, page:page, length:rows.length-1, page_num:10, pass:true, userInfo:0});  
        else
        res.render('page', {title : '글목록', rows:rows, page:page, length:rows.length-1, page_num:10, pass:true, userInfo:userInfo.name});
    });
});

router.get('/read/:idx', function(req, res, next){
    var idx = req.params.idx;
    var userInfo = req.session.userInfo
    var sql = "SELECT idx, name, title, content, date_format(modidate, '%Y-%m-%d') modidate, " +   
    "date_format(regdate,'%Y-%m-%d') regdate, hit from board where idx=?";
    connection.query(sql, [idx], function(err, rows){ 
        if(err) console.error("err : " + err);
        if(userInfo === undefined)
        res.render('read', {title : '글 상세보기', rows:rows[0], userInfo:0}); 
        else 
        res.render('read', {title : '글 상세보기', rows:rows[0], userInfo:userInfo.name});
    });
});