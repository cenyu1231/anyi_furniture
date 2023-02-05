import ComHeader from "../../../components/comHeader/comHeader";
import './goodsOrderCss.less';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


function GoodsOrder(props) {
    const [order, setOrder] = useState([]);
    console.log(props.location.state)
    return (<div style={{ "paddingTop": "45px" }}>
        <ComHeader title="订单信息" />
        {
            props.user == '' ? ((<Link to='/my/login'>
                <div
                    style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#3333ff", fontSize: "0.4rem" }}>
                    未登录·点我
                </div>
            </Link>)) :
                order.length == 0 ? (<div
                    style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#3333ff", fontSize: "0.4rem" }}>
                    暂无订单
                </div>) : (<div>订单数据</div>)

        }
    </div>)
}

export default connect(state => state)(GoodsOrder);