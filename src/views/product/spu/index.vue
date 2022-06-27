<template>
  <div>
    <el-card style="margin: 20px 0"
      ><CategorySelect :isDisabled="screen != 0"></CategorySelect
    ></el-card>
    <el-card><SpuList></SpuList></el-card>
  </div>
</template>

<script>
import SpuList from "./SpuList";
export default {
  name: "Spu",
  data() {
    return {
      // 接收screen
      screen: 0,
    };
  },
  components: { SpuList },
  mounted() {
    this.$bus.$on("sendScreen", this.changeScreen);
  },
  methods: {
    changeScreen(screen) {
      this.screen = screen;
    },
  },
};
</script>

<style>
</style>