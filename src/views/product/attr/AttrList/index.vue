<template>
  <div>
    <!-- 第一部分：展示数据 -->
    <div v-show="flag">
      <!-- 按钮 -->
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-bottom: 10px"
        @click="add"
        :disabled="!category3Id"
        v-permission="{ action: 'add', effect: 'disabled' }"
        >添加属性</el-button
      >
      <!-- 表格 -->
      <!-- :data="list"：展示数据 -->
      <el-table style="width: 100%" :data="list" border>
        <el-table-column label="序号" width="80px" type="index" align="center">
        </el-table-column>
        <el-table-column label="属性名称" prop="attrName" width="150px">
        </el-table-column>
        <el-table-column label="属性值列表" width="width">
          <template slot-scope="{ row }">
            <el-tag
              type="success"
              v-for="attr in row.attrValueList"
              :key="attr.id"
              style="margin: 0 10px"
              >{{ attr.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="{ row }">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              v-permission="{ action: 'update', effect: 'disabled' }"
              @click="edit(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-permission="{ action: 'remove', effect: 'disabled' }"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 第二部分：添加或修改属性 -->
    <div v-show="!flag">
      <el-form
        :inline="true"
        ref="form"
        label-width="80px"
        :model="baseAttrInfo"
      >
        <!-- 输入属性名 -->
        <el-form-item label="属性名">
          <el-input
            placeholder="请输入属性名"
            v-model="baseAttrInfo.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 添加属性值 -->
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addAttrValue"
        :disabled="baseAttrInfo.attrName ? false : true"
        >添加属性值</el-button
      >
      <el-button>取消</el-button>
      <!-- 表格 -->
      <el-table
        style="width: 100%; margin: 10px 0"
        :data="baseAttrInfo.attrValueList"
      >
        <el-table-column align="center" type="index" label="序号" width="80px">
        </el-table-column>
        <!-- 属性值 -->
        <el-table-column label="属性值名称" width="width">
          <template slot-scope="{ row, $index }">
            <el-input
              v-model="row.valueName"
              placeholder="请输入属性值"
              size="mini"
              v-if="row.flag"
              @blur="hideInput(row)"
              :ref="$index"
            ></el-input>
            <span
              v-else
              @click="showInput(row, $index)"
              style="display: block"
              >{{ row.valueName }}</span
            >
          </template>
        </el-table-column>
        <!-- 操作 -->
        <!-- @onConfirm：element-UI 2.13.2版本 ==> package.json -->
        <el-table-column label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <el-popconfirm
              :title="`确定删除 ${row.valueName} 吗？`"
              @onConfirm="deleteAttrValue($index)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 保存修改和取消修改 -->
      <el-button
        type="primary"
        @click="saveAttr"
        :disabled="baseAttrInfo.attrValueList.length < 1"
        >保存修改</el-button
      >
      <el-button @click="hide">取消修改</el-button>
    </div>
  </div>
</template>

<script>
// 按需引入 lodash 深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "CategoryList",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 服务器返回数据
      list: [],
      // 显示隐藏
      flag: true,
      // 收集添加或修改的属性
      baseAttrInfo: {
        attrName: "", // 属性名
        attrValueList: [], //属性值数组
        categoryId: 0, // 三级分类Id
        categoryLevel: 3, // 服务器区分
      },
    };
  },
  mounted() {
    // mounted:开启定时器，发送网络请求，订阅消息，绑定自定义事件
    this.$bus.$on("categoryId", this.getCategoryId);
  },
  methods: {
    // 获取数据
    async getData() {
      this.list = [];
      let { category1Id, category2Id, category3Id } = this;
      // 有category3Id才发请求
      let result = category3Id
        ? await this.$api.attr.reqAttrInfo(
            category1Id,
            category2Id,
            category3Id
          )
        : "";
      if (result.code == 200) {
        // 清空数据
        this.list = result.data;
      }
    },
    // 从CategorySelect获取Id
    getCategoryId(category1Id, category2Id, category3Id) {
      // console.log("@@", category1Id, category2Id, category3Id);
      this.category1Id = category1Id;
      this.category2Id = category2Id;
      this.category3Id = category3Id;
    },
    // 点击添加属性按钮
    add() {
      // 弹出表格
      this.flag = false;
      // 清空数据
      this.baseAttrInfo = {
        attrName: "", // 属性名
        attrValueList: [], //属性值数组
        categoryId: this.category3Id, // 三级分类Id
        categoryLevel: 3, // 服务器区分
      };
    },
    // 修改属性
    edit(row) {
      this.flag = false;
      // 展示所选数据：(多层数据)深拷贝--数据隔离
      this.baseAttrInfo = cloneDeep(row);
    },
    // 点击取消修改按钮
    hide() {
      this.flag = true;
    },
    // 添加属性值
    addAttrValue() {
      this.baseAttrInfo.attrValueList.push({
        attrId: this.baseAttrInfo.id, // 属性名相应Id
        valueName: "", // 属性值
        flag: true, // 每次新增数据，均先展示input框，即新增的默认input为显示状态 flag: true
      });
      this.$nextTick(() => {
        this.$refs[this.baseAttrInfo.attrValueList.length - 1].focus();
      });
    },
    // input框blur事件
    hideInput(row) {
      // 输入为空
      let valueName = row.valueName.trim();
      if (!valueName) {
        this.$message.warning("属性值不能为空！");
        row.valueName = "";
        return;
      }
      // 输入重复
      let result = this.baseAttrInfo.attrValueList.some((item) => {
        // 排除自身相比
        if (row != item) {
          return item.valueName == valueName;
          // 没找到相同的返回false，找到了返回true
        }
      });
      if (result) {
        this.$message.warning("属性值不能重复");
        return;
      }
      // 隐藏input
      row.flag = false;
    },
    // 点击span显示input，并且自动获取焦点
    showInput(row, index) {
      // 由于服务器返回的原数据中没有flag(控制input的显示和隐藏)，因此要新增这个响应式数据
      // 显示input
      if (!row.flag) {
        this.$set(row, "flag", true);
      }
      row.flag = true;
      // 由于是v-if和v-else控制，因此用$nextTick获取后出现的input
      this.$nextTick(() => {
        // 给input打的ref标记
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteAttrValue(index) {
      // 此处删除不需要发请求，在点击保存按钮时统一发请求
      this.baseAttrInfo.attrValueList.splice(index, 1);
    },
    // 保存修改
    async saveAttr() {
      // 整理数据
      this.baseAttrInfo.attrValueList = this.baseAttrInfo.attrValueList.filter(
        (item) => {
          // 去除属性值为空的 item.valueName ==> 即input框为空的项
          if (item.valueName) {
            // 删除flag属性，服务器保存的数据不需要此属性
            return delete item.flag;
          }
        }
      );
      // console.log(this.baseAttrInfo);
      // 发请求;
      try {
        await this.$api.attr.reqSaveAttr(this.baseAttrInfo);
        this.$message.success("修改成功");
        // 关闭
        this.flag = true;
        // 重新获取数据
        this.getData();
      } catch (err) {}
    },
  },
  watch: {
    category3Id: {
      handler() {
        this.getData();
      },
    },
    flag: {
      handler() {
        this.$nextTick(() => {
          let { flag } = this;
          this.$bus.$emit("sendFlag", flag);
        });
      },
    },
  },
};
</script>

<style>
</style>