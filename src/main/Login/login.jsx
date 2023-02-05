import React, { Component } from 'react';
import { login, register } from '../../api/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from '../../store/action/userAction';

class Login extends Component {
    state = {
        username: '',
        msg: '',
        userStatus: true  //可登录
    }
    // change
    setUsername = (e) => {
        this.setState({
            username: e.target.value,
            msg:''
        })
    }
    // 注册
    register = () => {
        register('/register', { username: this.state.username, tel: '', age: '', addr: '' }).then(res => {
            // console.log(res);
            this.setState({
                msg: res.msg
            })
        })
    }
    // denglu
    login = () => {
        login('/login', { username: this.state.username }).then(res => {
            // console.log(res);
            if (res.code === 1) {
                this.setState({
                    msg: '登陆中...'
                })
                this.props.setUser(this.state.username);
                localStorage.setItem('lg', this.state.username)
                setTimeout(() => {
                    window.history.back();
                }, 2000);
            }else{
                this.setState({
                    msg: res.msg
                })
            }
        })
    }
    render() {
        return (<div style={{ "textAlign": "center", "backgroundColor": "#f0f0f0", "width": "4rem", height: "3.5rem", padding: "20px 10px", boxSizing: "border-box", border: "1px solid #a3a3a3", margin: "40% auto 0", boxShadow: "0 0 100px 5px #3333ff", borderRadius: "20px" }}>
            <h2 style={{ "textShadow": "0 0 2px #6060ff" }}>安逸家具</h2>
            <br />
            <input style={{ "width": "100%", "boxSizing": "border-box" }} type="text" placeholder='用户名' value={this.state.username} onChange={this.setUsername} />
            <br />
            <div style={{"color":"red",height:"20px", lineHeight:'20px',margin:"5px 0 5px 0"}}>{this.state.msg}</div>
            <button style={{ "backgroundColor": "#8888ff", padding: "2px 10px", marginRight: "10px" }} onClick={() => (window.history.back())}>返回</button>

            <button style={{ "backgroundColor": "#8888ff", padding: "2px 10px" }} onClick={this.login}>登录</button>
            <button style={{ "backgroundColor": "#8888ff", padding: "2px 10px" }} onClick={this.register}>注册</button>
        </div>);
    }
}

export default connect((state) => (state), (dispatch) => (bindActionCreators(userAction, dispatch)))(Login);