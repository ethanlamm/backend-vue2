<template>
  <!-- :inline="true"：行内表单 -->
  <el-form :inline="true" class="demo-form-inline" :model="cForm">
    <el-form-item label="一级分类">
      <!-- v-model：收集的是option的value  -->
      <el-select
        placeholder="请选择"
        v-model="cForm.category1Id"
        :disabled="isDisabled"
      >
        <el-option
          :label="c1.name"
          :value="c1.id"
          v-for="c1 in list1"
          :key="c1.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        placeholder="请选择"
        v-model="cForm.category2Id"
        :disabled="isDisabled"
      >
        <el-option
          :label="c2.name"
          :value="c2.id"
          v-for="c2 in list2"
          :key="c2.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        placeholder="请选择"
        v-model="cForm.category3Id"
        :disabled="isDisabled"
      >
        <el-option
          :label="c3.name"
          :value="c3.id"
          v-for="c3 in list3"
          :key="c3.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      // 一二三级分类数据
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props: ["isDisabled"],
  mounted() {
    this.getCategory1();
  },
  methods: {
    // 一级分类数据
    async getCategory1() {
      let result = await this.$api.attr.reqCategory1();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
  },
  watch: {
    "cForm.category1Id": {
      async handler() {
        // 根据一级分类Id获取二级分类数据
        let result = await this.$api.attr.reqCategory2(this.cForm.category1Id);
        if (result.code == 200) {
          // 清空二三级数据
          this.list2 = [];
          this.list3 = [];
          this.cForm.category2Id = "";
          this.cForm.category3Id = "";
          // 展示数据
          this.list2 = result.data;
        }
      },
    },
    "cForm.category2Id": {
      async handler() {
        // 根据二级分类Id获取三级分类数据
        let { category2Id } = this.cForm;
        let result = category2Id
          ? await this.$api.attr.reqCategory3(category2Id)
          : "";
        if (result.code == 200) {
          // 清空三级数据
          this.list3 = [];
          this.cForm.category3Id = "";
          // 展示数据
          this.list3 = result.data;
        }
      },
    },
    "cForm.category3Id": {
      handler() {
        // 给CategoryList发Id
        let { category1Id, category2Id, category3Id } = this.cForm;
        // console.log(category1Id, category2Id, category3Id);
        this.$bus.$emit("categoryId", category1Id, category2Id, category3Id);
      },
    },
  },
};
</script>

<style>
</style>