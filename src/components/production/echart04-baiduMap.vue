<template>
  <div class="map-page">
    <div ref="chart1" style="width:100%;height:700px;margin-top:20px;"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import "echarts/extension/bmap/bmap";
// require("echarts/extension/bmap/bmap");
// import "echarts-gl";

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
      let option = {
        animation: false,
        // 加载 bmap 组件
        bmap: {
          // 百度地图中心经纬度
          center: [120.13066322374, 30.240018034923],
          // 百度地图缩放
          zoom: 14,
          // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
          roam: true,
          // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
          mapStyle: {}
        },
        //自定义地图颜色
        // bmap: {
        //   center: [104.114129, 37.550339],
        //   zoom: 5,
        //   roam: true,
        //   mapStyle: {
        //     styleJson: [
        //       {
        //         featureType: "water",
        //         elementType: "all",
        //         stylers: {
        //           color: "#120f42" //地图上海洋区域的颜色
        //         }
        //       },
        //       {
        //         featureType: "land",
        //         elementType: "all",
        //         stylers: {
        //           color: "#557dd8" //地图上陆地的颜色
        //         }
        //       },
        //       {
        //         featureType: "railway",
        //         elementType: "all",
        //         stylers: {
        //           visibility: "off"
        //         }
        //       },
        //       {
        //         featureType: "highway",
        //         elementType: "all",
        //         stylers: {
        //           color: "#fdfdfd"
        //         }
        //       },
        //       {
        //         featureType: "highway",
        //         elementType: "labels",
        //         stylers: {
        //           visibility: "off"
        //         }
        //       },
        //       {
        //         featureType: "arterial",
        //         elementType: "geometry",
        //         stylers: {
        //           color: "#fefefe"
        //         }
        //       },
        //       {
        //         featureType: "arterial",
        //         elementType: "geometry.fill",
        //         stylers: {
        //           color: "#fefefe"
        //         }
        //       },
        //       {
        //         featureType: "poi",
        //         elementType: "all",
        //         stylers: {
        //           visibility: "off"
        //         }
        //       },
        //       {
        //         featureType: "green",
        //         elementType: "all",
        //         stylers: {
        //           visibility: "off"
        //         }
        //       },
        //       {
        //         featureType: "subway",
        //         elementType: "all",
        //         stylers: {
        //           visibility: "off"
        //         }
        //       },
        //       {
        //         featureType: "manmade",
        //         elementType: "all",
        //         stylers: {
        //           color: "#d1d1d1"
        //         }
        //       },
        //       {
        //         featureType: "local",
        //         elementType: "all",
        //         stylers: {
        //           color: "#d1d1d1"
        //         }
        //       },
        //       {
        //         featureType: "arterial",
        //         elementType: "labels",
        //         stylers: {
        //           visibility: "off"
        //         }
        //       },
        //       {
        //         featureType: "boundary",
        //         elementType: "all",
        //         stylers: {
        //           color: "#fefefe"
        //         }
        //       },
        //       {
        //         featureType: "building",
        //         elementType: "all",
        //         stylers: {
        //           color: "#d1d1d1"
        //         }
        //       },
        //       {
        //         featureType: "label",
        //         elementType: "labels.text.fill",
        //         stylers: {
        //           color: "#999999"
        //         }
        //       }
        //     ]
        //   }
        // },
        series: [
          {
            type: "scatter",
            // 使用百度地图坐标系
            coordinateSystem: "bmap",
            // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
            data: [[120, 30, 1]]
          }
        ]
      };
      myCharts.setOption(option);
      // 获取百度地图实例，使用百度地图自带的控件
      let bmap = myCharts
        .getModel()
        .getComponent("bmap")
        .getBMap();
      bmap.addControl(new BMap.MapTypeControl());
    }
  }
};
</script>

<style type="text/css">
</style>