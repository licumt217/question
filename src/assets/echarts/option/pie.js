import echarts from 'echarts/lib/echarts'
let initialPie = {
    tooltip: {
        trigger: 'item',
        // formatter: "{a} <br/>{b}: {c} <br/>({d}%)"
    },
    legend: {
        show: false,
        x: '60%',
        y: "30%",
        orient: 'vertical',
        data: [],
        formatter: function(name) {
            return name + " \r"
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        y: "8px",
        x2: "20px"
    },
    series: [{
        name: '访问来源',
        type: 'pie',
        radius: [], //设置环形的大小
        center: [], //设置环形的偏移量
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: false,
                formatter: "{b}\n\n{c}元",
                textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: []
    }],
    color: ["#3A495C", "#9AA2AD", "#48DD4E", "#5788FE", "#02C9F2"]
}



const getPieOptionleft = (data, businessType) => {

    let legend = [businessType, '在线实收', '现金实收'],
        blankLength = '      ';

    legend[0] += blankLength + data.derateSum + '元';
    legend[1] += blankLength + data.onlineSum + '元';
    legend[2] += blankLength + data.cashSum + '元';

    let series = [
        { name: legend[0], value: data.derateSum },
        { name: legend[1], value: data.onlineSum },
        { name: legend[2], value: data.cashSum },
    ]

    return {
        series: [{
            data: series,
            radius: ['45%', '56%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    formatter: "{b}\n\n{c}元",
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            },
        }],

        legend: {
            data: legend
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} "
        },
        color: ["#35475B", "#06CDEA", "#45D84A"]
    }
}

export { initialPie, getPieOptionleft}