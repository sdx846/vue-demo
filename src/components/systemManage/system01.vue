<template>
  <div class="system01">
    <h1>{{ msg }}</h1>
    <div class="btn" @click="onAdd">新增</div>
    <div class="btn" @click="onEdit">编辑</div>
    <create :modal-title="modalTitle" :show.sync="showModal"></create>  
  </div>
</template>

<script>
import Create from "./create-system01";
export default {
  // name: 'system01',
  data() {
    return {
      msg: "this is system01 page",
      modalTitle:'',
      showModal:false,
    };
  },
  components: {
    create: Create
  },
  methods: {
    onAdd(){
      let that=this;
      that.modalTitle="新增";
      that.showModal=true;
    },
    onEdit(){
      let that=this;
      that.modalTitle="编辑";
      that.showModal=true;
    },
  }
};
</script>

<style scoped>
  .btn{
    width:90px;
    height:40px;
    line-height:40px;
    text-align: center;
    border-radius:16px;
    background-color:#19e5db;
    margin-bottom:10px;
  }
</style>
