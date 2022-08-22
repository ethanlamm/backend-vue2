<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
        <!-- echarts容器 -->
        <div ref="bar" style="height: 350px; width: 100%"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
        <div class="rank">
          <span>门店销售额排名</span>
          <ul>
            <li>
              <span class="index">1</span>
              <span>肯德基</span>
              <span>323,234</span>
            </li>
            <li>
              <span class="index">2</span>
              <span>肯德基</span>
              <span>323,234</span>
            </li>
            <li>
              <span class="index">3</span>
              <span>肯德基</span>
              <span>323,234</span>
            </li>
            <li>
              <span id="index">4</span>
              <span>肯德基</span>
              <span>323,234</span>
            </li>
            <li>
              <span id="index">5</span>
              <span>肯德基</span>
              <span>323,234</span>
            </li>
            <li>
              <span id="index">6</span>
              <span>肯德基</span>
              <span>323,234</span>
            </li>
            <li>
              <span id="index">7</span>
              <span>肯德基</span>
              <span>323,234</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "SaleOrVisit",
  props: ["index", "list", "title"], // 模板，命名固定，同意接收
  data() {
    return {
      show: true,
      // 先存放echart实例
      barEchart: null
    };
  },
  mounted() {
    this.getEcharts();
  },
  methods: {
    getEcharts() {
      setTimeout(() => {
        let { list, title } = this;
        let barDom = this.$refs.bar;
        // echart实例
        this.barEchart = echarts.init(barDom);
        let option = {
          title: {
            show: true,
            text: title,
            textStyle: {
              fontSize: 16,
            },
            top: "5%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
              ],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "Direct",
              type: "bar",
              barWidth: "60%",
              data: list,
              barWidth: "40%",
            },
          ],
        };
        this.barEchart.setOption(option);
      }, 500);
    },
  },
  watch: {
    index: {
      handler() {
        if (this.barEchart) {
          // 先销毁上一个echart实例
          this.barEchart.dispose()
        }
        this.getEcharts()
        // echarts.getInstanceByDom(this.$refs.bar).resize();
      },
    },
  },
};
</script>

<style scoped>
.rank {
  padding-top: 20px;
}

.rank ul {
  padding: 0 5px;
}

.rank ul li {
  margin: 20px 0;
  list-style: none;
}

.rank li .index {
  float: left;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: black;
  text-align: center;
  color: white;
}

.rank li #index {
  float: left;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: white;
  text-align: center;
  color: black;
}

.rank ul li span:nth-child(2) {
  margin-left: 40px;
}

.rank ul li span:nth-child(3) {
  float: right;
}
</style>