<template>
  <div class="box">
    <div class="head">
      <span>搜索用户数</span>
      <i class="el-icon-info"></i>
    </div>
    <div class="middle">
      <span>1123</span>
      <span>17.1</span>
      <i class="el-icon-caret-bottom"></i>
    </div>
    <!-- echarts容器 -->
    <div class="echart" ref="line" style="width: 100%; height: 50px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineEchart",
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
          data: [20, 44, 32, 55, 70, 40, 55],
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
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid: {
        left: "-10%",
        right: "-10%",
        top: "5%",
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.head span {
  font-size: 14px;
  color: #8b8581;
  margin-right: 5px;
}
.el-icon-info {
  font-size: 14px;
}
.middle {
  margin-top: 10px;
}
.middle span:nth-child(1) {
  font-size: 20px;
  font-weight: 500;
  margin-right: 20px;
}
.middle span:nth-child(2) {
  font-size: 14px;
}
.el-icon-caret-bottom {
  color: green;
}
.echart {
  margin-top: 5px;
}
</style>