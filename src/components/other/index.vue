<template>
  <div class="other">
    <h1>{{ msg }}</h1>
    <el-button type="primary" icon="el-icon-plus" @click="onAdd">新增</el-button>

    <!-- 弹框  :key="Math.random()"-->
    <create
      :modal-title="modalTitle"
      :show-modal.sync="showModal"
      @updateList="updateList"
      :id="id"
    ></create>
    <!-- css 动画容器 -->
    <router-view></router-view>
    <!-- vuex应用 -->
    <!-- <div class='flex'>
      <div class="btn" @click="onSum">+</div>
      <div>{{$store.state.count}}</div>
      <div class="btn" @click="onReduce">-</div>
    </div>-->
  </div>
</template>

<script>
import Create from "./create";
export default {
  // name: 'other',
  data() {
    return {
      msg: "this is other page",
      id: "", //详情页的id
      modalTitle: "",
      showModal: false
    };
  },
  components: {
    create: Create
  },
  created() {
    if (!localStorage.getItem("user_token")) {
      this.$router.replace({
        path: "/login"
      });
      return;
    }
    // console.log(this.$store)
    // console.log(this.$parent);
    // console.log(this.$root);
    // console.log(this.$children);
    // console.log(this.$refs);
    // console.log(this.$el);
    // console.log(this.$els);
    // console.log(this.$data);
    // console.log(this.$options);
  },
  methods: {
    onAdd() {
      this.modalTitle = "新增";
      this.showModal = true;
      this.id = "";
    },
    updateList(opt) {},
    // onSum(){
    //   this.$store.dispatch('addFun');
    // },
    // onReduce(){
    //   this.$store.dispatch('reduceFun');
    // },
  }
};
</script>

<style>
</style>
