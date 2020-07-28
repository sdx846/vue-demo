<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <el-row style="height: 100%">
      <el-col :span="24" class="header">
        <!-- <el-col :span="10" class="logo">后台管理系统</el-col> -->
        <el-col :span="10"></el-col>
        <el-col :span="4" class="userinfo">
          <!-- <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner">
              <img src="../../assets/images/user.png" alt />
              欢迎您: {{username}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided @click.native="changePass">修改密码</el-dropdown-item>
              <el-dropdown-item divided @click.native="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>-->
        </el-col>
      </el-col>

      <el-col :span="24" class="main">
        <el-col :span="4" class="aside-box">
          <aside style="height: 100%">
            <!--导航菜单-->
            <el-menu
              unique-opened
              :default-active="active"
              @select="activeChange"
              class="el-menu-vertical-demo"
            >
              <el-menu-item index="home" @click="$router.push({path: '/home/other'})">
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
              </el-menu-item>

              <el-submenu index="home/systemManage" v-if="ps.includes('XTGL')">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-if="ps.includes('GL1')"
                    index="home/systemManage/users"
                    @click.ctrl.native="newPage('users')"
                    @click="$router.push({path:'/home/systemManage/users'})"
                  >管理1</el-menu-item>
                  <el-menu-item
                    v-if="ps.includes('GL2')"
                    index="home/systemManage/role"
                    @click.ctrl.native="newPage('role')"
                    @click="$router.push({path:'/home/systemManage/role'})"
                  >管理2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- <el-menu-item index="home/other" v-if="ps.includes('QT')">
                <template slot="title">
                  <div @click.ctrl="newPage('other')" @click="$router.push({path: '/home/other'})">
                    <i class="el-icon-menu"></i>
                    <span>其他</span>
                  </div>
                </template>
              </el-menu-item>-->
              <el-submenu index="home/other" v-if="ps.includes('QT')">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>其他</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    index="home/other/cssAnimate"
                    @click.ctrl.native="newPage('cssAnimate')"
                    @click="$router.push({path:'/home/other/cssAnimate'})"
                  >cssAnimate</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </aside>
        </el-col>

        <el-col :span="20">
          <section class="content-container">
            <div class="grid-content bg-purple-light">
              <!--内容头部面包屑-->
              <el-col :span="24" class="breadcrumb-container">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-box">
                  <div class="breadcrumb-item">
                    <el-breadcrumb-item
                      separator="/"
                      v-for="(item,index) in breadList"
                      :key="index"
                      :to="{path: item.path === '/home'? item.path: ''}"
                    >{{item.name}}</el-breadcrumb-item>
                  </div>
                </el-breadcrumb>
              </el-col>
              <!--主体内容区-->
              <div style="width: 100%">
                <el-col :span="24" class="content-wrapper">
                  <transition name="fade" mode="out-in">
                    <router-view></router-view>
                  </transition>
                </el-col>
              </div>
            </div>
          </section>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { Menu, Submenu, MenuItem, MenuItemGroup } from "element-ui";
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
import Store from "../../store/store";
export default {
  // name: 'home',
  data() {
    return {
      username: "admin",
      msg: "this is home page",
      active: sessionStorage.getItem("active") || "home",
      ps: ["XTGL", "GL1", "GL2", "QT"], //登录后从后台获取的权限列表
      // roleKey: Store.get("roleKey"),
      breadList: []
    };
  },
  created() {
    // if (Store.get("ps")) {
    //   this.ps = Store.get("ps");
    // }
    if (!localStorage.getItem("user_token")) {
      this.$router.replace({
        path: "/login"
      });
      return;
    }
    this.getBread();
    // console.log(this.$parent);
    // console.log(this.$root);
    // console.log(this.$children);
    // console.log(this.$refs);
    // console.log(this.$el);
    // console.log(this.$els);
    // console.log(this.$data);
    // console.log(this.$options);
  },
  watch: {
    $route() {
      this.getBread();
    }
  },
  methods: {
    newPage(path) {
      const { href } = this.$router.resolve({
        path: path
      });
      window.open(href, "_blank");
    },
    getBread() {
      this.breadList = this.$route.matched;
      for (let item of this.breadList) {
        if (item.name === "首页") {
          item.path = "/home";
        }
      }
    },
    activeChange(index) {
      sessionStorage.setItem("active", index);
    }
  }
};
</script>

<style scoped="" type="text/css">
.content-container {
  padding: 20px;
}
</style>
