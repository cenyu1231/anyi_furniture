import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navtabsCss.less';

class NavTabs extends Component {
    state = {  } 
    render() { 
        return (<div className='my-tabs'>
            <div>
                <NavLink exact to='/'>
                    <i className='iconfont icon-index'/><span>首页</span>
                </NavLink >
            </div>
            <div>
                <NavLink to='/goods'>
                    <i className='iconfont icon-shangcheng'/><span>商城</span>
                </NavLink>
            </div>
            <div>
                <NavLink to='/my'>
                    <i className='iconfont icon-wode'/><span>我的</span>
                </NavLink>
            </div>   
        </div>);
    }
}
 
export default NavTabs;