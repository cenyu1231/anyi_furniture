import './myTabsCss.less';
import { useState } from 'react';
import { useEffect } from 'react';

function MyTabs(props) {
    // console.log(props)
    // key
    const [dfvk, setDfvk] = useState(1);
    useEffect(() => {
        if (props.defaultValue) {
            setDfvk(props.defaultValue)
        }
    }, [])
    // onclick
    function oncli(key) {
        setDfvk(key);
    }
    return (<div id="mytabs">
        <div className="mytabs-header">
            {
                props.children.map((ele) => (
                    <div key={ele.key}
                        className={ dfvk == ele.key ? "tabs-active":''}
                        onClick={oncli.bind(null, ele.key)
                        }>
                        {ele.props.tab}
                    </div>
                ))
            }
        </div>
        <hr />
        <div className="mytabs-content">
            {
                props.children.map((ele) => (
                    <div key={ele.key}
                        style={ dfvk != ele.key ? { display:"none"}:{} }
                    >
                        {ele.props.children}
                    </div>
                ))
            }
        </div>
    </div>)
}

export default MyTabs;