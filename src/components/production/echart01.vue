<template>
  <div class="production-page">
    <div class="title">产品实时销售状况</div>
    <div class="flex">
      <div class="part1">
        <div ref="chart1" class="chart1"></div>
      </div>
      <div class="part2 chart2"></div>
      <div class="part1"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.f1();
  },
  methods: {
    f1() {
      const myCharts = echarts.init(this.$refs.chart1);
      let option = {
        title: {
          text: "销售渠道变化"
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
          splitLine: {
            show: false //去掉默认的网格线
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false //去掉默认的网格线
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 280, 240, 234, 180, 60]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330]
          },
        ]
      };

      myCharts.setOption(option);
    }
  }
};
</script>

<style type="text/css">
.production-page {
  background-color: #000;
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
  flex: 2;
}
.chart1 {
  width: 100%;
  height: 300px;
}
</style>
