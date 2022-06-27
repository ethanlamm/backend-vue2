<template>
  <div>
    <el-card>
      <div class="header">
        <span>{{ title }}</span>
        <i class="el-icon-info"></i>
      </div>
      <div class="number">
        <span>{{ number }}</span>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <slot name="footer"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "number"],
};
</script>

<style scoped>
.header span {
  font-size: 12px;
}
.header i {
  font-size: 12px;
  float: right;
}
.number {
  padding-top: 5px;
}
.number span {
  font-size: 24px;
}
.content {
  height: 50px;
  width: 100%;
  padding-bottom: 2px;
  border-bottom: 1px solid #eee;
}
</style>