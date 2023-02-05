import React, { Component } from 'react';
import { getGoodsList } from '../../api/api';
import NavTabs from '../../components/footNav/navtabs';
import SearchInput from '../../components/searchInput/SearchInput';
import './goodsCss.less';
import { connect } from 'react-redux';
import LoadingMore from './../../components/LoadingMore/loadingMore';
import { Link } from 'react-router-dom';

class Goods extends Component {
    state = {
        page: 1,
        goods_list: []  //商品
    }
    // 初始化
    componentDidMount() {
        this.getMore();
    }
    // 提出方法进行封装
    getMore = () => {
        getGoodsList('/getGoodsList', { city: this.props.city, keyword: '', page: this.state.page }).then(res => {
            this.setState({
                page: +this.state.page + 1,
                goods_list: [...this.state.goods_list, ...res.list]
            })
        })
    }
    // 转发功能实现点击图标跳转
    myref2 = React.createRef();
    getTo = () => {
        // 转发获取子组件的元素的值
        if (this.myref2.current.value == null || this.myref2.current.value == '') {
            return;
        }
    }
    // 返回功能
    Back() {
        // 这里使用window对象的下的history下面的back方法
        window.history.back();
    }
    render() {
        return (<div id='goods-goods'>
            {/* 头部搜索 */}
            <div id="goods-header">
                <i className="iconfont icon-fanhui" onClick={this.Back} />
                {/* <SearchInput/> */}
                <div className="searchpage-input" >
                    <i className="iconfont icon-sousuo" onClick={this.getTo} />
                    <SearchInput myref={this.myref2} />
                </div>
            </div>
            {/* 商品展示 */}
            <div className='goods-goodsList'>
                {
                    this.state.goods_list.map((ele) => (
                        <div key={ele.id} className="goods_goodsitem">
                            <Link to={{ pathname: '/goods/details/' + ele.id, city: ele.city, keyword: ele.keyword }}>
                                <img src={ele.imgurl} alt={ele.name} />
                                <div className='goods-info'>
                                    <div>城市: {ele.city}</div>
                                    <div>商品: {ele.title}</div>
                                    <div>
                                        价格: <span style={{ "color": "red" }}>{ele.price}￥</span> / {ele.info.type}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            {/* 加载更多 */}
            <LoadingMore GetList={this.getMore} />
            <NavTabs />
        </div>);
    }
}

export default connect((state) => (state))(Goods);