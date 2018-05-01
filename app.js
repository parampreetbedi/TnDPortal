var express = require('express');
var app = express();
var https = require('http');
//console.log("asdasdasdasd");
var request = require('request');



app.use(express.static(__dirname + '/dist' ) )

app.get('*', function(req,res){
	//console.log("asdasdasd");
  	res.sendFile("index.html", { root: __dirname+'/dist' })
})
var httpsServer = https.createServer(app);
httpsServer.listen(4200);