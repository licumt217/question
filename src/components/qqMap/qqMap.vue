<template>
    <div></div>
</template>
<script>
    var mapLoader = require('./qqMap.js')

    module.exports = {
        replace: true,
        mounted() {
            var self = this

            mapLoader().then(function (qq) {
                self.map = new qq.Map(self.$el, {
                    resizeEnable: true,
                    zoom: 12,
                })

                qq.event.addListener(self.map, 'click', function(e) {

                    this.$emit('map-click',e)

                    if (!self.marker) {
                        self.marker = new qq.Marker({ map: self.map })
                    }

                    self.marker.setPosition([e.lnglat.getLng(), e.lnglat.getLat()])
                });



                self.$nextTick(function () {
                    this.$emit('ready',self.map)
                })
            })

        }
    }
</script>