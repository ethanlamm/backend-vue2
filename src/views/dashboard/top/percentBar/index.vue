<template>
  <div class="percent" ref="percent"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "PercentBar",
  mounted() {
    let percent = this.$refs.percent;
    let percentEchart = echarts.init(percent);
    percentEchart.setOption({
      xAxis: { show: false, min: "0", max: "100" },
      yAxis: { show: false, type: "category" },
      series: [
        {
          data: [78],
          type: "bar",
          barWidth: "20%",
          color: "yellowgreen",
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          // 文本
          label: {
            show: true,
            formatter: "|",
            position: "right",
          },
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: "30%",
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.percent {
  width: 100%;
  height: 100%;
}
</style>