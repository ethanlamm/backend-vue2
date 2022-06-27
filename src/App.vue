<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { initDynamicRoute } from "@/router";

export default {
  name: "App",
  // created() {
  //   initDynamicRoute();
  //   // 添加新的路由后使用next({ ...to, replace: true })保证路由已挂载完成
  //   next({ ...to, replace: true });
  // },
};
</script>
