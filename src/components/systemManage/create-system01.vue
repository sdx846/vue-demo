<template>
  <div class="modal-dialog">
    <el-dialog
      :title="modalTitle"
      :visible="show"
      :close-on-click-modal="false"
      @close="onCloseDialog"
      width="70%"
    >
      <!-- 表单 -->
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" label-position="left">
        <h4 class="title">systeom01信息</h4>
        <div>{{modalTitle}}</div>
        <div>------开始插槽----------</div>
        <slot name="todo" :user="user" :test="test">默认{{ user.lastName }}</slot>
        <div>------结束插槽----------</div>
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
      msg:'msg1',
      user: {
        lastName: "名",
        firstName: "姓"
      },
      test: [
        { id: 1, name: "lili1" },
        { id: 2, name: "lili2" },
        { id: 3, name: "lili3" }
      ],
      form: {},
      formCopy: {},
      rules: {
        phone: [
          {
            required: true,
            pattern: /^[1][3456789][0-9]{9}$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: ["modalTitle", "show"],
  created() {
    //获取到父组件中属性和方法:
    // console.log(this.$parent.modalTitle);//结果是父组件初始化时的值
  },
  updated() {
    // console.log(this.$parent.modalTitle);//是最新的值
    // console.log(this.msg);
  },
  watch: {
    // show(newVal, oldVal) {
    //   if (newVal && this.modalTitle === "详情") {
    //     //
    //   }
    // }
  },
  methods: {
    //关闭弹框
    onCloseDialog() {
      this.$emit("update:show", false);
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
/* .modal-dialog .tab-container .el-form-item__content {
  margin-left: 0 !important;
} */
/* 搜索框 */
.modal-dialog .tab-container {
  margin-top: 20px;
  position: relative;
}
.modal-dialog .tab-container .g-query-input__width {
  position: absolute;
  right: 0;
  z-index: 10;
  width: 260px !important;
}
.modal-dialog .tab-container .g-query-input__width .el-input__inner {
  height: 35px;
  line-height: 35px;
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