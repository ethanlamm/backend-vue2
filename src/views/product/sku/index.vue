<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%; margin: 20px 0" border :data="skuList">
      <el-table-column align="center" type="index" label="序号" width="80">
      </el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="width"
      ></el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width"
      ></el-table-column>
      <el-table-column label="默认图片" width="120">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="width: 80px; height: 80px" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(KG)"
        prop="weight"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格(元)"
        width="80"
      ></el-table-column>
      <!-- 操作 -->
      <el-table-column
        prop="prop"
        label="操作"
        width="width"
        header-align="center"
      >
        <template slot-scope="{ row }">
          <!-- 上架与下架 -->
          <!-- v-model="row.saleStatus" 接受 布尔值 -->
          <!-- 显示标签：可用a链接包裹 -->
          <a title="上架/下架">
            <el-switch
              style="margin-right: 8px"
              v-model="row.saleStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changSaleStatus(row)"
              v-permission="{ action: 'updown', effect: 'disabled' }"
            >
            </el-switch>
          </a>
          <!-- 编辑 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            title="编辑"
            v-permission="{ action: 'update', effect: 'disabled' }"
            round
          ></el-button>
          <!-- 查看 -->
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            title="查看"
            round
            v-permission="{ action: 'detail', effect: 'disabled' }"
            @click="checkSkuInfo(row)"
          ></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            title="删除"
            round
            v-permission="{ action: 'remove', effect: 'disabled' }"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next,jumper, ->,sizes,total"
      :total="total"
      @current-change="getData"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :with-header="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            style="margin: 5px"
            size="mini"
            type="success"
            v-for="attr in skuInfo.skuAttrValueList"
            :key="attr.id"
            >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <!-- 轮播图 -->
          <el-carousel height="400px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" width="100%" height="100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      skuList: [],
      page: 1,
      limit: 3,
      total: 0,
      // 默认隐藏skuInfo
      drawer: false,
      skuInfo: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData(pager = 1) {
      this.page = pager;
      let { page, limit } = this;
      let result = await this.$api.sku.reqSku(page, limit);
      if (result.code == 200) {
        let { data } = result;
        this.total = data.total;
        // 对数据进行处理
        // data.records:原数据中只有 isSale: 0，无saleStatus属性
        data.records.forEach((item) => {
          if (item.isSale == 1) {
            // 1--上架状态
            this.$set(item, "saleStatus", true);
          } else {
            // 0--下架状态
            this.$set(item, "saleStatus", false);
          }
        });
        // 赋值展示
        this.skuList = data.records;
      }
    },
    // 改变每页展示数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getData();
    },
    // 上架与下架
    async changSaleStatus(row) {
      if (row.isSale == 1) {
        // 要下架，发请求
        let result = await this.$api.sku.reqCancelSale(row.id);
        if (result.code == 200) {
          this.$message.success("下架成功");
        }
      } else {
        // 要上架，发请求
        let result = await this.$api.sku.reqOnSale(row.id);
        if (result.code == 200) {
          this.$message.success("上架成功");
        }
      }
      // 再次获取数据，当前页
      this.getData(this.page);
    },
    // 查看sku信息
    async checkSkuInfo(row) {
      // 获取数据
      let result = await this.$api.sku.reqSkuInfo(row.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
      // 打开抽屉，显示skuInfo
      this.drawer = true;
    },
  },
};
</script>

<style>
.el-col {
  margin: 5px 10px;
}
.el-col-5 {
  text-align: right;
  font-size: 18px;
  font-weight: 700;
}
.el-col-16 {
  line-height: 21px;
}

/* 轮播图 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 轮播图底部样式自定义 */
.el-carousel__button {
  width: 20px;
  height: 10px;
  background: skyblue;
  border-radius: 5px;
}
</style>