<template>
  <div class="middle">
    <el-card class="box-card">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="first">
          <SaleOrVisit
            :index="index"
            :list="orderFullYear"
            title="销售额"
          ></SaleOrVisit>
        </el-tab-pane>
        <el-tab-pane label="访问量" name="second">
          <SaleOrVisit
            :index="index"
            :list="userFullYear"
            title="访问量"
          ></SaleOrVisit>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 日期 -->
    <div class="block">
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        size="mini"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import SaleOrVisit from "./saleorvisit";
import { mapGetters } from "vuex";
export default {
  name: "Middle",
  components: { SaleOrVisit },
  data() {
    return {
      // tabs栏
      activeName: "first",
      index: "",
      //   日期
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      value2: "",
    };
  },
  computed: {
    ...mapGetters("home", ["orderFullYear", "userFullYear"]),
  },
  methods: {
    handleClick(tab, event) {
      this.index = tab.index;
    },
  },
};
</script>

<style scoped>
.middle {
  position: relative;
  margin: 10px 0;
}
.block {
  position: absolute;
  top: 20px;
  right: 30px;
}
</style>