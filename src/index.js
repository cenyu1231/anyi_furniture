import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// 加载初始化文件： reset.css ; 和图片文件
import './static/css/font/iconfont.css';
import './static/css/reset.css';
import { Provider } from 'react-redux';
import store from './store/store';
// import AppFunctionTest from './appFunctionTest';
import cityAction from './store/action/cityAction';
import userAction from './store/action/userAction';

const root = ReactDOM.createRoot(document.getElementById('root'));

const city = localStorage.getItem('goodlive-city');
if(city){
  store.dispatch(cityAction.setCity(city))
}

const lg = localStorage.getItem('lg');
if(lg){
  store.dispatch(userAction.setUser(lg))
}
root.render(
  // <React.StrictMode>
  <Provider store={store} >
    <App />
    {/* <AppFunctionTest/> */}
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
