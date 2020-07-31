<template>
  <div class="modal-dialog">
    <!-- :visible.sync="show" :visible="show" -->
    <el-dialog
      :title="modalTitle"
      :visible.sync="show"
      :close-on-click-modal="false"
      @close="onCloseDialog"
      width="70%"
    >
      <!-- 表单 -->
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" label-position="left">
        <h4 class="title">基本信息</h4>
        <div>
          <!-- 一行 -->
          <!-- <el-row>
            <el-col :span="8">
              <el-form-item label="登录帐号：" prop="cmsAccount">
                <el-select
                  
                  v-model="form.cmsAccount"
                  placeholder="请选择"
                  class="g-query-input__width"
                >
                  <el-option
                    v-for="item in accountList"
                    :key="item.id"
                    :label="item.loginName"
                    :value="item.loginName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商户名称：" prop="commercialName">
                <el-input                 
                  v-model="form.commercialName"
                  placeholder="请输入"
                  maxlength="20"
                  class="g-query-input__width"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>-->
          <el-form-item label="商户名称：" prop="commercialName">
            <el-input
              v-model="form.commercialName"
              placeholder="请输入"
              maxlength="20"
              class="g-query-input__width"
            ></el-input>
            <!-- <span>{{hot}}</span> -->
          </el-form-item>
          <el-form-item label="商户图片：" prop="pictureVOS">
            <el-upload
              :before-upload="beforeAvatarUpload"
              :on-success="uploadSuccess"
              :data="contentData"
              :action="action"
              :headers="myHeader"
              :show-file-list="false"
            >
              <i
                v-if="!form.pictureVOS || form.pictureVOS.length<3"
                class="el-icon-plus avatar-uploader-icon"
              ></i>
            </el-upload>
            <span v-if="form.pictureVOS&&form.pictureVOS.length!==0" style="display:flex;">
              <span
                v-for="(item,index) in form.pictureVOS"
                :key="item.url"
                style="position:relative;margin-right: 8px;"
              >
                <img :src="item.url" class="avatar" />
                <i class="el-icon-circle-close close-icon" @click="onDelIcon(index)"></i>
              </span>
            </span>
            <span v-if="(!form.pictureVOS || form.pictureVOS.length===0)">--</span>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
// import baseConfig from "../../../api/config";
// import { commerManage as commerApi, shop as shopApi } from "../../../api/api";
// import utils from "../../../util/customFunction";

export default {
  data() {
    return {
      form: {
        cmsAccount: "",
        commercialName: "",
        pictureVOS: [], //商户图片集合 ,
      },
      formCopy: {},
      rules: {
        cmsAccount: [
          {
            required: true,
            message: "请选择",
            trigger: "blur"
          }
        ],
        commercialName: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^[1][3456789][0-9]{9}$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ]
      },
      // hot:'this is  hot',
      action: "", //图片上传路径
      myHeader: {
        // 上传图片加的头部信息
        "api-version": "1.0",
        Authorization: localStorage.getItem("user_token")
      },
      contentData: {
        // 上传图片的body体
        fileType: "PICTURE",
        serviceName: "ad-info-service"
      }
    };
  },
  props: ["modalTitle", "showModal", "id"],
  computed: {
    show: {
      get() {
        return this.showModal;
      },
      set(val) {
        this.$emit("update:showModal", val);
      }
    }
  },
  created() {},
  watch: {
    showModal(newVal, oldVal) {
      if (newVal && this.modalTitle === "详情") {
        //
      }
    }
  },
  methods: {
    //关闭弹框
    onCloseDialog() {
      //   this.$refs["form"].resetFields();
      // this.$emit("updateList", { curTitle: this.modalTitle });
      this.show = false;
    },
    //删除商户图片
    onDelIcon(index) {
      this.form.pictureVOS.splice(index, 1);
    },
    //分页
    handleSizeChange: function(val) {
      this.pageSize = val;
      this.getGiveoutList();
    },
    handleCurrentChange: function(val) {
      this.pageNo = val;
      this.getGiveoutList();
    },
    //图片上传前的验证
    beforeAvatarUpload(file) {
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      const isGIF = file.type === "image/gif";
      const isSVG = file.type === "image/svg+xml";
      const isLt30M = file.size / 1024 / 1024 < 30;

      if (!isJPEG && !isJPG && !isPNG && !isBMP && !isGIF && !isSVG) {
        this.$message.error("上传图片只能是jpeg/jpg/png/bmp/gif/svg格式!");
      }
      if (!isLt30M) {
        this.$message.error("上传图片总大小不能超过 30MB!");
      }
      return (isJPEG || isJPG || isPNG || isBMP || isGIF || isSVG) && isLt30M;
    },
    //上传成功后的回调
    uploadSuccess(response, file, fileList) {
      if (response.status === 200) {
        this.$message.success("图片上传成功");
        this.form.logoUrl = response.data.url;
      }
    }
  }
};
</script>
<style >
.modal-dialog .el-dialog__header {
  border: 1px solid #dcdfe6;
}
.modal-dialog .isDisabled .el-form-item {
  margin-bottom: 0;
}
.modal-dialog .title {
  margin: 20px 0;
}
.modal-dialog .text-layout {
  width: 130px;
  word-wrap: break-word;
  font-size: 12px;
  line-height: 15px;
  padding-top: 10px;
  height: 30px;
  /* overflow: hidden; */
}
.modal-dialog .el-dialog__header thead {
  background-color: #f5f7fa;
}
.modal-dialog .edit-btn {
  font-size: 12px;
  color: #409eff;
  vertical-align: bottom;
  padding-left: 5px;
}
/* 表格里的表单 */
.ellipsis {
  border: 0;
  background-color: rgba(255, 255, 255, 0);
  outline: none;
}
/* 搜索框 */
.modal-dialog .el-input__inner{
 color:red;
}
/* 上传图片 */
.modal-dialog .el-form-item__content {
  display: flex;
}
.modal-dialog .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.modal-dialog .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.modal-dialog .avatar-uploader-icon {
  border: 1px dashed #999;
  border-radius: 4px;
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  margin-right: 5px;
}

.modal-dialog .avatar {
  width: 100px;
  height: 55px;
  display: inline-block;
}
.modal-dialog .close-icon {
  position: absolute;
  top: -5px;
  right: -8px;
}
</style>