<template>
  <div class="c-select" :style="'height:'+height+'px;'">
    <div :class="{'select-text':true,'border-active':showOpts}" @click.stop="onShowOpts($event)">
      <span>{{ selectLabel }}</span>
      <span :class="showOpts?'top-arrow size-arrow':'bottom-arrow size-arrow'">&lt;</span>
    </div>
    <div class="select-opts" :style="'top:'+top+'px;max-height:'+height*4+'px;'" v-if="showOpts">
      <div
        :class="{'select-opt':true,'activeSize':item.value === selectVal}"
        :style="'height:'+height+'px;'"
        v-for="(item,index) in opts"
        :key="index"
        @click="onSelectOpt(item.value)"
      >{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOpts: false,
      selectLabel: ''
    };
  },
  props: {
    opts: {
      type: Array,
      default: []
    },
    selectVal: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 30
    }
  },
  // computed: {
  //    selectLabel() {
  //     return this.opts.filter(x=>x.value ===this.selectVal)[0].label
  //   }
  // },
  watch: {
    // selectVal(newVal,oldVal){
    //   this. selectLabel = this.opts.filter(x=>x.value === newVal)[0].label

    // }
    selectVal: {
      handler: function(val) {
        this.selectLabel = this.opts.filter(x => x.value === val)[0].label;
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onHideOpts);
    window.addEventListener('click', this.onHideOpts);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onHideOpts);
    window.removeEventListener('click', this.onHideOpts);
  },
  methods: {
    onHideOpts() {
      this.showOpts = false;
    },
    onShowOpts(e) {
      const len = this.opts.length > 5 ? 5 : this.opts.length;
      const h = this.height * len;
      this.top = window.innerHeight - e.y > h ? this.height : -h;
      this.showOpts = !this.showOpts;
    },
    onSelectOpt(opt) {
      this.$emit('change', opt);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
$borderColor: #ddd;
$activeColor: #cac7c7;
$hoverBgColor: #e6f7ff;
$disabledColor: #d6d3d3;
.c-select {
  position: relative;
  margin: 0 8px;
  width: 120px;

  .select-text {
    height: 100%;
    border: 1px solid $borderColor;
    padding: 0 8px;
    border-radius: 4px;
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
