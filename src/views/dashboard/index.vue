<template>
  <div class="dashboard-container">
    <Top></Top>
    <Middle></Middle>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Top from "./top";
import Middle from "./middle";
import Bottom from "./bottom";
export default {
  name: "Dashboard",
  components: { Top, Middle, Bottom },
  mounted() {
    // 首页的根组件一挂载就获取mock数据
    this.getData();
  },
  methods: {
    getData() {
      // 走vuex路线，触发请求数据的方法
      this.$store.dispatch("home/getMockData");
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 15px 0;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
