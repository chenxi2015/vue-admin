<template>
  <div class="index" style="">
    <el-col :span="8" style="padding: 0px 10px;">
      <div style="background: #fff; height: 250px;">
        <ve-line
          :data="chartData"
          :colors="chartColors"
          :width="width"
          :height="height"
          :grid="grid"
          :scale="scale"
          :settings="ringchartSettings">
        </ve-line>
        <!-- <ve-line :data="chartData" :height="height"></ve-line> -->
      </div>
    </el-col>
    <el-col :span="8" style="padding: 0px 10px;">
      <div style="background: #fff; height: 250px;">
        <ve-ring :data="ringchartData" :settings="chartSettings"></ve-ring>
      </div>
    </el-col>
    <el-col :span="8" style="padding: 0px 10px;">
      <div style="background: #fff; height: 250px;">
        OK
      </div>
    </el-col>
  </div>
</template>

<script>
// import axios from 'axios'
import VeLine from 'v-charts/lib/line'
import VeRing from 'v-charts/lib/ring'

export default {
  name: 'Index',
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      loadingSeen: false,
      isCollapse: false,
      navSiderwidthStyle: {
        transition: '0.5s',
        width: '64px'
      },
      activeIndex: '1',
      restaurants: [],
      state3: '',
      itemGroupStyle: {
        'border-radius': '4px'
      }
    }
  },
  created () {
    this.chartData = {
      columns: ['日期', '销售额', '占比'],
      rows: [
        { '日期': '1月1日', '销售额': 1523, '占比': 0.12 },
        { '日期': '1月2日', '销售额': 1223, '占比': 0.345 },
        { '日期': '1月3日', '销售额': 2123, '占比': 0.7 },
        { '日期': '1月4日', '销售额': 4123, '占比': 0.31 },
        { '日期': '1月5日', '销售额': 3123, '占比': 0.12 },
        { '日期': '1月6日', '销售额': 7123, '占比': 0.65 }
      ]
    }
    this.chartColors = [
      '#19d4ae', '#5ab1ef', '#fa6e86',
      '#ffb980', '#0067a6', '#c4b4e4',
      '#d87a80', '#9cbbff', '#d9d0c7',
      '#87a997', '#d49ea2', '#5b4947',
      '#7ba3a8'
    ]
    this.grid = { left: 20, right: 20 }
    this.scale = { y: true }
    this.width = '100%'
    this.height = '300px'
    this.ringchartSettings = {
      axisSite: {
        right: ['占比']
      },
      yAxisType: ['KMB', 'percent'],
      area: true
    }
    this.ringchartData = {
      columns: ['日期', '成本', '利润'],
      rows: [
        { '日期': '1月1号', '成本': 123, '利润': 3 },
        { '日期': '1月2号', '成本': 1223, '利润': 6 },
        { '日期': '1月3号', '成本': 2123, '利润': 90 },
        { '日期': '1月4号', '成本': 4123, '利润': 12 },
        { '日期': '1月5号', '成本': 3123, '利润': 15 },
        { '日期': '1月6号', '成本': 7123, '利润': 20 }
      ]
    }
    this.chartSettings = {
      dimension: '成本',
      metrics: '利润'
    }
  },
  components: { VeLine, VeRing },
  mounted () {
    this.restaurants = this.loadAll()
  },
  methods: {
    handleIconClick (ev) {
      console.log(ev)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    onSubmit () {
      console.log('submit!')
    },
    handleShowAllSearch () {
    },
    handleClick () {
    },
    handleRefresh () {
      this.loadingSeen = true
    },
    handleNav () {
      this.isCollapse = !this.isCollapse
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants

      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return function (restaurant) {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
