import React from 'react';
import './swiperCss.less'
import Pagination from './pagination';
class SwipePlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0 // 当前轮播第几个图片
    }
  }
 
  // 点击播放下一张
  _nextImg () {
    if (this.state.index === this.props.images.length - 1) {
      this.state.index = 0;
    } else {
      this.state.index++
    }
    this.setState({
      index: this.state.index
    })
  }

  play () {
    this.timerId = setInterval(() => {
      this._nextImg()
    }, 3000)
  }
 
  componentDidMount () {
    this.play()
  }
  componentWillUnmount () {
    clearInterval(this.timerId)
  }
 
  render () {
    var { index } = this.state;
    return (
      <div className="wrap">
        <ul className="list">
          {
            this.props.images.map((item, i) => (
              <li className={`item ${i === index ? 'active' : ''}`} key={i}>
                <img src={item} alt="" />
              </li>
            ))
          }
        </ul>
        <Pagination num={this.props.images} index={index}/>
      </div>
    )
  }
}
 
export default SwipePlayer;