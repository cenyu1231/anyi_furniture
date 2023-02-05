import React, { Component } from 'react';

const style={
     width:"0.25rem",
     height:"0.25rem",
     "borderRadius":"50%",
     "background":"#ffffff",
     "marginRight":"0.1rem"
}
const action = {
    "background":"#a3a3a3"
}

class Pagination extends Component {
    render() { 
        return (<div style={{ position:"absolute" , zIndex:"999",right:"0.3rem",bottom:"0.2rem",height:"0.25rem",overflow:"hidden",display:"flex"}}>
            {
                this.props.num.map((ele,idx)=>{
                    return (<div 
                        style={ idx==this.props.index ? {...style,...action}:style } 
                        key={idx}></div>)
                })
            }
       </div>)
    }
}
 
export default Pagination;