<template>
<div class="news-add">
  <div class="yj-breadcrumb-div" style="">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章相关</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div style="">
    <el-form ref="form" :model="form" label-width="70px" label-position="left" style="">
      <el-col :xs="14" :sm="14" :md="14" :lg="16" :xl="18" style="padding-right: 10px; margin: 10px 0px; height: 100vh;">
        <el-card class="box-card">
          <el-form-item label="标题" label-width="50px">
            <el-input v-model="form.name" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="摘要" label-width="50px">
            <el-input type="textarea" v-model="form.name" placeholder="请输入摘要 不超过255个字"></el-input>
          </el-form-item>
          <el-form-item label-width="0px" style="">
            <quill-editor ref="myTextEditor"
                        style="line-height: 22px;"
                        v-model="content"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)">
            </quill-editor>
          </el-form-item>
        </el-card>
      </el-col>
      <el-col :xs="10" :sm="10" :md="10" :lg="8" :xl="6" style="margin: 10px 0px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>发布</span>
            <div style="float: right; cursor: pointer;">
              <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
                <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
              </el-tooltip>
            </div>
          </div>
          <div style="background: #fff; height: auto;">
            <el-form-item label="状态">
              <el-select v-model="form.isSelected">
                <el-option label="草稿" value="1"></el-option>
                <el-option label="等待复审" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公开度">
              公开
              <el-button type="text" style="line-height: 15px;">编辑</el-button>
            </el-form-item>
            <el-form-item label="立即发布">
              <el-button type="text" style="line-height: 15px;">编辑</el-button>
            </el-form-item>
            <el-form-item label-width="0px" style="text-align: center;">
              <el-button type="primary" @click="onSubmit">发布</el-button>
              <el-button>保持草稿</el-button>
              <el-button>预览</el-button>
            </el-form-item>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="10" :sm="10" :md="10" :lg="8" :xl="6" style="margin-bottom: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>分类目录</span>
            <div style="float: right; cursor: pointer;">
              <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
                <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
              </el-tooltip>
            </div>
          </div>
          <div style="background: #fff; height: 250px;">
            <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="常用目录" name="first">
                <el-tree
                  :data="data3"
                  show-checkbox
                  node-key="id"
                  :default-expanded-keys="[2, 3]"
                  :default-checked-keys="[5]">
                </el-tree>
              </el-tab-pane>
              <el-tab-pane label="所有分类目录" name="second">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="禁用" disabled></el-checkbox>
                  <el-checkbox label="选中且禁用" disabled></el-checkbox>
                </el-checkbox-group>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="10" :sm="10" :md="10" :lg="8" :xl="6" style="margin-bottom: 10px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标签</span>
            <div style="float: right; cursor: pointer;">
              <el-tooltip class="item" effect="dark" content="使用说明" placement="bottom">
                <i class="iconfont icon-shuoming" style="color: #999; font-size: 16px;"></i>
              </el-tooltip>
            </div>
          </div>
          <div style="background: #fff; height: auto;">
            <el-tag :key="tag" size="large" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
          </div>
        </el-card>
      </el-col>
      <div style="clear: both"></div>
    </el-form>
  </div>
</div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  data () {
    return {
      activeName2: 'first',
      form: {
        isSelected: '1',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      content: '你好 我是gengxin',
      editorOption: {},
      data3: [{
        id: 1,
        label: '一级 2',
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2',
            disabled: true
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          disabled: true,
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2',
            disabled: true
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkList: ['选中且禁用', '复选框 A'],
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  components: {
    quillEditor
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      this.content = html
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
<style>
  .ql-editor {height: 600px !important;}
</style>

<style scoped>
  .box-card {
    box-shadow: none !important;
    border: none !important;
    text-align: left;
  }
  .el-checkbox-group .el-checkbox {
    float: left;
    width: 160px;
    padding-right: 20px;
    margin: 0;
    padding: 0;
  }
  .el-tag {
    margin-right: 10px;
  }
  /* .el-tag + .el-tag {
    margin-left: 10px;
  } */
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 10px;
  }
  .input-new-tag {
    width: 90px;
    /* margin-left: 10px; */
    margin-top: 10px;
    vertical-align: bottom;
  }
</style>
