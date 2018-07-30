var PORT = 8081;
var http = require('http');
var express = require('express');  //基于nodejs平台的web开发框架.
var app = express(); 
var bodyParser = require('body-parser');  //express的中间件，用于解析http请求.
var mysql = require('easy-mysql');//添加数据库模块.
var urlencodedParser = bodyParser.urlencoded({ extended: false });//创建编码解析.
app.use(urlencodedParser);
var connection = mysql.connect({  //配置参数，连接数据库.
    host: '10.35.22.91',
    user: 'root',
    password: 'adminadmin',
    port:   '3306',
    database: 'stocks'
})

function onRequest(req, res){
    console.log("Request received.");
    var params='';
    var arr='';
    req.on('data',function(data){//获取页面发送的code.
        res.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
        params = data.toString();
        console.log("stock code is:  "+params);//便于后台验证标记
        var selectSql = "SELECT date,close,high,low,code FROM stocksData where code='"+params+"'";
        connection.getAll(selectSql,function(err, rows){//数据库查询相应数据
            if (err) throw err;
            arr=rows;
            arr=JSON.stringify(rows);//转换成JSON String格式
            res.write(arr);//将数据写回页面
            res.end();
        });
    });
}

http.createServer(onRequest).listen(PORT);//创建服务，监听端口
console.log("Server runing at port: " + PORT + ".");