<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <Card title="总销售额" number="￥ 126560">
          <template slot="content">
            <div class="content">
              <span>周同比</span>
              <span>56.67%</span>
              <i class="el-icon-caret-top"></i>
              <span>日同比</span>
              <span>19.16%</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </template>
          <template slot="footer">
            <div class="footer">
              <span>日销售额￥ 12423</span>
            </div>
          </template>
        </Card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <Card title="访问量" number="88460">
          <template slot="content"><LineEachart></LineEachart></template>
          <template slot="footer">
            <div class="footer">
              <span>日访问量 1234</span>
            </div>
          </template>
        </Card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <Card title="支付笔数" number="88460">
          <template slot="content"><BarEchart></BarEchart></template>
          <template slot="footer">
            <div class="footer">
              <span>转化率 65%</span>
            </div>
          </template>
        </Card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <Card title="运营活动效果" number="78%">
          <template slot="content"><PercentBar></PercentBar></template>
          <template slot="footer">
            <div class="footer">
              <span>周同比</span>
              <span>56.67%</span>
              <i class="el-icon-caret-top"></i>
              <span>日同比</span>
              <span>19.16%</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </template>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Card from "./card-template";
import LineEachart from "./lineEchart";
import BarEchart from "./barEchart";
import PercentBar from "./percentBar";
export default {
  name: "Top",
  components: { Card, LineEachart, BarEchart, PercentBar },
};
</script>

<style scoped>
.content {
  padding: 20px 0 3px 0;
}
.content span {
  font-size: 13px;
  margin-right: 4px;
}
template span {
  font-size: 12px;
  margin-right: 5px;
}
.el-icon-caret-top {
  color: red;
  margin-right: 15px;
}
.el-icon-caret-bottom {
  color: green;
}
.footer {
  padding-top: 8px;
}
.footer span {
  font-size: 12px;
  margin-right: 5px;
}
.echart {
  height: 50px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}
</style>