const express = require('express');
const router = express.Router();
const Mock = require('mockjs');

// 路由配置------------------------

// 使用说明：分三个区（公共可复用区、mockjs 随机生成数据区、用户操作区）

// =============================== 公共可复用区=======向下====================================
// 随机设置图片函数
const imgArr = [
    'https://picnew9.photophoto.cn/20150518/shineisheyingtupian-10730250_1.jpg'
    , 'https://picnew3.photophoto.cn/20090108/jingmeijiajushineitupiansucai10-09435866_1.jpg'
    , 'https://pic.ntimg.cn/2008-04-01/200841223857645_2.jpg'
    , 'https://picnew3.photophoto.cn/20090625/gudian-yishu-jiaju-zhuangxiu-oushitupian-11256656_1.jpg'
    , 'https://image.cool-de.com/data/attachment/forum/201904/24/152241i9csd9xcxb3d7wer.jpg'
    , 'https://picnew3.photophoto.cn/20090625/gudian-yishu-jiaju-zhuangxiu-oushitupian-11256656_1.jpg'
    , 'https://pic.ntimg.cn/20130826/11225460_174527477114_2.jpg',
    , 'https://pic.ntimg.cn/20140805/12993780_172743121000_2.jpg'
    , 'https://picnew3.photophoto.cn/20090513/jiajushenghuo-datingjiaju-jiasijiajutupian-11403339_1.jpg'
    , 'https://imgvz.vsszan.com/forum/201309/09/215929zw90do0soeezfoqc.jpg'
    , 'https://imgvz.vsszan.com/forum/201309/14/213840aa0e3t34bzwpug2q.jpg'
    , 'https://hao.ejuhome.com/ejuhome1.0/uploadfiles/20191023/1571810130997714.jpg'
    , 'https://16302141.s21i.faiusr.com/2/ABUIABACGAAg8tnr5QUo8-G48QIwwAc4gAU.jpg'
    , 'https://pic.616pic.com/bg_w1180/00/16/38/S1FFvKit8i.jpg'
];

// data:图片数组，dNum：自定义获取个数
function getImg(data, dNum) {
    // 取多少个
    let num = 0;
    let numArr = [];
    let index = 0;

    if (dNum) {
        num = dNum;
    } else {
        num = parseInt(Math.random() * 5 + 2);
    }

    for (let i = 0; i < num; i++) {
        index = parseInt(Math.random() * data.length);
        numArr[i] = data[index];
        // console.log(num, index, numArr[i]);
    }
    return numArr;
}
// =============================== 公共可复用区=======向上====================================



// ====================================== mockjs 随机生成数据========向下===================================
// 获取轮播图数据
router.get('/getSwiper', (req, res) => {
    res.send({
        imgList: [
            'https://pic.616pic.com/photoone/00/07/18/6197620c1dedc1983.jpg'
            , 'https://picnew8.photophoto.cn/20131022/jiajuyishutupian-10903167_1.jpg'
            , 'https://pic.616pic.com/bg_w1180/00/21/89/p65wQEbybQ.jpg'
            , 'https://picnew3.photophoto.cn/20090625/gudian-yishu-jiaju-zhuangxiu-oushitupian-11256656_1.jpg'
        ],
        code: 1
    })
})

// 获取热门数据（每个城市不一样）
router.get('/getHotRecommend', (req, res) => {
    const city = req.query.city;
    res.send(Mock.mock({
        "list|4": [{
            shopStore: '@cword(2,3)',
            city: city,
            "title|+1": ["靠椅", "沙发", "席梦思", "储物架"],
            "imgurl|+1": [
                'https://picnew9.photophoto.cn/20150518/shineisheyingtupian-10730250_1.jpg'
                , 'https://picnew3.photophoto.cn/20090108/jingmeijiajushineitupiansucai10-09435866_1.jpg'
                , 'https://pic.ntimg.cn/2008-04-01/200841223857645_2.jpg'
                , 'https://picnew4.photophoto.cn/20091104/jiajusheying41tupian-11394165_1.jpg'
            ],
            id: "@natural(123456,123456789)"
        }]

    }))
})

