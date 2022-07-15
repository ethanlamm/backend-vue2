<template>
  <div>
    <!-- 第一部分:展示SPU列表结构 -->
    <div v-show="screen == 0">
      <!-- 按钮 -->
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-bottom: 10px"
        :disabled="!category3Id"
        @click="addSpu"
        v-permission="{ action: 'add', effect: 'disabled' }"
        >添加SPU</el-button
      >
      <!-- 表格 -->
      <el-table style="width: 100%" border :data="list">
        <el-table-column type="index" label="序号" width="80px" align="center">
        </el-table-column>
        <el-table-column prop="spuName" label="spu名称" width="width">
        </el-table-column
        ><el-table-column prop="description" label="spu描述" width="width">
        </el-table-column
        ><el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{ row }">
            <!-- title：文字提示 -->
            <el-button
              type="success"
              icon="el-icon-plus"
              size="mini"
              title="添加sku"
              v-permission="{ action: 'addsku', effect: 'disabled' }"
              @click="addSku(row)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              title="修改spu"
              v-permission="{ action: 'update', effect: 'disabled' }"
              @click="editSpu(row)"
            ></el-button>
            <el-button
              type="info"
              icon="el-icon-info"
              size="mini"
              title="查看当前spu全部sku列表"
              v-permission="{ action: 'skus', effect: 'disabled' }"
              @click="showSkuList(row)"
            ></el-button>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="deleteSpu(row)"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
                slot="reference"
                v-permission="{ action: 'delete', effect: 'disabled' }"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        style="margin-top: 20px; text-align: center"
        :current-page="page"
        :page-sizes="[3, 5, 10]"
        :page-size="limit"
        :total="total"
        @current-change="pageChange"
        @size-change="sizeChange"
        layout="prev, pager, next, jumper,->,sizes,total"
      >
      </el-pagination>
    </div>

    <!-- 第二部分、第三部分、第四部分按需展示 -->
    <!-- 第二部分:添加或修改SPU -->
    <spuForm
      v-show="screen == 1"
      @changeScreen="showSpuList"
      ref="spu"
    ></spuForm>
    <!-- 第三部分:添加SKU -->
    <skuForm
      v-show="screen == 2"
      @changeScreen="showSpuList"
      ref="sku"
    ></skuForm>
    <!-- 第四部分:展示SPU的SKU列表结构 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      @closed="closeDialog"
    >
      <el-table :data="skuList" style="width: 100%" v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import spuForm from "./spuForm.vue";
import skuForm from "./skuForm.vue";
export default {
  name: "SpuList",
  components: { spuForm, skuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      list: [],
      page: 1,
      limit: 3,
      total: 0,
      // screen:控制显示spu表格、sku表格、sku列表
      screen: 0,
      // 展示SKU列表
      spu: {},
      skuList: [],
      dialogTableVisible: false,
      loading: true,
    };
  },
  mounted() {
    this.$bus.$on("categoryId", this.getCategoryId);
  },
  methods: {
    // 获取SPU数据(第一部分列表)
    async getData() {
      let { page, limit, category3Id } = this;
      let result = category3Id
        ? await this.$api.spu.reqSpuList(page, limit, category3Id)
        : "";
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 从CategorySelect获取Id
    getCategoryId(category1Id, category2Id, category3Id) {
      this.category1Id = category1Id;
      this.category2Id = category2Id;
      this.category3Id = category3Id;
    },
    // 获取当前页数据
    pageChange(pager) {
      this.page = pager;
      this.getData();
    },
    // 改变每页展示数据条数
    sizeChange(limit) {
      this.limit = limit;
      this.getData();
    },
    // 添加SPU--按钮
    addSpu() {
      this.screen = 1;
      this.$refs.spu.addInitSpu(this.category3Id);
    },
    // 修改SPU(编辑)--按钮
    editSpu(row) {
      this.screen = 1;
      this.$refs.spu.editInitSpu(row);
    },
    // 保存的回调
    showSpuList({ screen, flag }) {
      // 子组件通知父组件切换场景，并再次获取数据展示
      this.screen = screen;
      if (flag == "新增spu") {
        // 新增返回第一页，新增的spu均在第一条展示
        this.pageChange(1);
      } else {
        // 停留在当前页(修改spu|新增sku|取消)
        this.pageChange(this.page);
      }
    },
    // 删除spu
    async deleteSpu(row) {
      let result = await this.$api.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message.success("删除成功");
        if (this.list.length <= 1) {
          // 返回上一页
          this.pageChange(this.page - 1);
        } else {
          // 停留当前页
          this.pageChange(this.page);
        }
      }
    },
    // 添加sku--按钮
    addSku(row) {
      this.screen = 2;
      let { category1Id, category2Id, category3Id } = this;
      this.$refs.sku.addInitSku({ row, category1Id, category2Id, category3Id });
    },
    // 显示sku(dialog)按钮
    async showSkuList(row) {
      this.spu = row;
      this.dialogTableVisible = true;
      // 发请求
      let result = await this.$api.spu.reqSkuInfo(row.id);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },
    // 关闭sku(dialog)
    closeDialog() {
      // 清空数据
      this.skuList = [];
      this.loading = true;
    },
  },
  watch: {
    category3Id: {
      handler() {
        this.list = [];
        this.page = 1;
        this.limit = 3;
        this.total = 0;
        this.getData();
      },
    },
    screen: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          let { screen } = this;
          // 这个是和三级联动相关的
          this.$bus.$emit("sendScreen", screen);
        });
      },
    },
  },
};
</script>

<style scoped>
.el-button {
  margin: 0 5px;
}
</style>