<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isCollapse: false,
      activeIndex: '1',
      itemGroupStyle: {
        'border-radius': '4px'
      },
      state3: '',
      restaurants: [],
      menuList: [
        {
          id: '1',
          icon: 'icon-dashboard',
          name: '控制台',
          children: [
            {
              id: '1',
              index: 'dashboarduser',
              name: '用户画像',
              path: '/dashboard/user'
            },
            {
              id: '2',
              index: 'dashboarddeal',
              name: '交易分析',
              path: '/dashboard/deal'
            }
          ]
        },
        {
          id: '2',
          icon: 'icon-home',
          name: '驾校管理',
          children: [
            {
              id: '1',
              index: 'schoollist',
              name: '驾校列表',
              path: '/school/index'
            },
            {
              id: '2',
              index: 'schoolshifts',
              name: '班制管理',
              path: '/school/shifts'
            }
          ]
        },
        {
          id: '3',
          icon: 'icon-group',
          name: '教练管理',
          children: [
            {
              id: '1',
              index: 'coachindex',
              name: '教练列表',
              path: '/coach/index'
            },
            {
              id: '2',
              index: 'coachtimeset',
              name: '时间设置',
              path: '/coach/timeset'
            }
          ]
        }
      ]
    }
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
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleNav () {
      this.isCollapse = !this.isCollapse
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

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
