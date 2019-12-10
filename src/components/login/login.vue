<template>
  <div class="login">
    <h1>{{ msg }}</h1>
    <el-button type="primary" @click="onLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  // name: 'login',
  data() {
    return {
      msg: "this is login page"
    };
  },
  created() {
    // 页面创建完成时先清除token,因为axios会拦截所有的请求，不清空的话，就会在登录时加上一个token,会导致登录失败
    // if (localStorage.getItem("user_token")) {
    //   localStorage.removeItem("user_token");
    // }
    // this.getCookie();
    // this.getVerification();
  },
  methods: {
    onLogin() {
      // this.$message.success("登录成功！");
      this.$message({
        showClose: true,
        message: "登录成功",
        type: "success"
      });
      this.$router.push({ path: "/home" });
    }
  }
};
</script>

<style scoped>
</style>
