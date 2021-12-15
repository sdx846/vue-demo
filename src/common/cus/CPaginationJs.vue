<template>
  <div class="c-panination-js" :style="'height:'+height+'px;'">
    <div style="margin-right:10px;">共{{ total }}条,{{ pageMax }}页</div>
    <div
      :class="page===1?'arrow-icon left-arrow cursor-disabled':'arrow-icon left-arrow'"
      :style="'width:'+height+'px;'"
      @click="onPre"
    >&lt;</div>
    <div class="page-group">
      <div
        :class="page===item?'page-item active':'page-item'"
        :style="'width:'+height+'px;'"
        v-for="item in pageArr"
        :key="item"
        @click="onPage(item)"
      >{{ item }}</div>
    </div>
    <div
      :class="page===pageMax?'arrow-icon cursor-disabled':'arrow-icon'"
      :style="'width:'+height+'px;'"
      @click="onNext"
    >&gt;</div>
    <div class="page-size" v-if="showPageSize">
      <div
        :class="{'page-size-text':true,'border-active':showSizeOpts}"
        @click.stop="onShowSize($event)"
      >
        <span>{{ pageSize }}条/页</span>
        <span :class="showSizeOpts?'top-arrow size-arrow':'bottom-arrow size-arrow'">&lt;</span>
      </div>
      <div
        class="page-size-opts"
        :style="'top:'+top+'px;max-height:'+height*4+'px;'"
        v-if="showSizeOpts"
      >
        <div
          :class="{'page-size-opt':true,'activeSize':item === pageSize}"
          :style="'height:'+height+'px;'"
          v-for="item in pageSizeOpts"
          :key="item"
          @click="onSelectSize(item)"
        >{{ item }}条/页</div>
      </div>
    </div>

    <div class="page-skit" v-if="showSkit">
      <span>跳至</span>
      <input type="text" v-model="skitPage" class="skit-input" @blur="onSkit" />
      <span>页</span>
    </div>
  </div>
</template>

<script>
// 页码区域最多显示5页
export default {
  data() {
    return {
      showSizeOpts: false,
      skitPage: null,
      skitBlur: false,
      pageArr: [1]
    };
  },
  props: {
    pagination: {
      type: Object,
      default: {}
    }
  },
  computed: {
    height() {
      return this.pagination.height || 24;
    },
    total() {
      return this.pagination.total || 0;
    },
    page() {
      return this.pagination.page || 1;
    },
    pageSize() {
      return this.pagination.pageSize || 10;
    },
    pageSizeOpts() {
      return this.pagination.pageSizeOpts || [5, 10, 15, 20];
    },
    showPageSize() {
      return this.pagination.showPageSize || true;
    },
    showSkit() {
      return this.pagination.showSkit || false;
    },
    // 最大页码
    pageMax() {
      return Math.ceil(this.pagination.total / this.pagination.pageSize);
    }
  },
  components: {},
  created() {
    this.pageContent();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('click', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('click', this.handleScroll);
  },
  watch: {
    page(newVal, oldVal) {
      this.pageContent();
    },
    pageMax() {
      this.pageContent();
    }
  },
  methods: {
    handleScroll() {
      this.showSizeOpts = false;
    },
    onSkit() {
      if (!this.skitPage) {
        return;
      }
      let page = Number(this.skitPage);
      if (page < 1) {
        page = 1;
      }
      if (page > this.pageMax) {
        page = this.pageMax;
      }
      this.changeFun({ page });
      this.skitBlur = true;
    },
    onShowSize(e) {
      const len = this.pageSizeOpts.length > 4 ? 4 : this.pageSizeOpts.length;
      const h = this.height * len;
      this.top = window.innerHeight - e.y > h ? this.height : -h;
      this.showSizeOpts = !this.showSizeOpts;
    },
    onSelectSize(size) {
      this.changeFun({ page: 1, pageSize: size });
    },
    onPage(page) {
      this.changeFun({ page: page });
    },
    onPre() {
      if (this.page === 1) {
        return;
      }
      this.changeFun({ page: this.page - 1 });
    },
    onNext() {
      if (this.page === this.pageMax) {
        return;
      }
      this.changeFun({ page: this.page + 1 });
    },
    changeFun(obj) {
      const params = Object.assign(
        { page: this.page, pageSize: this.pageSize },
        obj
      );
      this.$emit('change', params);
    },
    numberToArr(n) {
      // return [...new Array(n).keys()];
      let arr = [];
      for (let i = 1; i <= n; i++) {
        arr.push(i);
      }
      return arr;
    },
    pageArrFun(page) {
      return [page - 4, page - 3, page - 2, page - 1, page];
    },
    // type:skit跳转到某一页,skit页显示在页码中间。
    pageContent(type) {
      if (this.skitBlur) {
        this.skitBlur = false;
        return this.pageContent('skit');
      }
      if (this.pageMax <= 5) {
        return (this.pageArr = this.numberToArr(this.pageMax));
      }
      switch (type) {
        case 'skit':
          if (this.page + 2 < this.pageMax) {
            if (this.page - 2 >= 1) {
              this.pageArr = this.pageArrFun(this.page + 2);
            } else {
              this.pageArr = [1, 2, 3, 4, 5];
            }
          } else {
            this.pageArr = this.pageArrFun(this.pageMax);
          }
          break;
        default:
          if (this.pageArr.length === 5) {
            if (this.pageArr[4] < this.page) {
              this.pageArr = this.pageArrFun(this.page);
            }
            if (this.pageArr[0] > this.page) {
              this.pageArr = this.pageArrFun(this.page + 4);
            }
          } else {
            this.pageArr = [1, 2, 3, 4, 5];
          }
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';
$borderColor: #ddd;
$activeColor: #4878bd;
$hoverBgColor: #e6f7ff;
$color: #999;
$disabledColor: #d6d3d3;
%page-item {
  height: 100%;
  border: 1px solid $borderColor;
  @extend %flex-layout;
}

.c-panination-js {
  @extend .font1;
  width: 100%;
  color: $color;
  @extend %flex-layout;
  .cursor-disabled {
    cursor: not-allowed;
    color: $disabledColor;
  }
  .arrow-icon {
    @extend %page-item;
  }
  .left-arrow {
    margin-right: 5px;
  }
  .page-group {
    height: 100%;
    @extend %flex-x-b;
    .page-item {
      @extend %page-item;
      margin-right: 5px;
    }
    .page-item:hover {
      @extend .active;
    }
    .active {
      border: 1px solid $activeColor;
      color: $activeColor;
    }
  }
  .border-active {
    border: 1px solid $activeColor;
    box-shadow: 0 0 4px $activeColor;
  }
  .page-size {
    position: relative;
    margin: 0 8px;
    width: 90px;
    height: 100%;

    .page-size-text {
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
    .page-size-text:hover {
      border: 1px solid $activeColor;
    }
    .page-size-opts {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      overflow-x: hidden;
      box-shadow: 0 0 4px $borderColor;
      background-color: #fff;

      .page-size-opt {
        padding: 0 8px;
        @extend %flex-y-c;
      }
      .page-size-opt:hover,
      .activeSize {
        background-color: $hoverBgColor;
      }
    }
  }
  .page-skit {
    height: 100%;
    margin-left: 8px;
    .skit-input {
      width: 50px;
      height: 100%;
      border: 1px solid $borderColor;
      margin: 0 5px;
      padding: 0 5px;
      color: $color;
    }
    .skit-input:focus {
      outline: none;
      @extend .border-active;
    }
  }
}
</style>
