<template>
  <div class="system03">
    <c-table-no :tableData="allData" :columns="columns" :pageSize="pagination.pageSize" @choose="chooseOk" style="height:calc(100% - 30px)">
      <div
        slot="pm10"
        slot-scope="row"
        :style="'color:'+qualityColorMap[row.data.aqi]"
      >{{ row.data.pm10 }}</div>
      <div
        slot="pm25"
        slot-scope="row"
        :style="'color:'+qualityColorMap[row.data.aqi]"
      >{{ row.data.pm25 }}</div>
      <div slot="quality" slot-scope="row" :style="'color:'+qualityColorMap[row.data.aqi]">
        <span class="line-text" :style="'background-color:'+qualityColorMap[row.data.aqi]"></span>
        {{ row.data.aqi }}
      </div>
    </c-table-no>
    <c-pagination
      height="30"
      :pagination="pagination"
      @change="handleChange"
    ></c-pagination>
  </div>
</template>

<script>
import { system as systemApi } from '../../api';
// import { Pagination } from 'element-ui';
export default {
  // name: 'system03',
  data() {
    return {
      allData: [
        {
          pm10: '12',
          pm25: '120',
          aqi: '良好',
          time: '2021-12-04 09:45:10'
        },
        {
          pm10: '120',
          pm25: '20',
          aqi: '良好',
          time: '2021-12-04 09:45:10'
        },
        {
          pm10: '12',
          pm25: '20',
          aqi: '良好',
          time: '2021-12-04 09:45:10'
        },
        {
          pm10: '12',
          pm25: '12',
          aqi: '优',
          time: '2021-12-04 09:40:10'
        },
        {
          pm10: '12',
          pm25: '120',
          aqi: '良好',
          time: '2021-12-14 09:45:10'
        },
        {
          pm10: '26',
          pm25: '40',
          aqi: '良好',
          time: '2021-12-04 09:45:10'
        },
        {
          pm10: '12',
          pm25: '120',
          aqi: '良好',
          time: '2021-02-14 09:45:10'
        },
        {
          pm10: '290',
          pm25: '320',
          aqi: '重度污染',
          time: '2021-12-11 09:45:10'
        },
        {
          pm10: '20',
          pm25: '290',
          aqi: '轻度污染',
          time: '2021-02-04 09:45:10'
        },
        {
          pm10: '12',
          pm25: '20',
          aqi: '优',
          time: '2021-12-14 09:45:10'
        }
      ],
      pagination: {
        height:30,
        total:56,
        showSkit:true,
        page: 1,
        pageSize: 10,
        pageSizeOpts: [5, 10, 15]
      },
      columns: [
        {
          title: 'PM10',
          dataIndex: 'pm10',
          scopedSlots: { customRender: 'pm10' }
        },
        {
          title: 'PM2.5',
          dataIndex: 'pm25',
          scopedSlots: { customRender: 'pm25' }
        },
        {
          title: '空气质量',
          dataIndex: 'aqi',
          scopedSlots: { customRender: 'quality' }
        },
        { title: '记录时间', dataIndex: 'time', width: 160 }
      ],
      qualityColorMap: {
        优: '#51CFA5',
        良: '#FFC300',
        轻度污染: '#FE9900',
        中度污染: '#ED5A58',
        重度污染: '#A053B0',
        严重污染: '#A11D6E'
      }
    };
  },
  components: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    handleChange(pagination) {
      this.pagination = Object.assign(this.pagination, pagination);
      this.getList();
    },
    getList() {},
    chooseOk() {}
  }
};
</script>

<style scoped lang="scss">
.system03 {
  height: calc(100vh - 132px);
  padding-bottom: 16px;
}
</style>
