<template>
  <div class="c-select">
    <div
      :class="{'select-text':true,'border-active':showSizeOpts}"
      @click.stop="onShowSize($event)"
    >
      <span>{{ pageSize }}条/页</span>
      <span :class="showSizeOpts?'top-arrow size-arrow':'bottom-arrow size-arrow'">&lt;</span>
    </div>
    <div
      class="select-opts"
      :style="'top:'+top+'px;max-height:'+height*4+'px;'"
      v-if="showSizeOpts"
    >
      <div
        :class="{'select-opt':true,'activeSize':item === pageSize}"
        :style="'height:'+height+'px;'"
        v-for="item in pageSizeOpts"
        :key="item"
        @click="onSelectSize(item)"
      >{{ item }}条/页</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.c-select {
  position: relative;
  margin: 0 8px;
  width: 90px;
  height: 100%;

  .select-text {
    height: 100%;
    border: 1px solid $borderColor;
    padding: 0 8px;
    @extend %flex-x-b;
    .size-arrow {
      color: $borderColor;
      margin-left: 4px;
    }
    .bottom-arrow {
      transform: rotate(-90deg);
    }
    .top-arrow {
      transform: rotate(90deg);
    }
  }
  .select-text:hover {
    border: 1px solid $activeColor;
  }
  .select-opts {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow-x: hidden;
    box-shadow: 0 0 4px $borderColor;
    background-color: #fff;

    .select-opt {
      padding: 0 8px;
      @extend %flex-y-c;
    }
    .select-opt:hover,
    .activeSize {
      background-color: $hoverBgColor;
    }
  }
}
</style>
