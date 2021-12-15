<template>
  <div class="select-page">
    <c-select style="width:160px;height:32px;" :opts="opts" :selectVal="selectVal" @change="changeOk"></c-select>
  </div>
</template>

<script>
// import { system as systemApi } from '../../api';
export default {
  data() {
    return {
      opts: [
        { label: '苹果1', value: 'apple1' },
        { label: '苹果2', value: 'apple2' },
        { label: '苹果3', value: 'apple3' },
        { label: '苹果4', value: 'apple4' },
        { label: '苹果5', value: 'apple5' },
        { label: '苹果6', value: 'apple6' }
      ],
      selectVal: 'apple3'
    };
  },
  methods: {
    changeOk(val) {
      this.selectVal = val;
    }
  }
};
</script>

<style scoped>
.select-page{
    padding:20px;
    color:#333;
    font-size:14px;
}
</style>
