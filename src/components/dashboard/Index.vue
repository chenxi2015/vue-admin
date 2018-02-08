<template>
  <div class="index" style="">
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="padding: 0px 10px; margin: 10px 0px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>学员数 <span style="color: #409EFF">总数500人</span></span>
          <el-dropdown trigger="click" style="float: right; cursor: pointer;" >
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>今日</el-dropdown-item>
              <el-dropdown-item>本周</el-dropdown-item>
              <el-dropdown-item divided>本月</el-dropdown-item>
              <el-dropdown-item>全年</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="float: right; cursor: pointer; margin-right: 10px;">
            <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
              <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
            </el-tooltip>
          </div>
        </div>
        <div style="background: #fff; height: 250px;">
          <ve-line :data="chartData1" :colors="chartColors1" :height="height" :settings="chartSettings1"></ve-line>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="padding: 0px 10px; margin: 10px 0px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>学员科目人数 <span style="color: #409EFF">总数1111500人</span></span>
          <el-dropdown trigger="click" style="float: right; cursor: pointer;" >
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>今日</el-dropdown-item>
              <el-dropdown-item>本周</el-dropdown-item>
              <el-dropdown-item divided>本月</el-dropdown-item>
              <el-dropdown-item>全年</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="float: right; cursor: pointer; margin-right: 10px;">
            <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
              <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
            </el-tooltip>
          </div>
        </div>
        <div style="background: #fff; height: 250px;">
          <ve-histogram :data="chartData2" :colors="chartColors2" :height="height" :settings="chartSettings2"></ve-histogram>
        </div>
      </el-card>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="padding: 0px 10px; margin: 10px 0px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>学员男女比例</span>
          <el-dropdown trigger="click" style="float: right; cursor: pointer;" >
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>今日</el-dropdown-item>
              <el-dropdown-item>本周</el-dropdown-item>
              <el-dropdown-item divided>本月</el-dropdown-item>
              <el-dropdown-item>全年</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="float: right; cursor: pointer; margin-right: 10px;">
            <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
              <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
            </el-tooltip>
          </div>
        </div>
        <div style="background: #fff; height: 250px;">
          <ve-pie :data="chartData3" :colors="chartColors3" :height="height" :settings="chartSettings3"></ve-pie>
        </div>
      </el-card>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" style="padding: 0px 10px; margin: 10px 0px;">
      <el-card class="box-card yj-header-box-card">
        <div slot="header" class="clearfix">
          <span>报名班制 / 预约计时 订单数</span>
          <el-dropdown trigger="click" style="float: right; cursor: pointer;" >
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>今日</el-dropdown-item>
              <el-dropdown-item>本周</el-dropdown-item>
              <el-dropdown-item divided>本月</el-dropdown-item>
              <el-dropdown-item>全年</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-date-picker style="float: right; margin-top: -7px; margin-right: 10px;" v-model="searchForm.starttime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          <div style="float: right; cursor: pointer; margin-right: 10px;">
            <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
              <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
            </el-tooltip>
          </div>
        </div>
        <div style="background: #fff; height: 250px;">
          <ve-line :data="chartData4" :colors="chartColors4" :width="width" :height="height" :grid="grid" :scale="scale" :settings="chartSettings4"></ve-line>
          <!-- <ve-line :data="doublelinechartData" :colors="doublelinechartColors" :width="width" :height="height" :grid="grid" :scale="scale" :settings="doublelinerchartSettings"></ve-line> -->
        </div>
      </el-card>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" style="padding: 0px 10px; margin: 10px 0px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>学员好评率</span>
          <el-dropdown trigger="click" style="float: right; cursor: pointer;" >
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>今日</el-dropdown-item>
              <el-dropdown-item>本周</el-dropdown-item>
              <el-dropdown-item divided>本月</el-dropdown-item>
              <el-dropdown-item>全年</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div style="float: right; cursor: pointer; margin-right: 10px;">
            <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
              <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
            </el-tooltip>
          </div>
        </div>
        <div style="background: #fff; height: 250px; ">
          <div style="text-align: center;">
            <el-tag>预约计时</el-tag>
            <el-tag type="success">报名班制</el-tag>
          </div>
          <div style="margin-bottom: 40px; margin-top: 50px;">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          </div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="80" status="success"></el-progress>
          <!-- <el-progress type="circle" :percentage="65"></el-progress> -->
          <!-- <el-progress type="circle" :percentage="86"></el-progress> -->
          <!-- <ve-bar :data="chartData5" :width="width" :height="height" :colors="chartColors5" :settings="chartSettings5"></ve-bar> -->
        </div>
      </el-card>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="padding: 0px 10px; margin: 10px 0px;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>财务统计</span>
          <el-dropdown trigger="click" style="float: right; cursor: pointer;" >
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>今日</el-dropdown-item>
              <el-dropdown-item>本周</el-dropdown-item>
              <el-dropdown-item divided>本月</el-dropdown-item>
              <el-dropdown-item>全年</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-date-picker style="float: right; margin-top: -7px; margin-right: 10px;" v-model="searchForm.starttime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          <div style="float: right; cursor: pointer; margin-right: 10px;">
            <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
              <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
            </el-tooltip>
          </div>
        </div>
        <el-col :span="16">
          <div style="background: #fff; height: 250px;">
            <ve-histogram :data="chartData6" :colors="chartColors6" :width="width" :height="height" :grid="grid" :scale="scale" :settings="chartSettings6"></ve-histogram>
          </div>
        </el-col>
        <el-col :span="8">
          <el-col :span="12" style="padding: 10px;">
            <div style="padding-top: 20px;">
              <p style="padding: 0px; margin: 0px; color: #999; font-size: 14px;">报名班制金额</p>
              <p style="padding: 0px; margin: 10px 0px; font-size: 24px;">¥ 345544.00</p>
            </div>
          </el-col>
          <el-col :span="12" style="padding: 10px;">
            <div style="padding-top: 20px;">
              <p style="padding: 0px; margin: 0px; color: #999; font-size: 14px;">预约计时金额</p>
              <p style="padding: 0px; margin: 10px 0px; font-size: 24px;">¥ 122323.00</p>
            </div>
          </el-col>
          <el-col :span="12" style="padding: 10px;">
            <div style="padding-top: 20px;">
              <p style="padding: 0px; margin: 0px; color: #999; font-size: 14px;">提现金额</p>
              <p style="padding: 0px; margin: 10px 0px; font-size: 24px;">¥ 123123.00</p>
            </div>
          </el-col>
          <el-col :span="12" style="padding: 10px;">
            <div style="padding-top: 20px;">
              <p style="padding: 0px; margin: 0px; color: #999; font-size: 14px;">退款金额</p>
              <p style="padding: 0px; margin: 10px 0px; font-size: 24px;">¥ 1212.00</p>
            </div>
          </el-col>
        </el-col>
      </el-card>
    </el-col>

  </div>
