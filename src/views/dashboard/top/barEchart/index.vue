<template>
  <div class="barlist" ref="barlist"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "BarEchart",
  mounted() {
    let barlist = this.$refs.barlist;
    let barChart = echarts.init(barlist);
    barChart.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: { show: false },
      series: [
        {
          data: [20, 44, 32, 55, 70, 40, 11, 33, 67, 88],
          type: "bar",
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.barlist {
  width: 100%;
  height: 100%;
}
</style>