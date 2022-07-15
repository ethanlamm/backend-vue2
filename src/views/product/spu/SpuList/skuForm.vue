<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{ spu.spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          rows="3"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <!-- 遍历attrInfo，每一个平台属性即为一个 el-form-item -->
          <el-form-item
            :label="attr.attrName"
            v-for="attr in attrInfo"
            :key="attr.id"
          >
            <!-- v-model="attr.collect" -->
            <!-- 收集的是每一个平台属性的id和该平台属性的选中的属性值的id，收集到该平台属性上 -->
            <el-select
              placeholder="请选择"
              v-model="attr.collect"
              style="margin-bottom: 5px"
            >
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="sale.saleAttrName"
            v-for="sale in saleAttr"
            :key="sale.id"
          >
            <!-- 收集方法同平台属性 -->
            <el-select placeholder="请选择" v-model="sale.collect">
              <el-option
                :label="saleValue.saleAttrValueName"
                :value="`${sale.id}:${saleValue.id}`"
                v-for="saleValue in sale.spuSaleAttrValueList"
                :key="saleValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="spuImage"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" prop="prop" width="80px">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="width: 80px; height: 80px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                size="small"
                v-if="row.isDefault == 0"
                @click="changeDefault(row)"
                >设为默认</el-button
              >
              <el-tag type="success" v-else>默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <template>
          <el-button type="primary" @click="saveSku">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skuForm",
  data() {
    return {
      // 服务器返回的数据(展示用)
      // 图片(表格中)
      spuImage: [],
      // 销售属性
      saleAttr: [],
      // 平台属性
      attrInfo: [],
      // 父组件传过来的row
      spu: {},

      // 收集数据
      skuInfo: {
        // 父组件给的数据
        category3Id: "",
        spuId: "",
        tmId: "",
        // 双向绑定的数据
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",

        // 代码收集
        // 收集图片
        skuDefaultImg: "",
        skuImageList: [
          //#region
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
          //#endregion
        ],
        // 平台属性
        skuAttrValueList: [
          // #region
          // {
          //   attrId: 0,
          //   attrName: "string",
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: "string",
          // },
          // #endregion
        ],
        // 销售属性
        skuSaleAttrValueList: [
          //#region
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
          //#endregion
        ],
      },
      // 图片收集
      imageList: [],
    };
  },
  methods: {
    // 获取SKU数据
    async addInitSku({ row, category1Id, category2Id, category3Id }) {
      // 收集数据
      this.spu = row;
      this.skuInfo.category3Id = category3Id;
      this.skuInfo.spuId = row.id;
      this.skuInfo.tmId = row.tmId;
      // 发请求
      // 1.获取图片
      let spuImage = await this.$api.spu.reqSpuImage(row.id);
      if (spuImage.code == 200) {
        let list = spuImage.data;
        list.forEach((item) => {
          // 给当前row添加属性值的思想，仅控制当前row
          // isDefault:0代表非默认图片，1代表设置为默认图片
          this.$set(item, "isDefault", 0);
        });
        this.spuImage = list;
      }

      // 2.获取销售属性(根据id获取)
      let saleAttr = await this.$api.spu.reqSpuSaleAttr(row.id);
      if (saleAttr.code == 200) {
        this.saleAttr = saleAttr.data;
      }

      // 3.平台属性
      let attrInfo = await this.$api.attr.reqAttrInfo(
        category1Id,
        category2Id,
        category3Id
      );
      if (attrInfo.code == 200) {
        this.attrInfo = attrInfo.data.slice(0, 6);
      }
    },

    // 表格选择收集
    handleSelectionChange(imageList) {
      // imageList:为选中图片的数组
      this.imageList = imageList;
    },
    // 设置默认图片
    changeDefault(row) {
      // 排他思想
      // 为什么不用index？因为这是button和tag的切换，不是input(有blur事件)
      this.spuImage.forEach((item) => (item.isDefault = 0));
      row.isDefault = 1;
      // 收集默认图片地址：当前点击的即设置为默认图片
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 保存按钮
    async saveSku() {
      // 整理数据  skuInfo
      let { attrInfo, saleAttr, imageList } = this;
      // 1.平台属性整理
      attrInfo.forEach((item) => {
        let { collect } = item;
        if (collect) {
          let [attrId, valueId] = collect.split(":");
          // 格式依据文档
          this.skuInfo.skuAttrValueList.push({ attrId, valueId });
        }
      });
      // 2.销售属性整理
      saleAttr.forEach((item) => {
        let { collect } = item;
        if (collect) {
          let [saleAttrId, saleAttrValueId] = collect.split(":");
          this.skuInfo.skuSaleAttrValueList.push({
            saleAttrId,
            saleAttrValueId,
          });
        }
      });
      //  3.图片整理
      this.skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      // 发请求
      let result = await this.$api.spu.reqSaveSku(this.skuInfo);
      if (result.code == 200) {
        this.$message.success("添加SKU成功");
        this.$emit("changeScreen", { screen: 0, flag: "新增sku" });
        Object.assign(this._data, this.$options.data());
      }
    },
    // 取消按钮
    cancel() {
      this.$emit("changeScreen", { screen: 0, flag: "取消" });
      // 清除数据
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
</style>