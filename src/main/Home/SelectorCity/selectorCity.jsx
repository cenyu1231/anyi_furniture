import ComHeader from "../../../components/comHeader/comHeader";
import HotCity from "../../../components/hotCity/hotCity";
import './css/selector.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cityAction from '../../../store/action/cityAction';

function SelectorCity(props) {
    // console.log(props)
    return (<div>
        <div>
            <ComHeader title="城市选择" />
            <div style={{ "height": "43px", "color": "#ffffff" }}>我是静置定位占位元素</div>
        </div>
        <div className="current-city">
            <p>当前城市 ：{props.city}</p>
        </div>
        {/* 热门城市列表 */}
        <HotCity setCity={props.setCity} />
    </div>)
}

export default connect((state) => (state), (dispatch) => (bindActionCreators(cityAction, dispatch)))(SelectorCity)