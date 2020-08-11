<template>
  <div class="map-page">
    <div ref="chart1" style="width:100%;height:700px;margin-top:20px;"></div>
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
      let option = {
        roam: true, //是否开启鼠标缩放和平移漫游。
        backgroundColor: "#120f42", // 地球上海洋区域颜色#031d42
        series: [
          //设置为一张完整经纬度的世界地图
          {
            type: "map",
            // center: [115.97, 29.71],//当前视角的中心点，用经纬度表示
            //  aspectScale:'0.75',//这个参数用于 scale 地图的长宽比。
            // zoom:1,//当前视角的缩放比例。
            map: "world",
            top: 0,
            left: 0, // 绘制完整尺寸的 echarts 实例
            right: 0,
            bottom: 0,
            boundingCoords: [
              [-180, 90], // 定位左上角经纬度
              [180, -90] // 定位右下角经纬度
            ],
            label: {
              // show:true,
            },
            itemStyle: {
              areaColor: "#557dd8"
            },
            tooltip: {
              position: [10, 10]
            },
            //高亮状态下
            emphasis: {
              label: {
                color: "#fff",
                fontSize: 12
              },
              itemStyle: {
                areaColor: "#24cac2"
              }
            },
            //标记
            markPoint: {
              symbol:
                "image://http://debug.easy-parking.cn/h5/parkPay/img/car-away.png", //circle,pin
              symbolSize: [30, 30],
              //设置label无效
              label: {
                show: true,
                color: "#fff",
                fontSize: 14
              },
              itemStyle: {
                color: "yellow"
              },
              emphasis: {
                label: {
                  color: "#fff",
                  fontSize: 12
                },
                itemStyle: {
                  color: "green"
                }
              },
              //设置label无效，标签文字无法显示
              data: [
                //标记在地图真实的坐标上
                {
                  name: "标记1",
                  coord: [10, 20]
                  //   label: {
                  //     show: true,
                  //     color: "#fff"
                  //   }
                },
                {
                  name: "标记2",
                  coord: [25, 60]
                },
                //是屏幕中的固定位置，如果移动地图，标记位置不会跟着地图变化
                {
                  name: "某个屏幕坐标",
                  x: 100,
                  y: 100
                }
              ]
            }
          }
        ]
      };

      myCharts.setOption(option);
    }
  }
};
</script>

<style type="text/css">
</style>