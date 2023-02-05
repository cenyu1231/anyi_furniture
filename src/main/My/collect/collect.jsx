import ComHeader from "../../../components/comHeader/comHeader";
import { useEffect, useState } from 'react';
import { getAllShoucang, setShoucang } from './../../../api/api';
import './collectCss.less';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Collect(props) {
    const [info, setInfo] = useState([]);
    useEffect(() => {
        getAll();
    }, [])
    // 获取所有收藏
    function getAll() {
        getAllShoucang('/getAllShoucang', { username: props.user }).then(res => {
            // console.log(res.collect)
            setInfo(res.collect);
        })
    }

    // 取消收藏
    function quxXiao(ele) {
        setShoucang('/setShoucang', {
            username: props.user
            , title: ele.title
            , id: ele.id
            , off: false
        }).then(res => {
            getAll();
        })
    }
    
    return (<div style={{ "paddingTop": "45px", "position": "relative" }}>
        <ComHeader title="我的收藏" />
        {
            props.user ? (<>
                {
                    info.length <=0 ? (<div
                        style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#3333ff", fontSize: "0.4rem" }}>
                        暂无收藏
                    </div>) : <>
                        {
                            info.map(ele => (
                                <div className="my-collect" key={ele.id}>
                                    <div>
                                        <img src={ele.imgurl} alt={ele.title} />
                                    </div>
                                    <div>
                                        商品：{ele.title}   <br />
                                        发货地址：{ele.city} - {ele.company}   <br />
                                        价格：{ele.price} ￥   <br />
                                    </div>
                                    <div>
                                        <button onClick={quxXiao.bind(null, ele)}>—</button>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                }
            </>) : (<Link to='/my/login'>
                <div
                    style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#3333ff", fontSize: "0.4rem" }}>
                    未登录·点我
                </div>
            </Link>)
        }

    </div>)
}

export default connect((state) => (state))(Collect);