import ComHeader from "../../../components/comHeader/comHeader";
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getAllAddrs } from "../../../api/api";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './addrInfoCss.less';
import xiugai from './xiugai.png';

function AddrInfo(props) {
    const [addrs, setAddrs] = useState([])
    useEffect(() => {
        getAllAddrs('/getAllAddrs', { username: props.user }).then(res => {
            // console.log(res);
            setAddrs(res.addrs);
        })
    }, [])
    // console.log(addrs);
    return (<div style={{ "padding": "45px 0 0 0", "position": "relative" }}>
        <ComHeader title="地址信息" />
        {
            props.user ==null ? (<Link to='/my/login'>
            <div
                style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#3333ff", fontSize: "0.4rem" }}>
                未登录·点我
            </div>
        </Link>):(<>{
            addrs.length <= 0 ? (<div
                style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#3333ff", fontSize: "0.4rem" }}>
                暂无收货地址
            </div>):(<div>
                {
                    addrs.map((ele) => {
                        // console.log(ele)
                        return (
                            <div className="addrs-item" key={ele.addrid}>
                                <div>
                                    {ele.username} - {ele.tel}
                                </div>
                                <div>
                                    {ele.province}-{ele.city}-{ele.area}-
                                    {ele.detailsAddr}
                                </div>
                                <Link to={{ pathname: '/my/addrdetails', state: { ...ele } }}>
                                    <img src={xiugai} alt="修改图片" />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>)
        }</>)
    }
        <Link to='/my/addrdetails'>
            <div className="addrs-xinzang">
                <button>新增地址</button>
            </div>
        </Link>
    </div>)
}

export default connect((state) => (state))(AddrInfo);
