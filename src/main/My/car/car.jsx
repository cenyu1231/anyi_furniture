import React, { Component } from 'react';
import { delCarItem, selAllCar } from '../../../api/api';
import ComHeader from '../../../components/comHeader/comHeader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './carCss.less';
import Count from './../../../components/count/count';
import MySelector from '../../../components/mySelector/mySelector';


class Car extends Component {
    state = {
        allCar: [],
        totalPrice: 0,  //购物车总钱
        selector: [],  //被点击计算的的商品
        selectorGoodsCon: [],  //选择要结算的商品
        off: false,   //控制全选
    }
    componentDidMount() {
        this.init();
    }
    shouldComponentUpdate(preProps, nextProps) {
        // console.log(preProps,nextProps);
        return true;
    }
    // init
    init = () => {
        selAllCar('/selAllCar', { username: this.props.user }).then(res => {
            this.setState({
                allCar: res.car,
            })
        })
    }
    // 自动计算分别配每一个商品的数量和总价
    sum = (obj) => {  //计算单个商品的信息
        let tem = true;
        for (let i = 0; i < this.state.selector.length; i++) {
            if (this.state.selector[i].id == obj.id) {  //数组中存在这个商品的信息，根据id去修改count和总价钱
                this.state.selector[i].sumPrice += obj.price * obj.flag;  //flag控制加减
                this.state.selector[i].count = obj.count;
                tem = false;
                break;
            }
        }
        if (tem) {   // 原数组中没有这个商品的数据，新建一个
            this.state.selector.push({ id: obj.id, count: obj.count, sumPrice:obj.price , price: obj.price })
        }
        this.setState({
            selector: this.state.selector
        }, () => {
            console.log(this.state.selector)
            this.myTotal();  //每次修改完单个商品数组的数据之后重新计算总价
        });
    }
    // 选择商品的功能
    selectorGoods = (obj) => {
        if (obj.selectImg) {  //检测到该商品被选中
            this.state.selectorGoodsCon.push(obj);
        } else {  //该商品被移除，从存放选中数组中移去
            for (let i = 0; i < this.state.selectorGoodsCon.length; i++) {
                if (this.state.selectorGoodsCon[i].id == obj.id) {
                    this.state.selectorGoodsCon.splice(i, 1);
                }
            }
        }
        this.setState({
            selectorGoodsCon: this.state.selectorGoodsCon,
        }, () => {
            this.myTotal(); //每次选中要计算的商品之后重新计算总价
        })
    }
    // 计算总价钱,条件（在选商品的数组中存在，根据里面的商品id去计算总价）
    myTotal = () => {
        let tem = 0;  //总钱
        this.state.selectorGoodsCon.map(ele1 => {
            this.state.selector.map(ele2 => {
                if (ele1.id == ele2.id) {
                    tem += ele2.price * ele2.count
                }
            })
        })
        this.setState({
            totalPrice: tem
        })
    }

    // 全选和全不选
    selectorAll = () => {
        this.setState({
            off: !this.state.off
        }, () => {
            this.state.selectorGoodsCon = [];
            if (this.state.off) {
                for (let i = 0; i < this.state.allCar.length; i++) {
                    this.state.selectorGoodsCon.push({ selectImg: true, id: this.state.allCar[i].id });
                }
            }
            this.setState({
                selectorGoodsCon: this.state.selectorGoodsCon,
            }, () => {
                // console.log(this.state.selectorGoodsCon)
                this.myTotal();  //全选操作和都不选

            })
        })
    }

    // 移出购物车
    removeCar = (ele) => {
        delCarItem('/delCarItem', { username: ele.username, id: ele.id, title: ele.title }).then(res => {
            this.init();
            this.selectorGoods({ selectImg: false, id: ele.id });  //移出购物车的同时也要重新计算
        })
    }
    // 去生成订单的页面
    toGoodsOrder = () => {
        if(this.state.selectorGoodsCon.length <= 0 ){
            alert('未选择商品！');
            return ;
        }
        // 携值跳转
        this.props.history.push('/my/orderdetails', {goods:this.state.selectorGoodsCon,AllNeedData:this.state.selector,totalPrice:this.state.totalPrice});
    }

    render() {

        return (<div style={{ "paddingTop": "45px" }}>
            <ComHeader title="购物之车" />
            <div style={{ "paddingBottom": "50px" }} >
                {
                    this.props.user == '' ? ((<Link to='/my/login'>
                        <div
                            style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#3333ff", fontSize: "0.4rem" }}>
                            未登录·点我
                        </div>
                    </Link>)) :
                        this.state.allCar.length == 0 ? (<div
                            style={{ width: "40%", textAlign: "center", "position": "absolute", left: "50%", marginLeft: "-20%", marginTop: "50%", color: "#3333ff", fontSize: "0.4rem" }}>
                            暂无购物车数据
                        </div>) : (<div>{
                            this.state.allCar.map(ele => (
                                <div className="car-info" key={ele.id} >
                                    {/* 选择 */}
                                    <div style={{ "width": "10%", "float": "left", textAlign: "center" }}>
                                        <MySelector myId={ele.id} meth={this.selectorGoods} />
                                    </div>
                                    <div style={{ "width": "28%", "float": "left", textAlign: "center" }}>
                                        <img src={ele.imgurl} alt={ele.title} />
                                    </div>
                                    <div style={{ "width": "52%", "float": "left" }}>
                                        <div>
                                            商品：{ele.title}   <br />
                                            价格：{ele.price} ￥   <br />
                                        </div>
                                        <div>
                                            <Count price={ele.price} sum={this.sum} id={ele.id} />
                                        </div>
                                    </div>
                                    <div style={{ "width": "10%", "float": "right" }}>
                                        <button style={{ backgroundColor: "#ff2222", borderRadius: "3px" }} onClick={this.removeCar.bind(null, ele)}>—</button>
                                    </div>
                                </div>
                            ))
                        }</div>)

                }
                <div className='car-bottom'>
                    {/* <div>
                        <button onClick={this.selectorAll}>全选</button>
                    </div> */}
                    <div>
                        金额：{this.state.totalPrice}￥
                    </div>
                    <div>
                        <button onClick={this.toGoodsOrder}>下单</button>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default connect(state => state)(Car);