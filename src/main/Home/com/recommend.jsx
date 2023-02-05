import './css/recommendCss.less';
import { Link } from 'react-router-dom';
import city from './../../../store/reducers/city';
export default function Recommend(props) {
    // console.log(props.list)
    return (<div id='recommend-id'>
        <h3>
            {
                props.category
            }
        </h3>
        <div className='recommend-list'>
            <ul>
                {
                    // 遍历父组件传来的数据
                    props.list.map((ele,idx)=>(
                        <li key={ele.id}>
                            <Link to={{pathname:'/goods/details/'+ele.id ,city:ele.city}}>
                                <img src={ ele.imgurl } alt={ ele.shopStore+ ' '+ ele.title } />
                                <div>{ ele.city+ele.title }</div>
                            </Link>
                        </li>
                    ))
                }
            </ul>

        </div>
    </div>)
}