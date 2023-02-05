import ComHeader from './../../../../components/comHeader/comHeader';
import { useState } from 'react';
import { useEffect } from 'react';
import './orderDetailsCss.less';

function OrderDetails(props) {
    const [myOrder, setMyOrder] = useState({})
    console.log(props.location.state)
    useEffect(() => {
        init();
    }, [])
    // 初始化
    function init() {
        setMyOrder({
            totalPrice: props.location.state.totalPrice,
        })
    }
    return (<div style={{ "paddingTop": "50px", "position": "relative" }}>
        <ComHeader title='请下单' />
        <div id="order-content">
            {/* 生成订单和订单详情
            1、地址
            选着配送时间
            2、商品信息
            3、备注
            4、提交生成订单时同时生成下单时间、单号(年月日时分秒处理成的字符串) */}
            {/* 地址块 */}
            <div className='order-com order-addr'>
                收获地址
            </div>
            {/* 商品详细说明区域 */}
            <div className='order-com order-details'>
                商品详细数据
            </div>
            {/* 备注 */}
            <div className="order-com">
                备注
            </div>
        </div>

        {/* 价格显示 */}
        <div id='order-btm'>
            <div><span>￥</span>{myOrder.totalPrice}</div>
            <div>找人付</div>
            <div>提交订单</div>
        </div>
    </div>)
}

export default OrderDetails;