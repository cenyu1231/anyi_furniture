import './comHeaderCss.less';

// 默认静置定位
export default function ComHeader(props) {
    function Back(){
        // 这里使用window对象的下的history下面的back方法
        window.history.back();
    }
    return (<div id="header">
        <i className="iconfont icon-fanhui" onClick={Back}/>
        <span>{props.title}</span>
    </div>)
}