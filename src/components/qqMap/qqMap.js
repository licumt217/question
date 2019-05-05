/**
 * Created by liqiang on 2017/6/8.
 */
module.exports = function () {
    return new Promise(function (resolve, reject) {
        window.initTheMap = function () {
            resolve(qq.maps)
        }

        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = 'http://map.qq.com/api/js?v=2.exp&libraries=convertor&callback=initTheMap'
        //script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
    })
}