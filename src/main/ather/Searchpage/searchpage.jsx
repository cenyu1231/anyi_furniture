import SearchInput from "../../../components/searchInput/SearchInput";
import './searchCss.less';
import { withRouter } from 'react-router-dom';
import GoodsList from "./goodsList/goodsList";
import { useEffect } from 'react';
import { getGoodsList } from '../../../api/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cityAction from '../../../store/action/cityAction';
import { useState } from 'react';
import LoadingMore from "../../../components/LoadingMore/loadingMore";

function Searchpage(props) {
    // 数据
    const [page, setPage] = useState(1);
    // 商品列表
    const [list, setList] = useState([]);
    const [keyword1, setKeyword1] = useState('');

    useEffect(() => {
        GetList();
    }, [props.match.params.keyword])

    // 封装获取数据的方法，好下传为参数
    function GetList(){
        getGoodsList('/getGoodsList', { city: props.city, keyword: props.match.params.keyword, page: page }).then(res => {
            // console.log(res)
            // 关键字有变化就清空list再重新赋值
            setPage(page+1);
            if(keyword1 != props.match.params.keyword){
                setList(res.list);
                setKeyword1(props.match.params.keyword);
                return ;
            } 
            setList([...list,...res.list]);
        })
    }

    // 转发功能实现点击图标跳转
    const myref = { current: null };
    function getTo() {
        // 转发获取子组件的元素的值
        if (myref.current.value == null || myref.current.value == '') {
            return;
        }
        props.history.push('/searchpage/' + myref.current.value);
    }
    // 返回功能
    function Back() {
        // 这里使用window对象的下的history下面的back方法
        window.history.back();
    }
   
    return (<div id="searchpage">
        <div id="searchpage-header">
            <i className="iconfont icon-fanhui" onClick={Back} />
            {/* <SearchInput/> */}
            <div className="searchpage-input" >
                <i className="iconfont icon-sousuo" onClick={getTo} />
                <SearchInput myref={myref} />
            </div>
        </div>
        {/* 填充静态定位 */}
        <div className="tianchongdingwei">填充静态定位</div>
        {/* 商品列表 */}
        <GoodsList list={list} />
        {/* 加载更多组件 */}
        <LoadingMore GetList={GetList}/>
    </div>)
}

export default connect((state) => ({ city: state.city }), (dispatch) => (bindActionCreators(cityAction, dispatch)))(withRouter(Searchpage));