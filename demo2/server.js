const http = require("http");
const url = require("url");
const querystring = require('querystring');

const server = http.createServer((req, res) => {

	res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
	// const reqUrl = req.url;

	// get请求URL数据
	// console.log(url.parse(reqUrl, true).query);

	// get请求表单数据
	// const formVal = url.parse(reqUrl, true).query;
	// console.log("用户名：" + formVal.userName);
	// console.log("密码：" + formVal.userPwd);
	// res.end("用户名：" + formVal.userName + "  --->  " + "密码：" + formVal.userPwd);

	// post请求表单数据
	let postVal = "";
	req.on("data", (chunk) => {
		postVal += chunk;
	})
	req.on("end", () => {
		console.log(querystring.parse(postVal));
		res.end();
	})

})

server.listen(8080)