// 获取精品数据（每个城市不一样）
router.get('/getFestRecommend', (req, res) => {
    const city = req.query.city;
    res.send(Mock.mock({
        "list|4": [{
            shopStore: '@cword(2,3)',
            city: city,
            "title|+1": ["门", "水晶吊灯", "古董架", "镜框"],
            "imgurl|+1": [
                'https://picnew7.photophoto.cn/20130322/shineijiajuzhuangguangbaishetupian-11017955_1.jpg'
                , 'https://picnew4.photophoto.cn/20091025/jiajututupian-11283263_1.jpg'
                , 'https://picnew6.photophoto.cn/20120414/zhongzhixinjiajutupian-11111994_1.jpg'
                , 'https://pic.616pic.com/bg_w1180/00/19/05/JBizAbt8KK.jpg'
            ],
            id: "@natural(123456,123456789)"
        }]
    }))
})

// 获取商品列表（三个参数：城市、关键字、页码）
// 每页十条
// 数据格式： {图片，名称，标题,详情{层数，面积，类型}，价钱}
router.get('/getGoodsList', (req, res) => {
    let city = req.query.city;
    let keyword = req.query.keyword;
    let page = req.query.page;
    res.send(Mock.mock({
        code: 1,
        msg: "success",
        page: page,
        nextPage: 1 + parseInt(page),
        "list|10": [{
            id: "@integer(1,100000)",
            "imgurl|+1": [
                'https://picnew9.photophoto.cn/20150518/shineisheyingtupian-10730250_1.jpg'
                , 'https://picnew3.photophoto.cn/20090108/jingmeijiajushineitupiansucai10-09435866_1.jpg'
                , 'https://pic.ntimg.cn/2008-04-01/200841223857645_2.jpg'
                , 'https://picnew9.photophoto.cn/20150518/shineisheyingtupian-10730250_1.jpg'
                , 'https://picnew3.photophoto.cn/20090108/jingmeijiajushineitupiansucai10-09435866_1.jpg'
                , 'https://pic.ntimg.cn/2008-04-01/200841223857645_2.jpg'
                , 'https://picnew9.photophoto.cn/20150518/shineisheyingtupian-10730250_1.jpg'
                , 'https://picnew3.photophoto.cn/20090108/jingmeijiajushineitupiansucai10-09435866_1.jpg'
                , 'https://pic.ntimg.cn/2008-04-01/200841223857645_2.jpg'
                , 'https://picnew9.photophoto.cn/20150518/shineisheyingtupian-10730250_1.jpg'
                , 'https://picnew3.photophoto.cn/20090108/jingmeijiajushineitupiansucai10-09435866_1.jpg'
                , 'https://pic.ntimg.cn/2008-04-01/200841223857645_2.jpg'
                , 'https://picnew9.photophoto.cn/20150518/shineisheyingtupian-10730250_1.jpg'
                , 'https://picnew3.photophoto.cn/20090108/jingmeijiajushineitupiansucai10-09435866_1.jpg'
                , 'https://pic.ntimg.cn/2008-04-01/200841223857645_2.jpg'
            ],
            name: "@cword(2,4)",
            city: city,
            keyword: keyword ? keyword : '',
            title: function () {
                return this.name + keyword;
            },
            info: {
                msg: "@cword(5,8)",
                "type|1": ['小型', '中型', '大型']
            },
            price: "@integer(50,10000)"
        }]

    }))
})

// 请求单个商品(id)
// 数据格式： {图片，名称，标题,详情{层数，面积，类型}，价钱}

router.get('/getGoodsItem', (req, res) => {
    let id = req.query.id;
    let city = req.query.city;
    // console.log(city)
    res.send(Mock.mock({
        code: 1,
        goodsitem: {
            code: 1,
            id: id,
            imgList: getImg(imgArr),
            name: "@cword(1,3)",
            city: city,
            title: function () {
                return city + this.name;
            },
            company: "@cword(2,5)" + '有限公司',
            addr: "@cword(2,4)" + '区',
            material: "@cword(5,8)",
            height: "@integer(20,200)" + 'cm',
            "type|1": ['小型', '中型', '大型'],
            price: "@integer(50,10000)",
            tem: "@cparagraph(10,20)",
            details: function () {
                return this.title + "，" + this.tem;
            }
        }

    }))
})

