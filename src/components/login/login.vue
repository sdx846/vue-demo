<template>
  <!-- <div class="login">
    <h1>{{ msg }}</h1>
    <el-button type="primary" @click="onLogin">登录</el-button>
  </div>-->
  <div class="container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="loginName">
        <el-input
          type="text"
          v-model="ruleForm.loginName"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="cardInput">
        <el-col :span="12">
          <el-input
            @keyup.native.enter="handleSubmit"
            v-model="ruleForm.cardInput"
            placeholder="请输入验证码"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <div class="card">
            <img :src="imgSrc" alt @click="getVerification" />
          </div>
        </el-col>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">
        记住密码
      </el-checkbox>
      <el-form-item style="width:100%;">
        <!-- <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logging">登录
        </el-button>-->
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="onLogin"
          :loading="logging"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//  import {login as loginApi} from '../../api/api'
import Store from '../../store/store';
import eventBus from '../../common/eventBus';

export default {
  // name: 'login',
  data() {
    return {
      uuid: '',
      imgSrc: '',
      logging: false,
      card: '',
      msg: 'login',
      ruleForm: {
        loginName: '',
        password: '',
        cardInput: ''
      },
      rules: {
        loginName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        cardInput: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      checked: false
    };
  },
  beforeCreate() {
    console.log(this);
    console.log(this.msg);
  },
  created() {
    console.log(this);
    console.log(this.msg);
    // 页面创建完成时先清除token,因为axios会拦截所有的请求，不清空的话，就会在登录时加上一个token,会导致登录失败
    // if (localStorage.getItem("user_token")) {
    //   localStorage.removeItem("user_token");
    // }
    // this.getCookie();
    // this.getVerification();

    // 订阅者：订阅消息（事件）
    eventBus.$on('toHome', this.toHome1);
    eventBus.$on('toHome', this.toHome2);
  },
  methods: {
    toHome1(e) {
      console.log(e);
    },
    toHome2(e) {
      console.log(e);
    },
    onLogin() {
      Store.set('user_token', 'this iss token');
      Store.set('ps', ['XTGL', 'YHGL', 'JSGL', 'QT']);
      // this.$message.success("登录成功！");
      this.$message({
        showClose: true,
        message: '登录成功',
        type: 'success'
      });
      this.$router.push({ path: '/home' });
    },
    // 用户登录
    handleSubmit() {
      let name = this.ruleForm.loginName,
        pwd = this.ruleForm.password;
      this.logging = true;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断复选框是否被勾选 勾选则调用配置cookie方法
          if (this.checked === true) {
            this.setCookie(name, pwd, 7);
          } else {
            this.clearCookie();
          }
          let params = {
            loginName: this.ruleForm.loginName,
            password: this.ruleForm.password,
            code: this.ruleForm.cardInput,
            uuid: this.uuid
          };
          this.validKaptcha();
          loginApi
            .loginSys(params)
            .then(data => {
              this.logging = false;
              let userInfo = {
                loginName: name,
                password: pwd,
                token: data.data.token
              };
              // 本地保存记住信息
              Store.set('Identity', userInfo);
              Store.set('user_token', data.data.token);
              this.getLoginInfo();
            })
            .catch(data => {
              this.logging = false;
            });
        } else {
          this.logging = false;
          this.$message.warning('请将表单完成再提交！');
        }
      });
    },
    // 获取登录用户信息
    getLoginInfo() {
      loginApi.getLoginUserInfo().then(res => {
        if (res.status === 200) {
          Store.set('ps', res.data.routerList);
          Store.set('roleKey', res.data.superManager);
          this.$message.success('登录成功！');
          this.$router.push({ path: '/home' });
        }
      });
    },
    /**
     * author: Wonder
     * description: 设置cookie
     * @param cName   用户名
     * @param cPwd    密码
     * @param exdays   存放天数
     */
    setCookie(cName, cPwd, exdays) {
      let exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        'userName' + '=' + cName + ';path=/;expires=' + exdate.toUTCString();
      window.document.cookie =
        'userPwd' + '=' + cPwd + ';path=/;expires=' + exdate.toUTCString();
    },
    /**
     * author: Wonder
     * description: 读取cookie
     */
    getCookie: function() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split('; '); // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('='); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] === 'userName') {
            this.ruleForm.loginName = arr2[1]; // 保存到保存数据的地方
          } else if (arr2[0] === 'userPwd') {
            this.ruleForm.password = arr2[1];
          }
        }
      }
    },
    /**
     * author: Wonder
     * description: 清除cookie
     */
    clearCookie: function() {
      this.setCookie('', '', -1); // 修改2值都为空，天数为负1天就好了
    },
    // 获取验证码
    getVerification() {
      kaptchaApi
        .getKaptcha()
        .then(res => {
          if (res.status === 200) {
            this.uuid = res.data.uuid;
            this.imgSrc = `data:image/bmp;base64,${res.data.imgBase64}`;
          }
        })
        .catch(err => {
          this.$message.error('获取验证码失败，请稍后重试！');
        });
    },
    // 校验验证码
    validKaptcha() {
      let params = {
        code: this.ruleForm.cardInput,
        uuid: this.uuid
      };
      kaptchaApi
        .checkKaptcha(params)
        .then(res => {
          if (res.status === 200) {
          }
        })
        .catch(err => {
          if (err.response.status === 400) {
            this.getVerification();
          }
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}

.remember {
  margin: 0 0 35px 0;
}

.card {
  height: 40px;
  margin-left: 12px;
}

.card img {
  height: 40px;
  width: 170px;
  border-radius: 8px;
}
</style>
