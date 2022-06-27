<template>
  <div class="Catrgory" ref="Catrgory"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "CatrgoryEchart",
  props: ["data"],
  mounted() {
    this.getEchart();
  },
  computed: {
    option() {
      return {
        title: {
          show: true,
          left: "center",
          top: "center",
          text: "",
          subtext: "",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "outside",
            },
            labelLine: {
              show: true,
            },
            data: this.data,
          },
        ],
      };
    },
  },
  methods: {
    getEchart() {
      let Catrgory = this.$refs.Catrgory;
      let CatrgoryEchart = echarts.init(Catrgory);
      CatrgoryEchart.setOption(this.option, true);
      // 事件
      CatrgoryEchart.on("click", function (params) {
        let { value, name } = params.data;
        CatrgoryEchart.setOption({
          title: {
            text: name,
            subtext: value,
          },
        });
      });
    },
  },
  watch: {
    data: {
      deep: true,
      handler(newData, oldData) {
        this.$nextTick(() => {
          if (this.CatrgoryEchart) {
            if (newData) {
              this.CatrgoryEchart.setOption({
                series: [{ data: newData }],
              });
            } else {
              this.CatrgoryEchart.setOption({
                series: [{ data: oldData }],
              });
            }
          } else {
            this.getEchart();
          }
        });
      },
    },
  },
};
</script>

<style scoped>
.Catrgory {
  width: 600px;
  height: 300px;
}
</style>