// 评价接口，参数（图片id,页码）
// 返回：{
//     goodeId:0,
//     userName:'',
//     page:1，
//     nextPage:+page+1,
//     commitList:[{
//         userId:"@integer(10000000000,18999999999)",
//         star:"@integer(1,5)",
//         content:"@cparagraph(1,2)"
//     }]
// }
router.get('/getGoodsCommit', (req, res) => {
    let id = req.query.id;
    let page = req.query.page;
    // console.log(id, page);
    res.send(Mock.mock({
        id: id,
        page: +page,
        nextPage: +page + 1,
        "commitList|10": [{
            commitId: "@integer(100000000,999999999)",
            userId: "@integer(100000000,999999999)",
            Tel: "@integer(10000000000,18999999999)",
            userName: '@cword(2,4)',
            star: "@integer(1,5)",
            content: "@cparagraph(1,2)",
            time: "@time(yyyy-MM-dd)"
        }]

    }))
})
// ====================================== mockjs 随机生成数据========向上================================



// ======================================用户操作区========向下================================
// 模拟数据库->登录注册-------------------向下------------------------------------------------------------------
// 模拟数据库 [{
//     sername,
//     tel,
//     age,
//     addr
// }]
// let mysql_user = [{
//     sername: '岑宇',
//     tel: '',
//     age: '',
//     add: ''
// }];
let mysql_user = [{
    username: '岑宇',
    age: '24',
    tel: '13217427986',
    addr: '贵州省-晴隆县-某某镇'
}];
// 查询,返回用户信息和索引
function select(user, arr) {
    let obj = { msg: '用户不存在', index: 0, userInfo: {} };
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].username == user.username) {
            obj.msg = '用户存在';
            obj.index = i;
            obj.userInfo = arr[i];
            return obj;
        }
    }
    return obj;
}
// 登录|新增
function add(user, arr) {
    let str = '';
    let { msg } = select(user, arr);
    if (msg == '用户不存在') {
        arr.push(user);
        str = '注册成功';
    }
    if (msg == '用户存在') {
        str = '用户已存在'
    }
    return str;
}
// 退出登录
function del(user, arr) {
    let str = '注销失败';
    let { msg, index } = select(user, arr);
    // console.log({msg,index})
    if (msg == '用户存在') {
        arr.splice(index, 1);
        str = "注销成功";
    }
    // console.log(mysql_user)
    return str;
}
// 修改用户
function edit(user, arr) {
    let str = '修改失败';
    let { msg, index } = select(user, arr)
    if (msg == '用户存在') {
        arr[index] = user;
        str = '修改成功';
    }
    return str;
}

// 注册用户
router.post('/register', (req, res) => {
    let user = {
        username: req.body.sername,
        age: req.body.age,
        addr: req.body.addr,
        tel: req.body.tel
    };
    if (user.username == '' || user.username == null) {
        res.send({
            code: 2,
            msg: '用户名不能为空',
        })
    } else {
        var msg = add(user, mysql_user);
        console.log(mysql_user)
        if (msg == "注册成功") {
            res.send({
                code: 1,
                msg: msg
            })
        } else {
            res.send({
                code: 0,
                msg: msg
            })
        }
    }
});
// 用户登录
router.post('/login', (req, res) => {
    let user = {
        username: req.body.sername,
    };
    if (user.username == '' || user.username == null) {
        res.send({
            code: 2,
            msg: '用户名不能为空',
        })
    } else {
        var { msg } = select(user, mysql_user);
        if (msg == "用户存在") {
            res.send({
                code: 1,
                msg: msg
            })
        } else {
            res.send({
                code: 0,
                msg: msg
            })
        }
    }
});


// 注销用户
router.post('/delUser', (req, res) => {
    let user = {
        username: req.body.sername,
        age: req.body.age,
        addr: req.body.addr,
        tel: req.body.tel
    };
    console.log(user);
    var msg = del(user, mysql_user);
    if (msg == "注销成功") {
        res.send({
            code: 1,
            msg: msg
        })
    } else {
        res.send({
            code: 0,
            msg: msg
        })
    }
});

// 退出登录功能此处没有用户状态,故没有做,要想退出登录,前端直接删除redux和浏览器本地存储就可.


//修改用户信息
router.post('/editUser', (req, res) => {
    let user = {
        username: req.body.sername,
        age: req.body.age,
        addr: req.body.addr,
        tel: req.body.tel
    };
    console.log(user);
    var msg = edit(user, mysql_user);
    if (msg == "修改成功") {
        res.send({
            code: 1,
            msg: msg
        })
    } else {
        res.send({
            code: 0,
            msg: msg
        })
    }
});
// 查询用户
router.get('/selUser', (req, res) => {
    let user = req.query;
    console.log(user);
    var obj = select(user, mysql_user);
    if (obj.msg == "用户存在") {
        res.send({
            code: 1,
            msg: obj.msg,
            user: obj.userInfo
        })
    } else {
        res.send({
            code: 0,
            msg: obj.msg,
            user: { username: '', age: '', addr: '', tel: '' }
        })
    }
});

