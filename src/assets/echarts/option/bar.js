/**
 * Created by liqiang on 2017/5/26.
 */
import _ from 'lodash'
let initial = {
    title: {
        text: "",
        textStyle: {
            color: "#009EE5",
            fontWeight: "normal",
            borderColor: "red"
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: [],
        y: "bottom",
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '8%',
        containLabel: true,
        //y: "10px"
    },
    xAxis: [{
        type: 'category',
        data: [],
    }],
    yAxis: [{
        type: 'value',
        name: ''
    }],
    series: [{
        type: 'bar',
        data: []
    }],
    color: []
}


export { initial }