import './countCss.less';
import { useState, useRef } from 'react';
import { useEffect } from 'react';

function Count(props) {
    const [count, setCount] = useState(1);
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        props.sum({ flag, count, price: parseInt(props.price), id: props.id })
    }, [count, flag])

    //减法
    function sub() {
        if (count <= 1) {
            setCount(1)
        } else {
            setCount(+count - 1)
        }
        setFlag(-1)
    }
    //加法
    function add() {
        setCount(+count + 1)
        setFlag(1)
    }
    return (<div id='myCount'>
        <div className='Count-info'>
            <div className='myCount-item1' onClick={sub}>-</div>
            <div className='myCount-item2'>{count}</div>
            <div className='myCount-item3' onClick={add}>+</div>
        </div >
        {
            count <= 1 ? <span>最少选1个</span> : <></>
        }
    </div>)
}

export default Count;