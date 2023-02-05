import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userAction from './store/action/userAction';
import cityAction from './store/action/cityAction';


class AppFunctionTest extends Component {
  componentDidMount() {
    console.log(this.props)
    fetch('/api/getData').then(res => res.json())
      .then(res => {
        console.log(res);
      })
  };
  render() {
    return (
      <div>
        <div style={{ width: "5rem", height: "100px", background: "#cccccc", }}>
          <ul>
            <li>你好</li>
            <li>你好</li>
            <li>响应式下5个rem</li>
          </ul>
          <i className='iconfont icon-index' />
        </div>
        <div style={{ width: "1rem", heigth: "20px", background: "#00ff88", }}>
          响应式下1个rem
        </div>
      </div>
    );
  }
}

// export default App;
function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({...userAction,...cityAction}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppFunctionTest);
