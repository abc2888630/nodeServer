var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require("url");
var mime = require('./mime.js').types;
var port = 8800;
http.createServer(function(request,resopnse){
	var contentType;
	var pathname = url.parse(request.url).pathname;
	var ext = path.extname(pathname);
	var realPath = ext.slice(1);
	console.log('客户端的请求路径为：'+request.url);
	if(pathname =="/favicon.ico"){
		return;
	}else if(pathname == "/"){
		contentType = 'text/html'
	}else{
		contentType = mime[realPath] || "text/plain";
	}

	fs.readFile(pathname.substr(1),function(err, data){
		if(err){
			console.log(err);
			resopnse.writeHead(400,{'Content-Type':contentType,'charset':'UTF8'});
			resopnse.write('网页出现问题或者路径不存在');
		}else{
			resopnse.writeHead(200,{'Content-Type':contentType,'charset':'UTF8'});
			resopnse.write(data.toString());
		}
		resopnse.end();
	})
}).listen(port);
console.log('服务器成功创建，端口号为：'+port);