// 模拟数据库->登录注册-------------------向上--------------------------------------------------------


// 模拟数据库->收藏（用户，商品信息s）----------------向下------------------------------------------
// {unsername,goodstitle,goodsid,price}
let mysql_goods_shoucang = [];
function addShoucang(data) {
    for (let i = 0; i < mysql_goods_shoucang.length; i++) {
        if (!(mysql_goods_shoucang[i].username == data.username && mysql_goods_shoucang[i].title == data.title && mysql_goods_shoucang[i].id == data.id)) {
            continue;
        } else {
            return '早已被收藏';
        }
    }
    mysql_goods_shoucang.push(data);
    // console.log(mysql_goods_shoucang);
    return '已收藏';
}
function delShoucang(data) {
    for (let i = 0; i < mysql_goods_shoucang.length; i++) {
        if (mysql_goods_shoucang[i].username == data.username && mysql_goods_shoucang[i].title == data.title && mysql_goods_shoucang[i].id == data.id) {
            mysql_goods_shoucang.splice(i, 1);
            return '已取消';
        }
    }
    return '';
}
function selShoucang(data) {
    for (let i = 0; i < mysql_goods_shoucang.length; i++) {
        if (mysql_goods_shoucang[i].username == data.username && mysql_goods_shoucang[i].title == data.title && mysql_goods_shoucang[i].id == data.id) {
            return 1;
        }
    }
    return 0;
}

// 所有收藏信息
function selAllShoucang(username) {
    let arr = [];
    for (let i = 0; i < mysql_goods_shoucang.length; i++) {
        if (mysql_goods_shoucang[i].username == username) {
            arr.push(mysql_goods_shoucang[i])
        }
    }
    return arr;
}

// api
router.post('/setShoucang', (req, res) => {
    let data = {
        username: req.body.sername,
        title: req.body.title,
        id: req.body.id,
        price: req.body.price,
        city: req.body.city,
        company: req.body.company,
        imgurl: req.body.imgurl,
        off: req.body.off
    }
    let off = req.body.off;
    if (off == 'true') {
        let msg = addShoucang(data);
        if (msg != null) {
            res.send({
                msg: msg,
                code: 1
            })
        } else {
            res.send({
                msg: '收藏失败',
                code: 0
            })
        }
    } else {
        console.log(111111)
        let msg1 = delShoucang(data);
        console.log(msg1, 00000)
        if (msg1 == '已取消') {
            res.send({
                msg: msg1,
                code: 1
            })
        } else {

            res.send({
                msg: '取消失败',
                code: 0
            })
        }

    }
    // console.log(mysql_goods_shoucang);
});

// 单个检验收藏
router.get('/getShoucang', (req, res) => {
    let data = {
        username: req.query.username,
        title: req.query.title,
        id: req.query.id
    }
    console.log(data, selShoucang(data))
    if (selShoucang(data) == 1) {
        res.send({
            code: 1,
            msg: '存在收藏'
        })
    } else {
        res.send({
            code: 0,
            msg: '未收藏'
        })
    }
})

//查询所有收藏
router.get('/getAllShoucang', (req, res) => {
    let username = req.query.username;
    let collect = selAllShoucang(username);
    if (collect.length > 0) {
        res.send({
            code: 1,
            msg: '存在收藏',
            collect: collect
        })
    } else {
        res.send({
            code: 0,
            msg: '暂无收藏',
            collect: []
        })
    }
})

// 模拟数据库->收藏（用户，商品信息）---------------向上-------------------------------------------


// 模拟数据库->地址信息（用户，地址（省 市 区 详细地址，电话）------向下-------------------
let id2 = 0;  //adrrsid
let id1 = 0;  //adrrsid
let mysql_addrs = [{
    username: '岑宇',
    addrs: [{
        addrid: 0,
        province: '贵州省',
        city: '晴隆',
        area: '鸡场镇',
        detailsAddr: '默默模',
        tel: '18888888888',
        username: '岑宇'
    },
    {
        addrid: 1,
        province: '贵州省',
        city: '晴隆',
        area: '鸡场镇',
        detailsAddr: '某某街道',
        tel: '18888888888',
        username: '岑宇'
    }]
}];

