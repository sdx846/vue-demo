<template>
  <div class="system02">
    <h1>{{ msg }}</h1>
    <!-- v-for循环本地图片，不显示，需要把图片放在static里 -->
    <img class="img" src="../../assets/logo.png">
    <img class="img"  :src="url" v-for="url in imgList" :key="url">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formInline.age" placeholder="年龄"></el-input>
      </el-form-item>
    </el-form>
    <div>姓名：{{formInline.name}}</div>
    <div>年龄：{{formInline.age}}</div>
  </div>
</template>

<script>
export default {
  // name: 'system02',
  data () {
    return {
      msg: 'this is system02 page',
      // imgList: ['../../assets/1.gif', '../../assets/3.jpg', '../../assets/4.png']
      // imgList: ['../../../static/imgs/1.gif', '../../../static/imgs/3.jpg', '../../../static/imgs/4.png']
      imgList: ['/static/imgs/1.gif', '/static/imgs/3.jpg', '/static/imgs/4.png'],
      formInline: {
        name: '',
        age: ''
      }
    }
  }
}
</script>

<style scoped>
  .img{
    width:150px;
    height:150px;
  }
</style>
