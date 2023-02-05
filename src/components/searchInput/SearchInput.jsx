import './searchInput.less';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function SearchInput(props) {
const [keyword,setKeyword] = useState('');
useEffect(()=>{
    // 路由中有参数的话，赋值给新渲染的input
    if(props.match.params.keyword){
        setKeyword(props.match.params.keyword);
    }else{
        setKeyword('');  //保证没有传值有使用这个组件的组件不出错。
    }
},[props.match.params.keyword])
    function keyup(e) {
        // 回车键的编码十进制：13
        if(e.keyCode == 13){
            if(keyword == null || keyword ==''){
                return ;
            }
            props.history.push('/searchpage/'+keyword);
        } 
    }
    return (
        <input className='search-input' type="text"
        onKeyUp={keyup} 
        value={keyword} 
        onChange={(e)=> setKeyword(e.target.value)}
        ref={props.myref} />
    )
}

export default withRouter(SearchInput);