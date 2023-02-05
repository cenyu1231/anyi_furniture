const express = require('express');
const app = express();
const router = require('./router');

// post要使用中间件
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(router);

app.listen(5000,()=>{
    console.log('5000端口已启用');
})