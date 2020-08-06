<template>
  <div class="production-page">
    <div class="title">产品实时销售状况</div>
    <div class="flex">
      <div class="part1">
        <div ref="chart1" class="chart1"></div>
      </div>
      <div class="part2">
        <span class="part2-title">19801.23元</span>
        <span class="text1">渐变字体</span>
        <span class="text2">流光字体</span>
        <div ref="chart2" class="chart2"></div>
      </div>
      <div class="part1"></div>
    </div>
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
  created() {},
  mounted() {
    this.f1();
    // this.initChart();
  },
  methods: {
    f1() {
      const myCharts = echarts.init(this.$refs.chart1);
      let option = {
        title: {
          text: "销售渠道变化",
          textStyle: {
            color: "#fff",
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //   data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["A1", "A2", "A3", "A4", "A5", "A6"],
          //x轴对应的网格
          splitLine: {
            show: false //去掉默认的网格线
            // lineStyle: {
            //   type: "dashed",
            //   color: "#fff"
            // }
          },
          axisTick: {
            // X轴线 刻度线
            show: false,
            length: 10,
            lineStyle: {
              color: "red",
              type: "solid",
              width: 2
            }
          },
          // X轴线 标签
          //   axisLabel: {
          //     textStyle: { color: "#fff" } //x轴标签的颜色
          //   },
          //x轴线
          axisLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#fff",
              width: 0.5
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false //去掉默认的网格线
            // lineStyle: {
            //   type: "dashed",
            //   color: "#fff"
            // }
          },
          axisLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#fff",
              width: 0.5
            }
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            smooth: true, //折点是圆弧状的
            // smoothMonotone: "y",
            // showSymbol: true,
            symbol: "circle", //折点设定为实心点,非实心点中间是白色的
            symbolSize: 8, //设定实心点的大小
            lineStyle: {
              color: "yellow",
              width: 3
            },
            areaStyle: {
              color: "#ddd"
            },
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230]
          },
          {
            name: "联盟广告",
            type: "line",
            smooth: false,
            smoothMonotone: "x",
            stack: "总量",
            data: [220, 280, 240, 234, 180, 60]
          },
          {
            name: "视频广告",
            type: "line",
            smooth: true,
            smoothMonotone: "x",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330]
          }
        ]
      };

      myCharts.setOption(option);
    },
    //地球
    f2() {
      const vm = this;
      const canvas = document.createElement("canvas");
      this.mapChart = echarts.init(canvas, null, {
        width: 4096,
        height: 2048
      });
      this.mapChart.setOption(
        {
          backgroundColor: config.map.bgColor, // 背景色
          geo: {
            z: 1,
            type: "map",
            map: "world",
            top: 0,
            left: 0, // 绘制完整尺寸的 echarts 实例
            right: 0,
            bottom: 0,
            boundingCoords: [
              [-180, 90],
              [180, -90]
            ], // 设置为一张完整经纬度的世界地图
            nameMap: {
              China: "中国" // 变成中文
            },
            label: {
              show: config.map.textLabel.isTextLabel, // 是否显示文本
              color: config.map.textLabel.textColor // 文本颜色
            },
            itemStyle: {
              // 地图区域的多边形 图形样式。 默认样试。
              normal: {
                color: {
                  type: "linear",
                  x: 100,
                  y: 12,
                  x2: 12,
                  y2: 100,
                  colorStops: [
                    {
                      offset: 0,
                      color: config.map.area.areaColor[0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: config.map.area.areaColor[1] // 100% 处的颜色
                    }
                  ],
                  global: config.map.area.isGlobal // 缺省为 false
                },
                borderColor: config.map.area.borderColor, // 边框线
                borderWidth: config.map.area.borderWidth * common.getFontSize(), // 线宽
                borderType: config.map.area.borderType, // 支持 'solid', 'dashed', 'dotted'。
                shadowColor: config.map.area.shadowColor[0], // 阴影颜色
                shadowBlur: config.map.area.shadowBlur * common.getFontSize(), // 模糊大小
                shadowOffsetX:
                  config.map.area.shadowOffsetX * common.getFontSize(), // 水平偏移
                shadowOffsetY:
                  config.map.area.shadowOffsetY * common.getFontSize() // 垂直偏移
              }
            },
            emphasis: {
              // 高亮状态下的多边形和标签样式。
              label: {
                // 文本
                show: config.map.textLabel.isTextLabel,
                color: config.map.textLabel.emphasizeColor
              },
              itemStyle: {
                // 区域
                areaColor: config.map.area.emphasizeAreaColor
              }
            },
            regions: [
              {
                name: "中国",
                itemStyle: {
                  normal: {
                    // areaColor: config.map.area.chinaColor,
                  }
                }
              }
            ] // 区域块的颜色
          }
        },
        true
      );
    },
    initMap(config) {
      const vm = this;
      const canvas = document.createElement("canvas");
      this.mapChart = echarts.init(canvas, null, {
        width: 4096,
        height: 2048
      });
      this.mapChart.setOption(
        {
          backgroundColor: config.map.bgColor, // 背景色
          geo: {
            z: 1,
            type: "map",
            map: "world",
            top: 0,
            left: 0, // 绘制完整尺寸的 echarts 实例
            right: 0,
            bottom: 0,
            boundingCoords: [
              [-180, 90],
              [180, -90]
            ], // 设置为一张完整经纬度的世界地图
            nameMap: {
              China: "中国" // 变成中文
            },
            label: {
              show: config.map.textLabel.isTextLabel, // 是否显示文本
              color: config.map.textLabel.textColor // 文本颜色
            },
            itemStyle: {
              // 地图区域的多边形 图形样式。 默认样试。
              normal: {
                color: {
                  type: "linear",
                  x: 100,
                  y: 12,
                  x2: 12,
                  y2: 100,
                  colorStops: [
                    {
                      offset: 0,
                      color: config.map.area.areaColor[0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: config.map.area.areaColor[1] // 100% 处的颜色
                    }
                  ],
                  global: config.map.area.isGlobal // 缺省为 false
                },
                borderColor: config.map.area.borderColor, // 边框线
                borderWidth: config.map.area.borderWidth * common.getFontSize(), // 线宽
                borderType: config.map.area.borderType, // 支持 'solid', 'dashed', 'dotted'。
                shadowColor: config.map.area.shadowColor[0], // 阴影颜色
                shadowBlur: config.map.area.shadowBlur * common.getFontSize(), // 模糊大小
                shadowOffsetX:
                  config.map.area.shadowOffsetX * common.getFontSize(), // 水平偏移
                shadowOffsetY:
                  config.map.area.shadowOffsetY * common.getFontSize() // 垂直偏移
              }
            },
            emphasis: {
              // 高亮状态下的多边形和标签样式。
              label: {
                // 文本
                show: config.map.textLabel.isTextLabel,
                color: config.map.textLabel.emphasizeColor
              },
              itemStyle: {
                // 区域
                areaColor: config.map.area.emphasizeAreaColor
              }
            },
            regions: [
              {
                name: "中国",
                itemStyle: {
                  normal: {
                    // areaColor: config.map.area.chinaColor,
                  }
                }
              }
            ] // 区域块的颜色
          }
        },
        true
      );
    },
    // 初始化地球
    initChart() {
      const vm = this;
    //   //   vm.chart = echarts.init(document.getElementById(vm.dataInfo.id));
    //   vm.chart = echarts.init(this.$refs.chart2);
    //   const data = vm.resetData(vm.dataInfo.data.graphData.series[0].data);
    //   const { unit } = vm.dataInfo.data.graphData.otherData || "";
    //   const config = vm.getEarthConfig();
    //   vm.initMap(config);
    //   const bgImg = config.earth.bgImg || "";
    //   // 地球
    //   const option = {
    //     backgroundColor: "",
    //     globe: {
    //       roam: false, // 是否允许鼠标滚动放大，缩小
    //       baseTexture: this.mapChart,
    //       environment: bgImg == "" ? "" : require(`../../../${bgImg}`),
    //       shading: config.earth.shading, // 地球中三维图形的着色效果,通过经典的 lambert 着色表现光照带来的明
    //       light: {
    //         ambient: {
    //           // 环境光
    //           color: config.earth.enLightColor, // 颜色
    //           intensity: config.earth.enIntensity // 光的强度
    //         },
    //         main: {
    //           // 太阳光
    //           color: config.earth.lightColor, // 颜色
    //           intensity: config.earth.intensity, // 主光源的强度
    //           shadow: false
    //         }
    //       },
    //       postEffect: {
    //         // 后处理特效的相关配置
    //         enable: true,
    //         bloom: {
    //           // 高光特效
    //           enable: true
    //         },
    //         depthOfField: {
    //           // 景深效果
    //           enable: false
    //         }
    //       },
    //       viewControl: {
    //         autoRotate: config.earth.isAutoRotate, // 自动旋转关闭
    //         autoRotateSpeed: config.earth.autoRotateSpeed,
    //         targetCoord: [100.46, 39.92], // 定位到中国
    //         zoomSensitivity: config.earth.isZoom == true ? 1 : 0 // 是否可缩放
    //       }
    //     },
    //     series: vm.rebuildSeriesData(data, config, unit)
    //   };
    //   vm.chart.setOption(option, true);
    //   // 点击事件
    //   this.mapChart.on("click", params => {});
    //   this.chart.on("click", params => {});
    }
  }
};
</script>

<style type="text/css">
.production-page {
  /* background-image: radial-gradient(circle,#071c3c 30%, #060e19 60%); */
  background-image: radial-gradient(#071c3c 20%, #060e19 60%);
  padding: 20px;
}
.production-page .title {
  font-size: 24px;
  color: #fff;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 20px;
}
.part1 {
  flex: 1;
}
.part2 {
  flex: 3;
}
.chart1 {
  width: 100%;
  height: 200px;
}
.part2-title {
  font-size: 28px;
  background-image: linear-gradient(to right, #fb6a15, yellow);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text1 {
  font-size: 30px;
  font-weight: bold;
  background-image: linear-gradient(#ed3f27, #9b0999);
  -webkit-background-clip: text; /*-webkit-不能去掉*/
  color: transparent;
}
.text2 {
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: bolder;
  -webkit-text-fill-color: transparent;
  background-image: -webkit-linear-gradient(
    left,
    #129835,
    #ece648 25%,
    #129835 50%,
    #f9e92b 75%,
    #289626
  );
  background-size: 200%, 100%;
  -webkit-background-clip: text;
  -webkit-animation: word 5s linear infinite;
}
@keyframes word {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>