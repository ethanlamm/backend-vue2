<template>
  <div class="line" ref="line"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineEachart",
  mounted() {
    let line = this.$refs.line;
    let lineEchart = echarts.init(line);
    lineEchart.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: { show: false },
      series: [
        {
          data: [20, 44, 32, 55, 70, 40],
          type: "line",
          smooth: true,
          // 不要拐点
          itemStyle: {
            opacity: 0,
          },
          // 渐变填充
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "pink", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid: {
        left: "-5%",
        right: "-10%",
        top: "5%",
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.line {
  height: 100%;
  width: 100%;
}
</style>