<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in trademark"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <!-- 照片墙 -->
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImage"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <!-- 选项 -->
        <el-select
          :placeholder="`还有 ${unSelectAttr.length} 项未选择`"
          v-model="attr"
        >
          <el-option
            :label="attr.name"
            :value="`${attr.id}:${attr.name}`"
            v-for="attr in unSelectAttr"
            :key="attr.id"
          >
          </el-option>
        </el-select>
        <!-- 按钮：添加销售属性 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attr"
          @click="handleAddAttr"
          style="margin-left: 10px; margin-bottom: 10px"
          >添加销售属性</el-button
        >
        <!-- 表格 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <!-- @close="handleClose(tag)" -->
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                style="margin-bottom: 5px"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm" -->
              <!-- @blur="handleInputConfirm" -->
              <!-- inputVisible:是绑定在当前row的，解决点击时，全部input框同时出现的问题 -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                size="small"
                @blur="hideInput(row)"
                :ref="$index"
              >
              </el-input>
              <!-- @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row, $index)"
                >+ 添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="small"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdate">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuImageList: [
          //#region
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
          //#endregion
        ],
        spuName: "",
        spuSaleAttrList: [
          //#region
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
          //#endregion
        ],
        tmId: "",
      },
      spuImage: [],
      saleAttr: [],
      trademark: [],
      attr: "",
    };
  },
  computed: {
    unSelectAttr() {
      let filterArr = this.saleAttr.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return filterArr;
    },
  },
  methods: {
    // 照片墙删除图片的回调
    handleRemove(file, fileList) {
      // 先保存照片墙的图片至spuImage，发请求时先整理数据，再发请求
      this.spuImage = fileList;
    },
    // 照片墙预览时的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 添加图片至照片墙的回调
    handleSuccess(response, file, fileList) {
      if ((response.code = 200)) {
        this.spuImage = fileList;
      } else {
        this.$message.error(response.message);
      }
    },
    // 初始化spuForm--编辑按钮
    async editInitSpu(row) {
      // 获取SPU信息
      let spu = await this.$api.spu.reqSpuInfo(row.id);
      if (spu.code == 200) {
        this.spu = spu.data;
      }
      // 获取SPU图片
      let spuImage = await this.$api.spu.reqSpuImage(row.id);
      if (spuImage.code == 200) {
        let arr = spuImage.data;
        arr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImage = arr;
      }
      // 获取销售属性
      let saleAttr = await this.$api.spu.reqSaleAttr();
      if (saleAttr.code == 200) {
        this.saleAttr = saleAttr.data;
      }
      // 获取品牌信息
      let Trademark = await this.$api.spu.reqBaseTradeMark();
      // console.log("Trademark", Trademark);
      if (Trademark.code == 200) {
        this.trademark = Trademark.data.slice(0, 13);
      }
    },
    // 初始化spuForm--添加按钮
    async addInitSpu(category3Id) {
      // 清除数据
      Object.assign(this._data, this.$options.data());
      this.spu.category3Id = category3Id;
      // 获取销售属性
      let saleAttr = await this.$api.spu.reqSaleAttr();
      if (saleAttr.code == 200) {
        this.saleAttr = saleAttr.data;
      }
      // 获取品牌信息
      let Trademark = await this.$api.spu.reqBaseTradeMark();
      // console.log("Trademark", Trademark);
      if (Trademark.code == 200) {
        this.trademark = Trademark.data.slice(0, 13);
      }
    },
    // 添加销售属性
    handleAddAttr() {
      // 结构赋值
      let [baseSaleAttrId, saleAttrName] = this.attr.split(":");
      // 创建一个向spuSaleAttrList添加新的属性(对象)
      let newAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
      // 添加至spuSaleAttrList中
      this.spu.spuSaleAttrList.push(newAttr);
      // 清空选项(双向绑定)
      this.attr = "";
    },
    // 点击button显示input
    showInput(row, index) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // input失去焦点隐藏input
    hideInput(row) {
      // console.log(row);
      let { baseSaleAttrId, inputValue } = row;

      // 输入不能为空
      let saleAttrValueName = inputValue.trim();
      if (saleAttrValueName == "") {
        this.$message.warning("属性值不能为空");
        // 清空无效值
        row.inputValue = "";
        // 隐藏input框，显示button按钮
        row.inputVisible = false;
        return;
      }
      // 输入不能重复，这里还没有push，所以不用排除自身
      let repeat = row.spuSaleAttrValueList.some(
        (item) => item.saleAttrValueName == saleAttrValueName
      );
      if (repeat) {
        this.$message.warning("属性值不能重复");
        return;
      }

      // 整理数据
      let newSaveAttrValue = { baseSaleAttrId, saleAttrValueName };
      row.spuSaleAttrValueList.push(newSaveAttrValue);
      // 最后隐藏input
      row.inputVisible = false;
    },
    // 保存按钮
    async addOrUpdate() {
      // 整理数据
      this.spu.spuImageList = this.spuImage.map((item) => {
        return {
          imgName: item.name,
          imgUrl: item.imgUrl || item.response.data,
        };
      });
      // 发请求
      let result = await this.$api.spu.reqAddOrUpdate(this.spu);
      if (result.code == 200) {
        this.$message.success(this.spu.id ? "修改成功" : "新增成功");
        // 成功后，关闭(隐藏)spuForm
        this.$emit("changeScreen", {
          screen: 0,
          flag: this.spu.id ? "修改" : "新增spu",
        });
      }
    },
    // 取消按钮
    cancel() {
      this.$emit("changeScreen", { screen: 0, flag: "取消" });
      // 清除数据
      // console.log(this._data);
      // console.log(this.$options.data);
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>