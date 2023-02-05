import './goodsListCss.less'
import { Link } from 'react-router-dom';

function GoodsList(props) {
    // console.log(props.list)
    return (<div id="goodsList">
        <ul>
            {
                props.list.map((ele) => (<li className='li-item' key={ele.id}>
                    <Link to={{pathname:'/goods/details/'+ele.id,city:ele.city,keyword:ele.keyword}}>
                        <div className="imgStyle">
                            <img src={ele.imgurl} alt={ele.name} />
                        </div>
                        <div className="info">
                            <div>
                                <p> 城市：{ele.city}</p>
                                <p>描述：{ele.info.msg} </p>
                            </div>
                            <div>
                                <p>商品：<span style={{ color: "red", marginRight: "10px" }}>{ele.title}</span></p>
                                <p>价格：<span style={{ color: "red", marginRight: "10px" }}>{ele.price}￥ | {ele.info.type}</span></p>
                            </div>
                        </div>
                    </Link>
                </li>))
            }
        </ul>
    </div>)
}

export default GoodsList;