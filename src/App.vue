<template>
  <div id="app">
    <!-- <el-container style="height: 100vh;">
      <el-menu :default-openeds="['1']" :unique-opened="true" background-color="#001529" active-text-color="#1890ff" text-color="#FEFEFE" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <div class="logo-sider" style="">
          <img src="./assets/images/logo.png" style="" alt="" >
          <h2 style="">某某管理系统</h2>
        </div>
        <template v-for="item in menuList">
          <el-submenu :index="item.id">
            <template slot="title">
              <i class="iconfont" :class="item.icon" style=""></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group v-for="(v, k) in item.children" style="background: #000c17;" :style="[isCollapse ? itemGroupStyle : '']">
               <router-link :to="v.path"><el-menu-item :index="item.id-v.id" style="background: none !important;">{{v.name}}</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>

      <el-container>
        <el-header class="yj-header" style="">
          <el-menu mode="horizontal" style="float: left;">
            <el-menu-item index="1" @click="handleNav" style="border: none !important;">
                <i class="iconfont" :class="[isCollapse ? 'icon-zhankaicaidan' : 'icon-shouqicaidan']" style="font-size: 24px;"></i>
            </el-menu-item>
          </el-menu>

          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="2" style="border: none !important;">
                <el-autocomplete popper-class="my-autocomplete" v-model="state3" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
                    <i class="el-icon-search el-input__icon" style="font-size: 16px;" slot="suffix" @click="handleIconClick"></i>
                    <template slot-scope="props">
                        <div class="name">{{ props.item.value }}</div>
                    </template>
                </el-autocomplete>
            </el-menu-item>

            <el-menu-item index="3">
              <div class="icon-div" style="cursor: pointer; display: inline-block; width: 60px; text-align: center;">
                <el-badge :value="991" :max="99" class="item">
                  <i class="el-icon-bell" style="font-size: 18px; color: #666;"></i>
                </el-badge>
              </div>
            </el-menu-item>

            <el-submenu index="4" class="header-admin-logo">
              <template slot="title">
                <img src="./assets/images/photo.png" style="width: 25px; height: 25px; display: inline-block; vertical-align: middle;" alt="" srcset="">
                <span>嘻哈学车</span>
              </template>
              <el-menu-item index="4-1">个人中心</el-menu-item>
              <el-menu-item index="4-2">设置</el-menu-item>
              <router-link to="/admin/login"><el-menu-item index="4-3">退出登录</el-menu-item></router-link>
            </el-submenu>

          </el-menu>
        </el-header> -->

        <!-- content -->
        <!-- <el-main> -->
          <router-view/>
        <!-- </el-main> -->
      <!-- </el-container>
    </el-container> -->
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
