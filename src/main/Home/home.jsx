import React, { Component } from 'react';
import NavTabs from '../../components/footNav/navtabs';
import Header from './com/header';
import Recommend from './com/recommend';
import { getFestRecommend ,getHotRecommend, getSwiper } from './../../api/api';
import { connect } from 'react-redux';
import SwipePlayer from '../../components/mySwiper/swipePlayer';

class Home extends Component {
    state = {
        hotRecomment: [],  //热门数据
        festRecomment: [],  //精品数据
        images:[]
    }
    componentDidMount() {
        let that = this;
        getHotRecommend('/getHotRecommend', { city: this.props.city }).then(res => {
            that.setState({
                hotRecomment: res.list
            })
        });
         getFestRecommend('/getFestRecommend', { city: this.props.city }).then(res => {
            that.setState({
                festRecomment: res.list
            })
        });
        getSwiper('/getSwiper').then(res=>{
            that.setState({
                images:res.imgList
            })
        })
         
    }
    render() {
        // console.log(this.state)
        return (<div>
            {/* 头部 */}
            <Header city={this.props.city} />
            {/* 轮播图组件 */}
            <div style={{"height":"3.2rem"}}>
                <SwipePlayer images={this.state.images} />
            </div>
            {/* 精品推荐 */}
            <Recommend category="精品推荐" list={this.state.festRecomment} />
            {/* 热门推荐 */}
            <Recommend category="热门推荐" list={this.state.hotRecomment} />
            {/* 底部 */}
            <NavTabs />
        </div>);
    }
}

export default connect((state) => (state))(Home);