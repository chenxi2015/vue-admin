<template>
  <div class="index" style="">
    <div class="yj-breadcrumb-div" style="">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>电商相关</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div style="background: #fff; padding: 24px 32px;" v-loading="loading">
      <div class="search" style="text-align: center;">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item >
            <a href="javascript:;" @click="handleShowAllSearch">展开<i class="el-icon-arrow-down"></i></a>
          </el-form-item>
        </el-form>
      </div>

      <div style="margin-bottom: 20px; text-align: left;">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新建</el-button>
        <el-button type="danger" icon="el-icon-close" @click="handleDel">删除</el-button>
        <el-button type="success" :loading="loadingSeen" @click="handleRefresh" style="float: right;">刷新</el-button>
      </div>

      <el-table ref="multipleTable" :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="250"> </el-table-column>
        <el-table-column prop="goods_sn" label="产品编号" width="150"></el-table-column>
        <el-table-column prop="cate_name" label="所属分类" width="120"> </el-table-column>
        <el-table-column prop="retail_price" label="零售价" width="120"> </el-table-column>
        <el-table-column prop="cost_price" label="成本价" width="120"></el-table-column>
        <el-table-column prop="market_price" label="市场价" width="120"> </el-table-column>
        <el-table-column prop="goods_order" label="排序" width="120"> </el-table-column>
        <el-table-column prop="goods_stock" label="库存" width="120"> </el-table-column>
        <el-table-column prop="goods_status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.goods_status == 1" type="success">在售</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">上架</el-dropdown-item>
                <el-dropdown-item command="b">下架</el-dropdown-item>
                <el-dropdown-item command="c">编辑</el-dropdown-item>
                <el-dropdown-item command="e" divided>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right; margin-top: 20px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
      <div style="clear:both;"></div>
    </div>

  </div>
</template>

<script>
// import axios from 'axios'
import Edit from './Add.vue'

export default {
  name: 'Index',
  data () {
    const item = {
      goods_name: '复古风唐装男士长袖衬衫 韩版修身灯芯绒盘扣莲花秀男式休闲衬衣',
      goods_sn: 'MS20140504124',
      cate_name: '衬衫',
      retail_price: '122.00',
      cost_price: '100.00',
      market_price: '200.00',
      goods_order: 1,
      goods_stock: 123,
      goods_status: 1,
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      province: '上海市普陀区金沙江路 1518 弄',
      city: '上海市普陀区金沙江路 1518 弄',
      zip: '123123',
      date: '2016-05-02'
    }
    return {
      tableData: Array(10).fill(item),
      formInline: {
        user: '',
        region: ''
      },
      loading: true,
      loadingSeen: false,
      navSiderwidthStyle: {
        transition: '0.5s',
        width: '64px'
      },
      activeIndex: '1',
      currentPage4: 1,
      state3: '',
      itemGroupStyle: {
        'border-radius': '4px'
      }
    }
  },
  created () {
    this.openFullScreen()
  },
  methods: {
    openFullScreen () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
    },
    onSubmit () {
      console.log('submit!')
    },
    handleShowAllSearch () {
    },
    handleClick () {

    },
    handleRefresh () {
      var _this = this
      this.loadingSeen = true
      this.openFullScreen()
      setTimeout(function () {
        _this.loadingSeen = false
      }, 2000)
    },
    handleNav () {
      this.isCollapse = !this.isCollapse
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleAdd () {
      this.$layer.iframe({
        content: {
          content: Edit, // 传递的组件对象
          parent: this, // 当前的vue对象
          data: [] // props
        },
        type: 2,
        anim: 3,
        shade: false,
        area: ['800px', '650px'],
        title: '添加测试'
      })
    },
    handleDel () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
