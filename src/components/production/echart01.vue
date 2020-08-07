<template>
  <div class="production-page">
    <div class="title">产品实时销售状况</div>
    <div class="flex">
      <div class="part1">
        <div ref="chart1" class="chart1"></div>
        <div ref="chart4" class="chart4"></div>
      </div>
      <div class="part2">
        <span class="part2-title">19801.23元</span>
        <span class="text1">渐变字体</span>
        <span class="text2">流光字体</span>
        <div ref="chart2" class="chart2"></div>
        <div ref="chart3" class="chart3"></div>
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
    this.f1(); //折线图
    this.f3(); //地球1
    this.f5(); //地球2
    this.f6(); //饼图
  },
  methods: {
    //折线图
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
    //地球 1
    f2() {
      const canvas = document.createElement("canvas");
      const mapChart = echarts.init(canvas, null, {
        width: 4096,
        height: 2048
      });
      mapChart.setOption({
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
      });
      return mapChart;
    },
    f3() {
      const chart = echarts.init(this.$refs.chart2);
      const option = {
        backgroundColor: "transparent", //"#031d42"
        globe: {
          show: true,
          roam: false, // 是否允许鼠标滚动放大，缩小
          baseTexture: this.f2(),
          shading: "lambert", // 地球中三维图形的着色效果,通过经典的 lambert 着色表现光照带来的明
          light: {
            ambient: {
              // 环境光
              color: "#fff", // 颜色
              intensity: 0.5 // 光的强度
            },
            main: {
              // 太阳光
              color: "#27ff00", // 颜色
              intensity: 0.5, // 主光源的强度
              shadow: false
            }
          },
          viewControl: {
            autoRotate: true // 自动旋转关闭
          },
          globeRadius: 50,
          globeOuterRadius: 100
        },
        //绘制攻击性
        series: [
          {
            type: "lines3D",
            coordinateSystem: "globe",
            blendMode: "lighter",
            effect: {
              show: true,
              trailWidth: 1.2,
              trailLength: 0.5,
              trailOpacity: 1,
              trailColor: "#1ec5d6" //rgb(30,30,60)
            },
            lineStyle: {
              //   color: "#fff",
              width: 2,
              opacity: 1
            },
            data: [
              [
                [-99.681897, 32.411319],
                [-97.037997, 32.896828]
              ],
              [
                [-9.681897, 3.41139],
                [-97.037997, 32.896828]
              ],
              [
                [173.27, 1.13],
                [-97.037997, 32.896828]
              ],
              [
                [-60.230519, 120.611289],
                [-97.037997, 32.896828]
              ],
              [
                [-40.230519, 2.611289],
                [-97.037997, 32.896828]
              ]
            ]
          }
        ]
      };
      chart.setOption(option);
    },
    //地球2
    f4() {
      const canvas = document.createElement("canvas");
      const mapChart = echarts.init(canvas, null, {
        width: 4096,
        height: 2048
      });
      mapChart.setOption(
        {
          backgroundColor: "#120f42", // 地球上海洋区域颜色#031d42
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
              show: false, // 是否显示文本
              color: "red" // 文本颜色
            },
            itemStyle: {
              // 地图区域的多边形 图形样式。 默认样试。
              normal: {
                //设置渐变颜色
                color: {
                  type: "linear",
                  x: 100,
                  y: 12,
                  x2: 12,
                  y2: 100,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#557dd8" // 地球上非海洋区域0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#3929c1" // 地球上非海洋区域100% 处的颜色
                    }
                  ],
                  global: true // 缺省为 false
                },
                borderColor: "#ddd", // 地球上各区域连接的边框线颜色
                borderWidth: 1, // 边框线线宽
                borderType: "dashed", // 边框线支持 'solid', 'dashed', 'dotted'。
                shadowColor: "#7277b5", // 边框线阴影颜色
                shadowBlur: 6, // 模糊大小
                shadowOffsetX: 6, // 水平偏移
                shadowOffsetY: 6 // 垂直偏移
              }
            },
            emphasis: {
              // 高亮状态下的多边形和标签样式。
              label: {
                // 文本
                show: true,
                color: "red"
              },
              itemStyle: {
                // 区域
                areaColor: "#451a6d" //鼠标移到地图区域时的区域颜色
              }
            },
            //特别标出的地图区域
            regions: [
              {
                name: "中国",
                itemStyle: {
                  normal: {
                    areaColor: "#24cac2" //将地球上中国区域的颜色标记为#24cac2
                  }
                }
              }
            ] // 区域块的颜色
          }
        },
        true
      );
      return mapChart;
    },
    // 初始化地球
    f5() {
      const chart = echarts.init(this.$refs.chart3);
      let mapChart = this.f4();
      // 地球
      const option = {
        backgroundColor: "transparent",
        globe: {
          roam: false, // 是否允许鼠标滚动放大，缩小
          baseTexture: mapChart,
          //   environment: bgImg == "" ? "" : require(`../../../${bgImg}`),
          shading: "lambert", // 地球中三维图形的着色效果,通过经典的 lambert 着色表现光照带来的明
          light: {
            ambient: {
              // 环境光
              color: "#fff", // 颜色
              intensity: 0.5 // 光的强度
            },
            main: {
              // 太阳光
              color: "#27ff00", // 颜色
              intensity: 0.5, // 主光源的强度
              shadow: false
            }
          },
          postEffect: {
            // 后处理特效的相关配置
            enable: true,
            bloom: {
              // 高光特效
              enable: true
            },
            depthOfField: {
              // 景深效果
              enable: false
            }
          },
          viewControl: {
            autoRotate: true, // 自动旋转关闭
            autoRotateSpeed: 10,
            targetCoord: [100.46, 39.92], // 定位到中国
            zoomSensitivity: 1 // 是否可缩放1或者0
          }
        },
        series: [
          {
            type: "lines3D",
            coordinateSystem: "globe",
            blendMode: "lighter",
            effect: {
              show: true,
              trailWidth: 1.2,
              trailLength: 0.5,
              trailOpacity: 1,
              trailColor: "#1ec5d6" //rgb(30,30,60)
            },
            lineStyle: {
              color: "#24cac2",
              width: 1,
              opacity: 1
            },
            data: [
              [
                [-99.681897, 32.411319],
                [-97.037997, 32.896828]
              ],
              [
                [-9.681897, 3.41139],
                [-97.037997, 32.896828]
              ],
              [
                [173.27, 1.13],
                [-97.037997, 32.896828]
              ],
              [
                [-60.230519, 120.611289],
                [-97.037997, 32.896828]
              ],
              [
                [-40.230519, 2.611289],
                [-97.037997, 32.896828]
              ]
            ]
          }
        ]
      };
      chart.setOption(option, true);
      // 点击事件
      mapChart.on("click", params => {
        console.log("1");
      });
      chart.on("click", params => {
        console.log("2");
      });
    },
    //饼图
    f6() {
      const myCharts = echarts.init(this.$refs.chart4);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title: {
          text: "目标达成率",
          textStyle: {
            color: "#fff",
            fontSize: 14
          }
        },
        // legend: {
        //   orient: "vertical",
        //   left: 10,
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "访问来源", //tooltip里显示的大标题
            type: "pie",
            center: [80, 90],
            radius: ["50%", "70%"], //半径
            avoidLabelOverlap: true, //是否启用防止标签重叠策略，默认开启。
            minAngle: 5, 
            minShowLabelAngle:90,//小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）。
            stillShowZeroSum: true, //是否在数据和为0（一般情况下所有数据为0） 的时候不显示扇区。
            roseType: true, //是否展示成南丁格尔图，通过半径区分数据大小。值越大，对应的半径越大。
            //饼图图形上的文本标签
            label: {
              show: true,
              position: "center", //'inner' 同 'inside' ,'outside','center'
              //   formatter: '{b}: {d}'
              formatter: "{d}",
              //   rotate:true,//标签旋转
              color: "#557dd8", //标签文字颜色
            //   backgroundColor: "#ddd", //文字块背景色。
              padding: 5
            },
            //标签的视觉引导线样式
            // labelLine: {
            //   show: true,
            //   length: 10,
            //   lineStyle: {
            //     color: "#fff",
            //     width: 1,
            //     type: "solid"
            //   }
            // },
            //图形样式。
            itemStyle: {
              //   color: "",//不填会自适应颜色。填写了颜色所有区块都是这个色。这里支持{},可以自定义区块颜色，支持渐变色。
              //   color: {
              //     type: "linear",
              //     x: 0,
              //     y: 0,
              //     x2: 0,
              //     y2: 1,
              //     colorStops: [
              //       {
              //         offset: 0,
              //         color: "red" // 0% 处的颜色
              //       },
              //       {
              //         offset: 1,
              //         color: "blue" // 100% 处的颜色
              //       }
              //     ],
              //     global: false // 缺省为 false
              //   },
            },
            //高亮的扇区和标签样式。即鼠标移动到某块上面时，某块的样式。
            emphasis: {
              //饼图中间高亮显示时字体的样式
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold"
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 1548, name: "搜索引擎", selected: true }
              //   { value: 1548, name: "搜索引擎"},
            ]
          }
        ]
      };
      myCharts.setOption(option);
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
.chart2 {
  width: 100%;
  height: 300px;
}
.chart3 {
  width: 100%;
  height: 300px;
}
.chart4 {
  width: 60%;
  height: 200px;
}
</style>