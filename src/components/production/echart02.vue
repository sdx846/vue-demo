<template>
  <div class="map-page"></div>
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
  mounted() {},
  methods: {
    f1() {
      const myCharts = echarts.init(this.$refs.chart1);
      let option = {};

      myCharts.setOption(option);
      window.addEventListener("resize", () => {
        if (myCharts) {
          myCharts.resize();
        }
      });
    }
  }
};
</script>

<style type="text/css">
</style>