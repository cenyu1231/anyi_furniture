import React, { Component } from 'react';
import Home from './main/Home/home';
import Goods from './main/Goods/goods';
import My from './main/My/my';
import Login from './main/Login/login';
import Car from './main/My/car/car';
import Details from './main/Goods/Details/details';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ErrorPage from './main/errorPage/errorPage';
import SelectorCity from './main/Home/SelectorCity/selectorCity';
import Searchpage from './main/ather/Searchpage/searchpage';
import GoodsOrder from './main/My/goodsOrder/goodsOrder';
import BaseInfo from './main/My/baseInfo/baseInfo';
import Collect from './main/My/collect/collect';
import AddrInfo from './main/My/addrInfo/addrInfo';
import AddrDetails from './main/My/addrInfo/addrDetails';
import OrderDetails from './main/My/goodsOrder/orderDetails/orderDetails';


class App extends Component {
  state = {}
  render() {
    return (<div>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/goods' exact component={Goods} />
          <Route path='/my' exact component={My} />
          <Route path='/my/login' component={Login} />
          <Route path='/my/goodsorder' component={GoodsOrder} />
          <Route path='/my/orderdetails' component={OrderDetails} />
          <Route path='/my/baseinfo' component={BaseInfo} />
          <Route path='/my/collect' component={Collect} />
          <Route path='/my/addrinfo' component={AddrInfo} />
          <Route path='/my/addrdetails' component={AddrDetails} />
          <Route path='/my/car' component={Car} />
          <Route path='/goods/details/:id' component={Details} />
          <Route path='/selectorcity' component={SelectorCity} />
          <Route path='/searchpage/:keyword' component={Searchpage} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>);
  }
}

export default App;