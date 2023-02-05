import React, { Component } from 'react';
import { addBuyCar, getGoodsCommit, getGoodsItem, setShoucang } from '../../../api/api';
import ComHeader from '../../../components/comHeader/comHeader';
import SwipePlayer from '../../../components/mySwiper/swipePlayer';
import MyTabs from './tabs/myTabs';
import './details.less';
import StarDeal from '../../../components/starDeal/starDeal';
import LoadingMore from '../../../components/LoadingMore/loadingMore';
import { getShoucang, selCarItme } from './../../../api/api';
import { connect } from 'react-redux';

class Details extends Component {
    state = {
        goods: [],  //一个商品的所有图片
        goodsInfo: {},  //一个商品所有信息
        page: 1,
        commits: [], // 评论
        goodsid: this.props.match.params.id,
        off: true,  // 可被收藏（未收藏）
        carOff: true, //可以加入购物车。
    }
    componentDidMount() {
        // console.log(this.props)
        this.setState({
            goodsid: this.props.match.params.id
        })
        // 
        this.init();
        this.getMore();

    }
    // init
    init = () => {
        let that = this;
        // 刷新保存页面上----------------------------
        var detailsCity = '';
        var detailsCommitpage = localStorage.getItem('detailsCommitpage');

        if (this.props.location.city) {
            detailsCity = this.props.location.city;
        } else {
            // console.log(222)
            detailsCity = localStorage.getItem('detailsCity');
        }
        if (detailsCommitpage) {
            this.setState({
                page: localStorage.getItem('detailsCommitpage')
            });
        } else {
            // console.log(222)
            this.setState({
                page: 1
            });
        }
        // 刷新保存页面下---------------------------------

        getGoodsItem('/getGoodsItem', { id: this.props.match.params.id, city: detailsCity }).then(res => {
            localStorage.setItem('detailsCity', res.goodsitem.city);
            // console.log(res.goodsitem)
            that.setState({
                goods: res.goodsitem.imgList,
                goodsInfo: res.goodsitem
            }, () => {
                // 初始化收藏
                getShoucang('/getShoucang', { username: this.props.user, title: this.state.goodsInfo.title, id: this.state.goodsid }).then(res => {
                    // console.log(111)
                    if (res.code == 0) {  //未被收藏
                        this.setState({
                            off: true  //可以收藏
                        })
                    }
                    if (res.code == 1) {
                        this.setState({
                            off: false
                        })
                    }
                });
                // 初始化检验购物车
                selCarItme('/selCarItme', { username: this.props.user, title: this.state.goodsInfo.title, id: this.state.goodsid }).then(res => {
                    // console.log(res)
                    if (res.code == 1) {
                        this.setState({
                            off: false  //可以购买
                        })
                    }
                    if (res.code == 0) {  //未被收藏
                        this.setState({
                            off: true  //可以加入购物车
                        })
                    }
                })
            })
        });
    }

    // 封装方法，方便加载更多组件使用
    getMore = () => {
        getGoodsCommit('/getGoodsCommit', { id: this.state.goodsid, page: this.state.page }).then(res => {
            localStorage.setItem('detailsCommitpage', res.page);
            this.setState({
                commits: [...this.state.commits, ...res.commitList],
                page: res.nextPage
            });
        })
    }
    // 影藏电话的功能
    formateTel(num) {
        let str = '' + num;
        let qian = str.substring(0, 3);
        let hou = str.substring(8);
        return qian + "****" + hou;
    }
    // 收藏函数：先判断登录，再看是否能收藏
    shoucang = () => {
        if (!localStorage.getItem('lg' || this.props.user == null)) {
            this.props.history.push('/my/login');
        } else {
            setShoucang('/setShoucang', {
                username: this.props.user
                , title: this.state.goodsInfo.title
                , id: this.state.goodsid
                , off: this.state.off
                , price: this.state.goodsInfo.price
                , city: this.state.goodsInfo.city
                , company: this.state.goodsInfo.company
                , imgurl: this.state.goods[0]
            }).then(res => {
                if (res.code == 1) {
                    this.setState({
                        off: !this.state.off
                    })
                }
            })

        }
    }
    // 购买功能：先判断时候登陆状态，如果是的话首次加载显示"加入购物车",加入购物车信息后显示”购买“，跳转到购物车页面实现操作。
    buyCar = () => {
        if (!localStorage.getItem('lg' || this.props.user == null)) {
            this.props.history.push('/my/login');
        } else {
            // console.log(111)
            addBuyCar('/addBuyCar', {
                username: this.props.user
                , title: this.state.goodsInfo.title
                , id: this.state.goodsid
                , price: this.state.goodsInfo.price
                , city: this.state.goodsInfo.city
                , company: this.state.goodsInfo.company
                , imgurl: this.state.goods[0]
            }).then(res => {
                console.log(res);
                if (res.code == 1) {
                    this.setState({
                        carOff:false  //不可再加入，但是显示购买，购买会跳转购物车
                    })
                }
            })
        }
    }
    // 跳转到购物车页面
    toCar = () =>{
        this.props.history.push('/my/car');
    };

    render() {
        const goods = this.state.goodsInfo;
        return (<div>
            {/* 头部/静置定位 */}
            <div>
                <ComHeader title="商品详情" />
                <div style={{ "height": "43px", "color": "#ffffff" }}>我是静置定位占位元素</div>
            </div>

            {/* 轮播图 */}
            <div style={{ "height": "4rem" }}>
                <SwipePlayer images={this.state.goods} />
            </div>
            {/* 选项卡自实现 */}
            <MyTabs defaultValue='1'>
                <div tab="商品信息" key='1' >
                    <div className='goodsItem'>
                        <div >
                            商品：{goods.title}
                        </div>
                        <div>
                            发货地址：{goods.city} - {goods.addr} - {goods.company}
                        </div>
                        <div>
                            制作材料：{goods.material}
                        </div>
                        <div>
                            参数：<span style={{ "color": "red" }}>{goods.price}￥</span> / {goods.type} / {goods.height}
                        </div>
                        <div>
                            详细：<p>{goods.details}</p>
                        </div>
                    </div>
                </div>
                <div tab="评价" key='2'>
                    {
                        this.state.commits.map((ele) => (<div key={ele.commitId} className='pingjia'>
                            <div>
                                <i className="iconfont icon-wode" />
                                {this.formateTel(ele.Tel)}
                            </div>
                            <div className='pingjia-xingtime'>
                                {/* 自制星星组件，传入红星数量和总星（starNum）数量 */}
                                <StarDeal star={ele.star} starNum='5' />
                                <span>{ele.time}</span>
                            </div>
                            <div className='pingjia-content'>
                                {ele.content}
                            </div>
                        </div>))
                    }
                    {/* 加载更多 */}
                    <div style={{ "position": "absolute", left: 0, right: 0 }}>
                        <LoadingMore GetList={this.getMore} />
                    </div>
                </div>
            </MyTabs>
            {/* 收藏和购买 */}
            <div className='func'>
                <button onClick={this.shoucang} className={this.state.off ? "" : "yishoucang"}> {this.state.off ? <span>收藏</span> : <span>已收藏</span>}</button>
                {this.state.carOff ? (<button onClick={this.buyCar}>加入购物车</button>) : (<button onClick={this.toCar} className={this.state.carOff ? "" : "yishoucang" }  >购买</button>)}
            </div>
        </div>);
    }
}

export default connect((state) => (state))(Details);