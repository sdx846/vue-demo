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
    if (localStorage.getItem("user_token")) {
      // this.getList();
    } else {
      this.$router.replace({
        path: "/login"
      });
    }
  },
  methods: {
    onAdd() {
      this.modalTitle = "新增";
      this.showModal = true;
      this.id = "";
    },
    updateList(opt) {}
  }
};
</script>

<style scoped>
</style>
