import React, { Component } from 'react';
import NavTabs from '../../components/footNav/navtabs';
import { connect } from 'react-redux';
import './myCss.less';
import rightJiantou from '../../static/imgs/箭头 右.png';
import baseImg from '../../static/imgs/个人信息.png';
import addrImg from '../../static/imgs/地址.png';
import shoucangImg from '../../static/imgs/_收藏2小.png';
import gouwucheImg from '../../static/imgs/gouwuche.png';
import { bindActionCreators } from 'redux';
import userAction from '../../store/action/userAction';
import { Link } from 'react-router-dom';
class My extends Component {
    state = {
        userStatus: false, //未登录
    }

    // 登录和退出
    loginAeixt = () => {
        if (this.props.user) {
            this.props.setUser('');
            localStorage.removeItem('lg');
            return;
        }
        this.props.history.push('/my/login');
    }
    render() {
        return (<div>
            {/* 头部 */}
            <div className='my-header'>
                <span>安逸家具</span>
            </div>
            <div className='my-user'>用户： {this.props.user}</div>

            {/* 功能 */}
            <div className='my-func'>
                <Link to='/my/baseinfo' >
                    <div>
                        <img src={baseImg} alt="基本信息" />
                        基本信息
                        <img src={rightJiantou} alt="展开" />
                    </div>
                </Link>
                <Link to='/my/goodsorder' >
                    <div>
                        <img src={baseImg} alt="订单信息" />
                        订单信息
                        <img src={rightJiantou} alt="展开" />
                    </div>
                </Link>
                <Link to='/my/car' >
                    <div>
                        <img src={gouwucheImg} alt="购物之车" />
                        购物之车
                        <img src={rightJiantou} alt="展开" />
                    </div>
                </Link>
                <Link to='/my/collect' >
                    <div>
                        <img src={shoucangImg} alt="我的收藏" />
                        我的收藏
                        <img src={rightJiantou} alt="展开" />
                    </div>
                </Link>
                <Link to='/my/addrinfo' >
                    <div>
                        <img src={addrImg} alt="地址信息" />
                        地址信息
                        <img src={rightJiantou} alt="" />
                    </div>
                </Link>
            </div>
            {/* 退出、登录 */}
            <div className='loginExit-btn'>
                <span onClick={this.loginAeixt}>
                    {
                        this.props.user ? <button className='button-exit'>退出登录</button> : <button className='button-login'>登录</button>
                    }
                </span>
            </div>
            <NavTabs />
        </div>);
    }
}

export default connect((state) => (state), (dipatch) => (bindActionCreators(userAction, dipatch)))(My);