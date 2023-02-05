import './starCss.less';


// 自制星星组件，传入红星数量(star)和总星（starNum）数量

function StarDeal(props) {
    let arr = [];
    for(let i = 0 ; i < props.starNum ; i++){
        arr[i] = 0;
    }
    return (<>
    {/* 就五个星星 */}
        {arr.map((ele1, idx) => (
            <i className={idx < props.star ? 'iconfont icon-xingxing hong' : 'iconfont icon-xingxing'} key={idx} />
        ))}
    </>)
}

export default StarDeal;