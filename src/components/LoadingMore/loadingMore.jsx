
import { useRef, useState } from 'react';
import { useEffect } from 'react';


// 给我传一个请求数据的方法

export default function LoadingMore(props) {
    const [myrefmore, setMyrefmore] = useState(useRef());
    useEffect(() => {
        // console.log(myrefmore.current);
        // 获取视口高度
        const clientH = document.documentElement.clientHeight;

        // 节流防抖之防抖（定义定时器）
        var timer = null;
        function scrolling() {
            // 元素离页面顶部的高度，放里面是为了多次加载重新计算
            const offsetTop = myrefmore.current.offsetTop;

            // - 节流、防抖
            // - 目的: 对频繁触发事件的优化方案，都是当条件满足时只执行一次操作。
            // - 节流： 触发高频事件时一段时间内只执行一次。
            // - 防抖： 触发高频事件时一段时间内将多次执行变为最后一次执行。
            // 节流防抖之防抖(实现)
            if (clientH + document.documentElement.scrollTop >= offsetTop) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    props.GetList();
                }, 1500);
            }
        }

        // 全局事件监听
        window.addEventListener("scroll", scrolling);

        // 组件销毁时
        return () => {
            window.removeEventListener("scroll", scrolling);
        };
    })
    return (<div
        style={{ textAlign: "center", "height": "42px", "lineHeight": "42px", "margin": "10px 0 0 0", backgroundColor: "#5555ff",position:"relative","zIndex":"20" }}
        ref={myrefmore}>
        加载更多
    </div>)
}