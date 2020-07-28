<template>
  <div class="system01">
    <h1>{{ msg }}</h1>
    <div>
      <span>{{str}}</span>
      <p>{{obj.str}}</p>
    </div>
    <div class="flex">
      <div class="btn" @click="onAdd">新增</div>
      <div class="btn" @click="onEdit">编辑</div>
      <div class="btn" @click="onChangeObj">更改obj的str</div>
    </div>
    <create :modal-title="modalTitle" :show.sync="showModal">
      <template v-slot:todo="slotProps" >
        {{slotProps.user.firstName}}
        <span v-for="item in slotProps.test" :key="item.name">{{item.name}}</span>  
      </template> 
    </create>  
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
      str:'str',
      obj:{str:'obj str'},
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
    onChangeObj(){
      let that=this;
      that.obj.str="这是改变后的str";
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
