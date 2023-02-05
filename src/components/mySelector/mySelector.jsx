import xuanze from '../../static/imgs/勾选.png';
import xuanze1 from '../../static/imgs/勾选1.png';
import { useState } from 'react';
import { useEffect } from 'react';

function MySelector(props) {
    const [selectImg, setSelectImg] = useState(false);

    useEffect(() => {
        props.meth({
            selectImg: selectImg,
            id: props.myId
        });
    }, [selectImg])
    
    function xuanzeFunc() {
        setSelectImg(!selectImg)
    }
    return (<div onClick={xuanzeFunc} style={{ "width": "0.5rem", height: "0.5rem", margin: "50% auto", overflow: "hidden", backgroundColor: "#ffffff", borderRadius: "0.25rem" }}>
        <img src={selectImg ? xuanze1 : xuanze} alt="勾选" style={{ "width": "0.5rem", height: "0.5rem" }} />
    </div>)
}

export default MySelector