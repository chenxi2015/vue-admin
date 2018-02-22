<template>
  <div id="sidenav">
    <el-container style="height: 100vh;">
      <el-menu :default-active="onRoutes" class="el-menu-vertical" background-color="#001529" active-text-color="#1890ff" text-color="#FEFEFE" unique-opened router :collapse="isCollapse">
        <div class="logo-sider" style="">
          <img src="../../assets/images/logo.png" style="border-radius: 50%;" alt="" >
          <h2 style="font-weight: 300;">某某管理系统</h2>
        </div>
        <template v-for="item in menuList">
          <template v-if="item.children">
              <el-submenu :key="item.index" :index="item.index">
                <template slot="title"><i class="iconfont" :class="item.icon"></i><span slot="title">{{item.name}}</span></template>
                <el-menu-item-group  style="background: #000c17;" >
                    <el-menu-item v-for="(subItem, i) in item.children" :key="i" :index="subItem.index" style="background: none !important;">{{ subItem.name }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :key="item.index" :index="item.index">
              <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>

      <el-container>
        <el-header class="yj-header" style="">
          <el-menu mode="horizontal" style="float: left;">
            <el-menu-item index="1" @click="handleNav" style="border: none !important;">
                <i class="iconfont" :class="[isCollapse ? 'icon-zhankaicaidan' : 'icon-shouqicaidan']" style="font-size: 24px;"></i>
            </el-menu-item>
          </el-menu>

          <el-menu :default-active="activeIndex" menu-trigger="hover" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="2" style="border: none !important;">
                <el-autocomplete popper-class="my-autocomplete" v-model="state3" :fetch-suggestions="querySearch" placeholder="站内搜索" @select="handleSelect">
                    <i class="el-icon-search el-input__icon" style="font-size: 16px;" slot="suffix" @click="handleIconClick"></i>
                    <template slot-scope="props">
                        <div class="name">{{ props.item.value }}</div>
                    </template>
                </el-autocomplete>
            </el-menu-item>

            <el-menu-item index="3" style=" border: none !important; padding: 0px;">
              <div class="icon-div" style="cursor: pointer; display: inline-block; width: 60px; text-align: center;">
                <el-tooltip class="item" effect="dark" content="使用帮助" placement="bottom">
                  <i class="iconfont icon-102" style="font-size: 18px; color: #666;"></i>
                </el-tooltip>
              </div>
            </el-menu-item>

            <el-menu-item index="4" style="padding-left: 0px;" v-popover:popover1>
              <div class="icon-div" style="cursor: pointer; display: inline-block; width: 60px; text-align: center;">
                <el-badge :value="991" :max="99" class="item">
                  <i class="el-icon-bell" style="font-size: 18px; color: #666;"></i>
                </el-badge>
              </div>
              <el-popover
                ref="popover1"
                placement="bottom-end"
                width="340"
                trigger="click">
                <div style="height: 340px;">
                  <el-row style="border-bottom: 1px solid #e4e7ed; height: 35px;">
                    <el-col :span="8" ><div @click="handleNoticeNav(1)" class="grid-content" :class="[isnActive == 1 ? noticeActive : '']">通知(5)</div></el-col>
                    <el-col :span="8" ><div @click="handleNoticeNav(2)" class="grid-content" :class="[isnActive == 2 ? noticeActive : '']">消息(6)</div></el-col>
                    <el-col :span="8" ><div @click="handleNoticeNav(3)" class="grid-content" :class="[isnActive == 3 ? noticeActive : '']">待办</div></el-col>
                  </el-row>
                </div>
              </el-popover>
            </el-menu-item>

            <el-submenu index="5" class="header-admin-logo">
              <template slot="title">
                <img src="../../assets/images/photo.png" style="width: 25px; height: 25px; display: inline-block; vertical-align: middle;" alt="" srcset="">
                <span>嘻哈学车</span>
              </template>
              <el-menu-item index="5-1">个人中心</el-menu-item>
              <el-menu-item index="5-2">设置</el-menu-item>
              <router-link to="/admin/login">
                <el-menu-item index="5-3">退出登录</el-menu-item>
              </router-link>
            </el-submenu>

          </el-menu>
        </el-header>

        <!-- content -->
        <el-main>
          <!-- <transition name="el-fade-in"> -->
            <router-view/>
          <!-- </transition> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Sidenav',
  data () {
    return {
      isnActive: 1,
      activeName: 'first',
      isCollapse: localStorage.getItem('iscollapse') === '1',
      activeIndex: '1',
      itemGroupStyle: {
        'border-radius': '4px'
      },
      noticeActive: 'yj-notice-active',
      state3: '',
      restaurants: [],
      menuList: [
        {
          id: '1',
          index: 'home',
          icon: 'icon-dashboard',
          name: '控制台',
          children: [
            {
              id: '1',
              index: 'dashboardindex',
              name: '统计分析',
              path: '/dashboard/index'
            },
            {
              id: '2',
              index: 'workplace',
              name: '工作台',
              path: '/dashboard/workplace'
            }
          ]
        },
        {
          id: '2',
          index: '2',
          icon: 'icon-home',
          name: '列表表单',
          children: [
            {
              id: '1',
              index: 'listindex',
              name: '查询表格',
              path: '/list/index'
            },
            {
              id: '1',
              index: 'baseform',
              name: '基础表单',
              path: '/form/base'
            },
            {
              id: '1',
              index: 'stepform',
              name: '分布表单',
              path: '/form/step'
            }
          ]
        },
        {
          id: '3',
          index: '3',
          icon: 'icon-group',
          name: '文章相关',
          children: [
            {
              id: '1',
              index: 'newslist',
              name: '文章列表',
              path: '/news/list'
            },
            {
              id: '2',
              index: 'newsadd',
              name: '添加文章',
              path: '/news/add'
            }
          ]
        },
        {
          id: '4',
          index: '4',
          icon: 'icon-group',
          name: '电商相关',
          children: [
            {
              id: '1',
              index: 'goodslist',
              name: '商品列表',
              path: '/goods/list'
            },
            {
              id: '2',
              index: 'goodsadd',
              name: '添加商品',
              path: '/goods/add'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  },
  computed: {
    onRoutes () {
      // console.log(this.$route.path)
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    handleNoticeNav (type) {
      this.isnActive = type
    },
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
      console.log(this.isCollapse)
      localStorage.setItem('iscollapse', this.isCollapse ? 1 : 0)
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
  .yj-el-popover {top: 44px !important; height: 400px !important;}
  .yj-notice-active {border-bottom: 1px solid #409EFF; color: #409EFF;}
</style>

<style scoped>
  .grid-content {text-align: center; cursor: pointer; height: 34px;}
</style>
