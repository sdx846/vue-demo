<template>
  <div class="system01">
    <h1>{{ msg }}</h1>
    <div>
      <span>{{ str }}</span>
      <p>{{ obj.str }}</p>
    </div>
    <div class="flex">
      <div class="btn" @click="onAdd">新增</div>
      <div class="btn" @click="onEdit">编辑</div>
      <div class="btn" @click="onChangeObj">更改obj的str</div>
      <div class="btn" @click="onImport">导入</div>
      <div class="btn" @click="onExport">导出</div>
    </div>
    <create :modal-title="modalTitle" :show.sync="showModal" ref="create">
      <template v-slot:todo="slotProps">
        {{ slotProps.user.firstName }}
        <span v-for="item in slotProps.test" :key="item.name">
          {{ item.name }}
        </span>
      </template>
    </create>
  </div>
</template>

<script>
import Create from './create-system01';
// import {exportFile,} from '../../api/http'
import { system as systemApi } from '../../api';
export default {
  // name: 'system01',
  data() {
    return {
      msg: 'this is system01 page',
      modalTitle: '',
      showModal: false,
      str: 'str',
      obj: { str: 'obj str' },
      file: ''
    };
  },
  components: {
    create: Create
  },
  created() {
    // console.log(this);
  },
  mounted() {
    // 父组件获取子组件的属性和方法：this.$refs.create只能在mounted中才有值
    console.log(this.$refs.create.msg);
  },
  methods: {
    onAdd() {
      let that = this;
      // this.$refs.create.msg='msg2';
      that.modalTitle = '新增';
      that.showModal = true;
    },
    onEdit() {
      let that = this;
      that.modalTitle = '编辑';
      that.showModal = true;
    },
    onChangeObj() {
      let that = this;
      that.obj.str = '这是改变后的str';
    },
    onImport() {
      const that = this;
      systemApi
        .uploadFile({
          file: that.file,
          parkId: '2c9f80877520b1540175b0bb7b0204cc',
          setMealId: '2c9f8087776c7b990177b2f6345702d1'
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onExport() {
      const that = this;
      systemApi
        .exportFile({ file: that.file, id: 2 })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.btn {
  width: 90px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 16px;
  background-color: #19e5db;
  margin-bottom: 10px;
}
</style>