</template>

<script>
// import axios from 'axios'
import VeLine from 'v-charts/lib/line'
import VeRing from 'v-charts/lib/ring'
import VePie from 'v-charts/lib/pie'
import VeBar from 'v-charts/lib/bar'
import VeHistogram from 'v-charts/lib/histogram'

export default {
  name: 'Index',
  data () {
    return {
      searchForm: {
        starttime: '',
        endtime: ''
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
  components: {VeLine, VeRing, VeHistogram, VePie, VeBar},
  created () {
    // 学员数
    this.chartData1 = {
      columns: ['日期', '报名班制', '预约计时'],
      rows: [
        { '日期': '1月', '报名班制': 1523, '预约计时': 1212 },
        { '日期': '2月', '报名班制': 1223, '预约计时': 1231 },
        { '日期': '3月', '报名班制': 2123, '预约计时': 2342 },
        { '日期': '4月', '报名班制': 4423, '预约计时': 5431 },
        { '日期': '5月', '报名班制': 3823, '预约计时': 1343 },
        { '日期': '6月', '报名班制': 7123, '预约计时': 1823 },
        { '日期': '7月', '报名班制': 4523, '预约计时': 1212 },
        { '日期': '8月', '报名班制': 2223, '预约计时': 1231 },
        { '日期': '9月', '报名班制': 2823, '预约计时': 2342 },
        { '日期': '10月', '报名班制': 1123, '预约计时': 5431 },
        { '日期': '11月', '报名班制': 3923, '预约计时': 1343 },
        { '日期': '12月', '报名班制': 6123, '预约计时': 1823 }
      ]
    }
    this.chartSettings1 = {
      axisSite: {
        right: ['占比']
      },
      yAxisType: [],
      area: false
    }
    this.chartColors1 = [
      '#5ab1ef', '#fa6e86'
    ]
    // 学员科目人数
    this.chartData2 = {
      columns: ['lesson', '人数'],
      rows: [
        {'lesson': '科一', '人数': 1523},
        {'lesson': '科二', '人数': 1223},
        {'lesson': '科三', '人数': 2123},
        {'lesson': '科四', '人数': 4123},
        {'lesson': '驾照', '人数': 3123}
      ]
    }
    this.chartSettings2 = {}
    this.chartColors2 = [
      '#5ab1ef'
    ]
    // 学员男女比例
    this.chartData3 = {
      columns: ['男', '女'],
      rows: [
        {'sex': '男', 'count': 1523},
        {'sex': '女', 'count': 1223}
      ]
    }
    this.chartSettings3 = {
      dimension: 'sex',
      metrics: 'count',
      selectedMode: 'single',
      hoverAnimation: false,
      radius: 80,
      offsetY: 145
    }
    this.chartColors3 = [
      '#409EFF', '#F56C6C'
    ]
    // 报名班制预约计时
    this.chartData4 = {
      columns: ['日期', '报名班制', '预约计时'],
      rows: [
        { '日期': '1月', '报名班制': 1523, '预约计时': 1212 },
        { '日期': '2月', '报名班制': 1223, '预约计时': 123 },
        { '日期': '3月', '报名班制': 2123, '预约计时': 2342 },
        { '日期': '4月', '报名班制': 4123, '预约计时': 543 },
        { '日期': '5月', '报名班制': 3123, '预约计时': 1343 },
        { '日期': '6月', '报名班制': 6123, '预约计时': 1823 },
        { '日期': '7月', '报名班制': 5523, '预约计时': 1212 },
        { '日期': '8月', '报名班制': 4223, '预约计时': 123 },
        { '日期': '9月', '报名班制': 7123, '预约计时': 2342 },
        { '日期': '10月', '报名班制': 4123, '预约计时': 543 },
        { '日期': '11月', '报名班制': 3123, '预约计时': 1343 },
        { '日期': '12月', '报名班制': 7123, '预约计时': 1823 }
      ]
    }
    this.chartColors4 = [
      '#19d4ae', '#5ab1ef'
    ]
    this.chartSettings4 = {
      axisSite: {
        right: ['占比']
      },
      yAxisType: [],
      area: true
    }
    // 学员好评率
    // this.chartData5 = {
    //   columns: ['日期', '预约计时', '报名班制'],
    //   rows: [
    //     { '日期': '1月', '预约计时': 1523, '报名班制': 1523},
    //     { '日期': '2月', '预约计时': 1223, '报名班制': 2343},
    //     { '日期': '3月', '预约计时': 2123, '报名班制': 1211},
    //     { '日期': '4月', '预约计时': 4123, '报名班制': 5444},
    //     { '日期': '5月', '预约计时': 3123, '报名班制': 1123},
    //     { '日期': '6月', '预约计时': 7123, '报名班制': 2121}
    //   ]
    // }
    // this.chartSettings5 = {
    //   dimension: ['日期'],
    //   metrics: ['预约计时', '报名班制'],
    //   axisSite: {
    //     top: ['占比']
    //   },
    //   xAxisName: ['销售额', '占比'],
    //   stack: {
    //     '销售额': ['预约计时', '报名班制']
    //   }
    // }
    // this.chartColors5 = [
    //   '#9cbbff', '#f56c6c'
    // ]
    // 财务统计
    this.chartData6 = {
      columns: ['日期', '报名班制', '预约计时'],
      rows: [
        { '日期': '1月', '报名班制': 2523, '预约计时': 1523 },
        { '日期': '2月', '报名班制': 1223, '预约计时': 1523 },
        { '日期': '3月', '报名班制': 2123, '预约计时': 1523 },
        { '日期': '4月', '报名班制': 4123, '预约计时': 1523 },
        { '日期': '5月', '报名班制': 4123, '预约计时': 1523 },
        { '日期': '6月', '报名班制': 5123, '预约计时': 1523 },
        { '日期': '7月', '报名班制': 6123, '预约计时': 1523 },
        { '日期': '8月', '报名班制': 8123, '预约计时': 1523 },
        { '日期': '9月', '报名班制': 4123, '预约计时': 1523 },
        { '日期': '10月', '报名班制': 4123, '预约计时': 1523 },
        { '日期': '11月', '报名班制': 4123, '预约计时': 1523 },
        { '日期': '12月', '报名班制': 4123, '预约计时': 1523 }
      ]
    }
    this.chartSettings6 = {}
    this.chartColors6 = [
      '#409EFF', '#F56C6C'
    ]
    // this.chartColors = [
    //   '#19d4ae', '#5ab1ef', '#fa6e86',
    //   '#ffb980', '#0067a6', '#c4b4e4',
    //   '#d87a80', '#9cbbff', '#d9d0c7',
    //   '#87a997', '#d49ea2', '#5b4947',
    //   '#7ba3a8'
    // ]
    this.grid = { left: 20, right: 20 }
    this.scale = { y: true }
    this.width = '100%'
    this.height = '300px'
  },
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
  .box-card {
    box-shadow: none !important;
    border: none !important;
    text-align: left;
  }
</style>
