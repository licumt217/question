let Echarts = require('./echarts/ECharts.vue')
let tjdModal = require('./modal/tjdModal')
let kbdPrePay = require('./keyboard/kbdPrePay')
let qqMap = require('./qqMap/qqMap.vue')
const myComponents = {
    'chart': Echarts,
    'tjdModal': tjdModal,
    'kbdPrePay': kbdPrePay,
    'qqMap': qqMap

}

const install = function(Vue, opts = {}) {
    Object.keys(myComponents).forEach((key, a, b) => {
        Vue.component(key, myComponents[key]);
    });

};

module.exports = Object.assign(myComponents, { install });