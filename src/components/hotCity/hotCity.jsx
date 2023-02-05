import './hotCityCss.less';
import { useState } from 'react';

export default function HotCity(props){
    const [cityList , setCityList] = useState([{
        name:'长沙',
        code:1
    },{
        name:'深圳',
        code:2
    },{
        name:'北京',
        code:3
    },{
        name:'上海',
        code:4
    },{
        name:'广州',
        code:5
    },{
        name:'武汉',
        code:6
    },{
        name:'澳门',
        code:7
    },{
        name:'天津',
        code:8
    },{
        name:'福建',
        code:9
    },{
        name:'哈尔滨',
        code:10
    },{
        name:'乌鲁木齐',
        code:11
    },{
        name:'张家界',
        code:12
    },{
        name:'西藏',
        code:13
    }]);

    function getMsg(e){
        // console.log(e.target.innerHTML);
        props.setCity(e.target.innerHTML);  //设置城市
        localStorage.setItem('goodlive-city',e.target.innerHTML);
        setTimeout(()=>{
            window.history.back();
        },1000)
        
    }
    return (<div className="hot-city">
        <h1>热门城市</h1>
        <ul>
            {
                cityList.map((ele)=>(<li key={ele.code}
                    onClick={getMsg}
                >{ele.name}</li>))
            }
        </ul>
    </div>)
}