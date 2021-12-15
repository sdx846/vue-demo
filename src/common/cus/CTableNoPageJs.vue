<template>
  <div class="cTable-container">
    <div class="cus-empty" v-if="tableData.length === 0">
      <img src="~@/assets/xmzl_qst.svg" class="empty-img" />
      <div class="text">暂无数据</div>
    </div>
    <div class="cus-table" v-if="tableData.length!==0">
      <div class="cus-thead">
        <div
          class="cus-th"
          v-for="item in columns"
          :key="item.dataIndex"
          :title="item.title"
          :style="item.width?'width:'+item.width+'px;':'flex:1;'"
        >
          <div class="showOneLine">{{ item.title }}</div>
        </div>
      </div>
      <div class="cus-tbody">
        <div
          :class="{ 'cus-tr':true,'hover-tr': isHover, 'active': isHover&&activeIndex===index }"
          :style="'height:'+(1/pageSize)*100+'%;'"
          v-for="(item,index) in tableData"
          :key="item.id"
          @click="selectRow(item,index)"
        >
          <div
            class="cus-td"
            v-for="i in columns"
            :key="i.dataIndex"
            :title="item[i.dataIndex]"
            :style="i.width?'width:'+i.width+'px;':'flex:1;'"
          >
            <template v-if="i.scopedSlots">
              <slot :name="i.scopedSlots.customRender" :data="item" :index="index"></slot>
            </template>
            <template v-else>
              <div class="showOneLine">{{ item[i.dataIndex] }}</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'cTable',
  data() {
    return {
      activeIndex: 0
    };
  },
  props: {
    tableData: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      default: null
    },
    pageSize: {
      type: Number,
      default: 10
    },
    // 是否有hover效果
    isHover: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    selectRow(row, index) {
      if (!this.isHover) {
        return;
      }
      this.activeIndex = index;
      this.$emit('choose', row);
    }
  }
};
</script>

<style scoped lang="scss">
.cTable-container {
  width: 100%;
  height: 100%;
  padding: 2% 2.5% 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cus-empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .empty-img {
      margin-bottom: 15px;
    }
    .text {
      color: #535b64;
    }
  }
  .showOneLine {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cus-table {
    width: 100%;
    flex: 1;
    .cus-thead {
      width: 100%;
      height: 12%;
      display: flex;
      align-items: center;
      .cus-th {
        font-size: 14px;
        font-weight: 100;
        opacity: 0.6;
        color: #333;
        text-align: center;
        overflow: hidden;
      }
    }
    .cus-tbody {
      width: 100%;
      height: 88%;
      overflow: hidden;
      .cus-tr {
        width: 100%;
        display: flex;
        align-items: center;
        font-weight: 400;
        color: #333;
        .cus-td {
          text-align: center;
          overflow: hidden;
        }
      }
      .hover-tr:hover {
        cursor: pointer;
        font-weight: 600;
        color: #01d4f9;
        background-color: #01293d;
        opacity: 0.5;
      }
      .active {
        font-weight: 600;
        color: #01d4f9;
        background-color: #01293d;
        opacity: 1 !important;
      }
    }
  }
}
</style>
