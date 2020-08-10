<template>
  <div class="map-page">
    <div ref="chart1" style="width:100%;height:800px;margin-top:20px;"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import world from "echarts/map/js/world";
import "echarts-gl";

export default {
  data() {
    return {};
  },
  mounted() {
    this.f1();
  },
  methods: {
    f1() {
      const myCharts = echarts.init(this.$refs.chart1);

    //   echarts.registerMap("2/45.3/103.7", {
    //     type: "FeatureCollection",
    //     //这个数组装数据
    //     features: []
    //   });
      let option = {
           roam:true,
        backgroundColor: "#120f42", // 地球上海洋区域颜色#031d42
        series: [
          {
            type: "map",
            map: "world",
            top: 0,
            left: 0, // 绘制完整尺寸的 echarts 实例
            right: 0,
            bottom: 0,
            boundingCoords: [
              [-180, 90],
              [180, -90]
            ] // 设置为一张完整经纬度的世界地图
          }
        ]
      };

      myCharts.setOption(option);
      //   window.addEventListener("resize", () => {
      //     if (myCharts) {
      //       myCharts.resize();
      //     }
      //   });
    }
  }
};
</script>

<style type="text/css">
</style>