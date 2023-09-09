const mysql = require("mysql");
const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
	console.log(req.url);

	let postVal = "";
	req.on("data", (chunk) => {
		postVal += chunk;
	})
	req.on("end", () => {
		let formVal = querystring.parse(postVal);
		let userName = formVal.userName;
		let userPwd = formVal.userPwd;

		const connection = mysql.createConnection({
			host:"localhost",
			user:"root",
			password:"123456",
			database:"db1"
		})

		// 链接MySQL数据库
		connection.connect();

		// 登录功能
		/*
		connection.query("select * from user where name = ? and password = ?",[userName, userPwd], (err, results, fields) => {
			if (err) throw err;
			if (results.length > 0) {
				res.writeHead(200, {'Content-Type':"text/html;charset=utf8"});
				res.write("登陆成功");
				res.end();
			}
			console.log(results);
		})
		*/

		// 注册功能
		connection.query("insert into user (name, password) value (?, ?)", [userName, userPwd], (err, results, fields) => {
			if (err) throw err;
			res.writeHead(200, {'Content-Type':"text/html;charset=utf8"});
			res.write("注册成功");
			res.end();
		})

		connection.end();
	
	})

})

server.listen(8080);