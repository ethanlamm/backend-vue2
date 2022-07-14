<template>
  <div>
    <el-card style="margin: 20px 0">
      <!-- CategorySelect：在attr和spu均使用，封装全局组件 ==> components/CategorySelect -->
      <CategorySelect :isDisabled="isDisabled"></CategorySelect>
    </el-card>
    <el-card>
      <AttrList></AttrList>
    </el-card>
  </div>
</template>

<script>
import AttrList from "./AttrList";
export default {
  name: "Attr",
  data() {
    return {
      // 接收flag
      isDisabled: false,
    };
  },
  components: {
    AttrList,
  },
  mounted() {
    this.$bus.$on("sendFlag", this.changeOption);
  },
  methods: {
    changeOption(flag) {
      this.isDisabled = !flag;
    },
  },
};
</script>

<style>
</style>