<template>
  <div id="app">
    <router-view/>
    <!-- https://www.cnblogs.com/yinn/p/9056731.html 与echart01.vue页面：provide / inject 用法 -->
    <!-- <router-view v-if="isRouterAlive" /> -->
  </div>
</template>

<script>
export default {
  name: 'App'
  // provide() {
  //   return {
  //     reload: this.reload
  //   };
  // },
  // data() {
  //   return {
  //     isRouterAlive: true
  //   };
  // },
  // methods: {
  //   reload() {
  //     this.isRouterAlive = false;
  //     this.$nextTick(function() {
  //       this.isRouterAlive = true;
  //     });
  //   }
  // }
};
</script>

<style lang="scss">
@import './styles/index.scss'
</style>
