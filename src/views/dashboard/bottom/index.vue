<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>线上热门搜索</span>
            <i class="el-icon-more"></i>
          </div>
          <el-row :gutter="10">
            <el-col :span="12"><LineEchart></LineEchart></el-col>
            <el-col :span="12"><LineEchart></LineEchart></el-col>
          </el-row>
          <!-- 表格 -->
          <el-table :data="list" style="width: 100%" border size="small">
            <el-table-column type="index" label="排名" width="80">
            </el-table-column>
            <el-table-column label="搜索关键字" width="width">
            </el-table-column>
            <el-table-column label="用户数" width="width" sortable>
            </el-table-column>
            <el-table-column label="周涨幅" width="width" sortable>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <el-pagination
            layout="prev, pager, next"
            :total="1000"
            style="text-align: right"
          >
          </el-pagination>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>销售额类别占比</span>
          </div>
          <div><CatrgoryEchart :data="dataList"></CatrgoryEchart></div>
          <el-button-group>
            <!-- <el-button type="primary" size="small">全部渠道</el-button> -->
            <el-button
              type="primary"
              size="small"
              ref="online"
              @click="changEchart('online')"
              >线上
            </el-button>
            <el-button
              type="primary"
              size="small"
              ref="shop"
              @click="changEchart('shop')"
              >门店
            </el-button>
          </el-button-group>
        </el-card>

        <!-- <div
          class="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
            checked
          />
          <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio2"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>

          <input
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio3"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="btnradio3">Radio 3</label>
        </div> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineEchart from "./line_bottom";
import CatrgoryEchart from "./category";
import { mapGetters } from "vuex";
export default {
  name: "Bottom",
  components: { LineEchart, CatrgoryEchart },
  data() {
    return {
      list: [1, 2],
      screen: "online",
      dataList: [],
    };
  },
  computed: {
    // vuex中存储了mock数据，到需要数据的地方拿
    ...mapGetters("home", ["saleRank"]),
    online() {
      return this.saleRank.online || {};
    },
    shop() {
      return this.saleRank.shop || {};
    },
    onlineList() {
      let { online } = this;
      let name = online.name;
      let value = online.value;
      return name && name.map((name, i) => ({ name, value: value[i] }));
    },
    shopList() {
      let { shop } = this;
      let name = shop.name;
      let value = shop.value;
      return name && name.map((name, i) => ({ name, value: value[i] }));
    },
  },
  methods: {
    changEchart(screen) {
      if (screen == "online") {
        this.dataList = this.onlineList;
      } else {
        this.dataList = this.shopList;
      }
    },
  },
  watch: {
    screen: {
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => this.changEchart(newValue));
      },
    },
  },
};
</script>

<style scoped>
.el-icon-more {
  float: right;
}
.box-card {
  position: relative;
}
.el-button-group {
  position: absolute;
  top: 15px;
  right: 20px;
}
</style>