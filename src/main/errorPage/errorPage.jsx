import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ErrorPage extends Component {
    state = {  } 
    render() { 
        return (
            <div style={{textAlign:"center",marginTop:"2rem",}}>
                <h1 >404</h1>
                <p>您访问的页面不存在</p>
                <p>......</p> <br />
                <Link to='/' style={{color:"blue",}}>返回首页</Link>
            </div>
        );
    }
}
 
export default ErrorPage;