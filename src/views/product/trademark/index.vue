<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="dialogFormVisible = true"
      v-permission="{ action: 'add', effect: 'disabled' }"
      >添加</el-button
    >
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <!-- <img :src="row.logoUrl" style="width: 100px; height: 100px" /> -->
          <el-image
            style="width: 100px; height: 100px"
            :src="row.logoUrl"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            v-permission="{ action: 'update', effect: 'disabled' }"
            @click="edit(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            v-permission="{ action: 'remove', effect: 'disabled' }"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
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
      @current-change="getData"
      @size-change="sizeChange"
      layout="prev, pager, next, jumper,->,sizes,total"
    >
    </el-pagination>

    <!-- 对话框 -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
      @closed="clear"
    >
      <!-- :model="tmForm"  收集表单数据到 tmForm -->
      <!-- 分别收集：v-model="tmForm.tmName" -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="tmForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 在el-upload中，action是上传的地址，在文档中有，需要加上"/dev-api" -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorupdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      // 当前第几页
      page: 1,
      // 每页展示数据
      limit: 3,
      // 服务器返回数据
      list: [],
      total: 0,
      // 显示与隐藏对话框
      dialogFormVisible: false,
      // 收集表单数据，关键字根据文档
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 验证规则 element-UI Form表单
      // 只需要通过 rules 属性传入约定的验证规则，并将 el-form-item 的 prop 属性设置为需校验的字段名即可
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true }],
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 请求数据
    async getData(pager = 1) {
      this.page = pager;
      let { page, limit } = this;
      let result = await this.$api.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    // 获取当前页数据
    // pageChange(pager) {
    //   this.page = pager;
    //   this.getData();
    // },
    // 改变每页展示数据条数
    sizeChange(limit) {
      this.limit = limit;
      this.getData();
    },
    // 上传图片成功
    handleAvatarSuccess(res, file) {
      //  res.data-上传成功后服务器返回的图片地址，也是要前端收集的图片地址，收集后再发给服务器相应的接口
      // 收集图片地址
      this.tmForm.logoUrl = res.data;
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 关闭对话框后清空，dialog自带属性与方法
    clear() {
      this.tmForm.tmName = "";
      this.tmForm.logoUrl = "";
      this.tmForm.id = "";
    },
    // 添加或修改--点击确定键
    addorupdate() {
      this.$refs.tmForm.validate(async (success) => {
        if (success) {
          // 关闭对话框
          this.dialogFormVisible = false;
          // 携带发请求
          let result = await this.$api.trademark.reqAddOrUpdate(this.tmForm);
          if (result.code == 200) {
            // 弹出信息
            this.$message.success(
              this.tmForm.id ? "修改品牌成功" : "添加品牌成功"
            );
            // 再次渲染数据
            this.getData(this.tmForm.id ? this.page : 1);
          } else {
            console.log("error submit!!");
            return false;
          }
        }
      });
    },
    // 编辑
    edit(row) {
      this.dialogFormVisible = true;
      console.log(row);
      // 浅拷贝：直接赋值 ==> this.tmForm = row；这两者指向同一个地址，数据共享
      // 深拷贝：两者数据独立，互不干扰
      // 扩展运算符：即不是深拷贝，也不是浅拷贝；但其能深拷贝第一层，深层次的依然是浅拷贝
      // 这里只有一层，正好用到扩展运算符第一层的深拷贝
      this.tmForm = { ...row };
    },
    // 删除
    deleteTrademark(row) {
      this.$confirm(`请确认是否删除 ${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 点击确认按钮，发请求
          let result = await this.$api.trademark.reqDelete(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 再次获取数据，判断当前页数据条数
            // this.list 是未删除前的数据；如果未删除前的数据是>1；则删除一条后，展示当前页，否则展示上一页
            // 处理第一页
            let lastPage = this.page == 1 ? 1 : this.page - 1;
            this.getData(this.list.length > 1 ? this.page : lastPage);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>