// for(let i = 0 ; i <arr.length ;i++){

// }

// 获取最大id
function getMaxId(arr) {
    return arr.length <= 0 ? 0 : +arr[arr.length - 1].addrid + 1;
}

// sel
function selUserAddr(data) {
    for (let i = 0; i < mysql_addrs.length; i++) {
        if (mysql_addrs[i].username == data.username) {
            return {
                index: i,
                code: 1,
            }
        }
    }
    return {
        index: -1,
        code: 0
    }
}

// add
function addUserAddr(data) {
    let userAddr = selUserAddr(data);
    if (userAddr.code == 1) {
        if (data.addr.addrid == '') {
            mysql_addrs[userAddr.index].addrs.push({ ...data.addr, addrid: getMaxId(mysql_addrs[userAddr.index].addrs) });
            return '新增成功';
        }
        for (let i = 0; i < mysql_addrs[userAddr.index].addrs.length; i++) {
            if (mysql_addrs[userAddr.index].addrs[i].addrid == data.addr.addrid) {
                mysql_addrs[userAddr.index].addrs[i].province = data.addr.province;
                mysql_addrs[userAddr.index].addrs[i].city = data.addr.city;
                mysql_addrs[userAddr.index].addrs[i].area = data.addr.area;
                mysql_addrs[userAddr.index].addrs[i].tel = data.addr.tel;
                mysql_addrs[userAddr.index].addrs[i].detailsAddr = data.addr.detailsAddr;
                console.log(mysql_addrs[userAddr.index].addrs[i].addrid, data.addr.addrid, 999)
                return '修改成功';
            }
        }
    } else {
        data.addr.addrid = 0;
        mysql_addrs.push(data);
        console.log(mysql_addrs);
        return '用户首次新增地址成功';
    }
}

//delUserAddr
function delUserAddr(data) {
    let userAddr = selUserAddr(data);
    let addrTemp = mysql_addrs[userAddr.index].addrs;
    for (let i = 0; i < mysql_addrs[userAddr.index].addrs.length; i++) {
        if (mysql_addrs[userAddr.index].addrs[i].addrid == data.addr.addrid) {
            mysql_addrs[userAddr.index].addrs.splice(i, 1);
            return {
                msg: '删除成功',
                code: 1
            }
        }
    }
    return {
        msg: '删除失败',
        code: 0
    }
}

//查询所有地址 {username}
router.get('/getAllAddrs', (req, res) => {
    let data = req.query;
    let { index, msg } = selUserAddr(data)
    let addrs = mysql_addrs[index].addrs;
    // console.log(data,addrs);
    if (addrs.length > 0) {
        res.send({
            code: 1,
            msg: '存在地址',
            addrs: addrs
        })
    } else {
        res.send({
            code: 0,
            msg: '暂无地址',
            addrs: []
        })
    }
})

// 新增和修改地址信息 username,addrid
router.post('/addAeditUserAddrs', (req, res) => {
    let data = {
        username: req.body.sername,
        addr: {
            addrid: req.body.addrid,
            username: req.body.sername,
            province: req.body.province,
            city: req.body.city,
            area: req.body.area,
            tel: req.body.tel,
            detailsAddr: req.body.detailsAddr
        }
    };
    let msg = addUserAddr(data);
    if (msg == '修改成功') {
        res.send({
            code: 2,
            msg: msg
        })
    } else if (msg == '新增成功') {
        //用户首次新增
        res.send({
            code: 1,
            msg: msg
        })
    } else {
        res.send({
            code: 0,
            msg: msg
        })
    }
})

// 删除地址
router.post('/delAddr', (req, res) => {
    let data = {
        username: req.body.sername,
        addr: {
            addrid: req.body.addrid,
        }
    };
    let { msg, code } = delUserAddr(data);
    console.log(data, msg);
    if (code == 1) {
        res.send({
            code: 1,
            msg: msg
        })
    } else {
        //删除失败
        res.send({
            code: 2,
            msg: msg
        })
    }
})
// 模拟数据库->地址信息（用户，地址（省 市 区 详细地址（），电话）------向上-------------------



// 模拟数据库->购物车信息（用户，商品）------向下-------------------
// 数据结构
// data = {
//     username: req.body.sername,
//     title: req.body.title,
//     id: req.body.id,

