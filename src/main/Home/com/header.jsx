import React, { Component } from 'react';
import './css/homeCss.less';
import { withRouter } from 'react-router-dom';
import SearchInput from '../../../components/searchInput/SearchInput';
class Header extends Component {
    // 转发功能实现点击图标跳转
    myref1 = { current: null };
    getTo = () => {
        // 转发获取子组件的元素的值
        if(this.myref1.current.value == null || this.myref1.current.value ==''){
            return ;
        }
        this.props.history.push('/searchpage/' + this.myref1.current.value);
    }

    toCity = () => {
        // console.log(this.props)
        this.props.history.push('/selectorcity');
    }
    render() {
        return (<div id='home-header'>
            <div className="home-header-left" onClick={this.toCity}>
                {/* 这里使用编程式跳转组件，注意本组件没有history对象，要记得处理：1、传history对象；2、高阶组件处理（withRouter） */}
                <span>{this.props.city}</span>
                <i className='iconfont icon-xialajiantou' />
            </div>
            <div className="home-header-middle">
                <div className="search-container">
                    <i className="iconfont icon-sousuo" onClick={this.getTo}/>
                    <SearchInput myref={this.myref1} />
                </div>
            </div>
            <div className="home-header-right">
                <i className="iconfont icon-gouwucheman" />
            </div>
        </div>);
    }
}

export default withRouter(Header);