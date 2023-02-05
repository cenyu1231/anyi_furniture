import { fetchGet,fetchPost } from './http';

// 请求轮播图数据
export const getSwiper = (url ,data)=>fetchGet(url,data);

// 请求热门数据
export const getHotRecommend = (url ,data)=>fetchGet(url,data);

// 请求精品数据
export const getFestRecommend = (url ,data)=>fetchGet(url,data);

// 请求商品列表
export const getGoodsList = (url ,data)=>fetchGet(url,data);

// 请求单个商品
export const getGoodsItem = (url ,data)=>fetchGet(url,data);

// 请求该商品下的所有评论
export const getGoodsCommit = (url ,data)=>fetchGet(url,data);



// 登录
export const register = (url ,data)=>fetchPost(url,data);
// 注册
export const login = (url ,data)=>fetchPost(url,data);

// 注销用户
export const delUser = (url ,data)=>fetchPost(url,data);

// 退出登录
// 退出登录功能此处没有用户状态,故没有做,要想退出登录,前端直接删除redux和浏览器本地存储就可.

// 修改用户信息
export const editUser = (url ,data)=>fetchPost(url,data);

// 查询用户信息
export const selUser = (url ,data)=>fetchGet(url,data);



// 收藏和取消收藏
export const setShoucang = (url ,data)=>fetchPost(url,data);

// 单个检验收藏
export const getShoucang = (url ,data)=>fetchGet(url,data);

// 所有收藏
export const getAllShoucang = (url ,data)=>fetchGet(url,data);


// 查询所有地址
export const getAllAddrs = (url ,data)=>fetchGet(url,data);

// 新增、修改地址
export const addAeditUserAddrs = (url ,data)=>fetchPost(url,data);

// 删除地址
export const delAddr = (url ,data)=>fetchPost(url,data);


// 购物车
// 查询商品是否在购物车中
export const selCarItme = (url ,data)=>fetchGet(url,data);

// 查询购物车中的所有商品
export const selAllCar = (url ,data)=>fetchGet(url,data);

// 加入购物车
export const addBuyCar = (url ,data)=>fetchPost(url,data);

// 移出购物车
export const delCarItem = (url ,data)=>fetchPost(url,data);