//     price: req.body.price,
//     city: req.body.city,
//     company: req.body.company,
//     imgurl: req.body.imgurl,
//     off: req.body.off
// }
let mysql_car = [
    {
        username: '岑宇',
        title: '广州资地',
        id: '14994015',
        price: '7193',
        city: '广州',
        company: '八己有限公司',
        imgurl: 'https://picnew3.photophoto.cn/20090108/jingmeijiajushineitupiansucai10-09435866_1.jpg'
    },
    {
        username: '岑宇',
        title: '广州确物',
        id: '10421470',
        price: '9944',
        city: '广州',
        company: '般速有限公司',
        imgurl: 'https://picnew9.photophoto.cn/20150518/shineisheyingtupian-10730250_1.jpg'
    },

]

// for(let i = 0 ; i <arr.length ;i++){

// }
function selUserCar(data) {
    for (let i = 0; i < mysql_car.length; i++) {
        if (mysql_car[i].username == data.username && mysql_car[i].id == data.id && mysql_car[i].title == data.title) {
            return {
                msg: '存在于购物车',
                code: 1,
                index: i
            }
        }
    }
    return {
        msg: '不在购物车',
        code: 0,
        index: -1
    }
}
// 查询所有购物车信息
function selAllCar(data) {
    let allCar = [];
    for (let i = 0; i < mysql_car.length; i++) {
        if (mysql_car[i].username == data.username) {
            allCar.push(mysql_car[i]);
        }
    }
    return allCar;
}

// 新增购物车数据
function addUserCar(data) {
    let { msg, index, code } = selUserCar(data);
    if (code == 1) {
        return {
            code: 0,
            msg: "加入失败"
        };
    }
    mysql_car.push(data);
    return {
        code: 1,
        msg: "加入成功"
    }
}
// 删除
function delUserCar(data) {
    let { msg, index, code } = selUserCar(data);
    mysql_car.splice(index, 1);
    if (selUserCar(data).code == 1) {
        return {
            code: 0,
            msg: "删除失败"
        }
    }
    return {
        code: 1,
        msg: "删除成功"
    }
}

// 修改
function editUserCar(data) {
    let { msg, index, code } = selUserCar(data);
    if (code == 1) {
        mysql_car[index] = data;
        return {
            code: 1,
            msg: "修改成功"
        }
    }
    return {
        code: 0,
        msg: "修改失败"
    }
}

// api
// 单个商品检验是否在购物车
router.get('/selCarItme', (req, res) => {
    let data = {
        username: req.query.username,
        title: req.query.title,
        id: req.query.id
    }
    // console.log(data, selUserCar(data))
    if (selUserCar(data) == 1) {
        res.send({
            code: 1,
            msg: '已加入购物车'
        })
    } else {
        res.send({
            code: 0,
            msg: '未加入购物车'
        })
    }
})

// 加入购物车
router.post('/addBuyCar', (req, res) => {
    let data = {
        username: req.body.sername,
        title: req.body.title,
        id: req.body.id,
        price: req.body.price,
        city: req.body.city,
        company: req.body.company,
        imgurl: req.body.imgurl,
    }
    let { msg, code } = addUserCar(data);
    // console.log(mysql_car)
    if (code == 1) {
        res.send({
            msg: msg,
            code: 1
        })
    } else {
        res.send({
            msg: msg,
            code: 0
        })
    }
});

// 查询所有购物车信息
router.get('/selAllCar', (req, res) => {
    let data = {
        username: req.query.username,
    }
    let allCar = selAllCar(data);
    console.log(allCar)
    if (allCar.length > 0) {
        res.send({
            msg: "存在购物车",
            code: 1,
            car: allCar
        })
    } else {
        res.send({
            msg: "无购物车",
            code: 0,
            car: allCar
        })
    }
});

// 删除购物车数据
router.post('/delCarItem', (req, res) => {
    let data = {
        username: req.body.username,
        title: req.body.title,
        id: req.body.id
    }
    let { msg, code } = delUserCar(data);
    console.log(mysql_car)
    if (code == 1) {
        res.send({
            msg: msg,
            code: 1,
        })
    } else {
        res.send({
            msg: msg,
            code: 0,
        })
    }
});




// 模拟数据库->购物车信息（用户，商品）------向上-------------------






// =======================================用户操作区=======向上=============================

// 路由配置-------------------------

module.exports = router;